export const state = {
    mode: 'qr',
    qrType: 'url',
    isPro: false,
    authToken: null,
    qrEngine: null,
    debounceTimer: null,
    images: { logo: null, bg: null, icon: null, iconCache: null },
    design: { dot: 'square', cornerSquare: 'square', cornerDot: 'square' },
};
