// Mads
// Import
import { app } from "../main.js";

// Component for booking page
export default function BookingScreen(props) {

    // Decide what form to show, current user or guest
    let form = props && props.user ? userForm(props.user) : guestForm();

    // Current user form
    function userForm(user) {
        let familyMembersOptions = "";
        let index = 0;
        
        // Get HTML if user has family members 
        for (const familyMember of user.children) {
            familyMembersOptions += /*html*/`
                <option value="${index++}">${familyMember.name}</option>
            `;
        }

        // Form
        return /*html*/`
            <form class="booking-form">
                <label for="person">Vælg person:</label>
                <select onchange="personChanged(this.value)" name="person" id="choose-person">
                    <option value="-1" selected>${user.name}</option>
                    ${familyMembersOptions}
                </select>

                <label for="hair-length">Vælg hårlængde:</label>
                <select name="hair-length" id="choose-length">
                    <option ${user.length == 'Kort' ? "selected" : ""} value="Kort">Kort</option>
                    <option ${user.length == 'Mellemlangt' ? "selected" : ""} value="Mellemlangt">Mellemlangt</option>
                    <option ${user.length == 'Langt' ? "selected" : ""} value="Langt">Langt</option>
                </select>

                <label for="hair-strength">Vælg hårtykkelse:</label>
                <select name="hair-strength" id="choose-strength">
                    <option ${user.strength == 'Tyndt' ? "selected" : ""} value="Tyndt">Tyndt</option>
                    <option ${user.strength == 'Tykt' ? "selected" : ""} value="Tykt">Tykt</option>
                </select>
            </form>
        `;
    }

    // If another person is selected, update input fields
    window.personChanged = (index) => {
        const hairLength = document.querySelector('#choose-length')
        const hairSrength = document.querySelector('#choose-strength');
        if (index == -1) {
            hairLength.value = app.userData.length;
            hairSrength.value = app.userData.strength;
        } else {
            hairLength.value = app.userData.children[index].length;
            hairSrength.value = app.userData.children[index].strength;
        }
    }

    // Guest form
    function guestForm() {
        return /*html*/`
        <form class="booking-form">
            <label for="phone">Dit telefonnummer:</label>
            <input name="phone" placeholder="Telefonnummer" type="tel" id="phone">

            <label for="hair-length">Vælg hårlængde:</label>
            <select name="hair-length" id="choose-length">
                <option selected value="Kort">Kort</option>
                <option value="Mellemlangt">Mellemlangt</option>
                <option value="Langt">Langt</option>
            </select>

            <label for="hair-strength">Vælg hårtykkelse:</label>
            <select name="hair-strength" id="choose-strength">
                <option selected value="Tyndt">Tyndt</option>
                <option value="Tykt">Tykt</option>
            </select>
        </form>
        `;
    }

    // Input validation for continuing booking flow
    window.attemptChooseServices = () => {
        let errorContainer = document.querySelector('.book-error-message');
        let length = document.querySelector('#choose-length').value;
        let strength = document.querySelector('#choose-strength').value;
        errorContainer.innerHTML = '';
        let time = 0;
        let services = [];

        // If user is logged in, don't check for phone number
        if (props && props.user) {
           time = getTime();
           if (time == 0) {
                errorContainer.innerHTML = 'Vælg venligst service(s).';
           } else {
                services = getServices();
                chooseBookingTime(time, services, length, strength, props.user.email);
           }
        } else {
            let phone = document.querySelector('#phone');
            time = getTime();
            if (phone.value == '') {
                phone.style.border = '1px solid red';
                errorContainer.innerHTML += 'Indtast venligst dit telefonnummer.';
            } else if (time == 0) {
                errorContainer.innerHTML = 'Vælg venligst service(s).';
            } else {
                services = getServices();
                chooseBookingTime(time, services, length, strength, phone.value);
            }
        }
    }

    // Calculate estimated time of services selected
    function getTime() {
        let services = document.querySelectorAll('.service input');
        let time = 0;
        for (const service of services) {
            if (service.checked) {
                time += parseInt(service.value);
            }
        }
        return time;
    }

    // Get an array of services selected
    function getServices() {
        let services = document.querySelectorAll('.service :nth-child(2)');
        let serviceInputs = document.querySelectorAll('.service input');
        let results = [];
        let index = 0;
        for (const serviceInput of serviceInputs) {
            if (serviceInput.checked) {
                results.push(services[index].innerHTML.split('<i>')[0]);
            }
            index++;
        }
        return results;
    }

    // Store booking choices
    let choices = {};

    // Open modal for choosing date and time for booking
    function chooseBookingTime(time, services, length, strength, contactInfo) {
        // Store choices from previous step
        choices = {
            time: time,
            services: services,
            length: length,
            strength, strength,
            contactInfo, contactInfo
        }

        // Append modal
        let modal = document.createElement("div");
        modal.classList.add('choose-time-modal');      

        let servicesHTML = "";
        for (const service of services) {
            servicesHTML += `${service}<br>`;
        }

        modal.innerHTML = /*html*/`
            <article>
                <div id="close-choose-time" class="close-button">
                    <div></div>
                    <div></div>
                </div>
                <h3>Detaljer</h3>
                <p>Kontakt: ${contactInfo}<br>Hår: ${length}, ${strength.toLowerCase()}<br><br></p>
                <h3>Services</h3>
                <p>${servicesHTML}<br><br></p>
                
                <h3>Vælg tid</h3>
                <p>Lukket onsdag og søndag. Fredag er der kun åbnet til 12:00.</p><br>
                <label for="select-date">Dato:</label>
                <input name="select-date" type="date" min="${setMaxDate()}" id="select-date"><br><br>

                <label for="select-time">Ønsket tidspunkt:</label>
                <select name="select-time" id="select-time">
                    <option selected value="Morgen">Morgen 08:00-10:00</option>
                    <option value="Formiddag">Formiddag 10:00-12:00</option>
                    <option value="Eftermiddag">Eftermiddag 12:00-14:00</option>
                    <option value="Aften">Aften 14:00-17:30</option>
                </select>
                <br><br>
                <button onclick="attemptOrderTime()" type="button">Bestil tid</button>
            </article>
        `;
        document.body.appendChild(modal);

        // Add event listeners for closing modal
        document.getElementById('close-choose-time').addEventListener('click', () => {
            modal.remove();
        })
        modal.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.remove();
            }
        });
    }

    // Return current date to limit max date input
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

    // Input validation for submitting booking
    window.attemptOrderTime = () => {
        let dateInput = document.querySelector('#select-date');
        let timeInput = document.querySelector('#select-time');

        let error = false;
        let errorBorder = '1px solid red';

        if (dateInput.value == '') {
            error = true;
            dateInput.style.border = errorBorder;
        }

        // If no error occured, add booking and notify user of successful booking
        if (!error) {
            app.submitBooking(choices, dateInput.value, timeInput.value);
            alert('Din booking anmodning er afsendt og du vil modtage en besked når den er accepteret, samt bliver du givet et specifikt tidspunkt.')
        }
    }

    // Component for booking page
    return /*html*/`
        <section class="booking">
            <div class="max-width">
                <h1>Book tid</h1>
                <p>For at booke en tid skal du vælge hårlængde og tykkelse og de services du ønsker at booke tid til.</p>
                <h2>Dine oplysninger</h2>
                ${form}
                <h2>Vælg service(s)</h2>
                <p class="hightlight">Afkryds herunder de services som du ønsker at booke tid til.</p>
                <form class="service-form">
                    <h3>Klipninger:</h3>
                    <div class="service">
                        <input type="checkbox" value="45">
                        <p>Dameklip inkl. vask & føn<i>45 min</i></p>
                        <p>100,-</p>
                    </div>
                    <div class="service">
                        <input type="checkbox" value="30">
                        <p>Herreklip inkl. vask & føn<i>30 min</i></p>
                        <p>100,-</p>
                    </div>
                    <div class="service">
                        <input type="checkbox" value="30">
                        <p>Børneklip 0-5 år<i>30 min</i></p>
                        <p>100,-</p>
                    </div>
                    <div class="service">
                        <input type="checkbox" value="30">
                        <p>Børneklip 6-13 år<i>30 min</i></p>
                        <p>100,-</p>
                    </div>
                    <div class="service">
                        <input type="checkbox" value="5">
                        <p>Pandehår inkl. vask & føn<i>5 min</i></p>
                        <p>100,-</p>
                    </div>

                    <h3>Farvning:</h3>
                    <div class="service">
                        <input type="checkbox" value="120">
                        <p>Dameklip inkl. farvning<i>2 timer</i></p>
                        <p>100,-</p>
                    </div>
                    <div class="service">
                        <input type="checkbox" value="60">
                        <p>Herreklip inkl. farvning<i>1 time</i></p>
                        <p>100,-</p>
                    </div>
                    <div class="service">
                        <input type="checkbox" value="90">
                        <p>Bundfarve<i>1 time og 30 min</i></p>
                        <p>100,-</p>
                    </div>
                    <div class="service">
                        <input type="checkbox" value="75">
                        <p>Helfarvning kort hår<i>1 time 15 min</i></p>
                        <p>100,-</p>
                    </div>
                    <div class="service">
                        <input type="checkbox" value="85">
                        <p>Helfarvning mellemlangt hår<i>1 time 25 min</i></p>
                        <p>100,-</p>
                    </div>
                    <div class="service">
                        <input type="checkbox" value="95">
                        <p>Helfarvning langt hår<i>1 time 35 min</i></p>
                        <p>100,-</p>
                    </div>
                    <div class="service">
                        <input type="checkbox" value="30">
                        <p>Lyst i top<i>30 min</i></p>
                        <p>100,-</p>
                    </div>
                    <div class="service">
                        <input type="checkbox" value="90">
                        <p>Striber med hætte<i>1 time 30 min</i></p>
                        <p>100,-</p>
                    </div>
                    <div class="service">
                        <input type="checkbox" value="90">
                        <p>Reflekser kort hår<i>1 time 30 min</i></p>
                        <p>100,-</p>
                    </div>
                    <div class="service">
                        <input type="checkbox" value="90">
                        <p>Reflekser mellemlangt hår<i>1 time 30 min</i></p>
                        <p>100,-</p>
                    </div>
                    <div class="service">
                        <input type="checkbox" value="90">
                        <p>Reflekser langt hår<i>1 time 30 min</i></p>
                        <p>100,-</p>
                    </div>

                    <h3>Andet:</h3>
                    <div class="service">
                        <input type="checkbox" value="5">
                        <p>Børnevask<i>5 min</i></p>
                        <p>100,-</p>
                    </div>
                    <div class="service">
                        <input type="checkbox" value="20">
                        <p>Vask & føn<i>20 min</i></p>
                        <p>100,-</p>
                    </div>
                    <div class="service">
                        <input type="checkbox" value="45">
                        <p>Kurbehandling<i>45 min</i></p>
                        <p>100,-</p>
                    </div>
                    <div class="service">
                        <input type="checkbox" value="15">
                        <p>Bryn & vipper<i>15 min</i></p>
                        <p>100,-</p>
                    </div>
                    <div class="service">
                        <input type="checkbox" value="5">
                        <p>Bryn<i>5 min</i></p>
                        <p>100,-</p>
                    </div>
                    <div class="service">
                        <input type="checkbox" value="10">
                        <p>Vipper<i>10 min</i></p>
                        <p>100,-</p>
                    </div>
                    <div class="service">
                        <input type="checkbox" value="60">
                        <p>Håropsætning<i>1 time</i></p>
                        <p>100,-</p>
                    </div>
                </form>
                <button onclick="attemptChooseServices()" type="button">Fortsæt</button>
                <p class="book-error-message"></p>
            <div>
        </section>
    `;
}