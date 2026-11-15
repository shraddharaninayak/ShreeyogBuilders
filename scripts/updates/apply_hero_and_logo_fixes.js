const fs = require('fs');
const path = require('path');

console.log('--- Applying Comprehensive Hero Position, Preloader, and Logo Size Fixes ---');

// ==============================================================================
// 1. UPDATE public/_nuxt/shreeyog-navbar.css
// ==============================================================================
const navbarCssPath = 'public/_nuxt/shreeyog-navbar.css';
let navbarCss = fs.readFileSync(navbarCssPath, 'utf-8');

// Replace logo size
const oldLogoCss = /\.shreeyog-brand-logo\s*\{[\s\S]*?height:\s*clamp\(34px,\s*3\.8vw,\s*42px\)[^}]*\}/;
const newLogoCss = `.shreeyog-brand-logo {
  height: clamp(48px, 4.8vw, 60px) !important;
  width: auto !important;
  max-width: 240px !important;
  object-fit: contain !important;
  display: block !important;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.45));
  transition: transform 0.3s ease, filter 0.3s ease !important;
}`;

if (oldLogoCss.test(navbarCss)) {
  navbarCss = navbarCss.replace(oldLogoCss, newLogoCss);
  console.log('Updated logo size in shreeyog-navbar.css (main)');
} else {
  console.log('Could not match exact old logo regex in shreeyog-navbar.css, searching alternative');
  navbarCss = navbarCss.replace(/height:\s*clamp\(34px,\s*3\.8vw,\s*42px\)\s*!important;/, 'height: clamp(48px, 4.8vw, 60px) !important;');
}

// Also update mobile logo height in media query
navbarCss = navbarCss.replace(/\.shreeyog-brand-logo\s*\{\s*height:\s*34px\s*!important;\s*\}/g, '.shreeyog-brand-logo {\n    height: 38px !important;\n  }');

fs.writeFileSync(navbarCssPath, navbarCss, 'utf-8');
console.log('Saved shreeyog-navbar.css');


// ==============================================================================
// 2. UPDATE public/_nuxt/shreeyog-navbar.js
// ==============================================================================
const navbarJsPath = 'public/_nuxt/shreeyog-navbar.js';
let navbarJs = fs.readFileSync(navbarJsPath, 'utf-8');

// Add the Hero Scroll & Progress Controller and Preloader dismissal
const heroControllerCode = `
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
`;

// Inject into onScrollUpdate in shreeyog-navbar.js
if (!navbarJs.includes('updateHeroScrollState')) {
  navbarJs = navbarJs.replace(
    'lastScrollY = currentScrollY;',
    `updateHeroScrollState(currentScrollY);\n      lastScrollY = currentScrollY;`
  );
  navbarJs = navbarJs.replace(
    'header.classList.remove(\'-scrolled-down\');',
    `header.classList.remove('-scrolled-down');\n        updateHeroScrollState(0);`
  );
  // Add function definition before window.addEventListener
  navbarJs = navbarJs.replace(
    'window.addEventListener(\'scroll\', onScroll, { passive: true });',
    `${heroControllerCode}\n    window.addEventListener('scroll', onScroll, { passive: true });`
  );
  fs.writeFileSync(navbarJsPath, navbarJs, 'utf-8');
  console.log('Injected Hero Scroll State Controller into shreeyog-navbar.js');
}


// ==============================================================================
// 3. UPDATE public/index.html
// ==============================================================================
const indexHtmlPath = 'public/index.html';
let html = fs.readFileSync(indexHtmlPath, 'utf-8');

// Update shreeyog-hero-custom logo styles
const oldHeroLogoRegex = /\.shreeyog-brand-logo\s*\{[\s\S]*?height:\s*78px;[\s\S]*?\}/;
if (oldHeroLogoRegex.test(html)) {
  html = html.replace(oldHeroLogoRegex, `.shreeyog-brand-logo {
  height: clamp(48px, 4.8vw, 60px) !important;
  width: auto !important;
  max-width: 240px !important;
  object-fit: contain !important;
  display: block !important;
  margin-top: -2px;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.45));
  transition: transform 0.3s ease, filter 0.3s ease !important;
}`);
  console.log('Updated logo size in public/index.html shreeyog-hero-custom');
}

// Add preloader dismissal rule in shreeyog-loader-inline-css
const preloaderHideRule = `
/* Ensure page-transition never reappears after initial loading finishes */
html.-ready .page-transition:not(.-t-transition-enter-active):not(.-t-transition-leave-active),
html.-ready .page-transition.-t-transition-leave-to,
html.-preloader-done .page-transition {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}
`;

if (!html.includes('html.-preloader-done .page-transition')) {
  html = html.replace('/* 8. Exit / Leave Animation', `${preloaderHideRule}\n/* 8. Exit / Leave Animation`);
  console.log('Injected preloader dismissal rule into public/index.html');
}

// In headline styling, ensure line-2 and line-3 maintain clean transition without accumulating transforms
const heroResetCSS = `
/* Hero Position Reset & Stability Guarantee */
.c-welcome .-w span.line-1[data-v-6c6a6d99] {
  transform: none !important;
}
.c-welcome .-w span.line-2[data-v-6c6a6d99] {
  transform: translate3d(0, calc(var(--progress, 0) * var(--vh, 1vh) * 10), 0) !important;
}
.c-welcome .-w span.line-3[data-v-6c6a6d99] {
  transform: translate3d(0, calc(var(--progress, 0) * var(--vh, 1vh) * 20), 0) !important;
}
.c-welcome .-w .stone[data-v-6c6a6d99] {
  transform: translate3d(0, calc(var(--vh, 1vh) * -2), 0) scale(calc(1 - var(--progress, 0) * 0.5)) !important;
}
.c-welcome .-w .items[data-v-6c6a6d99],
.c-welcome .-w .places[data-v-6c6a6d99] {
  translate: 0 calc(var(--vh, 1vh) * 20 + var(--progress, 0) * 10 * var(--vh, 1vh)) !important;
}
`;

if (!html.includes('Hero Position Reset & Stability Guarantee')) {
  html = html.replace('</style>\n<style id="shreeyog-loader-inline-css">', `${heroResetCSS}\n</style>\n<style id="shreeyog-loader-inline-css">`);
  console.log('Injected Hero Position Reset CSS into public/index.html');
}

fs.writeFileSync(indexHtmlPath, html, 'utf-8');
console.log('Saved public/index.html');


// ==============================================================================
// 4. SYNC ACROSS OTHER STYLESHEETS
// ==============================================================================
const otherCssFiles = [
  'public/_nuxt/default.dc95e376.css',
  'public/_nuxt/shreeyog-projects.css',
  'public/_nuxt/shreeyog-contact.css'
];

otherCssFiles.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf-8');
    content = content.replace(/height:\s*clamp\(34px,\s*3\.8vw,\s*42px\)\s*!important;/, 'height: clamp(48px, 4.8vw, 60px) !important;');
    content = content.replace(/\.shreeyog-brand-logo\s*\{\s*height:\s*34px\s*!important;\s*\}/g, '.shreeyog-brand-logo {\n    height: 38px !important;\n  }');
    fs.writeFileSync(f, content, 'utf-8');
    console.log(`Updated logo size in ${f}`);
  }
});

console.log('--- All Updates Applied Successfully ---');
