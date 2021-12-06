// Casper, Mads, Marko & Natascha
// Import components
import Header from '../components/Header.js';
import AddFamilyMemberScreen from '../components/AddFamilyMemberScreen.js';
import Footer from '../components/Footer.js';

// View for creating a new family member
export default function AddFamilyMember() {
    return /*html*/`
        ${Header()}    
        <main>
            ${AddFamilyMemberScreen()}
        </main>
        ${Footer()}
    `;
}