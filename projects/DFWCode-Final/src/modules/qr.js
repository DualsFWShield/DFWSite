import { state } from './state.js';
import { openModal } from './auth.js';
import { clearIcon, toggleIconMatch } from './icons.js';
import { HistorySystem } from './history.js';

export function renderQrInputs() {
    const c = document.getElementById('qr-inputs');
    const mk = (id, l, p = '') => `<div class="form-row"><div class="col"><label>${l}</label><input type="text" id="${id}" placeholder="${p}" class="qr-input-field"></div></div>`;
    let h = '';
    switch (state.qrType) {
        case 'url': h = mk('v-url', 'Website URL', 'https://...'); break;
        case 'text': h = `<label>Free Text</label><textarea id="v-text" rows="3" class="qr-input-field"></textarea>`; break;
        case 'wifi': h = mk('v-ssid', 'SSID') + mk('v-pass', 'Password'); break;
        case 'email': h = mk('v-mail', 'Recipient Email') + mk('v-sub', 'Subject'); break;
        case 'sms': h = mk('v-tel', 'Phone') + `<label>Message</label><textarea id="v-msg" rows="2" class="qr-input-field"></textarea>`; break;
        case 'crypto': h = mk('v-addr', 'Wallet Address'); break;
        case 'vcard': h = mk('v-fn', 'First Name') + mk('v-ln', 'Last Name') + mk('v-tel', 'Mobile'); break;
        case 'event': h = mk('v-title', 'Title') + `<div class="form-row"><div class="col"><label>Start</label><input type="datetime-local" id="v-start" class="qr-input-field"></div></div>`; break;
    }
    c.innerHTML = h;
    if (document.getElementById('v-url')) document.getElementById('v-url').value = 'https://dfwcode.com';

    // Re-attach listeners
    document.querySelectorAll('.qr-input-field').forEach(el => {
        el.addEventListener('input', debouncedQR);
    });
}

export function debouncedQR() {
    clearTimeout(state.debounceTimer);
    state.debounceTimer = setTimeout(updateQR, 300);
}

function getQrData() {
    const v = (id) => document.getElementById(id)?.value || '';
    switch (state.qrType) {
        case 'url': return v('v-url') || 'https://dfwcode.com';
        case 'text': return v('v-text') || 'DFW';
        case 'wifi': return `WIFI:S:${v('v-ssid')};P:${v('v-pass')};;`;
        case 'email': return `mailto:${v('v-mail')}?subject=${v('v-sub')}`;
        case 'sms': return `smsto:${v('v-tel')}:${v('v-msg')}`;
        case 'crypto': return `bitcoin:${v('v-addr')}`;
        case 'vcard': return `BEGIN:VCARD\nFN:${v('v-fn')} ${v('v-ln')}\nTEL:${v('v-tel')}\nEND:VCARD`;
        default: return 'DFW';
    }
}

