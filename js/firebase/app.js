// Casper
// Import firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateEmail, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import { getFirestore, collection, onSnapshot, updateDoc, addDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";
import { firebaseConfig } from './config.js';

// Firebase App
export default class FireBaseApp {
    // Initialise Firebase App, documents refs, and store for user data
    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth();
        this.provider;
        this.db = getFirestore();
        this.usersRef = collection(this.db, 'users');
        this.bookingsRef = collection(this.db, 'bookings');
        this.user;
        this.userData;
        this.userLoggedIn = false;
        this.unsubscribe;
        this.init();
    }

    // Setup eventlisteners
    init() {
        window.login = () =>  this.login();
        window.logout = () => this.logout();

        // If user logs on, retrieve user data from firestore, reset if user logs out
        onAuthStateChanged(this.auth, user => {
            if (user) {
                this.userLoggedIn = true;
                this.user = user;
                this.getUserData();
                this.waitForUserData();
            } else {
                this.userLoggedIn = false;
                this.user = undefined;
                this.userData = undefined;
                navigateTo('#/');
            }
        });
    }

    // Wait for user data to be retrieved before rendering the page to avoid errors
    waitForUserData() {
        if (this.userData === undefined) {
            setTimeout(() => {
                this.waitForUserData();
            }, 50);
        } else {
            render();
        }
    }

    // Retrieve user data document for current user using uid, update user data onchange
    getUserData() {
        const userRef = doc(this.usersRef, this.user.uid);

        this.unsubscribe = onSnapshot(userRef, (snapshot) => {
            this.userData = snapshot.data();
        });
    }

    // Create a new user data document when user creates a profile
    async createUser(email, name, length, strength) {
        const userRef = doc(this.usersRef, this.user.uid)

        let newUser = {
            name: name,
            img: '',
            email: email, 
            length: length,
            strength: strength,
            children: []
        }
        await setDoc(userRef, newUser);
    }

    // Create new user using email and password
    async createNewUser(email, password, name, length, strength) {
        createUserWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                // Signed in
                this.userLoggedIn = true;
                this.user = userCredential.user;
                this.createUser(email, name, length, strength);
                navigateTo('#/profil');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert('Der skete en fejl:', errorCode, errorMessage);
            });
    }

    // Update img field in user data document
    async updateUserImage(imageSrc) {
        const userRef = doc(this.usersRef, this.user.uid);
        await updateDoc(userRef, {
            img: imageSrc
        });
        render(false);
    }

    // Update user data document with updated data
    async updateUserDetails(name, email, length, strength) {
        const userRef = doc(this.usersRef, this.user.uid);

        await updateDoc(userRef, {
            name: name,
            email: email,
            length: length,
            strength: strength
        });
        updateEmail(this.user, email)
        render(false);
    }

    // Add a family member to user data document children array
    async createNewFamilyMember(name, age, length, strength) {
        const userRef = doc(this.usersRef, this.user.uid);

        let familyArray = this.userData.children;
        let newFamilyMember = {
            name: name,
            age: age,
            length: length,
            strength: strength
        }

        familyArray.push(newFamilyMember);

        await updateDoc(userRef, {
            children: familyArray
        });

        navigateTo('#/profil');
    }

    // Update family member in user data document children array
    async updateFamilyMember(index, name, age, length, strength) {
        const userRef = doc(this.usersRef, this.user.uid);

        let familyArray = this.userData.children;

        let updatedFamilyMember = {
            name: name,
            age: age,
            length: length,
            strength: strength
        }

        familyArray[index] = updatedFamilyMember;

        await updateDoc(userRef, {
            children: familyArray
        });

        render(false);
    }

    // Remove family member from user data document children array
    async removeFamilyMember(index) {
        const userRef = doc(this.usersRef, this.user.uid);

        let familyArray = this.userData.children;

        familyArray.splice(index, 1);

        await updateDoc(userRef, {
            children: familyArray
        });

        render(false);
    }

    // Submit a booking request, email is sent when new document is added
    async submitBooking(choices, date, time) {
        let newBooking = {
            contactInfo: choices.contactInfo,
            estimatedTime: choices.time,
            hairLength: choices.length,
            hairStrength: choices.strength,
            services: choices.services,
            desiredDate: date,
            desiredTime: time,
            submitTime: Date.now()
        }
        await addDoc(this.bookingsRef, newBooking);
        navigateTo('#/');
    }
  
    // Login user with email and password
    login() {
        const emailInput = document.querySelector('#login-user-email');
        const passInput = document.querySelector('#login-user-password');
        const errorContainer = document.querySelector('.login-error-message');
        if (emailInput.value != '' && passInput.value != '') {
            signInWithEmailAndPassword(this.auth, emailInput.value, passInput.value)
            .then((userCredential) => {
                // Signed in 
                this.userLoggedIn = true;
                this.user = userCredential.user;
            })
            .catch((error) => {
                // Display user-friendly errors for wrong password/unknown login credentials
                if (error.code == "auth/wrong-password") {
                    errorContainer.innerHTML = `Forkert kodeord. <a onclick="event.preventDefault(); resetPassword('${emailInput.value}')">Nulstil kodeord</a>.`;
                } else if (error.code == "auth/user-not-found") {
                    errorContainer.innerHTML = `Loginoplysninger ikke gyldige. Har du skrevet din e-mail korrekt?`;
                } else {
                    errorContainer.innerHTML = error.code
                }
            });
        } else {
            errorContainer.innerHTML = `Du skal udfylde begge felter.`;
        }
        
    }

    // Signout current user, reset current user data
    logout() {
        signOut(this.auth)
            .then(() => {
                this.unsubscribe();
                this.userLoggedIn = false;
                this.user = undefined;
                this.userData = undefined;
            }).catch((error) => {
                alert(error)
            });
    }

    // Send reset password e-mail
    resetPassword(email) {
        const errorContainer = document.querySelector('.login-error-message');
        sendPasswordResetEmail(this.auth, email)
            .then(() => {
                errorContainer.innerHTML = `E-mail med nulstilling af kodeord afsendt. Ikke modtaget den? <a onclick="event.preventDefault(); resetPassword('${email}')">Send igen</a>.`
            })
            .catch((error) => {
                errorContainer.innerHTML = error.code;
            });
    }
}
