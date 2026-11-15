const fs = require('fs');
const path = require('path');

console.log('=== RESTORING SHREEYOG NAVBAR MENU BUTTON & FUNCTIONALITY ===');

const menuButtonCss = `
/* ==========================================================================
   SHREEYOG NAVBAR - RESTORED MENU BUTTON & FULL-SCREEN OVERLAY
   ========================================================================== */

/* Menu Wrapper in Header Navbar */
header .-w .menu-wrap[data-v-81ce8483],
header .-w .menu-wrap,
header .-w .menu {
  --left: 11 !important;
  --width: 2 !important;
  grid-column: 11 / span 2 !important;
  align-self: center !important;
  justify-self: end !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  pointer-events: all !important;
  width: auto !important;
}

header .-w .menu-wrap:before,
header .-w .menu-wrap[data-v-81ce8483]:before {
  display: none !important;
}

/* The Menu Pill Button */
header .-w .menu-wrap .menu.button,
header .-w .menu.button,
header .-w button.menu,
button.menu.button[data-v-f52f19c3] {
  display: inline-flex !important;
  flex-direction: row-reverse !important; /* Positions .menu-icon on left, .text on right */
  align-items: center !important;
  justify-content: center !important;
  gap: 0.65rem !important; /* Clean 10.5px separation between icon and text */
  padding: 0.45rem 1.15rem 0.45rem 0.95rem !important;
  height: 36px !important;
  min-width: 105px !important;
  width: auto !important;
  border-radius: 0.4rem !important;
  background-color: var(--c-yellow, #f1eade) !important;
  border: 1px solid rgba(var(--c-yellow-rgb, 241, 234, 222), 0.6) !important;
  cursor: pointer !important;
  position: relative !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
  transform: translateZ(0) !important;
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease !important;
  flex-grow: 0 !important;
  flex-shrink: 0 !important;
}

/* Active / Scrolled States: Maintain full shape, never collapse or merge */
header.-scrolled .-w .menu-wrap .menu.button,
header.-scrolled .-w .menu.button {
  flex-grow: 0 !important;
  width: auto !important;
  min-width: 105px !important;
}

/* Hamburger Icon: Two distinct parallel horizontal lines */
header .-w .menu-wrap .menu.button .menu-icon,
header .-w .menu.button .menu-icon,
.menu-icon[data-v-81ce8483],
.menu-icon {
  position: static !important; /* Non-absolute to prevent any collision */
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  gap: 5px !important; /* 5px vertical spacing between top and bottom bar */
  width: 22px !important;
  height: 12px !important;
  margin: 0 !important;
  padding: 0 !important;
  translate: 0 0 !important;
  background: none !important;
  flex-shrink: 0 !important;
  pointer-events: none !important;
}

/* Hamburger Horizontal Line Bars */
header .-w .menu-wrap .menu.button .menu-icon:before,
header .-w .menu-wrap .menu.button .menu-icon:after,
.menu-icon[data-v-81ce8483]:before,
.menu-icon[data-v-81ce8483]:after,
.menu-icon:before,
.menu-icon:after {
  content: "" !important;
  display: block !important;
  width: 100% !important;
  height: 1.5px !important;
  background-color: #151415 !important;
  border-radius: 1px !important;
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.3s ease, width 0.3s ease !important;
  position: static !important;
  background-image: none !important;
}

/* Menu Text Label */
header .-w .menu-wrap .menu.button .text,
header .-w .menu.button .text,
.menu.button .text[data-v-f52f19c3] {
  display: inline-block !important;
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
  font-size: 0.76rem !important;
  letter-spacing: 0.16em !important;
  text-transform: uppercase !important;
  color: #151415 !important;
  font-weight: 600 !important;
  margin: 0 !important;
  padding: 0 !important;
  line-height: 1 !important;
  opacity: 1 !important;
  visibility: visible !important;
  translate: 0 0 !important;
  white-space: nowrap !important;
}

/* Hover Interactions & Animations */
header .-w .menu-wrap .menu.button:hover,
header .-w .menu.button:hover {
  background-color: #ffffff !important;
  border-color: #ffffff !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18) !important;
  transform: translateY(-1px) !important;
}

header .-w .menu-wrap .menu.button:hover .menu-icon:before {
  transform: translateX(3px) !important;
}

header .-w .menu-wrap .menu.button:hover .menu-icon:after {
  transform: translateX(-3px) !important;
}

header .-w .menu-wrap .menu.button:active,
header .-w .menu.button:active {
  transform: translateY(0) !important;
}

/* Mobile Breakpoint (< 1024px) */
@media (max-width: 1023px) {
  header .-w .menu-wrap[data-v-81ce8483],
  header .-w .menu-wrap {
    --left: 5 !important;
    grid-column: auto !important;
    justify-self: end !important;
  }
  header .-w .menu-wrap .menu.button,
  header .-w .menu.button {
    min-width: 95px !important;
    height: 34px !important;
    padding: 0.4rem 0.85rem !important;
    gap: 0.5rem !important;
  }
  header .-w .menu-wrap .menu.button .menu-icon,
  header .-w .menu.button .menu-icon {
    width: 18px !important;
  }
}

/* Full-Screen Menu Overlay & Smooth Transitions */
.full-screen-menu {
  z-index: 200 !important;
  pointer-events: all !important;
}

.full-screen-menu .oy .-w {
  pointer-events: all !important;
}

.full-screen-menu .close,
.full-screen-menu .oy .-w .close {
  cursor: pointer !important;
  pointer-events: all !important;
  z-index: 250 !important;
  opacity: 1 !important;
}

.full-screen-menu .button-close {
  cursor: pointer !important;
  pointer-events: all !important;
  z-index: 250 !important;
}

/* When Menu Overlay is Open: Header smoothly hides so close button has full priority */
header.-hidden,
html.-isolate header {
  opacity: 0 !important;
  pointer-events: none !important;
  visibility: hidden !important;
  transform: translate3d(0, -100%, 0) !important;
  transition: opacity 0.45s ease, transform 0.45s ease !important;
}
`;

