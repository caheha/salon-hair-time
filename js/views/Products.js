// Casper, Mads, Marko & Natascha
// Import components
import Header from '../components/Header.js';
import Products from '../components/Products.js';
import Footer from '../components/Footer.js';

// View for products page
export default function Produkter() {
    return /*html*/`
        ${Header()}
        <main>
            ${Products()}
        </main>
        ${Footer()}
    `;
}