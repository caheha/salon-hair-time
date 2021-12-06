// Import components
import Header from '../components/Header.js';
// Casper, Mads, Marko & Natascha
import LoginScreen from '../components/LoginScreen.js';
import Footer from '../components/Footer.js';

// View for login screen
export default function Login() {
    return /*html*/`
        ${Header()}    
        <main>
            ${LoginScreen()}
        </main>
        ${Footer()}
    `;
}