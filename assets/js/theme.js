/**
 * Theme Toggle Utility
 * Handles persistent dark/light mode switching
 */

const themeToggle = {
    init() {
        // Apply theme on load
        const savedTheme = localStorage.getItem('artnft-theme') || 'dark';
        if (savedTheme === 'light') {
            document.documentElement.classList.add('light-mode');
        }
        this.updateIcons(savedTheme);

        // Add event listeners to all theme toggle buttons
        const toggles = document.querySelectorAll('.theme-toggle');
        toggles.forEach(btn => {
            btn.addEventListener('click', () => this.toggle());
        });
    },

    toggle() {
        const isLight = document.documentElement.classList.toggle('light-mode');
        const theme = isLight ? 'light' : 'dark';
        localStorage.setItem('artnft-theme', theme);
        this.updateIcons(theme);
    },

    updateIcons(theme) {
        const icons = document.querySelectorAll('.theme-toggle i');
        icons.forEach(icon => {
            if (theme === 'light') {
                icon.setAttribute('data-lucide', 'sun');
            } else {
                icon.setAttribute('data-lucide', 'moon');
            }
        });
        // Re-initialize lucide icons if the library is available
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
};

// Auto-init theme on DOM load
document.addEventListener('DOMContentLoaded', () => themeToggle.init());

// Critical: Apply theme immediately to prevent flicker
(function () {
    const savedTheme = localStorage.getItem('artnft-theme') || 'dark';
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-mode');
    }
})();
