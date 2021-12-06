// Casper, Mads, Marko & Natascha
// Import components
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

// View for error page
export default function ErrorPage() {
    return /*html*/`
        ${Header()}    
        <main>
            <section>
                <div class="max-width">
                    <h1>Siden blev ikke fundet</h1>
                    <button onclick="navigateTo('#/')" type="button">Tilbage til forsiden</button>
                </div>
            </section>
        </main>
        ${Footer()}
    `;
}