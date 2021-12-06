// Marko
// Import
import { app } from "../main.js";

// component for adding family member
export default function AddFamilyMemberScreen() {

    // Store choices
    let _hairLength;
    let _hairStrength;

    // When a hair length is selected, update active class
    window.selectFamilyLength = (length) => {
        _hairLength = length;
        let buttons = document.querySelectorAll('.hair-buttons button');

        for (const button of buttons) {
            button.classList.remove('active');
            if (button.innerHTML == length) {
                button.classList.add('active');
            }
        }
    }

    // When a hair length is selected, update active class
    window.selectFamilyStrength = (strength) => {
        _hairStrength = strength;
        let buttons = document.querySelectorAll('.strength-buttons button');

        for (const button of buttons) {
            button.classList.remove('active');
            if (button.innerHTML == strength) {
                button.classList.add('active');
            }
        }
    }

    // Input validation for creating a family member
    window.attemptCreateFamilyMember = () => {
        let nameInput = document.getElementById('new-familymember-name');
        let ageInput = document.getElementById('new-familymember-age');

        let errorBorder = "1px solid red";

        let error = false;

        if (nameInput.value == "") {
            nameInput.style.border = errorBorder;
            error = true;
        } else {
            nameInput.style.border = "none";
        }

        if (ageInput.value == "") {
            ageInput.style.border = errorBorder;
            error = true;
        } else {
            ageInput.style.border = "none";
        }

        if (_hairLength == undefined || _hairStrength == undefined) {
            error = true;
        }

        // If no error occurs, create a new family member
        if (!error) {
            app.createNewFamilyMember(nameInput.value, ageInput.value, _hairLength, _hairStrength);
        }

    }

    // Return date today to limit birth date
    window.setMaxDate = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();

        dd = dd < 10 ? '0' + dd : dd;

        mm = mm < 10 ? '0' + mm : mm;

        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }

    // Component for creating family member
    return /*html*/`
        <section class="login">
            <div class="max-width">
                <h1>Tilføj familiemedlem</h1>
                <form>
                    <label for="username">Navn:</label>
                    <input id="new-familymember-name" name="name" type="text" placeholder="Navn">

                    <label for="password">Fødselsdag:</label>
                    <input id="new-familymember-age" name="age" type="date" max="${setMaxDate()}" placeholder="Alder">

                    <label>Længden af personens hår er:</label>
                    <div class="hair-buttons">
                        <button onclick="selectFamilyLength(this.innerHTML)" type="button">Kort</button>
                        <button onclick="selectFamilyLength(this.innerHTML)" type="button">Mellemlangt</button>
                        <button onclick="selectFamilyLength(this.innerHTML)" type="button">Langt</button>
                    </div>

                    <label>Personens hår er:</label>
                    <div class="strength-buttons">
                        <button onclick="selectFamilyStrength(this.innerHTML)" type="button">Tyndt</button>
                        <button onclick="selectFamilyStrength(this.innerHTML)" type="button">Tykt</button>
                    </div>
                    
                    <div class="profile-buttons left">
                        <button type="button" onclick="attemptCreateFamilyMember()">Opret familiemedlem</button>
                        <button type="button" class="alt" onclick="navigateTo('#/profil')">Gå tilbage</button>
                    </div>
                </form> 
            </div>
        </section>
    `;
}