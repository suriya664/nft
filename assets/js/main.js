/**
 * Digital Art NFT Platform - Main Scripts
 * Handles global UI logic like Theme Toggling, Mobile Menus, and Scroll Effects.
 */

const App = {
    init: function () {
        this.initTheme();
        this.initMobileMenu();
        this.initScrollEffects();
        this.initSearch();
    },

    // --- Theme Management ---
    initTheme: function () {
        const themeToggleBtns = document.querySelectorAll('.theme-toggle');

        // Check local storage or system preference
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        themeToggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
                if (document.documentElement.classList.contains('dark')) {
                    localStorage.theme = 'dark';
                } else {
                    localStorage.theme = 'light';
                }
            });
        });
    },

    // --- Mobile Navigation ---
    initMobileMenu: function () {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeBtn = document.getElementById('close-mobile-menu');

        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.remove('translate-x-full');
                document.body.style.overflow = 'hidden'; // Lock scroll
            });

            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    mobileMenu.classList.add('translate-x-full');
                    document.body.style.overflow = ''; // Unlock scroll
                });
            }

            // Close on outside click
            mobileMenu.addEventListener('click', (e) => {
                if (e.target === mobileMenu) {
                    mobileMenu.classList.add('translate-x-full');
                    document.body.style.overflow = '';
                }
            });
        }
    },

    // --- Scroll & Header Effects ---
    initScrollEffects: function () {
        const header = document.querySelector('header');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('bg-slate-900/90', 'backdrop-blur-md', 'border-b', 'border-white/10');
                header.classList.remove('bg-transparent');
            } else {
                header.classList.remove('bg-slate-900/90', 'backdrop-blur-md', 'border-b', 'border-white/10');
                header.classList.add('bg-transparent');
            }
        });

        this.animateOnScroll();
    },

    animateOnScroll: function () {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                }
            });
        }, { threshold: 0.1 });

        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => {
            el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
            observer.observe(el);
        });
    },

    // --- Global Search (Simulation) ---
    initSearch: function () {
        const searchBtn = document.querySelector('.search-trigger');
        const searchOverlay = document.getElementById('search-overlay');
        const closeSearch = document.getElementById('close-search');

        if (searchBtn && searchOverlay) {
            searchBtn.addEventListener('click', () => {
                searchOverlay.classList.remove('hidden');
                setTimeout(() => searchOverlay.classList.remove('opacity-0'), 10);
            });

            closeSearch.addEventListener('click', () => {
                searchOverlay.classList.add('opacity-0');
                setTimeout(() => searchOverlay.classList.add('hidden'), 300);
            });
        }
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
