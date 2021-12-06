// Casper, Mads, Marko & Natascha
// Import components
import Header from '../components/Header.js';
import BookingScreen from '../components/BookingScreen.js';
import Footer from '../components/Footer.js';
import { app } from '../main.js';

// View for booking page - parse current user data since user is logged in
export default function Book() {
    return /*html*/`
        ${Header()}    
        <main>
            ${BookingScreen( { user: app.userData })}
        </main>
        ${Footer()}
    `;
}