import { Security } from './security.js';
import { AdminTools } from './admin.js';
import { state } from './state.js';

// Helper to update QR from auth (circular dep workaround: pass function or event)
let updateQRCallback = () => { };

export const setUpdateQRCallback = (cb) => {
    updateQRCallback = cb;
};

export const closeModal = () => {
    document.getElementById('modal').style.display = 'none';
    AdminTools.close();
};

export const openModal = () => {
    document.getElementById('modal').style.display = 'flex';
};

export const AuthSystem = {
    _backdoorPass: 'D4RK-ARCH-M4ST3R-BYP4SS',
    _adminPass: 'SYS-ADMIN-ROOT-00',

    attemptLogin: function () {
        const input = document.getElementById('licenseKey');
        const val = input.value.trim();
        const normalized = val.toUpperCase();
        const status = document.getElementById('status-msg');

        if (normalized === this._backdoorPass) {
            status.style.color = 'var(--primary)';
            status.innerText = ">> BYPASS ACTIVATED <<";
            setTimeout(() => this.unlock(true), 800);
            return;
        }

        if (normalized === this._adminPass) {
            status.style.color = '#f472b6';
            status.innerText = ">> ROOT ACCESS GRANTED <<";
            setTimeout(() => AdminTools.open(), 800);
            return;
        }

        if (Security.validateKey(val)) {
            status.style.color = 'var(--success)';
            status.innerText = "Clé valide. Activation...";
            localStorage.setItem('dfw_lic', val);
            setTimeout(() => this.unlock(false), 800);
        } else {
            status.style.color = 'var(--danger)';
            status.innerText = "Erreur: Clé invalide (Voir Console F12)";
            input.classList.add('shake');
            setTimeout(() => input.classList.remove('shake'), 500);
        }
    },

    checkSavedLicense: function () {
        const savedKey = localStorage.getItem('dfw_lic');
        if (savedKey && Security.validateKey(savedKey)) {
            console.log("Licence valide trouvée, activation automatique.");
            this.unlock(false);
        }
    },

    unlock: function (isBypass) {
        state.isPro = true;
        state.authToken = isBypass ? "GOD_MODE" : "VALID_KEY";
        document.body.classList.add('is-pro');
        const lockBtn = document.getElementById('lockBtn');
        if (lockBtn) lockBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

        document.querySelectorAll('.locked-area').forEach(el => el.classList.remove('locked-area'));
        const ids = ['lock-expert', 'lock-grad', 'lock-imgs', 'lock-cta'];
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('locked-area');
        });

        closeModal();
        updateQRCallback();
    }
};
