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
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        themeToggleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                document.documentElement.classList.toggle('dark');
                
                const isDark = document.documentElement.classList.contains('dark');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                
                // Update toggle button icons
                this.updateThemeToggleIcons(isDark);
            });
        });

        // Initialize icons based on current theme
        this.updateThemeToggleIcons(document.documentElement.classList.contains('dark'));
    },

    updateThemeToggleIcons: function (isDark) {
        const themeToggleBtns = document.querySelectorAll('.theme-toggle');
        themeToggleBtns.forEach(btn => {
            const moonIcon = btn.querySelector('.fa-moon');
            const sunIcon = btn.querySelector('.fa-sun');
            
            if (moonIcon && sunIcon) {
                if (isDark) {
                    moonIcon.classList.remove('hidden');
                    sunIcon.classList.add('hidden');
                } else {
                    moonIcon.classList.add('hidden');
                    sunIcon.classList.remove('hidden');
                }
            }
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
                // Add dark background for both light and dark modes when scrolling
                if (document.documentElement.classList.contains('dark')) {
                    header.classList.add('bg-slate-900/90', 'backdrop-blur-md', 'border-b', 'border-white/10');
                    header.classList.remove('bg-transparent');
                } else {
                    header.classList.add('bg-white/95', 'backdrop-blur-md', 'border-b', 'border-slate-200');
                    header.classList.remove('bg-transparent');
                }
            } else {
                // Transparent background at top
                header.classList.remove('bg-slate-900/90', 'backdrop-blur-md', 'border-b', 'border-white/10');
                header.classList.remove('bg-white/95', 'backdrop-blur-md', 'border-b', 'border-slate-200');
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
