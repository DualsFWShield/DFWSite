import { state } from './state.js';
import { openModal } from './auth.js';

let updateQRCallback = () => { };
export const setUpdateQRCallbackIcons = (cb) => { updateQRCallback = cb; };

// Collection de base (Favoris)
const iconCollection = [
    { name: 'Lien', class: 'fa-solid fa-link', path: 'M17.7,240.3a32,32,0,0,0,0,45.3l80,80a32,32,0,0,0,45.3,0l45.3-45.3a32,32,0,0,0,0-45.3L108.3,195a32,32,0,0,0-45.3,0L17.7,240.3Zm213.3-32a32,32,0,0,0-45.3,0L95,288.3a32,32,0,0,0,0,45.3l45.3,45.3a32,32,0,0,0,45.3,0l80-80a32,32,0,0,0,0-45.3L231,208.3Z' },
    { name: 'Globe', class: 'fa-solid fa-globe', path: 'M256,48C141.6,48,48,141.6,48,256s93.6,208,208,208,208-93.6,208-208S370.4,48,256,48Zm128,208c0,29.3-8.8,56.7-24.2,80.1l-84.3-84.3c5.3-12.3,8.5-25.9,8.5-40.1s-3.2-27.8-8.5-40.1l84.3-84.3C375.2,151.3,384,178.7,384,208Z' },
    { name: 'Facebook', class: 'fa-brands fa-facebook-f', path: 'M504,256C504,119,393,8,256,8S8,119,8,256c0,123.8,90.5,226.4,209.3,245V327.7H163V256h54.3V202.4c0-53.6,32.7-82.9,80.6-82.9,23,0,42.8,1.7,48.5,2.5v62.2h-36.8c-26,0-31,12.4-31,30.5v39.9h69.2l-8.9,71.7h-60.2V501C413.5,482.4,504,379.8,504,256Z' },
    { name: 'Twitter', class: 'fa-brands fa-twitter', path: 'M459.4,151.7c.3,4.5.3,9.1.3,13.6,0,138.7-105.6,298.6-298.6,298.6-59.5,0-114.9-17.4-162.4-47.6,8.3.9,16.5,1.3,25.1,1.3,49.1,0,94.2-16.6,130.3-44.8-46.1-1.1-84.8-31.2-98.1-72.8,6.5.9,13,1.6,19.8,1.6,9.4,0,18.8-1.3,27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14,7.8,30.2,12.7,47.4,13.3-28.3-18.8-46.8-51-46.8-87.4,0-19.5,5.2-37.4,14.3-53.2,51.7,63.6,129.3,105.3,216.4,109.8-1.6-7.8-2.6-15.9-2.6-24,0-57.8,46.8-104.9,104.9-104.9,30.2,0,57.5,12.7,76.7,33.1,23.7-4.5,46.5-13.3,66.6-25.3-7.8,24.4-24.4,44.8-46.1,57.8,21-2.2,41.1-8.1,60.4-16.2-14.3,20.8-32.2,39.3-52.6,54.3Z' },
    { name: 'Instagram', class: 'fa-brands fa-instagram', path: 'M224,128a96,96,0,1,0,96,96A96,96,0,0,0,224,128Zm0,144a48,48,0,1,1,48-48A48,48,0,0,1,224,272ZM400,96a32,32,0,1,1,32-32A32,32,0,0,1,400,96ZM448,56c-21.2,0-41.2,5.2-59,14.1l-1-1C387,68.1,384,64,379.9,64H304c-4.1,0-7,4.1-8.1,5.1l-1,1C277.2,61.2,257.2,56,236,56H160c-21.2,0-41.2,5.2-59,14.1l-1-1C99,68.1,96,64,91.9,64H16C11.9,64,8,68.1,8,72.1V148c0,4.1,4.1,7,5.1,8.1l1,1C5.2,173.2,0,193.2,0,214.4v75.2c0,21.2,5.2,41.2,14.1,59l1,1c1.1,1.1,4.1,4.1,4.1,8.1v76c0,4.1,4.1,7,8.1,8.1H92c4.1,0,7-4.1,8.1-5.1l1-1c17.8,8.8,37.8,14.1,59,14.1h76c21.2,0,41.2-5.2,59-14.1l1,1c1.1,1.1,4.1,4.1,4.1,8.1h76c4.1,0,7-4.1,8.1-5.1V372c0-4.1-4.1-7-5.1-8.1l-1-1c8.8-17.8,14.1-37.8,14.1-59v-75.2c0-21.2-5.2-41.2-14.1-59l-1-1c-1.1-1.1-4.1-4.1-4.1-8.1V72.1C448,68.1,444.1,64,440,64Z' },
    { name: 'Whatsapp', class: 'fa-brands fa-whatsapp', path: 'M419.3,313.3c-2,10-14.2,30-28,38.2s-26.3,12.3-49.3,12.3c-23,0-48-5-92.3-25.2-44.3-20.2-74-54.8-106.3-95.3S77.2,128.5,57,84.2,32,40,32,17c0-23,12.3-35.3,20.2-43.3S76,0,84.2,0c8.2,0,16.5,2,30,14.2s22.2,28,24.2,30,2,20.2-6.2,32.3-22.2,28-30,34.2-10,12.3-2,28,14.2,30,28,44.3,30,28,44.3,42.3,28,14.2,42.3,2,14.2-6.2,20.2-12.3s20.2-18.2,32.3-6.2,28,22.2,30,24.2,14.2,2,14.2,14.2Z' },
    { name: 'Email', class: 'fa-regular fa-envelope', path: 'M464,64H48A48,48,0,0,0,0,112V400a48,48,0,0,0,48,48H464a48,48,0,0,0,48-48V112A48,48,0,0,0,464,64Zm-24.3,15.9L256,256,72.3,79.9ZM48,391.3V122.1L204.3,256,48,391.3ZM90.2,432,256,289.4,421.8,432ZM464,391.3,307.7,256,464,122.1Z' },
    { name: 'Téléphone', class: 'fa-solid fa-phone', path: 'M13.4,32.6,2.7,43.3a32,32,0,0,0,29.4,48.1l34.1-16.5a16,16,0,0,1,15.2-1.9L128,95.3A16,16,0,0,1,128,128l-22.2,46.4a16,16,0,0,0,1.9,15.2l16.5,34.1a32,32,0,0,0,48.1,29.4l10.7-10.7a16,16,0,0,1,22.6,0l41.3,41.3a16,16,0,0,1,0,22.6L196.5,317a32,32,0,0,0,0,45.3l10.7,10.7a32,32,0,0,0,45.3,0l10.7-10.7a32,32,0,0,0,0-45.3L252.5,306a16,16,0,0,1,0-22.6l41.3-41.3a16,16,0,0,1,22.2,0l10.7,10.7a32,32,0,0,0,48.1-29.4l-16.5-34.1a16,16,0,0,0-1.9-15.2L353,128a16,16,0,0,1,22.2-22.2L346,103.5a16,16,0,0,0-15.2-1.9L296.7,85.1a32,32,0,0,0-48.1,29.4l10.7,10.7a16,16,0,0,1,0,22.6L218,189.2a16,16,0,0,1-22.6,0l-10.7-10.7a32,32,0,0,0-45.3,0l-10.7,10.7a32,32,0,0,0,0,45.3L140,245.2a16,16,0,0,1,0,22.6L98.8,309.2a16,16,0,0,1-22.6,0L65.5,298.5a32,32,0,0,0-29.4-48.1l-34.1,16.5a16,16,0,0,1-15.2,1.9L-19.2,291a16,16,0,0,1,0-22.2l22.2-46.4a16,16,0,0,0-1.9-15.2l-16.5-34.1a32,32,0,0,0-48.1-29.4L-52,154.3a16,16,0,0,1-22.6,0L-116,113a16,16,0,0,1,0-22.6L-94.6,69.7a32,32,0,0,0,0-45.3L-105.3,13.7a32,32,0,0,0-45.3,0L-161.3,24.3a32,32,0,0,0,0,45.3l10.7,10.7a16,16,0,0,1,0,22.6l-41.3,41.3a16,16,0,0,1-22.6,0l-10.7-10.7a32,32,0,0,0-48.1,29.4l16.5,34.1a16,16,0,0,0,1.9,15.2l22.2,46.4a16,16,0,0,1-22.2,22.2L-272.7,248a16,16,0,0,1-15.2-1.9l-34.1-16.5a32,32,0,0,0-48.1,29.4V272a32,32,0,0,0,32,32h16a32,32,0,0,0,29.4-48.1l-16.5-34.1a16,16,0,0,1-1.9-15.2l22.2-46.4a16,16,0,0,1,22.2-22.2L-202,184.5a16,16,0,0,0,15.2,1.9l34.1,16.5a32,32,0,0,0,48.1-29.4l-10.7-10.7a16,16,0,0,1,0-22.6l41.3-41.3a16,16,0,0,1,22.6,0l10.7,10.7a32,32,0,0,0,45.3,0l10.7-10.7a32,32,0,0,0,0-45.3L13.4,32.6Z' },
    { name: 'WiFi', class: 'fa-solid fa-wifi', path: 'M256,320a64,64,0,1,0,64,64A64.1,64.1,0,0,0,256,320Zm0-128c-55.3,0-107.5,22.1-145.9,62.1a32,32,0,0,0,46.4,44.2A128,128,0,0,1,355.5,298.3a32,32,0,0,0,46.4-44.2C363.5,214.1,311.3,192,256,192Zm0-128C139.6,64,32,118.8,32,118.8a32,32,0,0,0,33.1,53.4s89.9-46.8,190.9-46.8,190.9,46.8,190.9,46.8A32,32,0,0,0,480,118.8S372.4,64,256,64Z' },
    { name: 'YouTube', class: 'fa-brands fa-youtube', path: 'M508.6,148.8c-6.2-23-23-39.8-46-46C419.6,90.5,256,90.5,256,90.5s-163.6,0-206.6,12.3c-23,6.2-39.8,23-46,46C3,171.8,3,256,3,256s0,84.2,12.3,107.2c6.2,23,23,39.8,46,46,43,12.3,206.6,12.3,206.6,12.3s163.6,0,206.6-12.3c23-6.2,39.8-23,46-46,12.3-23,12.3-107.2,12.3-107.2s0-84.2-12.3-107.2Zm-312,146.5V192.8l108.6,64.2-108.6,64.3Z' },
    { name: 'LinkedIn', class: 'fa-brands fa-linkedin-in', path: 'M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.3 0 53.4 0 24 24.9 0 54.2 0c30.2 0 53.8 24 53.8 53.9 0 29.9-23.6 54.2-54.21 54.2zM447.9 448h-92.7V302.4c0-34.7-12.4-58.4-43.4-58.4-23.6 0-37.6 15.9-43.7 31.3-2.2 5.4-2.8 13-2.8 20.6V448h-92.6s1.3-260.3 0-287.1h92.6v40.7c12.3-19 34.3-46.1 83.5-46.1 60.9 0 106.6 39.8 106.6 125.4V448z' },
    { name: 'Github', class: 'fa-brands fa-github', path: 'M256 32C132.3 32 32 132.3 32 256c0 99.6 64.6 184 154 213.9 11.3 2.1 15.4-4.9 15.4-10.9 0-5.4-.2-23.4-.4-42.4-62.6 13.6-75.8-26.1-75.8-26.1-10.2-26-24.9-32.9-24.9-32.9-20.4-13.9 1.5-13.6 1.5-13.6 22.5 1.6 34.3 23.1 34.3 23.1 20 34.3 52.6 24.4 65.5 18.7 2-14.6 7.9-24.4 14.4-30-50-5.7-102.6-25-102.6-111.2 0-24.6 8.8-44.7 23.2-60.5-2.3-5.7-10.1-28.7 2.2-59.8 0 0 18.9-6 62 22.9 18-5 37.4-7.5 56.6-7.6 19.2.1 38.6 2.6 56.6 7.6 43.1-28.9 62-22.9 62-22.9 12.3 31.1 4.5 54.1 2.2 59.8 14.4 15.8 23.2 35.9 23.2 60.5 0 86.5-52.6 105.4-102.8 111 8.1 7 15.3 20.8 15.3 42 0 30.3-.3 54.8-.3 62.2 0 6 4 13 15.4 10.9C415.4 440 480 355.6 480 256 480 132.3 379.7 32 256 32z' },
    { name: 'TikTok', class: 'fa-brands fa-tiktok', path: 'M352 96c-28 0-52 8-72 22v176c0 67.2-54.6 122-122 122-20 0-38-4-54-12 8 28 36 52 74 60 18 4 36 6 56 6 94 0 168-76 168-170V160h-50z' },
];

