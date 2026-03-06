import './style.css';
import { renderHeader } from './src/components/header.js';
import { renderSubnav } from './src/components/subnav.js';
import { renderFooter } from './src/components/footer.js';
import { renderHome } from './src/pages/home.js';
import { renderSearch } from './src/pages/search.js';
import { renderProduct } from './src/pages/product.js';

function handleRoute() {
    const hash = window.location.hash;
    const mainContent = document.getElementById('amazon-main-content');

    // Clear main content
    mainContent.innerHTML = '';

    if (hash.startsWith('#search')) {
        const urlParams = new URLSearchParams(hash.split('?')[1]);
        const query = urlParams.get('q') || '';
        renderSearch(mainContent, query);
    } else if (hash === '#product') {
        renderProduct(mainContent);
    } else {
        // Default to home page
        renderHome(mainContent);
    }

    window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', () => {
    renderHeader(document.getElementById('amazon-header'));
    renderSubnav(document.getElementById('amazon-subnav'));
    renderFooter(document.getElementById('amazon-footer'));

    // Also hook search inputs and logo to basic routing
    const logo = document.querySelector('.header-logo');
    logo.addEventListener('click', (e) => { e.preventDefault(); window.location.hash = ''; });

    const searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', () => {
        const query = document.querySelector('.search-input').value;
        window.location.hash = `#search?q=${encodeURIComponent(query)}`;
    });

    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            window.location.hash = `#search?q=${encodeURIComponent(searchInput.value)}`;
        }
    });

    // Initial route
    handleRoute();

    // Route listener
    window.addEventListener('hashchange', handleRoute);
});
