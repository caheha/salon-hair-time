// Casper, Mads, Marko & Natascha
// Import routes and views for error page and not authenticated page
import { routes } from './routes.js';
import ErrorPage from '../views/ErrorPage.js';
import NotAuthenticated from '../views/NotAuthenticated.js';

export default class Router {
    constructor(root, app) {
        this.root = root;
        this.app = app;
        this.routes = routes;
        // Setup event listeners
        window.onload = () => this.render();
        window.onpopstate = () => this.render();
        window.render = (resetScroll) => this.render(resetScroll);
        window.navigateTo = (path) => this.navigateTo(path);
        location.hash = '#/';
    }

    // Single Page Application navigation
    navigateTo(path) {
        window.history.pushState({}, path, path);
        this.render();
    }

    // Renders view for current path, show error page if route does not exist
    render(resetScroll = true) {
        const route = this.routes.find(route => route.path === location.hash);

        if (route === undefined) {
            this.root.innerHTML = ErrorPage();
        } else {
            if (!this.app.userLoggedIn && route.auth) {
                this.root.innerHTML = NotAuthenticated();
            } else {
                document.title = route.title;
                this.root.innerHTML = route.view();
            }
        }

        // only resetScroll if changing page
        if (resetScroll) {
            window.scrollTo(0, 0);
        }
    }
}