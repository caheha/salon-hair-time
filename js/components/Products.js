// Natascha
// Import
import Route from "../router/route.js";

// Component for products
export default function Products(props) {
    // Array of products
    let _products = [];
    
    // Wait for DOM to render, then fetch products JSON and append it to DOM
    setTimeout(() => {
        let productsURL = 'https://wordpress.hairtime.dk/wp-json/wp/v2/products/'

        productsURL += props && props.amount ? `?per_page=${props.amount}&_fields[]=acf&_fields[]=id` : "?per_page=100&_fields[]=acf&_fields[]=id";
    
        // Fetch JSON and append the products
        async function fetchJSON(url) {
            let response = await fetch(url);
            let data = await response.json();
            _products = data;
            appanedProducts(_products);
        }
    
        fetchJSON(productsURL);

        // Append products to DOM
        function appanedProducts(products) {
            let html = '';
            for (const product of products) {
                html += /*html*/`
                    <article onclick="showProductDetails(${product.id})">
                        <img src="${product.acf.image}" alt="${product.acf.name}">
                        <h3>${product.acf.name}</h3>
                        <p>${product.acf.price},-</p>
                    </article>
                `;
            }
            document.querySelector('#products-container').innerHTML = html;
        }
    }, 0);

    // Determine which button to show based on if you are on home page or products page
    let button =  props && props.amount ? Route('#/produkter', /*html*/`<button>Alle produkter</button>`, false) : 
                                          Route('#/', /*html*/`<button>Tilbage til forsiden</button>`, false);

    // Open product details modal
    window.showProductDetails = (id) => {
        // Find product based on id (WordPress)
        let selectedProduct = _products.find(product => product.id == id);

        // Append modal
        let modal = document.createElement("div");
        modal.classList.add('product-modal');
        modal.innerHTML = /*html*/`
            <article>
                <div id="close-detail-view"  class="close-button">
                    <div></div>
                    <div></div>
                </div>
                <img src="${selectedProduct.acf.image}" alt="${selectedProduct.acf.name}">
                <h3>${selectedProduct.acf.name}</h3>
                <p>${selectedProduct.acf.description}</p>
                <p>${selectedProduct.acf.price},-</p>
            </article>
        `;
        document.body.appendChild(modal);

        // Add event listeners for closing modal
        document.getElementById('close-detail-view').addEventListener('click', () => {
            modal.remove();
        })
        modal.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.remove();
            }
        });
    }
   
    // Component for products
    return /*html*/`
        <section class="products">
            <div class="max-width">
                <h2>Produkter</h2>
                <p>Her er en oversigt over de produkter, jeg har i salonen. Hvis du er i tvivl om, hvilke produkter, der passer til dig, og din hårtype, er du velkommen til at komme forbi salonen, hvor jeg kan guide dig i den bedste retning.</p>
                <section id="products-container" class="products-container"></section>
                <div class="button-centered">
                    ${button}
                </div>
            </div>
        </section>
    `;
}