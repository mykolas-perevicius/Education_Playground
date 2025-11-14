/**
 * TOC Enhancement - Ensures proper positioning and behavior
 * Fixes Jupyter Book TOC positioning issues dynamically
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Wait a bit for Jupyter Book to finish its initialization
    setTimeout(function() {
        // Find all possible TOC containers
        const tocSelectors = [
            '.sidebar-secondary-item',
            '.bd-sidebar-secondary',
            '.page-toc',
            '#pst-page-toc',
            'div.tocsection'
        ];

        let tocElement = null;
        for (const selector of tocSelectors) {
            const element = document.querySelector(selector);
            if (element && element.querySelector('.bd-toc-nav, nav.bd-toc-nav, ul.nav')) {
                tocElement = element;
                break;
            }
        }

        if (!tocElement) {
            console.log('TOC element not found, skipping enhancement');
            return;
        }

        // Force positioning with JavaScript as a backup
        const fixTocPosition = () => {
            tocElement.style.cssText = `
                position: fixed !important;
                right: 20px !important;
                top: 80px !important;
                width: 260px !important;
                max-height: calc(100vh - 100px) !important;
                overflow-y: auto !important;
                z-index: 50 !important;
                background: rgba(15, 23, 42, 0.95) !important;
                backdrop-filter: blur(10px) !important;
                border-radius: 8px !important;
                padding: 1rem !important;
                box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.3) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                left: auto !important;
            `;

            // Adjust main content margin
            const mainContent = document.querySelector('.bd-main, .bd-article-container');
            if (mainContent) {
                mainContent.style.marginRight = '300px';
            }
        };

        fixTocPosition();

        // Highlight active TOC item based on scroll position
        const setupScrollSpy = () => {
            const headings = document.querySelectorAll('.bd-article h2[id], .bd-article h3[id]');
            const tocLinks = document.querySelectorAll('.bd-toc-nav a[href^="#"]');

            if (headings.length === 0 || tocLinks.length === 0) return;

            const highlightActive = () => {
                const scrollPosition = window.scrollY + 100;

                let activeHeading = null;
                headings.forEach(heading => {
                    if (heading.offsetTop <= scrollPosition) {
                        activeHeading = heading;
                    }
                });

                tocLinks.forEach(link => {
                    link.classList.remove('active');
                    link.style.color = '#94a3b8';
                    link.style.background = 'transparent';
                });

                if (activeHeading) {
                    const activeId = activeHeading.getAttribute('id');
                    const activeLink = document.querySelector(`.bd-toc-nav a[href="#${activeId}"]`);

                    if (activeLink) {
                        activeLink.classList.add('active');
                        activeLink.style.cssText = `
                            color: #60a5fa !important;
                            background: rgba(96, 165, 250, 0.1) !important;
                            border-left: 2px solid #60a5fa !important;
                        `;
                    }
                }
            };

            // Throttle scroll events
            let scrollTimer = null;
            window.addEventListener('scroll', () => {
                if (scrollTimer !== null) {
                    clearTimeout(scrollTimer);
                }
                scrollTimer = setTimeout(highlightActive, 50);
            });

            // Initial highlight
            highlightActive();
        };

        setupScrollSpy();

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const viewportWidth = window.innerWidth;

                if (viewportWidth <= 1400) {
                    tocElement.style.display = 'none';
                    const mainContent = document.querySelector('.bd-main, .bd-article-container');
                    if (mainContent) {
                        mainContent.style.marginRight = '2rem';
                    }
                } else {
                    tocElement.style.display = 'block';
                    fixTocPosition();
                }
            }, 250);
        });

        // Check initial viewport
        if (window.innerWidth <= 1400) {
            tocElement.style.display = 'none';
        }

        console.log('TOC enhancement applied successfully');
    }, 500);
});