// =========================================================================
// 1. UPDATE CSS FILES
// =========================================================================
['public/_nuxt/default.dc95e376.css', 'public/_nuxt/shreeyog-projects.css', 'public/_nuxt/shreeyog-contact.css'].forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    const marker = '/* ==========================================================================\n   SHREEYOG NAVBAR - RESTORED MENU BUTTON & FULL-SCREEN OVERLAY';
    if (content.includes(marker)) {
      const parts = content.split(marker);
      content = parts[0] + menuButtonCss;
    } else {
      content += '\n' + menuButtonCss;
    }
    fs.writeFileSync(file, content, 'utf8');
    console.log('✓ Updated CSS file: ' + file);
  }
});


// =========================================================================
// 2. UPDATE build_projects_pages.js TO USE STANDARD MENU BUTTON & OVERLAY
// =========================================================================
const buildScriptPath = 'scripts/updates/build_projects_pages.js';
if (fs.existsSync(buildScriptPath)) {
  let build = fs.readFileSync(buildScriptPath, 'utf8');

  // Replace header menu button with standard menu-wrap button
  const oldMenuDiv = /<div class="menu" data-v-81ce8483>[\s\S]*?<\/div>/;
  const newMenuDiv = `<div class="menu-wrap" data-v-81ce8483><button aria-label="Open Navigation Menu" title="Menu" class="menu button -p -m-m" id="menuToggleBtn" data-v-f52f19c3><span class="text -mm -up" string="split" string-split="char[center]" data-v-f52f19c3>Menu</span><span class="menu-icon" data-v-81ce8483 data-v-f52f19c3-s></span></button></div>`;
  if (oldMenuDiv.test(build)) {
    build = build.replace(oldMenuDiv, newMenuDiv);
    console.log('✓ Updated header menu markup in build_projects_pages.js');
  }

  // Ensure projects pages have full-screen menu drawer & toggle logic
  if (!build.includes('id="projects-menu-overlay"')) {
    const overlayHtml = `
  <!-- Full-Screen Navigation Overlay -->
  <div id="projects-menu-overlay" class="full-screen-menu" style="display:none; position:fixed; inset:0; z-index:200;">
    <span class="overlay" id="projects-menu-backdrop"></span>
    <div class="oy">
      <div class="-w">
        <button class="button-close" id="projects-menu-close-btn"><span class="-h2 -m-h4">Close</span></button>
        <span class="close" id="projects-menu-cross-btn"></span>
        <div class="underlay"><div></div></div>
        <nav>
          <div class="guy">
            <figure class="-fit"><img src="/images/guys/g-1.webp" alt="Shreeyog Builders &amp; Land Developers"></figure>
            <span class="-h5 -m-hp">Navigation</span>
          </div>
          <a href="/" class="-h0 -mid-h1 -m-h2 -nl back-home">Home</a>
          <a href="/about" class="-h0 -mid-h1 -m-h2 -nl about">About</a>
          <a href="/projects" class="-h0 -mid-h1 -m-h2 -nl places">Projects</a>
          <a href="/contact" class="-h0 -mid-h1 -m-h2 -nl people">Contact</a>
        </nav>
      </div>
    </div>
  </div>

  <script>
    (function() {
      function initProjectsMenu() {
        var openBtn = document.getElementById('menuToggleBtn');
        var overlay = document.getElementById('projects-menu-overlay');
        var closeBtn = document.getElementById('projects-menu-close-btn');
        var crossBtn = document.getElementById('projects-menu-cross-btn');
        var backdrop = document.getElementById('projects-menu-backdrop');
        var header = document.querySelector('header');

        if (!openBtn || !overlay) return;

        function openMenu() {
          overlay.style.display = 'block';
          document.documentElement.classList.add('-isolate');
          if (header) header.classList.add('-hidden');
        }

        function closeMenu() {
          overlay.style.display = 'none';
          document.documentElement.classList.remove('-isolate');
          if (header) header.classList.remove('-hidden');
        }

        openBtn.addEventListener('click', openMenu);
        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
        if (crossBtn) crossBtn.addEventListener('click', closeMenu);
        if (backdrop) backdrop.addEventListener('click', closeMenu);
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProjectsMenu);
      } else {
        initProjectsMenu();
      }
    })();
  </script>
    `;

    build = build.replace('</body>', overlayHtml + '\n</body>');
    console.log('✓ Added navigation drawer & interactive script to build_projects_pages.js');
  }

  fs.writeFileSync(buildScriptPath, build, 'utf8');
}

// Run build_projects_pages.js to regenerate all 18 project HTML pages
console.log('Running build_projects_pages.js to apply menu updates to all project pages...');
require('./build_projects_pages.js');

console.log('=== MENU RESTORATION COMPLETE ===');
