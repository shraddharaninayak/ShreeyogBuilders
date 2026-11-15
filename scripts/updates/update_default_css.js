const fs = require('fs');

const cssPath = 'public/_nuxt/default.dc95e376.css';
const backupPath = 'public/_nuxt/default.dc95e376.css.bak';

if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(cssPath, backupPath);
  console.log('Backed up default.dc95e376.css to .bak');
}

const currentCss = fs.readFileSync(cssPath, 'utf8');

const safetyRules = `

/* ==========================================================================
   NAVIGATION & SCROLL RESILIENCY OVERRIDES
   Ensures header is never stuck offscreen and page scroll is never frozen
   ========================================================================== */

/* Header protection across all states */
header[data-v-81ce8483],
header {
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: all !important;
  display: block !important;
}

header .-w[data-v-81ce8483] {
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: all !important;
  transform: translate3d(0, 0, 0) !important;
}

/* Scroll unlock protection */
html,
body {
  overflow-x: hidden !important;
  overflow-y: auto !important;
}

/* Page visibility */
.page,
.page-projects,
.page-projects-root,
.page-main,
.page-detail {
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: all !important;
}
`;

fs.writeFileSync(cssPath, currentCss + safetyRules, 'utf8');
console.log('Successfully appended safety overrides to default.dc95e376.css.');
