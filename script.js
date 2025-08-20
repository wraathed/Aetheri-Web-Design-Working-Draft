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
                helpItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        }
    });


    // --- Pricing Toggle Functionality ---
    const billingToggle = document.querySelector('.billing-toggle');

    if (billingToggle) {
        const toggleOptions = billingToggle.querySelectorAll('.toggle-option');
        const priceCards = document.querySelectorAll('.pricing-card[data-plan]');
        const prices = {
            'waas': { monthly: 299, annual: 250 },
            'seo-growth': { monthly: 190, annual: 156 }
        };

        function updatePrices(isAnnual) {
            priceCards.forEach(card => {
                const planName = card.dataset.plan;
                if (!prices[planName]) return;
                const originalPriceEl = card.querySelector('.original-price');
                const currentPriceEl = card.querySelector('.current-price');
                const discountBadgeEl = card.querySelector('.discount-badge');
                const termEl = card.querySelector('.price-term');
                if (isAnnual) {
                    originalPriceEl.textContent = `$${prices[planName].monthly}`;
                    currentPriceEl.textContent = `$${prices[planName].annual}`;
                    originalPriceEl.style.display = 'inline';
                    discountBadgeEl.style.display = 'inline-block';
                    termEl.textContent = 'Per month, billed annually';
                } else {
                    currentPriceEl.textContent = `$${prices[planName].monthly}`;
                    originalPriceEl.style.display = 'none';
                    discountBadgeEl.style.display = 'none';
                    termEl.textContent = 'Per month';
                }
            });
        }

        toggleOptions.forEach(option => {
            option.addEventListener('click', () => {
                toggleOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                const isAnnual = option.textContent.includes('Annual');
                updatePrices(isAnnual);
            });
        });
    }

    // Navigation Active State 
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    const contactBtn = document.querySelector('.nav-right .contact-btn');
    const getBaseName = (url) => {
        if (typeof url !== 'string' || !url) return '';
        return url.substring(url.lastIndexOf('/') + 1).replace('.html', '');
    };
    const currentPageBase = getBaseName(currentPath);
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        const linkBase = getBaseName(linkHref);
        if ((currentPageBase === 'index' || currentPageBase === '') && (linkBase === 'index' || linkBase === '')) {
            link.classList.add('active-nav');
            return;
        }
        if (linkBase && currentPageBase.includes(linkBase)) {
            link.classList.add('active-nav');
        }
    });
    if (contactBtn) {
        const contactLinkBase = getBaseName(contactBtn.getAttribute('href'));
        if (contactLinkBase && currentPageBase.includes(contactLinkBase)) {
            contactBtn.classList.add('active-nav-btn');
        }
    }


    // BLOG PAGINATION & DYNAMIC POST LOADING
    const articlesGrid = document.getElementById('articles-grid');
    const paginationContainer = document.getElementById('pagination-container');

    if (articlesGrid && paginationContainer) {
        let currentPage = 1;
        const postsPerPage = 6;

        function displayPosts(page) {
            articlesGrid.innerHTML = '';
            page--;

            const start = postsPerPage * page;
            const end = start + postsPerPage;
            const paginatedPosts = postsData.slice(start, end);

            paginatedPosts.forEach(post => {
                const articleCard = document.createElement('div');
                articleCard.className = 'article-card';

                
                articleCard.innerHTML = `
                    <img src="${post.thumbnail}" alt="${post.title}">
                    <div class="article-content">
                        <span class="post-meta">${post.category}</span>
                        <h4>${post.title}</h4>
                        <p>${post.description}</p>
                        <!-- CHANGE IS HERE: Added index.html to the link -->
                        <a href="posts/${post.slug}/index.html">Learn More</a>
                    </div>
                `;
                articlesGrid.appendChild(articleCard);
            });
        }

        function setupPagination() {
            paginationContainer.innerHTML = '';
            const pageCount = Math.ceil(postsData.length / postsPerPage);

            // Previous Button
            const prevButton = document.createElement('span');
            prevButton.className = 'prev';
            prevButton.innerHTML = '&larr; Previous';
            if (currentPage === 1) {
                prevButton.classList.add('disabled');
            } else {
                prevButton.addEventListener('click', () => {
                    currentPage--;
                    displayPosts(currentPage);
                    setupPagination();
                });
            }
            paginationContainer.appendChild(prevButton);

            // Page Number Buttons
            for (let i = 1; i <= pageCount; i++) {
                const pageButton = document.createElement('a');
                pageButton.className = 'page-num';
                pageButton.innerText = i;
                if (i === currentPage) {
                    pageButton.classList.add('active');
                }
                pageButton.addEventListener('click', () => {
                    currentPage = i;
                    displayPosts(currentPage);
                    setupPagination();
                });
                paginationContainer.appendChild(pageButton);
            }

            // next button
            const nextButton = document.createElement('a');
            nextButton.className = 'next';
            nextButton.innerHTML = 'Next &rarr;';
            if (currentPage === pageCount) {
                nextButton.classList.add('disabled');
            } else {
                nextButton.addEventListener('click', () => {
                    currentPage++;
                    displayPosts(currentPage);
                    setupPagination();
                });
            }
            paginationContainer.appendChild(nextButton);
        }

        // initial load
        displayPosts(currentPage);
        setupPagination();
    }
});