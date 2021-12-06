// Casper, Mads, Marko & Natascha
// Component for reviews
export default function Reviews() {
    return /*html*/`
        <section class="reviews">
            <div class="max-width">
                <h2>Det siger mine kunder</h2>
                <section class="reviews-container">
                    <article>
                        <img src="/img/woman1.png" alt="Kunde">
                        <h3>Bodil, 83</h3>
                        <p>“Hun kender mit hår, og jeg behøver blot at sætte mig i stolen, så ved hun hvad hun skal gøre.“</p>
                    </article>
                    <article>
                        <img src="/img/woman2.png" alt="Kunde">
                        <h3>Sanne, 55</h3>
                        <p>"Hun kender mig så godt, at hun bare ved hvad der vil klæde mig.“</p>
                    </article>
                    <article>
                        <img src="/img/man1.png" alt="Kunde">
                        <h3>Jesper, 27</h3>
                        <p>“Hun er et dejligt menneske, der er nem at snakke med og hun hun er meget jordnær.“</p>
                    </article>
                </section>
            </div>
        </section>
    `;
}