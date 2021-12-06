// Marko
// Import
import { app } from "../main.js";

// component for creating new user
export default function CreateNewUser() {

    // Store choices
    let _selectedLength;
    let _selectedStrength;

    // When a hair length is selected, update active class
    window.selectLength = (length) => {
        _selectedLength = length;
        let buttons = document.querySelectorAll('.hair-buttons button');

        for (const button of buttons) {
            button.classList.remove('active');
            if (button.innerHTML == length) {
                button.classList.add('active');
            }
        }
    }

    // When a hair strength is selected, update active class
    window.selectStrength = (strength) => {
        _selectedStrength = strength;
        let buttons = document.querySelectorAll('.strength-buttons button');

        for (const button of buttons) {
            button.classList.remove('active');
            if (button.innerHTML == strength) {
                button.classList.add('active');
            }
        }
    }

    // Input validation for creating user
    window.attemptCreateUser = () => {
        let emailInput = document.getElementById('new-user-email');
        let passwordInput = document.getElementById('new-user-password');
        let repeatPasswordInput = document.getElementById('repeat-password');
        let nameInput = document.getElementById('new-user-name');

        let errorBorder = "1px solid red";

        let error = false;

        if (emailInput.value == "") {
            emailInput.style.border = errorBorder;
            error = true;
        } else {
            emailInput.style.border = "none";
        }

        if (passwordInput.value == "" || passwordInput.value != repeatPasswordInput.value) {
            passwordInput.style.border = errorBorder;
            error = true;
        } else {
            passwordInput.style.border = "none";
        }

        if (repeatPasswordInput.value == "" || passwordInput.value != repeatPasswordInput.value) {
            repeatPasswordInput.style.border = errorBorder;
            error = true;
        } else {
            repeatPasswordInput.style.border = "none";
        }

        if (nameInput.value == "") {
            nameInput.style.border = errorBorder;
            error = true;
        } else {
            nameInput.style.border = "none";
        }

        if (_selectedLength == undefined || _selectedStrength == undefined) {
            error = true;
        }

        // If no error occurs, create a new user
        if (!error) {
            app.createNewUser(emailInput.value, passwordInput.value, nameInput.value, _selectedLength, _selectedStrength);
        }
    }

    // Component for creating a new user
    return /*html*/`
        <section class="login">
            <div class="max-width">
                <h1>Opret profil</h1>
                <form>
                    <label for="username">E-mail:</label>
                    <input id="new-user-email" name="username" type="text" placeholder="E-mail">

                    <label for="password">Kodeord:</label>
                    <input id="new-user-password" name="password" type="password" placeholder="Kodeord">

                    <label for="repeat-password">Gentag kodeord:</label>
                    <input id="repeat-password" name="repeat-password" type="password" placeholder="Gentag kodeord">

                    <label for="name">Navn:</label>
                    <input id="new-user-name" name="name" type="text" placeholder="Dit navn">

                    <label>Længden af mit hår er:</label>
                    <div class="hair-buttons">
                        <button onclick="selectLength(this.innerHTML)" type="button">Kort</button>
                        <button onclick="selectLength(this.innerHTML)" type="button">Mellemlangt</button>
                        <button onclick="selectLength(this.innerHTML)" type="button">Langt</button>
                    </div>

                    <label>Mit hår er:</label>
                    <div class="strength-buttons">
                        <button onclick="selectStrength(this.innerHTML)" type="button">Tyndt</button>
                        <button onclick="selectStrength(this.innerHTML)" type="button">Tykt</button>
                    </div>
                    

                    <button type="button" onclick="attemptCreateUser()">Opret profil</button>
                </form> 
            </div>
        </section>
    `;
}

