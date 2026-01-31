/**
 * Digital Art NFT Platform - Wallet Integration (Simulated)
 * Handles wallet connection simulation, address generation, and state persistence.
 */

const WalletApp = {
    state: {
        isConnected: false,
        address: null,
        balance: '0.00',
        network: 'Ethereum Mainnet',
        type: null // 'metamask', 'walletconnect', etc.
    },

    init: function() {
        this.checkPersistence();
        this.updateUI();
        this.bindEvents();
    },

    checkPersistence: function() {
        const storedWallet = localStorage.getItem('nft_wallet_connected');
        if (storedWallet) {
            const data = JSON.parse(storedWallet);
            this.state.isConnected = true;
            this.state.address = data.address;
            this.state.balance = data.balance;
            this.state.type = data.type;
        }
    },

    connect: function(walletType = 'metamask') {
        // Simulate loading
        this.showLoading();

        setTimeout(() => {
            // Mock successful connection
            const mockAddress = '0x71C...9A23';
            const mockBalance = (Math.random() * 10).toFixed(4); // Random ETH balance

            this.state.isConnected = true;
            this.state.address = mockAddress;
            this.state.balance = mockBalance;
            this.state.type = walletType;

            // Save to local storage
            localStorage.setItem('nft_wallet_connected', JSON.stringify({
                address: mockAddress,
                balance: mockBalance,
                type: walletType
            }));

            this.hideLoading();
            this.updateUI();
            this.showNotification('Wallet Connected', `Connected to ${walletType}`, 'success');
            
            // Dispatch event for other scripts
            window.dispatchEvent(new CustomEvent('walletConnected', { detail: this.state }));
            
            // Redirect if on login page
            if (window.location.pathname.includes('login.html')) {
                window.location.href = 'index.html'; // Or dashboard
            }

        }, 1500);
    },

    disconnect: function() {
        this.state.isConnected = false;
        this.state.address = null;
        this.state.balance = '0.00';
        localStorage.removeItem('nft_wallet_connected');
        
        this.updateUI();
        this.showNotification('DISCONNECTED', 'Wallet disconnected successfully', 'info');
        window.dispatchEvent(new CustomEvent('walletDisconnected'));
    },

    updateUI: function() {
        const connectBtns = document.querySelectorAll('.btn-connect-wallet');
        const walletDisplays = document.querySelectorAll('.wallet-display');
        const userMenus = document.querySelectorAll('.user-wallet-menu');
        
        if (this.state.isConnected) {
            connectBtns.forEach(btn => btn.style.display = 'none');
            walletDisplays.forEach(el => {
                el.style.display = 'flex';
                // Update text content inside if placeholder exists
                const addrSpan = el.querySelector('.wallet-address');
                if (addrSpan) addrSpan.textContent = this.state.address;
            });
            userMenus.forEach(el => el.classList.remove('hidden'));
        } else {
            connectBtns.forEach(btn => btn.style.display = 'flex');
            walletDisplays.forEach(el => el.style.display = 'none');
            userMenus.forEach(el => el.classList.add('hidden'));
        }
    },

    bindEvents: function() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-connect-wallet') || e.target.closest('#btn-connect-metamask')) {
                this.connect('MetaMask');
            }
            if (e.target.closest('#btn-disconnect')) {
                this.disconnect();
            }
        });
    },
    
    showLoading: function() {
        // Simple loading toast or overlay could go here
        console.log('Connecting to blockchain...');
    },

    hideLoading: function() {
        console.log('Connection complete.');
    },

    showNotification: function(title, message, type = 'info') {
        // We will implement a proper Toast UI later, for now alert/console
        console.log(`[${type.toUpperCase()}] ${title}: ${message}`);
        // Create a temporary toast element
        const toast = document.createElement('div');
        toast.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white transform transition-all duration-300 translate-y-full ${type === 'success' ? 'bg-green-500' : 'bg-blue-600'}`;
        toast.style.zIndex = '9999';
        toast.innerHTML = `<strong>${title}</strong><p class="text-sm">${message}</p>`;
        document.body.appendChild(toast);
        
        // Animate in
        requestAnimationFrame(() => toast.classList.remove('translate-y-full'));
        
        // Remove after 3s
        setTimeout(() => {
            toast.classList.add('translate-y-full');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    WalletApp.init();
});