let faMetadata = null;

async function loadIconMetadata() {
    if (faMetadata) return;
    try {
        const response = await fetch('https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/metadata/icons.json');
        faMetadata = await response.json();
        console.log("Métadonnées Font Awesome chargées avec succès.");
    } catch (error) {
        console.error("Erreur chargement icons.json:", error);
    }
}

export function populateIconModal() {
    loadIconMetadata();
    renderIcons(iconCollection, true);
}

function renderIcons(iconsList, isCustomFormat = false) {
    const grid = document.getElementById('icon-grid');
    grid.innerHTML = '';

    if (iconsList.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; color:#666;">Aucune icône trouvée</div>';
        return;
    }

    iconsList.forEach(icon => {
        const div = document.createElement('div');
        div.className = 'icon-item';
        div.title = icon.name;

        let iconClass = icon.class;
        let iconPath = icon.path || '';

        div.onclick = () => selectIcon(iconClass, iconPath);
        div.innerHTML = `<i class="${iconClass}"></i>`;

        grid.appendChild(div);
    });
}

export function filterIcons(term) {
    term = (term || '').trim().toLowerCase();

    const localMatches = iconCollection.filter(icon =>
        icon.name.toLowerCase().includes(term)
    );

    let faMatches = [];
    if (faMetadata && term.length >= 2) {
        faMatches = Object.keys(faMetadata).filter(iconName => {
            const icon = faMetadata[iconName];
            const isFree = icon.styles.some(style => icon.free.includes(style));
            if (!isFree) return false;

            const matchName = iconName.includes(term);
            const matchTerm = icon.search && icon.search.terms && icon.search.terms.some(t => t.includes(term));

            return matchName || matchTerm;
        }).map(iconName => {
            const iconData = faMetadata[iconName];
            let styleClass = 'fa-solid';
            if (iconData.free.includes('brands')) styleClass = 'fab';
            else if (iconData.free.includes('regular') && !iconData.free.includes('solid')) styleClass = 'fa-regular';

            return {
                name: iconName,
                class: `${styleClass} fa-${iconName}`,
                path: ''
            };
        });
    }

    const allResults = [...localMatches, ...faMatches].slice(0, 100);
    renderIcons(allResults);
}

