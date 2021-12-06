// Casper, Mads, Marko & Natascha
// Import
import FireBaseApp from './firebase/app.js';
import Router from './router/router.js';

// Initialise firebase app and router
const root = document.getElementById('root');
export const app = new FireBaseApp();
const router = new Router(root, app);


