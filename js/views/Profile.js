// Casper, Mads, Marko & Natascha
// Import components
import Header from '../components/Header.js';
import ProfileScreen from '../components/ProfileScreen.js';
import Footer from '../components/Footer.js';

// View for user profile page
export default function Profile() {
    return /*html*/`
        ${Header()}    
        <main>
            ${ProfileScreen()}
        </main>
        ${Footer()}
    `;
}