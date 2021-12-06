// Natascha
// Import
import Route from "../router/route.js";

// Component for pricing
export default function Prices() {
    // Array of prices
    let prices = {
        women: [],
        men: [],
        children: []
    };

    // Fetch the prices from WordPress, reverse the order to show oldest entries first
    async function fetchPrices() {
        const womenPriceURL = 'https://wordpress.hairtime.dk/wp-json/wp/v2/prices?per_page=100&_fields[]=acf&categories=2';
        const menPriceURL = 'https://wordpress.hairtime.dk/wp-json/wp/v2/prices?per_page=100&_fields[]=acf&categories=3';
        const childrenPriceURL = 'https://wordpress.hairtime.dk/wp-json/wp/v2/prices?per_page=100&_fields[]=acf&categories=4';

        prices = {
            women: await fetchPriceJSON(womenPriceURL),
            men: await fetchPriceJSON(menPriceURL),
            children: await fetchPriceJSON(childrenPriceURL)
        }
        prices = {
            women: prices.women.reverse(),
            men: prices.men.reverse(),
            children: prices.children.reverse()
        }

        // Show Dameklip prices by default
        updatePriceList('Dameklip');
    }

    fetchPrices();

    // Wait for component to be rendered before adding event listeners to buttons
    setTimeout(() => {
        let buttons = document.querySelectorAll('.price-buttons button');

        for (const button of buttons) {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                resetButtons();
                button.classList.add('active');
                updatePriceList(button.innerHTML);
            });
        }
    }, 0);

    // Remove active class from buttons
    function resetButtons() {
        let buttons = document.querySelectorAll('.price-buttons button');

        for (const button of buttons) {
            button.classList.remove('active');
        }
    }

    // Change shown price list based on which button was pressed
    function updatePriceList(list) {
        let priceList = document.querySelector('.price-list');

        switch(list) {
            case "Dameklip":
                priceList.innerHTML = getPricesHTML(prices.women);
                break;
            case "Herreklip":
                priceList.innerHTML = getPricesHTML(prices.men);
                break;
            case "Børneklip":
                priceList.innerHTML = getPricesHTML(prices.children);
                break;
            default:
                priceList.innerHTML = "Der skete en fejl, vælg venligst en af de ovenstående muligheder."
                break;
            }
    }

    // Return JSON for prices
    async function fetchPriceJSON(url) {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }

    // Return HTML for all pricings in a list
    function getPricesHTML(priceList) {
        let html = '';
        for (const price of priceList) {
            html += /*html*/`
                <article>
                    <h3>${price.acf.service}</h3>
                    <p>fra ${price.acf.price},-</p>
                </article>
            `;
        }
        return html;
    }

    // Component for pricing
    return /*html*/`
        <section class="prices" id="priser">
            <article class="max-width">
                <h2>Priser</h2>
                <p>Herunder kan du se en vejledende pris for forskellige services som tilbydes. Prisen afhænger af dit hårs længde og type.</p>
                <p>Du kan altid ringe og bestille tid til en gratis hårkonsultation.</p>
            </article>

            <div class="max-width">
                <div class="price-buttons">
                    <button class="active">Dameklip</button>
                    <button>Herreklip</button>
                    <button>Børneklip</button>
                </div>
                <div class="price-wrapper">
                    <div class="price-list"></div>
                </div>
            </div>
            <div class="button-centered">
                ${Route('#/book-tid', /*html*/`<button>Book tid</button>`, false)}
            </div>
        </section>
    `;
}