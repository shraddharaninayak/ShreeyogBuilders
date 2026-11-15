const fs = require('fs');

let css = fs.readFileSync('public/_nuxt/shreeyog-projects.css', 'utf8');

// Replace the navbar section in shreeyog-projects.css with the clean navbar styles
const marker = '/* ==========================================================================\n   SHREEYOG NAVBAR';
const markerIdx = css.indexOf(marker);

const navSnippet = `
/* ==========================================================================
   SHREEYOG NAVBAR - PERFECT HORIZONTAL ALIGNMENT & RESTORED MENU BUTTON
   ========================================================================== */
header {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  z-index: 102 !important;
  pointer-events: none !important;
  transition: background-color 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease !important;
}

header.-scrolled {
  background: rgba(21, 20, 21, 0.9) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45) !important;
}

header .-w {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  width: 100% !important;
  max-width: 1400px !important;
  margin: 0 auto !important;
  padding: clamp(0.75rem, 1.5vw, 1.25rem) clamp(1.2rem, 3vw, 2.5rem) !important;
  box-sizing: border-box !important;
  grid-template-columns: none !important;
}

header .-w a.-nl {
  display: inline-flex !important;
  align-items: center !important;
  pointer-events: all !important;
  flex-shrink: 0 !important;
  grid-area: auto !important;
}

header .-w .places,
header .-w .objects.about {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  height: 36px !important;
  padding: 0.4rem 1.15rem !important;
  pointer-events: all !important;
  border-radius: 0.35rem !important;
  width: auto !important;
  min-width: 85px !important;
  flex-shrink: 0 !important;
  grid-area: auto !important;
  margin: 0 0.25rem !important;
}

header .-w .sep {
  display: inline-block !important;
  width: 1px !important;
  height: 18px !important;
  background-color: rgba(241, 234, 222, 0.25) !important;
  margin: 0 0.5rem !important;
  flex-shrink: 0 !important;
  grid-area: auto !important;
}

header .-w .request,
header .-w .button.request,
header .-w [data-v-81ce8483].request,
header .-w [data-v-f52f19c3].request,
header .request {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
  width: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}

header .-w .menu-wrap {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  pointer-events: all !important;
  margin-left: auto !important;
  flex-shrink: 0 !important;
  width: auto !important;
  grid-area: auto !important;
}

header .-w .menu-wrap:before {
  display: none !important;
}

header .-w .menu-wrap .menu.button,
header .-w .menu.button,
header .-w button.menu {
  display: inline-flex !important;
  flex-direction: row-reverse !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  padding: 0.45rem 1.15rem 0.45rem 0.95rem !important;
  height: 36px !important;
  min-width: 95px !important;
  width: auto !important;
  border-radius: 0.4rem !important;
  background-color: var(--c-yellow, #f1eade) !important;
  border: 1px solid rgba(var(--c-yellow-rgb, 241, 234, 222), 0.6) !important;
  cursor: pointer !important;
  box-sizing: border-box !important;
  flex-shrink: 0 !important;
}

header .-w .menu-wrap .button > * {
  grid-area: auto !important;
  position: static !important;
  left: auto !important;
  translate: none !important;
  margin: 0 !important;
}

header .-w .menu-wrap .button .menu-icon,
header.-scrolled .-w .menu-wrap .button .menu-icon {
  position: static !important;
  left: auto !important;
  translate: none !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  gap: 4px !important;
  width: 18px !important;
  height: 10px !important;
  margin: 0 !important;
  padding: 0 !important;
  background: none !important;
  flex-shrink: 0 !important;
  pointer-events: none !important;
}

header .-w .menu-wrap .button .menu-icon:before,
header .-w .menu-wrap .button .menu-icon:after {
  content: '' !important;
  display: block !important;
  width: 100% !important;
  height: 1.5px !important;
  background-color: #151415 !important;
  border-radius: 1px !important;
  position: static !important;
}

header .-w .menu-wrap .button .text,
header.-scrolled .-w .menu-wrap .button .text {
  position: static !important;
  left: auto !important;
  translate: none !important;
  opacity: 1 !important;
  visibility: visible !important;
  font-family: var(--font-b-medium), 'Switzer-Medium', -apple-system, sans-serif !important;
  font-size: 0.74rem !important;
  letter-spacing: 0.16em !important;
  text-transform: uppercase !important;
  color: #151415 !important;
  font-weight: 600 !important;
  line-height: 1 !important;
  margin: 0 !important;
  white-space: nowrap !important;
}
`;

if (markerIdx !== -1) {
  css = css.substring(0, markerIdx) + navSnippet;
} else {
  css += navSnippet;
}

fs.writeFileSync('public/_nuxt/shreeyog-projects.css', css);
if (fs.existsSync('obsidianassembly.com/_nuxt/shreeyog-projects.css')) {
  fs.writeFileSync('obsidianassembly.com/_nuxt/shreeyog-projects.css', css);
}
console.log('✓ Successfully synchronized shreeyog-projects.css with clean navbar');
