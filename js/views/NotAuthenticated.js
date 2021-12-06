// Casper, Mads, Marko & Natascha
// Import components
import Login from '../views/Login.js';

// View for not authenticated user - show login view
export default function NotAuthenticated() {
    return Login();
}