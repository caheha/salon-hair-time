// Casper, Mads, Marko & Natascha
// Import
import Route from "../router/route.js";

// Component for introduction
export default function Introduction() {
    return /*html*/`
        <section class="intro">
            <article class="max-width">
                 <div>
                    <img src="/img/gitte.jpg" alt="Gitte Kjærsgaard">
                    <div>
                        <h1>Velkommen til<br>Salon Hair Time</h1>
                        <p>Din lokale frisør med fokus på kvalitet og en god oplevelse.</p>
                        ${Route('#/book-tid', /*html*/`<button>Book tid</button>`, false)}
                        <p>eller ring til:<br><a href="tel:+4551182574" title="Telefon">51 18 25 74</a></p>
                    </div>
                </div>
            </article>
            <div class="max-width">
                <img src="/img/ikon1.png" alt="ikon">
                <img src="/img/ikon2.png" alt="ikon">
                <img src="/img/ikon3.png" alt="ikon">
                <img src="/img/ikon4.png" alt="ikon">
                <img src="/img/ikon5.png" alt="ikon">
                <img src="/img/ikon6.png" alt="ikon">
                <img src="/img/ikon7.png" alt="ikon">
                <img src="/img/ikon8.png" alt="ikon">
                <img src="/img/ikon9.png" alt="ikon">
            </div>
        </section>
    `;
}