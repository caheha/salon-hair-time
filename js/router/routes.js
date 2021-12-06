// Casper, Mads, Marko & Natascha
// Import Views
import Home from '../views/Home.js';
import Products from '../views/Products.js';
import Profile from '../views/Profile.js';
import CreateNewUser from '../views/CreateNewUser.js';
import Book from '../views/Book.js';
import AddFamilyMember from '../views/AddFamilyMember.js';

// Base page title
const pageTitle = "Salon Hair Time - ";

// Routes, auth = true requires the user to be logged in to view the page
export const routes = [
    {
        path: '#/',
        view: Home,
        title: pageTitle + "Forside",
        auth: false
    },
    {
        path: '#/produkter',
        view: Products,
        title: pageTitle + "Produkter",
        auth: false
    },
    {
        path: '#/login',
        view: Profile,
        title: pageTitle + "Login",
        auth: false
    },
    {
        path: '#/opret-bruger',
        view: CreateNewUser,
        title: pageTitle + "Opret bruger",
        auth: false
    },
    {
        path: '#/book-tid',
        view: Book,
        title: pageTitle + "Book tid",
        auth: true
    },
    {
        path: '#/profil',
        view: Profile,
        title: pageTitle + "Min profil",
        auth: true
    },
    {
        path: '#/tilfoej-familiemedlem',
        view: AddFamilyMember,
        title: pageTitle + "Tilføj familiemedlem",
        auth: true
    }
];