export function updateQR() {
    if (state.mode !== 'qr') return;
    const wrapper = document.getElementById('qr-wrapper');
    wrapper.innerHTML = '';

    let dotOpt = { type: state.design.dot };
    const c1 = document.getElementById('colDots').value;
    const c2 = document.getElementById('colGrad').value;
    const bg = document.getElementById('colBg').value;

    if (state.isPro && document.getElementById('useGrad').checked) {
        dotOpt.gradient = { type: 'linear', rotation: 0, colorStops: [{ offset: 0, color: c1 }, { offset: 1, color: c2 }] };
    } else { dotOpt.color = c1; }

    let ecl = document.getElementById('qrEcl').value;
    const ver = parseInt(document.getElementById('qrVer').value);
    const mask = parseInt(document.getElementById('qrMask').value);
    const margin = parseInt(document.getElementById('qrMargin').value);
    const cornerCol = document.getElementById('useGlobalColor').checked
        ? c1
        : document.getElementById('colCorner').value;

    const card = document.getElementById('cardContainer');
    if (state.isPro && state.images.bg) {
        card.style.backgroundImage = `url(${state.images.bg})`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundColor = 'transparent';
        card.style.padding = '0'; card.style.border = 'none';
    } else {
        card.style.backgroundImage = 'none';
        card.style.backgroundColor = bg;
    }

    let imageToUse = state.isPro ? state.images.logo : null;

    if (state.isPro && state.images.icon) {
        const isMatch = document.getElementById('iconMatch').checked;
        const iconColor = isMatch ? c1 : document.getElementById('iconColor').value;
        const iconIdentifier = state.images.icon.class || state.images.icon.path;
        const cache = state.images.iconCache;

        if (cache && cache.identifier === iconIdentifier && cache.color === iconColor) {
            imageToUse = cache.dataUrl;
        } else {
            if (state.images.icon.class) {
                const iconClass = state.images.icon.class;
                let prefix = 'fas';
                if (iconClass.includes('fa-brands') || iconClass.includes('fab')) prefix = 'fab';
                if (iconClass.includes('fa-regular') || iconClass.includes('far')) prefix = 'far';

                const parts = iconClass.split(' ');
                let iconName = '';
                parts.forEach(p => {
                    if (p.startsWith('fa-') && p !== 'fa-solid' && p !== 'fa-brands' && p !== 'fa-regular') {
                        iconName = p.replace('fa-', '');
                    }
                });

                if (window.FontAwesome && iconName) {
                    const iconDef = window.FontAwesome.findIconDefinition({ prefix, iconName });

                    if (iconDef) {
                        const [width, height, , , pathData] = iconDef.icon;
                        const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="${iconColor}"><path d="${pathData}"></path></svg>`;
                        imageToUse = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
                    } else {
                        if (state.images.icon.path) {
                            const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="${iconColor}"><path d="${state.images.icon.path}"></path></svg>`;
                            imageToUse = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
                        }
                    }
                }
            }
            else if (state.images.icon.path) {
                const safePath = (state.images.icon.path || '').trim();
                if (safePath.startsWith('<svg')) {
                    let svgContent = safePath.replace(/^<svg\b([^>]*)>/i, (m, attrs) => {
                        if (/(\s|^)fill=/.test(attrs)) return `<svg${attrs}>`;
                        return `<svg${attrs} fill="${iconColor}">`;
                    });
                    imageToUse = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgContent)));
                } else {
                    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="${iconColor}"><path d="${safePath}"></path></svg>`;
                    imageToUse = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
                }
            }

            state.images.iconCache = {
                identifier: iconIdentifier,
                color: iconColor,
                dataUrl: imageToUse
            };
        }
    } else {
        state.images.iconCache = null;
    }

    if (imageToUse) {
        ecl = 'H';
        document.getElementById('qrEcl').value = 'H';
    }

    if (state.qrEngine) {
        state.qrEngine.update({
            data: getQrData(), width: 1000, height: 1000, margin: margin,
            qrOptions: { errorCorrectionLevel: ecl, typeNumber: ver, maskPattern: mask === -1 ? undefined : mask },
            dotsOptions: dotOpt,
            backgroundOptions: { color: (state.isPro && state.images.bg) ? 'transparent' : bg },
            cornersSquareOptions: { type: state.design.cornerSquare, color: cornerCol },
            cornersDotOptions: { type: state.design.cornerDot, color: cornerCol },
            image: imageToUse,
            imageOptions: { imageSize: 0.4, margin: 5 }
        });

        state.qrEngine.append(wrapper);

        const generatedSvg = wrapper.querySelector("svg");
        if (generatedSvg) {
            generatedSvg.setAttribute("viewBox", "0 0 1000 1000");
            generatedSvg.style.width = "100%";
            generatedSvg.style.height = "100%";
            generatedSvg.removeAttribute("width");
            generatedSvg.removeAttribute("height");
        }
    }

    // Save to history (Debounced to avoid spam)
    if (state.qrEngine && state.mode === 'qr') {
        clearTimeout(state.historyTimer);
        state.historyTimer = setTimeout(() => {
            HistorySystem.add(getQrData());
        }, 2000);
    }

    updateFrame();
}

export function updateFrame() {
    if (!state.isPro) return;
    const useCta = document.getElementById('useCta').checked;
    const ctaText = document.getElementById('ctaText').value || 'SCANNEZ-MOI';
    const ctaFrameColor = document.getElementById('ctaFrameColor').value;
    const card = document.getElementById('cardContainer');
    const textTop = document.getElementById('cta-text-top');

    if (useCta && state.mode === 'qr' && !state.images.bg) {
        card.style.padding = '30px';
        card.style.border = `8px solid ${ctaFrameColor}`;
        textTop.style.display = 'block';
        textTop.innerText = ctaText;
        textTop.style.color = ctaFrameColor;
    } else {
        card.style.padding = '0';
        card.style.border = 'none';
        textTop.style.display = 'none';
    }
}

export function setQrType(t, el) {
    state.qrType = t;
    document.querySelectorAll('.type-opt').forEach(d => d.classList.remove('active'));
    el.classList.add('active');
    renderQrInputs();
    updateQR();
}

export function setShape(cat, val, el) {
    if (cat === 'dot') state.design.dot = val;
    if (cat === 'cornerSquare') state.design.cornerSquare = val;
    if (cat === 'cornerDot') state.design.cornerDot = val;
    Array.from(el.parentElement.children).forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    debouncedQR();
}

export function processLogoFile(file) {
    if (!state.isPro) { openModal(); return; }
    if (!file) return;
    clearIcon();
    const reader = new FileReader();
    reader.onload = e => {
        state.images.logo = e.target.result;
        updateQR();
    };
    reader.readAsDataURL(file);
}

export function processBgFile(file) {
    if (!state.isPro) { openModal(); return; }
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        state.images.bg = e.target.result;
        updateQR();
    };
    reader.readAsDataURL(file);
}

export function clearBg() {
    state.images.bg = null;
    document.getElementById('bgFile').value = '';
    updateQR();
}

export function toggleGlobalColor(isGlobal) {
    document.getElementById('colCorner').parentElement.parentElement.style.display = isGlobal ? 'none' : 'flex';
    updateQR();
}

export function download(ext) {
    if (state.mode !== 'qr') {
        const svg = document.getElementById('bar-svg');
        const s = new XMLSerializer().serializeToString(svg);
        if (ext === 'svg') {
            const b = new Blob([s], { type: "image/svg+xml" });
            const u = URL.createObjectURL(b);
            const a = document.createElement('a'); a.href = u; a.download = "barcode.svg"; a.click(); URL.revokeObjectURL(u);
        } else {
            const cvs = document.createElement('canvas');
            const img = new Image();
            img.onload = () => {
                cvs.width = img.width; cvs.height = img.height;
                const ctx = cvs.getContext('2d');
                ctx.fillStyle = document.getElementById('barBg').value;
                ctx.fillRect(0, 0, cvs.width, cvs.height);
                ctx.drawImage(img, 0, 0);
                const a = document.createElement('a');
                a.href = cvs.toDataURL(`image/${ext === 'jpg' ? 'jpeg' : 'png'}`);
                a.download = `barcode.${ext}`; a.click();
            };
            img.src = "data:image/svg+xml;base64," + btoa(s);
        }
        return;
    }

    const useProFeatures = state.isPro && (state.images.bg || state.images.icon || document.getElementById('useCta').checked);
    if (ext !== 'png' || useProFeatures) {
        if (!state.isPro) { openModal(); return; }
    }

    if (ext === 'svg') {
        state.qrEngine.download({ name: "dfw-code", extension: 'svg' });
        return;
    }

    const useCta = state.isPro && document.getElementById('useCta').checked;
    const ctaText = useCta ? (document.getElementById('ctaText').value || 'SCANNEZ-MOI') : '';
    const ctaFrameColor = useCta ? document.getElementById('ctaFrameColor').value : '#000000';
    const framePadding = useCta ? 80 : 0;
    const frameWidth = useCta ? 15 : 0;

    const originalSvg = document.querySelector('#qr-wrapper svg');
    const clonedSvg = originalSvg.cloneNode(true);
    clonedSvg.setAttribute("width", "1000");
    clonedSvg.setAttribute("height", "1000");
    clonedSvg.style.width = null;
    clonedSvg.style.height = null;

    const s = new XMLSerializer().serializeToString(clonedSvg);
    const qrImg = new Image();

    qrImg.onload = () => {
        const qrSize = 1000;
        const canvasSize = qrSize + (framePadding * 2);
        const cvs = document.createElement('canvas');
        cvs.width = canvasSize;
        cvs.height = canvasSize;
        const ctx = cvs.getContext('2d');

        const bgPromise = new Promise((resolve) => {
            if (state.isPro && state.images.bg) {
                const bgImg = new Image();
                bgImg.crossOrigin = 'anonymous';
                bgImg.onload = () => {
                    const hRatio = cvs.width / bgImg.width;
                    const vRatio = cvs.height / bgImg.height;
                    const ratio = Math.max(hRatio, vRatio);
                    const sx = (cvs.width - bgImg.width * ratio) / 2;
                    const sy = (cvs.height - bgImg.height * ratio) / 2;
                    ctx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height, sx, sy, bgImg.width * ratio, bgImg.height * ratio);
                    resolve();
                };
                bgImg.onerror = () => {
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, canvasSize, canvasSize);
                    resolve();
                };
                bgImg.src = state.images.bg;
            } else {
                ctx.fillStyle = document.getElementById('colBg').value || '#ffffff';
                ctx.fillRect(0, 0, canvasSize, canvasSize);
                resolve();
            }
        });

        bgPromise.then(() => {
            ctx.drawImage(qrImg, framePadding, framePadding);
            if (useCta) {
                ctx.strokeStyle = ctaFrameColor;
                ctx.lineWidth = frameWidth;
                ctx.strokeRect(framePadding - (frameWidth / 2), framePadding - (frameWidth / 2), qrSize + frameWidth, qrSize + frameWidth);
                ctx.fillStyle = ctaFrameColor;
                ctx.font = 'bold 60px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillText(ctaText.toUpperCase(), canvasSize / 2, framePadding - 10);
            }
            const a = document.createElement('a');
            a.href = cvs.toDataURL(`image/${ext === 'jpg' ? 'jpeg' : 'png'}`);
            a.download = `dfw-code.${ext}`;
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
        });
    };
    qrImg.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(s)));
}

export async function shareQR() {
    if (!state.isPro) { openModal(); return; }

    const wrapper = document.getElementById('qr-wrapper');
    const svg = wrapper.querySelector("svg");
    const s = new XMLSerializer().serializeToString(svg);
    const cvs = document.createElement('canvas');
    const img = new Image();

    img.onload = () => {
        cvs.width = 1000;
        cvs.height = 1000;
        const ctx = cvs.getContext('2d');
        ctx.fillStyle = document.getElementById('colBg').value || '#ffffff';
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        ctx.drawImage(img, 0, 0);

        cvs.toBlob(async (blob) => {
            if (navigator.share) {
                try {
                    const file = new File([blob], "dfw-qr.png", { type: "image/png" });
                    await navigator.share({
                        title: 'DFW QR Code',
                        text: 'Here is my QR Code created with DFWCode!',
                        files: [file]
                    });
                } catch (err) {
                    console.error('Share failed:', err);
                }
            } else {
                alert('Sharing is not supported on this device/browser.');
            }
        });
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(s)));
}

export function printQR() {
    const wrapper = document.getElementById('qr-wrapper');
    const svg = wrapper.querySelector("svg");
    const s = new XMLSerializer().serializeToString(svg);

    const win = window.open('', '', 'height=600,width=800');
    win.document.write('<html><head><title>Print QR</title>');
    win.document.write('</head><body style="display:flex;justify-content:center;align-items:center;height:100vh;">');
    win.document.write(svg.outerHTML);
    win.document.write('</body></html>');
    win.document.close();
    win.focus();
    setTimeout(() => {
        win.print();
        win.close();
    }, 500);
}
