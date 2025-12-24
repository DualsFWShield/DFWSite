import { state } from './state.js';
import { openModal } from './auth.js';
import { updateQR } from './qr.js';

export const BulkSystem = {
    isProcessing: false,

    init() {
        // Any init logic
    },

    async generateBatch(lines) {
        if (!state.isPro) { openModal(); return; }
        if (this.isProcessing) return;

        const zip = new JSZip();
        const folder = zip.folder("dfw-codes");

        this.isProcessing = true;
        const btn = document.getElementById('btn-bulk-gen');
        const originalText = btn.innerText;
        btn.innerText = "Generating...";
        btn.disabled = true;

        const originalData = document.getElementById('v-url') ? document.getElementById('v-url').value : '';
        const qrInput = document.getElementById('v-url') || document.getElementById('v-text');

        if (!qrInput) {
            alert("Please select URL or Text mode for Bulk generation.");
            this.isProcessing = false;
            btn.innerText = originalText;
            btn.disabled = false;
            return;
        }

        try {
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;

                // Update input and regenerate QR
                qrInput.value = line;
                // Force update state
                // We need to wait for the QR to render
                updateQR();

                // Wait a bit for the DOM/Canvas to update (since we use the rendered SVG/Canvas)
                await new Promise(r => setTimeout(r, 200));

                const blob = await this.getQrBlob();
                folder.file(`qr-${i + 1}-${line.replace(/[^a-z0-9]/gi, '_')}.png`, blob);

                btn.innerText = `Generating... ${i + 1}/${lines.length}`;
            }

            const content = await zip.generateAsync({ type: "blob" });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = "dfw-codes-bulk.zip";
            a.click();

        } catch (e) {
            console.error(e);
            alert("Error during bulk generation.");
        } finally {
            this.isProcessing = false;
            btn.innerText = originalText;
            btn.disabled = false;
            qrInput.value = originalData; // Restore
            updateQR();
        }
    },

    getQrBlob() {
        return new Promise(resolve => {
            const wrapper = document.getElementById('qr-wrapper');
            const svg = wrapper.querySelector("svg");

            // Basic SVG to PNG conversion (simplified version of download logic)
            const s = new XMLSerializer().serializeToString(svg);
            const img = new Image();
            img.onload = () => {
                const cvs = document.createElement('canvas');
                cvs.width = 1000;
                cvs.height = 1000;
                const ctx = cvs.getContext('2d');
                ctx.fillStyle = document.getElementById('colBg').value || '#ffffff';
                ctx.fillRect(0, 0, cvs.width, cvs.height);
                ctx.drawImage(img, 0, 0);
                cvs.toBlob(resolve);
            };
            img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(s)));
        });
    }
};
