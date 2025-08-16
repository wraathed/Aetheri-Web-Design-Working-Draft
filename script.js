// --- Mobile Navigation (Hamburger Menu) ---
const hamburger = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-right');

hamburger.addEventListener('click', () => {
    // Toggles the 'nav-active' class on the nav-right container
    navLinks.classList.toggle('nav-active');
    // Toggles the 'toggle' class on the hamburger for animation
    hamburger.classList.toggle('toggle');
});


// --- Accordion for "How Can We Help?" Section ---
// This part of the script makes your accordion on the homepage work.
document.addEventListener('DOMContentLoaded', function () {
    const helpItems = document.querySelectorAll('.help-item');

    helpItems.forEach(item => {
        const header = item.querySelector('.help-header');
        header.addEventListener('click', () => {
            // Close any other open items
            helpItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle the current item
            item.classList.toggle('active');
        });
    });
});