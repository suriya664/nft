/**
 * Marketplace Logic
 * Handles filtering, sorting, and grid population.
 */

document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('nft-grid-container')) return; // Exit if not on marketplace

    const gridContainer = document.getElementById('nft-grid-container');
    const clearFiltersBtn = document.getElementById('clear-filters');

    // Mock NFT Data (Simulating a larger database)
    const nftDatabase = [
        { id: 1, name: 'Cyber Punk #2077', collection: 'Cyber Punks', price: '2.55', image: 'https://images.unsplash.com/photo-1620641788421-7f1c91ade639?q=80&w=600&fit=crop', status: 'Buy Now', category: 'Art' },
        { id: 2, name: 'Golden Ape #88', collection: 'Ape Club', price: '5.00', image: 'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?q=80&w=600&fit=crop', status: 'On Auction', category: 'Art' },
        { id: 3, name: 'Abstract #42', collection: 'ArtWorks', price: '0.80', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&fit=crop', status: 'Buy Now', category: 'Art' },
        { id: 4, name: 'Neon City #11', collection: 'Neon City', price: '1.20', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=600&fit=crop', status: 'New', category: 'Virtual Worlds' },
        { id: 5, name: 'Space Walker #9', collection: 'Space Walkers', price: '0.45', image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=600&fit=crop', status: 'Buy Now', category: 'Gaming' },
        { id: 6, name: 'Fluid Dreams', collection: 'Fluid Art', price: '0.99', image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=600&fit=crop', status: 'New', category: 'Art' },
        { id: 7, name: 'Pixel World', collection: 'Meta Worlds', price: '3.10', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&fit=crop', status: 'On Auction', category: 'Virtual Worlds' },
        { id: 8, name: 'Sound Wave', collection: 'Music NFTs', price: '0.20', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&fit=crop', status: 'Buy Now', category: 'Music' },
    ];

    // Initial Load - Append mock data if grid is empty (or mixed with static)
    // For now we just keep the static HTML as is for stability, 
    // but in a real app this is where we'd fetch and map.

    // Clear Filters Logic
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(cb => cb.checked = false);
            // In a real app, this would trigger a re-fetch/filter
        });
    }

    // Add Filter Listeners
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            console.log('Filter changed:', cb.nextElementSibling.innerText, cb.checked);
            // Simulate loading state
            gridContainer.style.opacity = '0.5';
            setTimeout(() => {
                gridContainer.style.opacity = '1';
                // Here we would normally filter the `nftDatabase` array and re-render
            }, 300);
        });
    });

});
