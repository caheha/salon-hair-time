// Casper
// Import
import Route from "../router/route.js";
import { app } from "../main.js";

// Component for user profile page
export default function ProfileScreen() {

    // Profile image, show placeholder if undefined
    let profileImg = app.userData == undefined || app.userData.img == "" ? `<img src="/img/man1.png">` : `<img src="${app.userData.img}">`;

    // Family members HTML, show text if undefined
    let familyMembersHTML = app.userData == undefined || app.userData.children.length > 0 ? getFamilyMembersHTML() : "Du har ikke tilføjet nogle familiemedlemmer endnu.";

    // Return HTML consisting of every family member
    function getFamilyMembersHTML() {
        let html = "";
        for (const familyMember of app.userData.children) {
            html += /*html*/`
                <article>
                    <h3>${familyMember.name}, ${getAge(familyMember.age)}</h3>
                    <p>${familyMember.length} og ${familyMember.strength.toLowerCase()} hår</p>
                    <div class="family-member-buttons">
                        <button onclick="navigateTo('#/book-tid')" type="button">Book tid til ${familyMember.name}</button>
                        <button onclick="editFamilyMember('${app.userData.children.findIndex(person => person == familyMember)}')"type="button"><span class="material-icons-outlined">edit</span></button>
                    </div>
                </article>
            `;
        }
        return html;
    }

    // Return age based on birth date
    function getAge(date) {
        let birthDate = new Date(date);
        const today = new Date();
        return new Date(today - birthDate.getTime()).getFullYear() - 1970;
    }
    
    // Open modal for changing profile picture
    window.openChangeImage = () => {
        // Append modal
        let modal = document.createElement("div");
        modal.classList.add('change-image-modal');
        modal.innerHTML = /*html*/`
            <article>
                <div id="close-change-image"  class="close-button">
                    <div></div>
                    <div></div>
                </div>
                <h3>Skift profilbillede</h3>
                <input type="file" id="img" accept="image/*" onchange="previewImage(this.files[0], 'imagePreview')">
                <img id="imagePreview" class="image-preview">
                <div class="profile-buttons">
                    <button onclick="removeProfileImage()" type="button">Fjern</button>
                    <button onclick="saveProfileImage()" type="button">Gem</button>
                </div>
            </article>
        `;
        document.body.appendChild(modal);

        // Add event listeners for closing the modal
        document.getElementById('close-change-image').addEventListener('click', () => {
            modal.remove();
        })
        modal.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.remove();
            }
        });
    }

    // Preview the uploaded image
    window.previewImage = (file, previewId) => {
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                document.querySelector("#" + previewId).setAttribute("src", event.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    // Update the users image with the uploaded image
    window.saveProfileImage = () => {
        if (document.querySelector("#imagePreview").src) {
            app.updateUserImage(document.querySelector("#imagePreview").src);
        } else {
            alert('Du har ikke tilføjet et billede.');
        }
    }

    // Remove the current profile image
    window.removeProfileImage = () => {
        app.updateUserImage('');
    }

    // Change user data display to input fields so the user can change them
    window.changeDetails = () => {
        document.querySelector('.name-display').innerHTML = /*html*/`
            <input id="change-name-input" value="${app.userData.name}" placeholder="Dit navn">
        `;
        document.querySelector('.email-display').innerHTML = /*html*/`
            <input id="change-email-input" value="${app.userData.email}" placeholder="E-mail">
        `;

        document.querySelector('.length-display').innerHTML = /*html*/`
            <select name="length" id="change-length">
                <option ${app.userData.length == 'Kort' ? "selected" : ""} value="Kort">Kort</option>
                <option ${app.userData.length == 'Mellemlangt' ? "selected" : ""} value="Mellemlangt">Mellemlangt</option>
                <option ${app.userData.length == 'Langt' ? "selected" : ""} value="Langt">Langt</option>
            </select>
        `;

        document.querySelector('.strength-display').innerHTML = /*html*/`
            <select name="strength" id="change-strength">
                <option ${app.userData.strength == 'Tyndt' ? "selected" : ""} value="Tyndt">Tyndt</option>
                <option ${app.userData.strength == 'Tykt' ? "selected" : ""} value="Tykt">Tykt</option>
            </select>
        `;

        // Change from change details to save details 
        const button = document.querySelector('#change-details-button')
        button.innerHTML = "Gem oplysninger";
        button.style.backgroundColor = "green";
        button.style.borderColor = "green";
        button.style.color = "white";
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = "white";
            button.style.color = "green";
        });
        button.addEventListener('mouseleave', () => {
            button.style.backgroundColor = "green";
            button.style.color = "white";
        });
        button.setAttribute('onclick', "saveUserDetails()");
    }

    // Save the details from the input fields
    window.saveUserDetails = () => {
        const nameInput = document.querySelector('#change-name-input');
        const emailInput = document.querySelector('#change-email-input');
        const lengthInput = document.querySelector('#change-length');
        const strengthInput = document.querySelector('#change-strength');

        // If the input fields are not empty, update the user details
        if (nameInput.value && emailInput.value) {
            app.updateUserDetails(nameInput.value, emailInput.value, lengthInput.value, strengthInput.value);
        }
    }

    // Return the date today to limit max on date input
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

    // Open modal for editing family member details
    window.editFamilyMember = (index) => {
        // Find person based on index
        let personToEdit = app.userData.children[index];

        // Append modal
        let modal = document.createElement("div");
        modal.classList.add('update-person-modal');
        modal.innerHTML = /*html*/`
            <article>
                <div id="close-change-person"  class="close-button">
                    <div></div>
                    <div></div>
                </div>
                <form>
                    <label for="name">Navn:</label>
                    <input name="name" id="change-family-name" type="text" value="${personToEdit.name}" placeholder="Navn">

                    <label for="age">Fødselsdag:</label>
                    <input name="age" id="change-family-age" type="date" value="${personToEdit.age}" max="${setMaxDate()}" placeholder="Alder">

                    <label>Længden af personens hår er:</label>
                    <select name="length" id="change-family-length">
                        <option ${personToEdit.length == 'Kort' ? "selected" : ""} value="Kort">Kort</option>
                        <option ${personToEdit.length == 'Mellemlangt' ? "selected" : ""} value="Mellemlangt">Mellemlangt</option>
                        <option ${personToEdit.length == 'Langt' ? "selected" : ""} value="Langt">Langt</option>
                    </select>

                    <label>Personens hår er:</label>
                    <select name="strength" id="change-family-strength">
                        <option ${personToEdit.strength == 'Tyndt' ? "selected" : ""} value="Tyndt">Tyndt</option>
                        <option ${personToEdit.strength == 'Tykt' ? "selected" : ""} value="Tykt">Tykt</option>
                    </select>
                    
                    <div class="profile-buttons">
                        <button onclick="attemptUpdateFamilyMember('${index}')" type="button">Gem</button>
                        <button onclick="removeFamilyMember('${index}')" type="button">Fjern familiemedlem</button>
                    </div>
                </form> 
                
            </article>
        `;
        document.body.appendChild(modal);

        // Add event listeners for closing modal
        document.getElementById('close-change-person').addEventListener('click', () => {
            modal.remove();
        })
        modal.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.remove();
            }
        });
    }

    // Input validation for updating family member details
    window.attemptUpdateFamilyMember = (index) => {
        let nameInput = document.querySelector('#change-family-name');
        let ageInput = document.querySelector('#change-family-age');
        let lengthInput = document.querySelector('#change-family-length');
        let strengthInput = document.querySelector('#change-family-strength');

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

        // Update details if no error occured
        if (!error) {
            app.updateFamilyMember(index, nameInput.value, ageInput.value, lengthInput.value, strengthInput.value);
        }
    }

    // Remove family member by index
    window.removeFamilyMember = (index) => app.removeFamilyMember(index);

    // Component for user profile page
    return /*html*/`
        <section class="profile">
            <div class="max-width">
                <h1>Min profil</h1>
                <div class="profile-info-card">
                    <div class="image-wrapper">
                        ${profileImg}
                        <div onclick="openChangeImage()"><span class="material-icons">photo_camera</span></div>
                    </div>
                    <div class="row">
                        <div>Navn</div>
                        <div class="name-display">${app.userData.name}</div>
                    </div>
                    <div class="row">
                        <div>E-mail</div>
                        <div class="email-display">${app.userData.email}</div>
                    </div>
                    <div class="row">
                        <div>Hårlængde</div>
                        <div class="length-display">${app.userData.length} </div>
                    </div>
                    <div class="row">
                        <div>Hårtykkelse</div>
                        <div class="strength-display">${app.userData.strength}</div>
                    </div>
                </div>

                <div class="profile-buttons">
                    <button id="change-details-button" onclick="changeDetails()" type="button">Ret oplysninnger</button>
                    <button onclick="logout()" type="button">Log af</button>
                </div>

                <h2>Familiemedlemmer</h2>
                <div class="family-members">${familyMembersHTML}</div>
                ${Route('#/tilfoej-familiemedlem', /*html*/`<button>Tilføj et familiemedlem</button>`)}
            </div>
        </section>
    `;
}