import { state } from './modules/state.js';
import { Security } from './modules/security.js';
import { AuthSystem, openModal, closeModal, setUpdateQRCallback } from './modules/auth.js';
import { AdminTools } from './modules/admin.js';
import {
    renderQrInputs, updateQR, debouncedQR, setQrType, setShape,
    processLogoFile, processBgFile, clearBg, toggleGlobalColor,
    download, updateFrame, shareQR, printQR
} from './modules/qr.js';
import { onBarTypeChange, updateBar } from './modules/barcode.js';
import { switchMode, setupDropZone } from './modules/ui.js';
import {
    populateIconModal, openIconModal, closeIconModal,
    filterIcons, selectIcon, clearIcon, toggleIconMatch,
    setUpdateQRCallbackIcons
} from './modules/icons.js';
import { HistorySystem } from './modules/history.js';
import { Templates, applyTemplate } from './modules/templates.js';
import { BulkSystem } from './modules/bulk.js';

// Wire up callbacks
setUpdateQRCallback(updateQR);
setUpdateQRCallbackIcons(updateQR);

// Expose to window for HTML onclick handlers
window.state = state;
window.Security = Security;
window.AuthSystem = AuthSystem;
window.AdminTools = AdminTools;

window.switchMode = switchMode;
window.setQrType = setQrType;
window.updateQR = updateQR;
window.debouncedQR = debouncedQR;
window.setShape = setShape;
window.processLogoFile = processLogoFile;
window.processBgFile = processBgFile;
window.clearBg = clearBg;
window.toggleGlobalColor = toggleGlobalColor;
window.download = download;
window.updateFrame = updateFrame;
window.shareQR = shareQR;
window.printQR = printQR;

window.onBarTypeChange = onBarTypeChange;
window.updateBar = updateBar;

window.openModal = openModal;
window.closeModal = closeModal;

window.openIconModal = openIconModal;
window.closeIconModal = closeIconModal;
window.filterIcons = filterIcons;
window.selectIcon = selectIcon;
window.clearIcon = clearIcon;
window.toggleIconMatch = toggleIconMatch;

window.toggleHistory = () => {
    const panel = document.getElementById('history-panel');
    const qrSettings = document.getElementById('qr-settings');
    const barSettings = document.getElementById('bar-settings');
    const bulkPanel = document.getElementById('bulk-panel');

    const btnHistory = document.getElementById('btn-history');
    const btnQr = document.getElementById('btn-mode-qr');
    const btnBar = document.getElementById('btn-mode-bar');

    if (panel.classList.contains('hidden')) {
        panel.classList.remove('hidden');
        qrSettings.classList.add('hidden');
        barSettings.classList.add('hidden');
        if (bulkPanel) bulkPanel.classList.add('hidden');

        // Update Sidebar
        btnHistory.classList.add('active');
        btnQr.classList.remove('active');
        btnBar.classList.remove('active');
        if (document.getElementById('btn-bulk')) document.getElementById('btn-bulk').classList.remove('active');

        HistorySystem.render();
    } else {
        panel.classList.add('hidden');
        btnHistory.classList.remove('active');

        // Restore previous view
        if (state.mode === 'qr') {
            qrSettings.classList.remove('hidden');
            btnQr.classList.add('active');
        } else {
            barSettings.classList.remove('hidden');
            btnBar.classList.add('active');
        }
    }
};

window.toggleBulk = () => {
    const panel = document.getElementById('bulk-panel');
    const qrSettings = document.getElementById('qr-settings');
    const barSettings = document.getElementById('bar-settings');
    const historyPanel = document.getElementById('history-panel');

    const btnBulk = document.getElementById('btn-bulk');
    const btnHistory = document.getElementById('btn-history');
    const btnQr = document.getElementById('btn-mode-qr');
    const btnBar = document.getElementById('btn-mode-bar');

    if (panel.classList.contains('hidden')) {
        panel.classList.remove('hidden');
        qrSettings.classList.add('hidden');
        barSettings.classList.add('hidden');
        historyPanel.classList.add('hidden');

        // Update Sidebar
        btnBulk.classList.add('active');
        btnHistory.classList.remove('active');
        btnQr.classList.remove('active');
        btnBar.classList.remove('active');
    } else {
        panel.classList.add('hidden');
        btnBulk.classList.remove('active');

        // Restore previous view
        if (state.mode === 'qr') {
            qrSettings.classList.remove('hidden');
            btnQr.classList.add('active');
        } else {
            barSettings.classList.remove('hidden');
            btnBar.classList.add('active');
        }
    }
};

window.startBulkGen = () => {
    const txt = document.getElementById('bulk-input').value;
    const lines = txt.split('\n').filter(l => l.trim() !== '');
    if (lines.length === 0) {
        alert("Veuillez entrer des données (une par ligne).");
        return;
    }
    BulkSystem.generateBatch(lines);
};

// Init
window.onload = () => {
    // Initialize QR Engine
    if (window.QRCodeStyling) {
        state.qrEngine = new QRCodeStyling({
            width: 1000, height: 1000, type: "svg", data: "https://dfwcode.com",
            imageOptions: { crossOrigin: "anonymous", margin: 10 },
            dotsOptions: { color: "#000000", type: "square" },
            backgroundOptions: { color: "#ffffff" }
        });
    }

    populateIconModal();
    renderQrInputs();
    updateQR();
    onBarTypeChange();

    setupDropZone('logo-drop-zone', processLogoFile);
    setupDropZone('bg-drop-zone', processBgFile);
    AuthSystem.checkSavedLicense();

    document.querySelectorAll('.badge-pro, .lock-badge').forEach(el => {
        el.addEventListener('click', e => {
            if (state.isPro) return;
            e.stopPropagation();
            openModal();
        });
    });

    // Initial render fix
    setTimeout(updateQR, 100);
    HistorySystem.init();

    // Render Templates
    const tGrid = document.getElementById('template-grid');
    if (tGrid) {
        Templates.forEach(t => {
            const div = document.createElement('div');
            div.className = 'vis-item';
            div.style.backgroundColor = t.preview;
            div.onclick = () => {
                if (!state.isPro) { openModal(); return; }
                applyTemplate(t.id);
                updateQR();
            };
            div.innerHTML = `<div style="width:10px;height:10px;background:white;border-radius:50%"></div>`;
            div.title = t.name;
            tGrid.appendChild(div);
        });
    }
};
