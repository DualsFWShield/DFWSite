const CACHE_NAME = 'dfwcode-v1';
const ASSETS = [
    './',
    './index.html',
    './src/css/style.css',
    './src/main.js',
    './src/modules/state.js',
    './src/modules/security.js',
    './src/modules/admin.js',
    './src/modules/auth.js',
    './src/modules/qr.js',
    './src/modules/barcode.js',
    './src/modules/ui.js',
    './src/modules/icons.js',
    'https://unpkg.com/qr-code-styling@1.6.0-rc.1/lib/qr-code-styling.js',
    'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});
