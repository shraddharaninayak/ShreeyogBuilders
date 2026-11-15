/**
 * Shreeyog Universal Navbar Scroll & Interaction Controller
 * Manages transparent-to-black navbar transitions and menu functionality across all pages
 */
(function() {
  'use strict';

  function initNavbar() {
    var header = document.querySelector('header');
    if (!header) return;

    var lastScrollY = window.scrollY || window.pageYOffset || 0;
    var ticking = false;

    function onScrollUpdate() {
      var currentScrollY = window.scrollY || window.pageYOffset || 0;
      var diff = currentScrollY - lastScrollY;

      if (currentScrollY <= 30) {
        // At the very top: transparent / warm brown gradient
        header.classList.add('-at-top');
        header.classList.remove('-scrolled-up');
        header.classList.remove('-scrolled-down');
      } else if (diff < -2) {
        // Scrolling UP: Turn solid black with crisp high contrast
        header.classList.remove('-at-top');
        header.classList.remove('-scrolled-down');
        header.classList.add('-scrolled-up');
      } else if (diff > 2) {
        // Scrolling DOWN: Preserve intended transparent appearance
        header.classList.remove('-at-top');
        header.classList.remove('-scrolled-up');
        header.classList.add('-scrolled-down');
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(onScrollUpdate);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScrollUpdate(); // Initial run

    // Re-check after page animations stabilize
    setTimeout(onScrollUpdate, 500);
    setTimeout(onScrollUpdate, 1500);
    setTimeout(onScrollUpdate, 3000);

    // Menu Drawer Support for Static & Nuxt Pages
    var openBtn = document.getElementById('menuToggleBtn') || header.querySelector('.menu.button') || header.querySelector('button.menu');
    var overlay = document.getElementById('projects-menu-overlay');
    var closeBtn = document.getElementById('projects-menu-close-btn');
    var crossBtn = document.getElementById('projects-menu-cross-btn');
    var backdrop = document.getElementById('projects-menu-backdrop');

    if (openBtn && overlay) {
      function openMenu(e) {
        if (e) e.stopPropagation();
        overlay.style.display = 'block';
        document.documentElement.classList.add('-isolate');
        header.classList.add('-hidden');
      }

      function closeMenu(e) {
        if (e) e.stopPropagation();
        overlay.style.display = 'none';
        document.documentElement.classList.remove('-isolate');
        header.classList.remove('-hidden');
      }

      openBtn.addEventListener('click', openMenu);
      if (closeBtn) closeBtn.addEventListener('click', closeMenu);
      if (crossBtn) crossBtn.addEventListener('click', closeMenu);
      if (backdrop) backdrop.addEventListener('click', closeMenu);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
  } else {
    initNavbar();
  }
})();
