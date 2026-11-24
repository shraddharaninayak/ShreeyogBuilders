/**
 * Shreeyog Universal Navbar Scroll & Interaction Controller
 * Manages transparent-to-black navbar transitions and menu functionality across all pages
 */
(function() {
  'use strict';

  // -------------------------------------------------------------
  // Instant Ready State & Clean Native Navigation Controller
  // Guarantees immediate page rendering and prevents SPA router hijacking
  // -------------------------------------------------------------
  try {
    document.documentElement.classList.add('-loaded', '-ready');
    document.documentElement.style.overflowY = 'auto';
    if (document.body) document.body.style.overflowY = 'auto';
  } catch (e) {}

  document.addEventListener('click', function(e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('tel:') || href.startsWith('mailto:')) return;
    if (a.target && a.target !== '_self') return;

    try {
      var targetUrl = new URL(href, window.location.origin);
      if (targetUrl.origin === window.location.origin) {
        if (targetUrl.pathname !== window.location.pathname || targetUrl.search !== window.location.search) {
          e.stopImmediatePropagation();
          e.preventDefault();
          window.location.href = targetUrl.href;
        }
      }
    } catch (err) {}
  }, true);

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
        updateHeroScrollState(0);
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

      updateHeroScrollState(currentScrollY);
      lastScrollY = currentScrollY;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(onScrollUpdate);
        ticking = true;
      }
    }

    
    // -------------------------------------------------------------
    // Shreeyog Homepage Hero Scroll Position & State Controller
    // Guarantees 100% accurate position return and prevents dislocation
    // -------------------------------------------------------------
    var welcomeSection = document.querySelector('.c-welcome');
    function updateHeroScrollState(currentScrollY) {
      if (!welcomeSection) return;

      var heroHeight = welcomeSection.offsetHeight || 1101;
      var rawP = currentScrollY <= 26 ? 0 : (currentScrollY - 26) / heroHeight;
      var p = Math.min(1, Math.max(0, rawP));

      // At or near top (<= 35px), strictly lock progress to exactly 0
      if (currentScrollY <= 35) {
        p = 0;
      }

      // Synchronize StringTune engine if available
      try {
        var nuxtApp = window.useNuxtApp ? window.useNuxtApp() : null;
        var st = nuxtApp ? nuxtApp.$stringTune : null;
        if (st && st.objectManager) {
          var w = st.objectManager.objects.get('welcome');
          if (w && (currentScrollY <= 35 || Math.abs((w.progress || 0) - p) > 0.001)) {
            w.progress = p;
            w.progressRaw = p;
            w.setProperty('progress-applied', p);
            if (w.mirrorObjects) {
              for (var mi = 0; mi < w.mirrorObjects.length; mi++) {
                var mo = w.mirrorObjects[mi];
                mo.setProperty('progress', p);
                if (mo.htmlElement) {
                  mo.htmlElement.style.setProperty('--progress', p.toString());
                }
              }
            }
          }
        }
      } catch (err) {}

      // Directly ensure hero DOM elements have exact --progress
      welcomeSection.style.setProperty('--progress', p.toString());
      var mirrors = welcomeSection.querySelectorAll('[string-copy-from="welcome"], .stone, span.line-2, span.line-3, .cta, .places, .items');
      for (var j = 0; j < mirrors.length; j++) {
        mirrors[j].style.setProperty('--progress', p.toString());
      }
    }

    // Dismiss preloader completely after initial page transition finishes
    var pageTrans = document.querySelector('.page-transition');
    if (pageTrans) {
      setTimeout(function() {
        pageTrans.style.setProperty('display', 'none', 'important');
        pageTrans.style.setProperty('pointer-events', 'none', 'important');
      }, 1500);
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
