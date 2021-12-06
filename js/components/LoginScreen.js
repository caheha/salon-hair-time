// Mads
// Import
import { app } from "../main.js";
import Route from "../router/route.js";
import BookingScreen from "./BookingScreen.js";

// Component for login screen
export default function Login() {

    // Reset button pressed
    window.resetPassword = (email) => {
        if (email != "") {
            app.resetPassword(email);
        }
    }

    // Continue as guest, show guest booking screen
    window.continueAsGuest = () => {
        document.querySelector('main').innerHTML = BookingScreen();
    }

    // Component for login screen
    return /*html*/`
        <section class="login">
            <div class="max-width">
                <h1>Log ind</h1>
                <form>
                    <label for="username">E-mail:</label>
                    <input id="login-user-email" name="username" type="text" placeholder="E-mail" autocomplete="on">
                    <label for="password">Kodeord:</label>
                    <input id="login-user-password" name="password" type="password" placeholder="Kodeord" autocomplete="on">

                    <div class="login-error-message"></div>

                    <button type="button" onclick="login()">Login</button>

                    <p>eller</p>
                    ${Route('#/opret-bruger', /*html*/`<button class="alt" type="button">Opret profil</button>`)}
                    <button onclick="continueAsGuest()" class="alt" type="button">Fortsæt som gæst</button>
                </form>
            </div>
        </section>
    `;
}