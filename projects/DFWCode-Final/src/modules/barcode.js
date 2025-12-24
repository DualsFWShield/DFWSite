import { state } from './state.js';

export function onBarTypeChange() {
    const type = document.getElementById('barType').value;
    const input = document.getElementById('barData');
    const restrictions = {
        'CODE128': { p: 'DFWCode Rocks', pattern: null, max: null, val: 'DFWCode Rocks' },
        'EAN13': { p: '13 digits', pattern: '\\d*', max: 13, val: '4006381333931' },
        'UPC': { p: '12 digits', pattern: '\\d*', max: 12, val: '036000291452' },
        'CODE39': { p: 'CODE-39', pattern: '[A-Z0-9-. $/+%*]*', max: null, val: 'CODE39' },
        'ITF14': { p: '14 digits', pattern: '\\d*', max: 14, val: '12345678901231' }
    };
    const config = restrictions[type] || restrictions['CODE128'];
    input.placeholder = config.p;
    input.value = config.val;
    if (config.pattern) input.setAttribute('pattern', config.pattern); else input.removeAttribute('pattern');
    if (config.max) input.setAttribute('maxlength', config.max); else input.removeAttribute('maxlength');
    input.style.textTransform = (type === 'CODE39') ? 'uppercase' : 'none';
    updateBar();
}

export function updateBar() {
    if (state.mode !== 'bar') return;
    const data = document.getElementById('barData').value;
    const fmt = document.getElementById('barType').value;
    const col = document.getElementById('barCol').value;
    const bg = document.getElementById('barBg').value;
    const w = parseInt(document.getElementById('barW').value);
    const h = parseInt(document.getElementById('barH').value);
    const txt = document.getElementById('barTxt').checked;

    document.getElementById('bar-wrapper').style.backgroundColor = bg;
    document.getElementById('cardContainer').style.backgroundImage = 'none';
    document.getElementById('cardContainer').style.backgroundColor = bg;

    try {
        if (window.JsBarcode) {
            JsBarcode("#bar-svg", data, { format: fmt, lineColor: col, background: bg, width: w, height: h, displayValue: txt, margin: 10 });
        }
    } catch (e) { console.error(e); }
}