export function selectIcon(iconClass, path) {
    if (!state.isPro) { openModal(); return; }

    const preview = document.getElementById('icon-preview');
    state.images.logo = null;
    document.getElementById('logoFile').value = '';

    if (iconClass) {
        state.images.icon = { class: iconClass };
        if (path) state.images.icon.path = path;

        preview.innerHTML = `Icône: <i class="${iconClass}"></i> <button id="clearIconBtn" style="background:none;border:none;color:var(--danger);cursor:pointer;">✕</button>`;
    } else if (path) {
        state.images.icon = { path: path };
        preview.innerHTML = `Icône: SVG <button id="clearIconBtn" style="background:none;border:none;color:var(--danger);cursor:pointer;">✕</button>`;
    }

    document.getElementById('clearIconBtn').onclick = clearIcon;

    document.getElementById('icon-controls').classList.remove('hidden');
    toggleIconMatch(document.getElementById('iconMatch').checked);
    closeIconModal();
    updateQRCallback();
}

export function clearIcon() {
    state.images.icon = null;
    document.getElementById('icon-controls').classList.add('hidden');
    const preview = document.getElementById('icon-preview');
    if (preview) preview.innerHTML = '';
    updateQRCallback();
}

export function openIconModal() { if (state.isPro) document.getElementById('icon-modal').style.display = 'flex'; else openModal(); }
export function closeIconModal() { document.getElementById('icon-modal').style.display = 'none'; }

export function toggleIconMatch(isMatch) {
    document.getElementById('iconColor').disabled = isMatch;
    updateQRCallback();
}
