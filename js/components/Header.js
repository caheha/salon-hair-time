// Casper, Mads, Marko & Natascha
// Import
import Route from "../router/route.js";

// Component for header
export default function Header() {

    // Wait for mount, add event listener to burger menu
    setTimeout(() => {
        var navBtn = document.getElementById('nav-button'); // Burger button
        var navBar = document.getElementById('nav-links');  // Navigation links
        navBtn.onclick = () => {
            navBar.classList.toggle('nav-active'); // Toggle active nagivation
            navBtn.classList.toggle('btn-active'); // Toggle active button
        }
    }, 0);

    return /*html*/`
        <header class="header">
            <nav class="contact-line">
                <div>
                    <div><a href="https://www.google.com/maps/place/Bromb%C3%A6rvej+8,+7200+Grindsted/data=!4m2!3m1!1s0x464b0c44a2de1525:0x4f5f218e8641f7?sa=X&ved=2ahUKEwjm1aC12L_0AhUug_0HHaXEDVoQ8gF6BAgOEAE" 
                            title="Åbn kort" 
                            target="_blank"
                            rel="noreferrer">Brombærvej 8, 7200 Grindsted</a></div>
                    <div><a href="tel:+4551182574" title="Telefon">51 18 25 74</a></div>
                    <div><a href="mailto:hairtime.k@gmail.com" title="E-mail">hairtime.k@gmail.com</a></div>
                </div>
            </nav>
            <div class="max-width">
                <nav class="navigation"> 
                    <a class="logo" href="#/" title="Forside">
                        <img src="/img/logo.svg" alt="Logo">
                    </a>
                    <div id="nav-links" class="nav-links">
                        ${Route('#/åbningstider', /*html*/`Åbningstider`, true)}
                        ${Route('#/priser', /*html*/`Priser`, true)}
                        ${Route('#/produkter', /*html*/`Produkter`, false)}
                        ${Route('#/book-tid', /*html*/`<button>Book tid</button>`, false)}
                        ${Route('#/profil', /*html*/`<span class="material-icons-outlined">account_circle</span>`)}
                    </div>
                    <div id="nav-button" class="nav-button">
                        <div id="line1"></div>
                        <div id="line2"></div>
                        <div id="line3"></div>
                    </div>
                </nav>
            </div>
        </header>
    `;
}