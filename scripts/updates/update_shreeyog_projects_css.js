const fs = require('fs');

const cssPath = 'public/_nuxt/shreeyog-projects.css';
const backupPath = 'public/_nuxt/shreeyog-projects.css.bak';

if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(cssPath, backupPath);
  console.log('Backed up shreeyog-projects.css to .bak');
}

const currentCss = fs.readFileSync(cssPath, 'utf8');

// New styles for Asymmetrical Gallery, Working Footer, and Navigation / Scroll fixes
const newGalleryCss = `

/* ==========================================================================
   SHREEYOG ASYMMETRICAL ARCHITECTURAL GALLERY ARCHITECTURE
   Harmonized with Highlighted Projects & Obsidian Assembly Editorial Aesthetic
   ========================================================================== */

/* Both sections share dark luxury canvas */
.c-completed-section,
.c-ongoing-section {
  position: relative !important;
  background-color: var(--sy-black, #151415) !important;
  color: var(--sy-cream, #f1eade) !important;
  padding: calc(var(--vh, 1vh) * 10) 0 calc(var(--vh, 1vh) * 12) 0 !important;
  overflow: hidden !important;
}

/* Subtle architectural divider line between sections */
.c-completed-section::before,
.c-ongoing-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 5%;
  right: 5%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(196, 154, 108, 0.25) 30%, rgba(196, 154, 108, 0.25) 70%, transparent);
}

.c-completed-section .section-header,
.c-ongoing-section .section-header {
  text-align: center;
  max-width: 900px;
  margin: 0 auto clamp(3rem, 5vw, 5rem) auto;
  padding: 0 1.5rem;
}

.c-completed-section .section-tag,
.c-ongoing-section .section-tag {
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--sy-gold, #c6a76a);
  display: block;
  margin-bottom: 0.75rem;
}

.c-completed-section .section-title,
.c-ongoing-section .section-title {
  font-family: var(--font-t-1), "Voyage", "OTJubilee-Platinum", Georgia, serif;
  font-size: clamp(2.4rem, 5vw, 5rem);
  line-height: 1.05;
  font-weight: 400;
  color: var(--sy-cream, #f1eade);
  margin: 0 0 1rem 0;
}

.c-completed-section .section-subtitle,
.c-ongoing-section .section-subtitle {
  font-family: var(--font-b-regular), "Switzer-Regular", -apple-system, sans-serif;
  font-size: clamp(0.95rem, 1.2vw, 1.15rem);
  line-height: 1.6;
  color: rgba(241, 234, 222, 0.72);
  margin: 0 auto;
  max-width: 680px;
}

/* Gallery Wrapper */
.arch-gallery-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(1.2rem, 3.5vw, 3.5rem);
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 4vw, 3.5rem);
}

/* Asymmetrical Suite Grids */
.arch-suite {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.5rem, 2.5vw, 2.5rem);
  width: 100%;
}

@media (min-width: 1024px) {
  .arch-suite-8-4 {
    grid-template-columns: 1.55fr 1fr;
    align-items: stretch;
  }
  .arch-suite-7-5 {
    grid-template-columns: 1.35fr 1fr;
    align-items: stretch;
  }
  .arch-suite-5-7 {
    grid-template-columns: 1fr 1.35fr;
    align-items: stretch;
  }
  .arch-suite-full {
    grid-template-columns: 1fr;
  }
}

.arch-stack {
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 2.5vw, 2.5rem);
  height: 100%;
}

.arch-pair {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.5rem, 2.5vw, 2.5rem);
}
@media (min-width: 640px) {
  .arch-pair {
    grid-template-columns: 1fr 1fr;
  }
}

/* Shared Architectural Card Styling */
.arch-card {
  position: relative;
  background-color: var(--sy-card-bg, #1c1b1c);
  border: 1px solid var(--sy-card-border, rgba(196, 154, 108, 0.22));
  border-radius: 0.5rem;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1),
              border-color 0.4s ease,
              box-shadow 0.4s ease;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
}

.arch-card:hover {
  transform: translateY(-6px);
  border-color: rgba(196, 154, 108, 0.55);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.75), 0 0 30px rgba(196, 154, 108, 0.12);
}

/* Image Wrapper */
.arch-card-media {
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: #121112;
}

.arch-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), filter 0.5s ease;
}

.arch-card:hover .arch-card-media img {
  transform: scale(1.05);
}

/* Gradient overlay */
.arch-card-media::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(21, 20, 21, 0.15) 0%, rgba(21, 20, 21, 0.5) 70%, rgba(21, 20, 21, 0.85) 100%);
  pointer-events: none;
}

/* Top Meta Badges Bar */
.arch-card-meta {
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  right: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 3;
  pointer-events: none;
}

.arch-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.badge-completed {
  background-color: rgba(46, 204, 113, 0.12);
  color: #2ecc71;
  border: 1px solid rgba(46, 204, 113, 0.35);
}

.badge-ongoing {
  background-color: rgba(230, 126, 34, 0.12);
  color: #e67e22;
  border: 1px solid rgba(230, 126, 34, 0.35);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: currentColor;
  box-shadow: 0 0 8px currentColor;
}

.arch-num {
  font-family: var(--font-t-1), "Voyage", Georgia, serif;
  font-size: 0.95rem;
  color: var(--sy-gold, #c6a76a);
  background: rgba(21, 20, 21, 0.75);
  border: 1px solid rgba(196, 154, 108, 0.3);
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Card Content Area */
.arch-card-content {
  padding: clamp(1.5rem, 2.5vw, 2.2rem);
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  z-index: 2;
}

.arch-location {
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--sy-gold, #c6a76a);
  margin-bottom: 0.4rem;
  display: block;
}

.arch-title {
  font-family: var(--font-t-1), "Voyage", "OTJubilee-Platinum", Georgia, serif;
  font-size: clamp(1.45rem, 2.2vw, 2.2rem);
  line-height: 1.15;
  color: var(--sy-cream, #f1eade);
  margin: 0 0 0.5rem 0;
  transition: color 0.3s ease;
}

.arch-card:hover .arch-title {
  color: #ffffff;
}

.arch-typology {
  font-family: var(--font-b-regular), "Switzer-Regular", -apple-system, sans-serif;
  font-size: 0.85rem;
  color: rgba(196, 154, 108, 0.9);
  margin-bottom: 0.85rem;
  display: block;
}

.arch-narrative {
  font-family: var(--font-b-regular), "Switzer-Regular", -apple-system, sans-serif;
  font-size: 0.92rem;
  line-height: 1.6;
  color: rgba(241, 234, 222, 0.7);
  margin-bottom: 1.25rem;
}

.arch-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid rgba(196, 154, 108, 0.15);
}

.arch-link {
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--sy-gold, #c6a76a);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: gap 0.3s ease, color 0.3s ease;
}

.arch-card:hover .arch-link {
  color: #ffffff;
  gap: 0.65rem;
}

/* Specific Aspect Ratios for Asymmetrical Visual Flow */
.arch-card-featured .arch-card-media {
  aspect-ratio: 16 / 10;
  min-height: 320px;
}
@media (min-width: 1024px) {
  .arch-card-featured .arch-card-media {
    min-height: 380px;
  }
}

.arch-card-companion .arch-card-media {
  aspect-ratio: 16 / 9;
  min-height: 200px;
}

.arch-card-portrait .arch-card-media {
  aspect-ratio: 4 / 3;
  min-height: 260px;
}

.arch-card-wide .arch-card-media {
  aspect-ratio: 21 / 9;
  min-height: 280px;
}

/* ==========================================================================
   NAVIGATION, HEADER VISIBILITY & SCROLL UNLOCK GUARANTEE
   ========================================================================== */

/* Header is ALWAYS visible and interactable */
header,
header[data-v-81ce8483] {
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

/* Page content is ALWAYS visible */
.page,
.page-projects,
.page-main,
.page-projects-root,
.page-detail {
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: all !important;
}

/* Scrolling is ALWAYS permitted on html and body */
html,
body,
html.-ready,
html.-loaded {
  overflow-x: hidden !important;
  overflow-y: auto !important;
  height: auto !important;
}
`;

// Append or update in public/_nuxt/shreeyog-projects.css
fs.writeFileSync(cssPath, currentCss + newGalleryCss, 'utf8');
console.log('Successfully updated shreeyog-projects.css with asymmetrical gallery architecture and scroll fixes.');
