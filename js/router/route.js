// Casper, Mads, Marko & Natascha
// Create internal link for navigating SPA
export default function Route(route, content, frontPage) {
    // Get title from route, remove '#/'
    let title = route.charAt(2).toUpperCase() + route.slice(3);

    let onclick = ``;

    // if the route is on the frontpage, create onclick event
    if (frontPage) {
        // Since opening hours is in the footer, it is on all pages - don't change page
        if (route == '#/åbningstider') {
            onclick = `
                event.preventDefault();
                document.querySelector('#${title.toLowerCase()}').scrollIntoView({ behavior: 'smooth'});
                document.querySelector('#nav-button').classList.remove('btn-active');
                document.querySelector('#nav-links').classList.remove('nav-active');
            `;
        } else {
            onclick = "event.preventDefault();";
            onclick += location.hash == "#/" ? "" : "navigateTo('#/');" 
            onclick += `
                document.querySelector('#${title.toLowerCase()}').scrollIntoView({ behavior: 'smooth'});
                document.querySelector('#nav-button').classList.remove('btn-active');
                document.querySelector('#nav-links').classList.remove('nav-active');
            `;
        }
    }

    // HTML element for route
    return /*html*/`
        <a href="${route}" onclick="${onclick}" title="${title}">${content}</a>
    `;
}