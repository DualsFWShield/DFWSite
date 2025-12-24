// theme-switcher.js - Gestion du changement de thème (clair/sombre)

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeStylesheet = document.getElementById('theme-stylesheet');
    const body = document.body;

    if (!themeToggle || !themeStylesheet) return;

    // Applique le thème stocké ou le thème clair par défaut
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        themeToggle.checked = true;
        themeStylesheet.setAttribute('href', 'css/dark-mode.css');
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    } else {
        themeToggle.checked = false;
        themeStylesheet.setAttribute('href', 'css/light-mode.css');
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    }

    themeToggle.addEventListener('change', function() {
        if (themeToggle.checked) {
            themeStylesheet.setAttribute('href', 'css/dark-mode.css');
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            themeStylesheet.setAttribute('href', 'css/light-mode.css');
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    });
});
