const fs = require('fs');

const cssPath = 'public/_nuxt/shreeyog-projects.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Replace the end or update rules with exact compact, balanced styling
const updatedStyles = `

/* ==========================================================================
   SHREEYOG PROJECTS PORTFOLIO: BALANCED COMPACT SPACING ARCHITECTURE
   Eliminates all excessive blank spaces and harmonizes cards across all viewports
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. HIGHLIGHTED PROJECTS: BALANCED CENTRAL SHOWCASE & SATELLITES
   -------------------------------------------------------------------------- */
.c-highlighted-section {
  position: relative;
  background-color: var(--sy-black, #151415);
  color: var(--sy-cream, #f1eade);
  padding: clamp(3rem, 6vw, 5.5rem) 0 clamp(4rem, 8vw, 7rem) 0;
  overflow: hidden;
}

.highlighted-stage {
  position: relative !important;
  max-width: 1380px !important;
  margin: 0 auto !important;
  padding: 1rem 1.5rem !important;
  min-height: 620px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

@media (min-width: 1024px) {
  .highlighted-stage {
    min-height: 680px !important;
  }
}

.featured-showcase {
  position: relative !important;
  width: 100% !important;
  max-width: 620px !important;
  margin: 0 auto !important;
  border-radius: 0.6rem !important;
  overflow: hidden !important;
  background-color: var(--sy-card-bg, #1c1b1c) !important;
  border: 1px solid rgba(196, 154, 108, 0.28) !important;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8) !important;
  z-index: 10 !important;
  height: auto !important;
}

.featured-showcase:hover {
  border-color: rgba(196, 154, 108, 0.55) !important;
  box-shadow: 0 35px 75px rgba(0, 0, 0, 0.9), 0 0 30px rgba(196, 154, 108, 0.12) !important;
}

.featured-image-wrapper {
  position: relative !important;
  width: 100% !important;
  aspect-ratio: 16 / 10 !important;
  max-height: 350px !important;
  overflow: hidden !important;
  background-color: #0d0d0d !important;
}

.featured-image-wrapper img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block !important;
  transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1) !important;
}

.featured-showcase:hover .featured-image-wrapper img {
  transform: scale(1.04) !important;
}

.featured-info {
  padding: 1.4rem 1.8rem 1.5rem 1.8rem !important;
  background: linear-gradient(180deg, #1c1b1c 0%, #151415 100%) !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 0.6rem !important;
}

.featured-top-row {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  width: 100% !important;
}

.featured-location {
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
  font-size: 0.75rem !important;
  letter-spacing: 0.18em !important;
  text-transform: uppercase !important;
  color: var(--sy-gold, #c6a76a) !important;
}

.featured-counter {
  font-family: var(--font-t-1), "Voyage", Georgia, serif !important;
  font-size: 0.95rem !important;
  color: rgba(241, 234, 222, 0.55) !important;
}

.featured-counter span {
  color: var(--sy-cream, #f1eade) !important;
  font-weight: 500 !important;
}

.featured-name {
  font-family: var(--font-t-1), "Voyage", "OTJubilee-Platinum", Georgia, serif !important;
  font-size: clamp(1.8rem, 2.7vw, 2.4rem) !important;
  font-weight: 400 !important;
  line-height: 1.12 !important;
  color: var(--sy-cream, #f1eade) !important;
  margin: 0 !important;
}

.featured-desc {
  font-family: var(--font-b-regular), "Switzer-Regular", -apple-system, sans-serif !important;
  font-size: 0.88rem !important;
  line-height: 1.55 !important;
  color: rgba(241, 234, 222, 0.72) !important;
  margin: 0 !important;
}

.featured-action-row {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  margin-top: 0.4rem !important;
  padding-top: 0.85rem !important;
  border-top: 1px solid rgba(196, 154, 108, 0.18) !important;
}

.featured-detail-btn {
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
  font-size: 0.75rem !important;
  letter-spacing: 0.14em !important;
  text-transform: uppercase !important;
  color: var(--sy-gold, #c6a76a) !important;
  text-decoration: none !important;
  transition: color 0.3s ease, gap 0.3s ease !important;
}

.featured-detail-btn:hover {
  color: #ffffff !important;
  gap: 0.75rem !important;
}

.featured-nav-controls {
  display: flex !important;
  gap: 0.5rem !important;
}

.feat-nav-btn {
  width: 38px !important;
  height: 38px !important;
  border-radius: 50% !important;
  background: rgba(21, 20, 21, 0.8) !important;
  border: 1px solid rgba(196, 154, 108, 0.3) !important;
  color: var(--sy-cream, #f1eade) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
}

.feat-nav-btn:hover {
  background: var(--sy-gold, #c6a76a) !important;
  color: #151415 !important;
  border-color: var(--sy-gold, #c6a76a) !important;
}

/* Satellite Cards */
@media (min-width: 1024px) {
  .satellite-cards {
    display: block !important;
    position: absolute !important;
    inset: 0 !important;
    pointer-events: none !important;
  }
  .satellite-card {
    pointer-events: all !important;
    position: absolute !important;
    border-radius: 0.5rem !important;
    overflow: hidden !important;
    background-color: var(--sy-card-bg, #1c1b1c) !important;
    border: 1px solid rgba(196, 154, 108, 0.22) !important;
    box-shadow: 0 16px 35px rgba(0, 0, 0, 0.6) !important;
    transition: transform 0.4s ease, border-color 0.4s ease !important;
  }
  .satellite-card:hover {
    transform: translateY(-4px) scale(1.02) !important;
    border-color: rgba(196, 154, 108, 0.55) !important;
  }
  .sat-1 { top: 3%; left: 3%; width: 220px !important; height: 260px !important; }
  .sat-2 { bottom: 4%; left: 4%; width: 230px !important; height: 165px !important; }
  .sat-3 { top: 4%; right: 3%; width: 220px !important; height: 270px !important; }
  .sat-4 { bottom: 4%; right: 4%; width: 230px !important; height: 165px !important; }
  .sat-5 { top: 48%; left: 1.5%; transform: translateY(-50%) !important; width: 175px !important; height: 200px !important; }
}

/* --------------------------------------------------------------------------
   2. COMPLETED & ONGOING PROJECTS: ASYMMETRICAL BALANCED COMPACT CARDS
   -------------------------------------------------------------------------- */
.arch-gallery-container {
  max-width: 1380px !important;
  margin: 0 auto !important;
  padding: 0 clamp(1.2rem, 3.5vw, 3rem) !important;
  display: flex !important;
  flex-direction: column !important;
  gap: clamp(1.8rem, 3vw, 2.8rem) !important;
}

/* Row-Level Asymmetric Grid Structures */
.arch-row {
  display: grid !important;
  grid-template-columns: 1fr !important;
  gap: clamp(1.5rem, 2.5vw, 2.5rem) !important;
  width: 100% !important;
  align-items: start !important; /* Content-driven height, prevents excessive stretching! */
}

@media (min-width: 768px) {
  .arch-row-2-equal {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  .arch-row-3-equal {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

@media (min-width: 1024px) {
  .arch-row-wide-feature-left {
    grid-template-columns: 1.45fr 1fr !important;
  }
  .arch-row-wide-feature-right {
    grid-template-columns: 1fr 1.45fr !important;
  }
  .arch-row-3-equal {
    grid-template-columns: repeat(3, 1fr) !important;
  }
  .arch-row-2-equal {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

/* Base Card Structure */
.arch-card {
  position: relative !important;
  background-color: var(--sy-card-bg, #1c1b1c) !important;
  border: 1px solid var(--sy-card-border, rgba(196, 154, 108, 0.22)) !important;
  border-radius: 0.5rem !important;
  overflow: hidden !important;
  text-decoration: none !important;
  color: inherit !important;
  display: flex !important;
  flex-direction: column !important;
  height: auto !important; /* Content-driven height! */
  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.5) !important;
  transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1),
              border-color 0.4s ease,
              box-shadow 0.4s ease !important;
}

.arch-card:hover {
  transform: translateY(-5px) !important;
  border-color: rgba(196, 154, 108, 0.55) !important;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.75), 0 0 25px rgba(196, 154, 108, 0.12) !important;
}

/* Card Media Frame */
.arch-card-media {
  position: relative !important;
  width: 100% !important;
  overflow: hidden !important;
  background-color: #121112 !important;
}

.arch-card-media img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block !important;
  transition: transform 0.7s cubic-bezier(0.25, 1, 0.5, 1) !important;
}

.arch-card:hover .arch-card-media img {
  transform: scale(1.045) !important;
}

.arch-card-media::after {
  content: "" !important;
  position: absolute !important;
  inset: 0 !important;
  background: linear-gradient(180deg, rgba(21, 20, 21, 0.1) 0%, rgba(21, 20, 21, 0.4) 60%, rgba(21, 20, 21, 0.85) 100%) !important;
  pointer-events: none !important;
}

/* Aspect ratios tailored to card layout */
.arch-card-standard .arch-card-media {
  aspect-ratio: 16 / 10 !important;
  max-height: 250px !important;
}

.arch-card-wide-feature .arch-card-media {
  aspect-ratio: 16 / 10 !important;
  max-height: 310px !important;
}

/* Card Content Area - Tightly Grouped, Zero Wasted Space */
.arch-card-content {
  padding: 1.4rem 1.6rem 1.4rem 1.6rem !important;
  display: flex !important;
  flex-direction: column !important;
  flex: none !important; /* Do not force expansion */
  background: linear-gradient(180deg, #1c1b1c 0%, #171617 100%) !important;
}

.arch-location {
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
  font-size: 0.72rem !important;
  letter-spacing: 0.16em !important;
  text-transform: uppercase !important;
  color: var(--sy-gold, #c6a76a) !important;
  margin-bottom: 0.35rem !important;
  display: block !important;
}

.arch-title {
  font-family: var(--font-t-1), "Voyage", "OTJubilee-Platinum", Georgia, serif !important;
  font-size: clamp(1.45rem, 2vw, 2rem) !important;
  line-height: 1.15 !important;
  color: var(--sy-cream, #f1eade) !important;
  margin: 0 0 0.35rem 0 !important;
  transition: color 0.3s ease !important;
}

.arch-card:hover .arch-title {
  color: #ffffff !important;
}

.arch-typology {
  font-family: var(--font-b-regular), "Switzer-Regular", -apple-system, sans-serif !important;
  font-size: 0.82rem !important;
  color: rgba(196, 154, 108, 0.9) !important;
  margin-bottom: 0.65rem !important;
  display: block !important;
}

.arch-narrative {
  font-family: var(--font-b-regular), "Switzer-Regular", -apple-system, sans-serif !important;
  font-size: 0.88rem !important;
  line-height: 1.55 !important;
  color: rgba(241, 234, 222, 0.72) !important;
  margin: 0 0 0.85rem 0 !important;
}

/* Explore Link neatly attached right below the content */
.arch-footer {
  margin-top: 0.35rem !important; /* Neatly grouped right below narrative! */
  padding-top: 0.85rem !important;
  border-top: 1px solid rgba(196, 154, 108, 0.16) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
}

.arch-link {
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
  font-size: 0.75rem !important;
  letter-spacing: 0.14em !important;
  text-transform: uppercase !important;
  color: var(--sy-gold, #c6a76a) !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.4rem !important;
  transition: gap 0.3s ease, color 0.3s ease !important;
}

.arch-card:hover .arch-link {
  color: #ffffff !important;
  gap: 0.65rem !important;
}
`;

fs.writeFileSync(cssPath, css + updatedStyles, 'utf8');
console.log('Appended balanced compact spacing architecture to shreeyog-projects.css.');
