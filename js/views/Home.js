// Casper, Mads, Marko & Natascha
// Import components
import Header from '../components/Header.js';
import Introduction from '../components/Introduction.js';
import Prices from '../components/Prices.js';
import About from '../components/About.js';
import Reviews from '../components/Reviews.js';
import Products from '../components/Products.js';
import Footer from '../components/Footer.js';

// View for frontpage, products component limited to 4
export default function Home() {
    return /*html*/`
        ${Header()}
        <main>
            ${Introduction()}
            ${Prices()}
            ${About()}
            ${Reviews()}
            ${Products( {amount: 4} )}
        </main>
        ${Footer()}
    `;
}