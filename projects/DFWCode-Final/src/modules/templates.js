export const Templates = [
    {
        id: 'classic',
        name: 'Classic',
        preview: '#000000',
        config: {
            dots: '#000000',
            bg: '#ffffff',
            shape: 'square',
            corner: '#000000',
            cornerShape: 'square',
            dotShape: 'square'
        }
    },
    {
        id: 'modern-blue',
        name: 'Modern Blue',
        preview: '#3b82f6',
        config: {
            dots: '#3b82f6',
            bg: '#eff6ff',
            shape: 'dots',
            corner: '#1d4ed8',
            cornerShape: 'extra-rounded',
            dotShape: 'dot'
        }
    },
    {
        id: 'eco-green',
        name: 'Eco Green',
        preview: '#10b981',
        config: {
            dots: '#059669',
            bg: '#ecfdf5',
            shape: 'rounded',
            corner: '#047857',
            cornerShape: 'dot',
            dotShape: 'rounded'
        }
    },
    {
        id: 'dark-mode',
        name: 'Dark Mode',
        preview: '#f472b6',
        config: {
            dots: '#f472b6',
            bg: '#18181b',
            shape: 'classy',
            corner: '#db2777',
            cornerShape: 'extra-rounded',
            dotShape: 'classy'
        }
    },
    {
        id: 'sunset',
        name: 'Sunset',
        preview: '#f97316',
        config: {
            dots: '#c2410c',
            bg: '#fff7ed',
            shape: 'extra-rounded',
            corner: '#ea580c',
            cornerShape: 'dot',
            dotShape: 'extra-rounded'
        }
    },
    {
        id: 'instagram',
        name: 'Instagram',
        preview: '#d62976',
        config: {
            dots: '#d62976',
            bg: '#ffffff',
            shape: 'dots',
            corner: '#fa7e1e',
            cornerShape: 'extra-rounded',
            dotShape: 'dot'
        }
    },
    {
        id: 'facebook',
        name: 'Facebook',
        preview: '#1877f2',
        config: {
            dots: '#1877f2',
            bg: '#ffffff',
            shape: 'square',
            corner: '#1877f2',
            cornerShape: 'square',
            dotShape: 'square'
        }
    },
    {
        id: 'wifi',
        name: 'WiFi',
        preview: '#000000',
        config: {
            dots: '#000000',
            bg: '#ffffff',
            shape: 'rounded',
            corner: '#000000',
            cornerShape: 'dot',
            dotShape: 'rounded'
        }
    }
];

export function applyTemplate(id) {
    const t = Templates.find(x => x.id === id);
    if (!t) return;

    // Apply colors
    const colDots = document.getElementById('colDots');
    if (colDots) {
        colDots.value = t.config.dots;
        colDots.previousElementSibling.style.backgroundColor = t.config.dots;
    }

    const colBg = document.getElementById('colBg');
    if (colBg) {
        colBg.value = t.config.bg;
        colBg.previousElementSibling.style.backgroundColor = t.config.bg;
    }

    const colCorner = document.getElementById('colCorner');
    if (colCorner) {
        colCorner.value = t.config.corner;
        colCorner.previousElementSibling.style.backgroundColor = t.config.corner;
    }

    // Apply shapes (We need to trigger the setShape function logic)
    // Since setShape is global or imported in qr.js, we can't easily call it here without circular deps
    // or passing it in.
    // For now, we rely on the user manually updating or we trigger a custom event.
    // However, in the main.js integration, we call updateQR() after applyTemplate().
    // Ideally, we should update the state directly if possible, or simulate clicks.

    // Simulating clicks on the visual grid items
    // This requires finding the element with the correct onclick handler
    // A bit brittle but works for this MVP

    // Helper to click shape
    const clickShape = (type, shape) => {
        const selector = `.vis-item[onclick*="'${type}','${shape}'"]`;
        const el = document.querySelector(selector);
        if (el) el.click();
    };

    clickShape('dot', t.config.shape);
    clickShape('cornerSquare', t.config.cornerShape);
    clickShape('cornerDot', t.config.dotShape);
}
