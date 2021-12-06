// Casper, Mads, Marko & Natascha
// Import components
import Header from '../components/Header.js';
import CreateNewUser from '../components/CreateNewUser.js';
import Footer from '../components/Footer.js';

// View for creating a new user profile
export default function Login() {
    return /*html*/`
        ${Header()}    
        <main>
            ${CreateNewUser()}
        </main>
        ${Footer()}
    `;
}