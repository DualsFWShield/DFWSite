export const AdminTools = {
    open: function () {
        document.getElementById('modal-content').classList.add('hidden');
        document.getElementById('admin-interface').classList.remove('hidden');
    },
    close: function () {
        document.getElementById('admin-interface').classList.add('hidden');
        document.getElementById('modal-content').classList.remove('hidden');
        document.getElementById('licenseKey').value = '';
        document.getElementById('status-msg').innerText = '';
    },
    generate: function (Security) {
        const count = document.getElementById('gen-count').value;
        for (let i = 0; i < count; i++) {
            const k = Security.generateKey();
            const div = document.createElement('div');
            div.style.marginTop = '2px';
            div.style.color = 'white';
            div.style.cursor = 'pointer';
            div.style.userSelect = 'all';
            div.innerText = k;
            document.getElementById('admin-console').appendChild(div);
        }
    },
    copyAll: function () {
        const txt = document.getElementById('admin-console').innerText.replace(/>.*(\r\n|\n|\r)/gm, "");
        navigator.clipboard.writeText(txt);
        alert('Copié dans le presse-papier');
    }
};
