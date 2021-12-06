// Casper, Mads, Marko & Natascha
// Import
import Route from "../router/route.js";

// Component for footer
export default function Footer() {
    return /*html*/`
        <footer class="footer">
            <div class="max-width">
                <div class="footer-card" id="åbningstider">
                    <table class="schedule">
                        <caption><h3>Åbningstider</h3></caption>
                        <tbody>
                            <tr>
                                <td>Mandag</td>
                                <td>08:00-17:30</td>
                            </tr>
                            <tr>
                                <td>Tirsdad</td>
                                <td>08:00-17:30</td>
                            </tr>
                            <tr>
                                <td>Onsdag</td>
                                <td>Lukket</td>
                            </tr>
                            <tr>
                                <td>Torsdag</td>
                                <td>08:00-17:30</td>
                            </tr>
                            <tr>
                                <td>Fredag</td>
                                <td>08:00-17:30</td>
                            </tr>
                            <tr>
                                <td>Lørdag</td>
                                <td>07:00-12:00</td>
                            </tr>
                            <tr>
                                <td>Søndag</td>
                                <td>Lukket</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="footer-card">
                    <table class="contact">
                        <caption><h3>Kontakt</h3></caption>
                        <tbody>
                            <tr>
                                <td>Telefon:</td>
                            </tr>
                            <tr>
                                <td><a href="tel:+4551182574" title="Telefon">51 18 25 74</a></td>
                            </tr>
                            <tr>
                                <td>E-mail:</td>
                            </tr>
                            <tr>
                                <td><a href="mailto:hairtime.k@gmail.com" title="E-mail">hairtime.k@gmail.com</a></td>
                            </tr>
                            <tr>
                                <td>Adresse:</td>
                            </tr>
                            <tr>
                                <td>
                                    <a href="https://www.google.com/maps/place/Bromb%C3%A6rvej+8,+7200+Grindsted/data=!4m2!3m1!1s0x464b0c44a2de1525:0x4f5f218e8641f7?sa=X&ved=2ahUKEwjm1aC12L_0AhUug_0HHaXEDVoQ8gF6BAgOEAE" 
                                        title="Åbn kort" 
                                        target="_blank"
                                        rel="noreferrer">Brombærvej 8,<br>
                                        7200 Grindsted</a>  
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="footer-card">
                    <table class="reserve">
                        <caption><h3>Bestil tid</h3></caption>
                        <tbody>
                            <tr>
                                <td>Du kan bestille tid her</td>
                            </tr>
                            <tr>
                                <td>${Route('#/book-tid', /*html*/`<button>Book tid</button>`, false)}</td>
                            </tr>
                            <tr>
                                <td>eller ved at ringe til mig på<br><a href="tel:+4551182574" title="Telefon">51 18 25 74</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="copyright">
                <p>Salon Hair Time © 2021</p>
            </div>
        </footer>
    `;
}