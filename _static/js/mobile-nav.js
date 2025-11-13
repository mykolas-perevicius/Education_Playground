/**
 * Mobile Navigation Enhancement
 * Adds hamburger menu and touch-friendly navigation for mobile devices
 */

document.addEventListener('DOMContentLoaded', function() {
    // Only run on mobile/tablet devices
    if (window.innerWidth > 1024) return;

    // Create mobile menu toggle button
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    menuToggle.setAttribute('aria-expanded', 'false');

    // Insert toggle button into page
    const body = document.body;
    body.appendChild(menuToggle);

    // Get sidebar element
    const sidebar = document.querySelector('.bd-sidebar-primary');

    if (!sidebar) return;

    // Create overlay for mobile menu
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9998;
        display: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    body.appendChild(overlay);

    // Toggle menu function
    function toggleMenu() {
        const isOpen = sidebar.classList.contains('active');

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Open menu function
    function openMenu() {
        sidebar.classList.add('active');
        menuToggle.innerHTML = '✕';
        menuToggle.setAttribute('aria-expanded', 'true');
        overlay.style.display = 'block';
        // Force reflow
        overlay.offsetHeight;
        overlay.style.opacity = '1';

        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
    }

    // Close menu function
    function closeMenu() {
        sidebar.classList.remove('active');
        menuToggle.innerHTML = '☰';
        menuToggle.setAttribute('aria-expanded', 'false');
        overlay.style.opacity = '0';

        // Re-enable body scroll
        document.body.style.overflow = '';

        // Hide overlay after transition
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    }

    // Event listeners
    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    // Close menu when clicking on a link (for better UX)
    sidebar.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            // Small delay to allow navigation to start
            setTimeout(closeMenu, 100);
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeMenu();
        }
    });

    // Handle resize events
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 1024) {
                closeMenu();
                menuToggle.style.display = 'none';
            } else {
                menuToggle.style.display = 'block';
            }
        }, 250);
    });
});