// --- Mobile Navigation (Hamburger Menu) ---
const hamburger = document.querySelector('.hamburger-menu');
const navRight = document.querySelector('.nav-right');

hamburger.addEventListener('click', () => {
    navRight.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
});


document.addEventListener('DOMContentLoaded', function () {
    // --- Accordion for "How Can We Help?" Section ---
    const helpItems = document.querySelectorAll('.help-item');

    helpItems.forEach(item => {
        const header = item.querySelector('.help-header');
        if (header) {
            header.addEventListener('click', () => {
                // Close other items
                helpItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                // Toggle the clicked item
                item.classList.toggle('active');
            });
        }
    });


    // --- START: UPDATED Pricing Toggle Functionality ---
    const billingToggle = document.querySelector('.billing-toggle');

    if (billingToggle) {
        const toggleOptions = billingToggle.querySelectorAll('.toggle-option');
        const priceCards = document.querySelectorAll('.pricing-card[data-plan]');
        
        // Price data for easy management. Add new plans here.
        const prices = {
            'waas': { monthly: 299, annual: 250 },
            'seo-growth': { monthly: 190, annual: 156 }
        };

        // This function handles all visual updates to the price cards
        function updatePrices(isAnnual) {
            priceCards.forEach(card => {
                const planName = card.dataset.plan;
                if (!prices[planName]) return; // Skip if plan is not in our price data

                // Select all the elements we need to change within the current card
                const originalPriceEl = card.querySelector('.original-price');
                const currentPriceEl = card.querySelector('.current-price');
                const discountBadgeEl = card.querySelector('.discount-badge');
                const termEl = card.querySelector('.price-term');

                if (isAnnual) {
                    // --- ANNUAL VIEW ---
                    // Set text content for the prices
                    originalPriceEl.textContent = `$${prices[planName].monthly}`;
                    currentPriceEl.textContent = `$${prices[planName].annual}`;
                    
                    // Change CSS display property to show the elements
                    originalPriceEl.style.display = 'inline';
                    discountBadgeEl.style.display = 'inline-block';
                    
                    // Update the billing term text
                    termEl.textContent = 'Per month, billed annually';

                } else {
                    // --- MONTHLY VIEW ---
                    // Set text content for the current price
                    currentPriceEl.textContent = `$${prices[planName].monthly}`;

                    // Change CSS display property to hide the extra elements
                    originalPriceEl.style.display = 'none';
                    discountBadgeEl.style.display = 'none';
                    
                    // Update the billing term text
                    termEl.textContent = 'Per month';
                }
            });
        }

        // Add click event listeners to the toggle buttons
        toggleOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Update the 'active' class on the toggle itself
                toggleOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');

                // Check which option is selected
                const isAnnual = option.textContent.includes('Annual');
                
                // Call the main function to update all prices based on the selection
                updatePrices(isAnnual);
            });
        });
    }

    // --- NEW: Navigation Active State ---
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    const contactBtn = document.querySelector('.nav-right .contact-btn');

    // Function to get the base name from a URL (e.g., 'services' from '/services.html')
    const getBaseName = (url) => {
        if (typeof url !== 'string' || !url) return '';
        // Get the last part of the path and remove .html
        return url.substring(url.lastIndexOf('/') + 1).replace('.html', '');
    };
    
    const currentPageBase = getBaseName(currentPath);

    // Handle the main navigation links
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        const linkBase = getBaseName(linkHref);

        // Special case for homepage (index.html or root '/')
        if ((currentPageBase === 'index' || currentPageBase === '') && (linkBase === 'index' || linkBase === '')) {
            link.classList.add('active-nav');
            return; // Stop this iteration
        }
        
        // For other pages, check if the current page's base name includes the link's base name
        // This makes 'service-detail' active for the 'services' link
        if (linkBase && currentPageBase.includes(linkBase)) {
            link.classList.add('active-nav');
        }
    });

    // Handle the contact button separately because it has a different active class
    if (contactBtn) {
        const contactLinkBase = getBaseName(contactBtn.getAttribute('href'));
        if (contactLinkBase && currentPageBase.includes(contactLinkBase)) {
            contactBtn.classList.add('active-nav-btn');
        }
    }
});