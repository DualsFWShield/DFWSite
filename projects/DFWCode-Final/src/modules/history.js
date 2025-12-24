import { state } from './state.js';
import { updateQR } from './qr.js';
import { setQrType } from './qr.js';

const MAX_HISTORY = 50;

export const HistorySystem = {
    init: function () {
        if (!localStorage.getItem('dfw_history')) {
            localStorage.setItem('dfw_history', JSON.stringify([]));
        }
        this.render();
    },

    add: function (data) {
        let history = JSON.parse(localStorage.getItem('dfw_history') || '[]');

        // Avoid duplicates at the top
        if (history.length > 0 && JSON.stringify(history[0].data) === JSON.stringify(data)) {
            return;
        }

        const item = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            type: state.qrType,
            data: data,
            preview: data // Simplified for now
        };

        history.unshift(item);
        if (history.length > MAX_HISTORY) history.pop();

        localStorage.setItem('dfw_history', JSON.stringify(history));
        this.render();
    },

    load: function (id) {
        const history = JSON.parse(localStorage.getItem('dfw_history') || '[]');
        const item = history.find(i => i.id === id);
        if (!item) return;

        // Restore state
        setQrType(item.type, document.querySelector(`.type-opt[onclick*="'${item.type}'"]`));

        // Restore inputs (This is tricky because inputs are dynamic. 
        // For now, we just restore the main values if possible or just the type)
        // A better way is to store the exact input values in 'data' object
        // For this MVP, we will just alert the user or try to fill generic fields

        // TODO: Implement deep restore of inputs based on type
        console.log("Restoring", item);
    },

    clear: function () {
        if (confirm('Clear all?')) {
            localStorage.setItem('dfw_history', '[]');
            this.render();
        }
    },

    render: function () {
        const container = document.getElementById('history-list');
        if (!container) return;

        const history = JSON.parse(localStorage.getItem('dfw_history') || '[]');
        container.innerHTML = '';

        if (history.length === 0) {
            container.innerHTML = '<div style="text-align:center; color:#666; padding:20px;">No history</div>';
            return;
        }

        history.forEach(item => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `
                <div class="h-icon"><i class="fa-solid fa-qrcode"></i></div>
                <div class="h-info">
                    <div class="h-type">${item.type.toUpperCase()}</div>
                    <div class="h-date">${new Date(item.timestamp).toLocaleTimeString()}</div>
                </div>
                <button class="h-btn" onclick="HistorySystem.load(${item.id})"><i class="fa-solid fa-rotate-left"></i></button>
            `;
            container.appendChild(div);
        });
    }
};

// Expose
window.HistorySystem = HistorySystem;
