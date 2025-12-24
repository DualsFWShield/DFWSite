// main.js - Script principal pour Everything on INTJ

document.addEventListener('DOMContentLoaded', function() {
    // Menu hamburger pour mobile
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            hamburger.classList.toggle('is-active');
        });
    }

    // Dropdowns : ouverture au clic sur mobile, au survol sur desktop
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(drop => {
        // Pour mobile : toggle au clic UNIQUEMENT sur le lien parent, pas sur les sous-liens
        const parentLink = drop.querySelector('a');
        if (parentLink) {
            parentLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    // Ferme les autres dropdowns
                    dropdowns.forEach(d => {
                        if (d !== drop) d.classList.remove('active-dropdown');
                    });
                    drop.classList.toggle('active-dropdown');
                }
            });
        }

        // Pour accessibilité clavier
        drop.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                drop.classList.toggle('active-dropdown');
            }
        });

        // Pour desktop : ouverture au survol
        drop.addEventListener('mouseenter', function() {
            if (window.innerWidth > 992) {
                drop.classList.add('active-dropdown');
            }
        });
        drop.addEventListener('mouseleave', function() {
            if (window.innerWidth > 992) {
                drop.classList.remove('active-dropdown');
            }
        });
    });

    // Ferme le menu mobile si on clique en dehors
    document.addEventListener('click', function(e) {
        const nav = document.querySelector('nav');
        const hamburger = document.querySelector('.hamburger-menu');
        if (nav && hamburger && nav.classList.contains('active')) {
            if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
                nav.classList.remove('active');
                hamburger.classList.remove('is-active');
            }
        }
        // Ferme les dropdowns si clic hors dropdown sur mobile
        if (window.innerWidth <= 992) {
            dropdowns.forEach(drop => {
                if (!drop.contains(e.target)) {
                    drop.classList.remove('active-dropdown');
                }
            });
        }
    });
});
