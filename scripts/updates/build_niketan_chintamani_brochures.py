import os

# -----------------------------------------------------------------------------
# 1. GENERATE SHREE NIKETAN BROCHURE
# -----------------------------------------------------------------------------

niketan_css = """/* Shree Niketan Digital Brochure Stylesheet - Royal Purple & Imperial Gold */
:root {
  --sn-bg: #0f0d11;
  --sn-card-bg: #17141a;
  --sn-card-hover: #1f1b24;
  --sn-border: rgba(200, 157, 85, 0.22);
  --sn-border-strong: rgba(200, 157, 85, 0.55);
  --sn-gold: #c89d55;
  --sn-gold-light: #dfba7c;
  --sn-purple: #86387d;
  --sn-purple-light: #ab4da0;
  --sn-text-main: #f5f2eb;
  --sn-text-muted: #aca59c;
  --sn-accent: #c89d55;
  --sn-radius-sm: 8px;
  --sn-radius-md: 12px;
  --sn-radius-lg: 16px;
  --sn-shadow: 0 16px 36px rgba(0, 0, 0, 0.55);
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
  background-color: var(--sn-bg);
  color: var(--sn-text-main);
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-x: hidden;
}

body {
  background-color: var(--sn-bg);
  color: var(--sn-text-main);
  line-height: 1.65;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

/* Typography Headings */
h1, h2, h3, h4, .hero-title, .section-title, .sidebar-brand-title {
  font-family: 'Cinzel', serif;
  letter-spacing: 0.02em;
  color: #ffffff;
}

/* Links & Buttons */
a {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s ease;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: var(--sn-bg);
}
::-webkit-scrollbar-thumb {
  background: rgba(200, 157, 85, 0.35);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--sn-gold);
}

/* ==========================================================================
   DESKTOP FIXED SIDEBAR
   ========================================================================== */
.brochure-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 290px;
  background: #141117;
  border-right: 1px solid var(--sn-border);
  padding: 2.2rem 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 100;
  overflow-y: auto;
}

.sidebar-header {
  margin-bottom: 2rem;
  text-align: center;
}

.sidebar-brand-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.sidebar-logo {
  max-width: 220px;
  max-height: 85px;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.6));
}

.sidebar-tagline {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--sn-gold);
  font-weight: 600;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex-grow: 1;
}

.sidebar-nav-link {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.7rem 0.9rem;
  border-radius: var(--sn-radius-sm);
  color: var(--sn-text-muted);
  font-size: 0.88rem;
  font-weight: 500;
  transition: all 0.25s ease;
  border-left: 2px solid transparent;
}

.sidebar-nav-link:hover,
.sidebar-nav-link.active {
  color: #ffffff;
  background: rgba(200, 157, 85, 0.12);
  border-left-color: var(--sn-gold);
  padding-left: 1.1rem;
}

.nav-link-num {
  font-family: 'Cinzel', serif;
  font-size: 0.78rem;
  color: var(--sn-gold);
  font-weight: 700;
}

.sidebar-footer {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sidebar-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1rem;
  border-radius: var(--sn-radius-sm);
  font-size: 0.86rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
}

.sidebar-action-btn--primary {
  background: linear-gradient(135deg, #c89d55 0%, #9e7534 100%);
  color: #121014;
  box-shadow: 0 4px 15px rgba(200, 157, 85, 0.35);
}

.sidebar-action-btn--primary:hover {
  background: linear-gradient(135deg, #dfba7c 0%, #b88a42 100%);
  box-shadow: 0 6px 20px rgba(200, 157, 85, 0.5);
}

.sidebar-action-btn--outline {
  border: 1px solid var(--sn-border);
  color: var(--sn-text-muted);
  background: transparent;
}

.sidebar-action-btn--outline:hover {
  border-color: var(--sn-gold);
  color: #ffffff;
  background: rgba(200, 157, 85, 0.08);
}

/* ==========================================================================
   MOBILE TOPBAR & DRAWER
   ========================================================================== */
.mobile-topbar {
  display: none;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 68px;
  background: #141117;
  border-bottom: 1px solid var(--sn-border);
  padding: 0 1.2rem;
  align-items: center;
  justify-content: space-between;
  z-index: 200;
}

.mobile-logo {
  max-height: 48px;
  max-width: 170px;
  object-fit: contain;
}

.mobile-menu-btn {
  background: transparent;
  border: 1px solid var(--sn-border);
  color: var(--sn-gold);
  padding: 0.5rem 0.9rem;
  border-radius: var(--sn-radius-sm);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.mobile-drawer {
  display: none;
  position: fixed;
  top: 68px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 13, 17, 0.98);
  backdrop-filter: blur(12px);
  padding: 1.5rem;
  overflow-y: auto;
  z-index: 199;
  flex-direction: column;
  gap: 0.6rem;
}

.mobile-drawer.open {
  display: flex;
}

/* ==========================================================================
   MAIN BROCHURE CONTENT
   ========================================================================== */
.brochure-main {
  margin-left: 290px;
  padding: 3rem 4rem 6rem;
  max-width: 1350px;
  width: calc(100% - 290px);
}

/* Common Section Container */
.brochure-section {
  margin-bottom: 5.5rem;
  scroll-margin-top: 2rem;
}

.section-tag {
  display: inline-block;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: var(--sn-gold);
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: clamp(1.8rem, 3.2vw, 2.6rem);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.section-subtitle {
  color: var(--sn-text-muted);
  font-size: 1.05rem;
  max-width: 780px;
  margin-bottom: 2.2rem;
  line-height: 1.6;
}

/* ==========================================================================
   01. HERO SECTION
   ========================================================================== */
.hero-section {
  margin-bottom: 5rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 3rem;
  align-items: center;
}

.hero-badges-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.2rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.85rem;
  border-radius: 30px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-badge--status {
  background: rgba(34, 197, 94, 0.15);
  color: #4ade80;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.hero-badge--luxury {
  background: rgba(134, 56, 125, 0.22);
  color: #df97d6;
  border: 1px solid rgba(134, 56, 125, 0.5);
}

.hero-badge--rera {
  background: rgba(200, 157, 85, 0.15);
  color: var(--sn-gold);
  border: 1px solid var(--sn-border);
}

.hero-title {
  font-size: clamp(2.4rem, 4.5vw, 3.4rem);
  margin-bottom: 0.5rem;
  color: #ffffff;
}

.hero-tagline {
  font-size: 1.1rem;
  color: var(--sn-gold);
  font-style: italic;
  margin-bottom: 1.4rem;
  font-weight: 500;
}

.hero-desc {
  color: var(--sn-text-muted);
  font-size: 0.98rem;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.hero-stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2.2rem;
}

.hero-stat-card {
  background: var(--sn-card-bg);
  border: 1px solid var(--sn-border);
  border-radius: var(--sn-radius-sm);
  padding: 1.1rem 1.3rem;
  transition: all 0.3s ease;
}

.hero-stat-card:hover {
  border-color: var(--sn-gold);
  background: var(--sn-card-hover);
  transform: translateY(-3px);
}

.hero-stat-num {
  font-family: 'Cinzel', serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--sn-gold);
  margin-bottom: 0.2rem;
}

.hero-stat-label {
  font-size: 0.8rem;
  color: var(--sn-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.hero-ctas-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.hero-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1.6rem;
  border-radius: var(--sn-radius-sm);
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hero-cta-btn--primary {
  background: linear-gradient(135deg, #c89d55 0%, #9e7534 100%);
  color: #121014;
  box-shadow: 0 4px 18px rgba(200, 157, 85, 0.35);
}

.hero-cta-btn--primary:hover {
  background: linear-gradient(135deg, #dfba7c 0%, #b88a42 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(200, 157, 85, 0.5);
}

.hero-cta-btn--secondary {
  border: 1px solid var(--sn-border);
  color: #ffffff;
  background: rgba(200, 157, 85, 0.08);
}

.hero-cta-btn--secondary:hover {
  border-color: var(--sn-gold);
  background: rgba(200, 157, 85, 0.16);
  transform: translateY(-2px);
}

.hero-media-wrapper {
  position: relative;
  border-radius: var(--sn-radius-md);
  overflow: hidden;
  border: 1px solid var(--sn-border);
  box-shadow: var(--sn-shadow);
  background: #19161e;
  cursor: pointer;
}

.hero-media-wrapper img {
  width: 100%;
  height: 100%;
  max-height: 480px;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}

.hero-media-wrapper:hover img {
  transform: scale(1.03);
}

.hero-media-badge {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(15, 13, 17, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid var(--sn-border);
  color: var(--sn-gold);
  padding: 0.4rem 0.8rem;
  border-radius: var(--sn-radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

/* ==========================================================================
   02. VISION & LEGACY SECTION
   ========================================================================== */
.pillar-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.pillar-card {
  background: var(--sn-card-bg);
  border: 1px solid var(--sn-border);
  border-radius: var(--sn-radius-md);
  padding: 1.8rem 1.4rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.pillar-card:hover {
  background: var(--sn-card-hover);
  border-color: var(--sn-gold);
  transform: translateY(-5px);
  box-shadow: var(--sn-shadow);
}

.pillar-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--sn-purple), var(--sn-gold));
  opacity: 0.7;
}

.pillar-num {
  font-family: 'Cinzel', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--sn-gold);
  margin-bottom: 0.8rem;
}

.pillar-title {
  font-size: 1.05rem;
  margin-bottom: 0.6rem;
  color: #ffffff;
}

.pillar-text {
  font-size: 0.88rem;
  color: var(--sn-text-muted);
  line-height: 1.6;
}

/* ==========================================================================
   03. AMENITIES SECTION
   ========================================================================== */
.amenities-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.amenity-card {
  background: var(--sn-card-bg);
  border: 1px solid var(--sn-border);
  border-radius: var(--sn-radius-md);
  padding: 1.6rem;
  display: flex;
  gap: 1.2rem;
  align-items: flex-start;
  transition: all 0.3s ease;
}

.amenity-card:hover {
  border-color: var(--sn-gold);
  background: var(--sn-card-hover);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.4);
}

.amenity-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(200, 157, 85, 0.12);
  border: 1px solid var(--sn-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--sn-gold);
  flex-shrink: 0;
}

.amenity-info h4 {
  font-size: 1rem;
  color: #ffffff;
  margin-bottom: 0.4rem;
}

.amenity-info p {
  font-size: 0.86rem;
  color: var(--sn-text-muted);
  line-height: 1.5;
}

/* ==========================================================================
   04. FLOOR PLANS SECTION
   ========================================================================== */
.plans-wrapper {
  background: var(--sn-card-bg);
  border: 1px solid var(--sn-border);
  border-radius: var(--sn-radius-md);
  padding: 2rem;
  box-shadow: var(--sn-shadow);
}

.plan-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--sn-border);
  padding-bottom: 1.2rem;
}

.plan-tab-btn {
  background: rgba(200, 157, 85, 0.08);
  border: 1px solid var(--sn-border);
  color: var(--sn-text-muted);
  padding: 0.7rem 1.4rem;
  border-radius: var(--sn-radius-sm);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.plan-tab-btn.active,
.plan-tab-btn:hover {
  background: linear-gradient(135deg, #c89d55 0%, #9e7534 100%);
  color: #121014;
  border-color: var(--sn-gold);
}

.plan-tab-pane {
  display: none;
}

.plan-tab-pane.active {
  display: block;
}

.plan-image-box {
  position: relative;
  background: #ffffff;
  border-radius: var(--sn-radius-sm);
  overflow: hidden;
  margin-bottom: 1.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.plan-image-box img {
  max-width: 100%;
  max-height: 540px;
  width: auto;
  height: auto;
  object-fit: contain;
  transition: transform 0.4s ease;
}

.plan-image-box:hover img {
  transform: scale(1.02);
}

.plan-zoom-hint {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(18, 16, 20, 0.85);
  color: var(--sn-gold);
  border: 1px solid var(--sn-border);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.plan-details-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.plan-details-table th,
.plan-details-table td {
  padding: 0.8rem 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(200, 157, 85, 0.15);
}

.plan-details-table th {
  color: var(--sn-gold);
  font-family: 'Cinzel', serif;
  font-size: 0.85rem;
  background: rgba(200, 157, 85, 0.05);
}

.plan-details-table td {
  color: var(--sn-text-main);
}

/* ==========================================================================
   05. SPECIFICATIONS SECTION
   ========================================================================== */
.specs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.spec-card {
  background: var(--sn-card-bg);
  border: 1px solid var(--sn-border);
  border-radius: var(--sn-radius-md);
  padding: 1.6rem;
  transition: all 0.3s ease;
}

.spec-card:hover {
  background: var(--sn-card-hover);
  border-color: var(--sn-gold);
  transform: translateY(-3px);
}

.spec-category {
  font-family: 'Cinzel', serif;
  font-size: 0.88rem;
  color: var(--sn-gold);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.spec-detail {
  font-size: 0.88rem;
  color: var(--sn-text-muted);
  line-height: 1.6;
}

/* ==========================================================================
   06. LOCATION SECTION
   ========================================================================== */
.location-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: center;
}

.location-map-box {
  position: relative;
  border-radius: var(--sn-radius-md);
  overflow: hidden;
  border: 1px solid var(--sn-border);
  background: #ffffff;
  padding: 1rem;
  cursor: pointer;
}

.location-map-box img {
  width: 100%;
  max-height: 480px;
  object-fit: contain;
  display: block;
}

.landmarks-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.landmark-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: var(--sn-card-bg);
  border: 1px solid var(--sn-border);
  border-radius: var(--sn-radius-sm);
  padding: 1rem 1.2rem;
  transition: all 0.3s ease;
}

.landmark-item:hover {
  border-color: var(--sn-gold);
  transform: translateX(4px);
}

.landmark-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--sn-gold);
  margin-top: 0.4rem;
  flex-shrink: 0;
}

.landmark-title {
  font-weight: 600;
  color: #ffffff;
  font-size: 0.95rem;
  margin-bottom: 0.2rem;
}

.landmark-desc {
  font-size: 0.84rem;
  color: var(--sn-text-muted);
}

/* ==========================================================================
   07. CONSULTANTS & TEAM SECTION
   ========================================================================== */
.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.team-card {
  background: var(--sn-card-bg);
  border: 1px solid var(--sn-border);
  border-radius: var(--sn-radius-md);
  padding: 1.6rem 1.3rem;
  text-align: center;
  transition: all 0.3s ease;
}

.team-card:hover {
  border-color: var(--sn-gold);
  background: var(--sn-card-hover);
  transform: translateY(-4px);
}

.team-role {
  font-size: 0.78rem;
  color: var(--sn-gold);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.team-name {
  font-family: 'Cinzel', serif;
  font-size: 1.15rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.team-meta {
  font-size: 0.84rem;
  color: var(--sn-text-muted);
}

/* ==========================================================================
   08. ORIGINAL BROCHURE GALLERY
   ========================================================================== */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.gallery-card {
  background: var(--sn-card-bg);
  border: 1px solid var(--sn-border);
  border-radius: var(--sn-radius-md);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.gallery-card:hover {
  border-color: var(--sn-gold);
  transform: translateY(-5px);
  box-shadow: var(--sn-shadow);
}

.gallery-card img {
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  display: block;
}

.gallery-caption {
  padding: 1rem 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--sn-border);
  background: #141117;
}

.gallery-title {
  font-size: 0.88rem;
  font-weight: 600;
  color: #ffffff;
}

.gallery-zoom-badge {
  font-size: 0.76rem;
  color: var(--sn-gold);
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

/* ==========================================================================
   LIGHTBOX MODAL
   ========================================================================== */
.lightbox-modal {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(10, 8, 12, 0.94);
  backdrop-filter: blur(14px);
  z-index: 999;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lightbox-modal.active {
  display: flex;
}

.lightbox-modal img {
  max-width: 95vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: var(--sn-radius-sm);
  box-shadow: 0 25px 60px rgba(0,0,0,0.9);
}

.lightbox-close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.8rem;
  background: transparent;
  border: 1px solid var(--sn-border);
  color: #ffffff;
  font-size: 1.6rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lightbox-close-btn:hover {
  background: var(--sn-gold);
  color: #0f0d11;
  border-color: var(--sn-gold);
}

/* ==========================================================================
   RESPONSIVE BREAKPOINTS
   ========================================================================== */
@media (max-width: 1200px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
  .pillar-grid, .specs-grid, .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .amenities-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1024px) {
  .brochure-sidebar {
    display: none;
  }
  .mobile-topbar {
    display: flex;
  }
  .brochure-main {
    margin-left: 0;
    width: 100%;
    padding: 2rem 1.5rem 4rem;
  }
  .location-grid {
    grid-template-columns: 1fr;
  }
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .hero-stats-grid {
    grid-template-columns: 1fr;
  }
  .pillar-grid, .specs-grid, .amenities-grid, .team-grid {
    grid-template-columns: 1fr;
  }
  .hero-ctas-row {
    flex-direction: column;
  }
  .hero-cta-btn {
    width: 100%;
    justify-content: center;
  }
}
"""

with open('public/projects/shree-niketan/brochure/niketan-brochure.css', 'w', encoding='utf-8') as f:
    f.write(niketan_css)

niketan_js = """// Shree Niketan Digital Brochure Interactions
document.addEventListener('DOMContentLoaded', function() {
  // 1. Mobile Drawer Toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileMenuToggle && mobileDrawer) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileMenuToggle.innerHTML = isOpen ? '<span>Close</span> &times;' : '<span>Menu</span> &#9776;';
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuToggle.innerHTML = '<span>Menu</span> &#9776;';
      });
    });
  }

  // 2. Floor Plan Tabs
  const tabBtns = document.querySelectorAll('.plan-tab-btn');
  const tabPanes = document.querySelectorAll('.plan-tab-pane');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const target = this.getAttribute('data-target');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const pane = document.getElementById(target);
      if (pane) pane.classList.add('active');
    });
  });

  // 3. Lightbox Modal
  const lightboxModal = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('[data-zoom-src]').forEach(item => {
    item.addEventListener('click', function() {
      const src = this.getAttribute('data-zoom-src') || this.getAttribute('src');
      if (lightboxImg && lightboxModal && src) {
        lightboxImg.src = src;
        lightboxModal.classList.add('active');
      }
    });
  });

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', () => lightboxModal.classList.remove('active'));
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) lightboxModal.classList.remove('active');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') lightboxModal.classList.remove('active');
    });
  }

  // 4. ScrollSpy for Sidebar
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar-nav-link');
  window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.pageYOffset >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
});
"""

with open('public/projects/shree-niketan/brochure/niketan-brochure.js', 'w', encoding='utf-8') as f:
    f.write(niketan_js)

niketan_html = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <base href="/projects/shree-niketan/brochure/" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Shree Niketan — Official Digital Brochure | Shreeyog Builders</title>
  <meta name="description" content="Explore Shree Niketan by Shreeyog Builders &amp; Land Developers at Gulmohar Colony, Kamatwada, Nashik. 2 BHK luxury homes and 6 commercial shops with allotted parking, dual elevators, and gas pipeline." />

  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="niketan-brochure.css" />
</head>
<body>

  <!-- MOBILE TOPBAR -->
  <div class="mobile-topbar">
    <a href="/projects" class="mobile-brand" title="Back to Shreeyog Projects">
      <img src="assets/logo.png" alt="Shree Niketan Logo" class="mobile-logo" />
    </a>
    <button type="button" class="mobile-menu-btn" id="mobileMenuToggle" aria-label="Toggle Navigation">
      <span>Menu</span> &#9776;
    </button>
  </div>

  <!-- MOBILE NAVIGATION DRAWER -->
  <div class="mobile-drawer" id="mobileDrawer">
    <a href="#overview" class="sidebar-nav-link active"><span class="nav-link-num">01</span> Overview &amp; Identity</a>
    <a href="#vision" class="sidebar-nav-link"><span class="nav-link-num">02</span> Vision &amp; Legacy</a>
    <a href="#amenities" class="sidebar-nav-link"><span class="nav-link-num">03</span> Amenities &amp; Features</a>
    <a href="#floorplans" class="sidebar-nav-link"><span class="nav-link-num">04</span> Master Floor Plans</a>
    <a href="#specifications" class="sidebar-nav-link"><span class="nav-link-num">05</span> Specifications</a>
    <a href="#location" class="sidebar-nav-link"><span class="nav-link-num">06</span> Location &amp; Connectivity</a>
    <a href="#credentials" class="sidebar-nav-link"><span class="nav-link-num">07</span> Consultants &amp; Team</a>
    <a href="#pdf-pages" class="sidebar-nav-link"><span class="nav-link-num">08</span> Original Brochure Gallery</a>

    <div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.8rem;">
      <a href="/brochures/shree-niketan-brochure.pdf" download="Shree-Niketan-Brochure.pdf" class="sidebar-action-btn sidebar-action-btn--primary">
        &darr; Download PDF Brochure
      </a>
      <a href="/projects" class="sidebar-action-btn sidebar-action-btn--outline">
        &larr; Return to Projects
      </a>
    </div>
  </div>

  <!-- DESKTOP FIXED SIDEBAR -->
  <aside class="brochure-sidebar">
    <div class="sidebar-header">
      <a href="/projects" class="sidebar-brand-link" title="Back to Shreeyog Projects">
        <img src="assets/logo.png" alt="Shree Niketan Logo" class="sidebar-logo" />
        <span class="sidebar-tagline">Kamatwada, Nashik</span>
      </a>
    </div>

    <nav class="sidebar-nav" aria-label="Brochure Sections">
      <a href="#overview" class="sidebar-nav-link active"><span class="nav-link-num">01</span> Overview &amp; Identity</a>
      <a href="#vision" class="sidebar-nav-link"><span class="nav-link-num">02</span> Vision &amp; Legacy</a>
      <a href="#amenities" class="sidebar-nav-link"><span class="nav-link-num">03</span> Amenities &amp; Features</a>
      <a href="#floorplans" class="sidebar-nav-link"><span class="nav-link-num">04</span> Master Floor Plans</a>
      <a href="#specifications" class="sidebar-nav-link"><span class="nav-link-num">05</span> Specifications</a>
      <a href="#location" class="sidebar-nav-link"><span class="nav-link-num">06</span> Location &amp; Connectivity</a>
      <a href="#credentials" class="sidebar-nav-link"><span class="nav-link-num">07</span> Consultants &amp; Team</a>
      <a href="#pdf-pages" class="sidebar-nav-link"><span class="nav-link-num">08</span> Original Brochure Gallery</a>
    </nav>

    <div class="sidebar-footer">
      <a href="/brochures/shree-niketan-brochure.pdf" download="Shree-Niketan-Brochure.pdf" class="sidebar-action-btn sidebar-action-btn--primary">
        &darr; Download PDF Brochure
      </a>
      <a href="/projects" class="sidebar-action-btn sidebar-action-btn--outline">
        &larr; Return to Projects
      </a>
    </div>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="brochure-main">

    <!-- 01. OVERVIEW & HERO SECTION -->
    <section class="hero-section" id="overview">
      <div class="hero-grid">
        <div class="hero-content">
          <div class="hero-badges-row">
            <span class="hero-badge hero-badge--status">Completed Landmark</span>
            <span class="hero-badge hero-badge--luxury">2 BHK Luxury Homes &amp; Shops</span>
            <span class="hero-badge hero-badge--rera">Gulmohar Colony, Kamatwada</span>
          </div>

          <h1 class="hero-title">Shree Niketan</h1>
          <p class="hero-tagline">"A Peaceful Nest... Nestled Majestically" &bull; 2 BHK Luxury Homes</p>
          <p class="hero-desc">
            Standing proudly along a wide 24.00-meter municipal DP road at Gulmohar Colony on DGP Nagar Road in Kamatwada, Nashik, <strong>Shree Niketan</strong> is an accomplished twin-wing residential and retail community developed by Shreeyog Builders &amp; Land Developers. Comprising Stilt + 6 storeys across Wing 'A' and Wing 'B', the development offers 36 luxurious 2 BHK family residences (890 sq.ft saleable) alongside 6 prime ground-floor commercial shops, dedicated parking, dual passenger elevators, internal gas pipelines, and continuous dual water supply.
          </p>

          <div class="hero-stats-grid">
            <div class="hero-stat-card">
              <div class="hero-stat-num">Stilt + 6</div>
              <div class="hero-stat-label">Twin Wings (A &amp; B) with Dual Lifts</div>
            </div>
            <div class="hero-stat-card">
              <div class="hero-stat-num">36 Homes</div>
              <div class="hero-stat-label">2 BHK Luxury Residences (890 sq.ft)</div>
            </div>
            <div class="hero-stat-card">
              <div class="hero-stat-num">6 Shops</div>
              <div class="hero-stat-label">235 - 315 sq.ft on 24M DP Road</div>
            </div>
            <div class="hero-stat-card">
              <div class="hero-stat-num">Kamatwada</div>
              <div class="hero-stat-label">Near Symbiosis School &amp; Trimurti Chowk</div>
            </div>
          </div>

          <div class="hero-ctas-row">
            <a href="/brochures/shree-niketan-brochure.pdf" download="Shree-Niketan-Brochure.pdf" class="hero-cta-btn hero-cta-btn--primary">
              &darr; Download PDF Brochure
            </a>
            <a href="#floorplans" class="hero-cta-btn hero-cta-btn--secondary">
              View Master Floor Plans &rarr;
            </a>
          </div>
        </div>

        <div class="hero-media-wrapper" data-zoom-src="assets/elevation.webp" title="Click to view full architectural elevation">
          <img src="assets/elevation.webp" alt="Shree Niketan 3D Building Elevation" />
          <div class="hero-media-badge">
            <span>&#128269; View Elevation</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 02. VISION & LEGACY SECTION -->
    <section class="brochure-section" id="vision">
      <span class="section-tag">FOUNDATIONAL EXCELLENCE</span>
      <h2 class="section-title">Vision &amp; Proven Heritage</h2>
      <p class="section-subtitle">Crafted with rock-solid experience across Indira Nagar, Gangapur Road, Govind Nagar, and Kamatwada, delivering peace of mind and enduring property value.</p>

      <div class="pillar-grid">
        <div class="pillar-card">
          <div class="pillar-num">01</div>
          <h3 class="pillar-title">18+ Years Trust</h3>
          <p class="pillar-text">Backed by nearly two decades of proven reliability, meticulous engineering, and punctual handover across Nashik's finest neighbourhoods.</p>
        </div>
        <div class="pillar-card">
          <div class="pillar-num">02</div>
          <h3 class="pillar-title">24M Road Access</h3>
          <p class="pillar-text">Prominent road frontage on a 24.00-meter wide DP thoroughfare with seamless dual-access egress and spacious landscaped open grounds.</p>
        </div>
        <div class="pillar-card">
          <div class="pillar-num">03</div>
          <h3 class="pillar-title">Integrated Commercial</h3>
          <p class="pillar-text">Six dedicated ground-level boutique commercial shops catering directly to resident convenience and vibrant local community needs.</p>
        </div>
        <div class="pillar-card">
          <div class="pillar-num">04</div>
          <h3 class="pillar-title">100% Vastu Balance</h3>
          <p class="pillar-text">Harmoniously oriented floor plans ensuring abundant cross-ventilation, generous sunlight, and positive domestic harmony in every residence.</p>
        </div>
      </div>
    </section>

    <!-- 03. AMENITIES SECTION -->
    <section class="brochure-section" id="amenities">
      <span class="section-tag">RESIDENTIAL COMFORTS</span>
      <h2 class="section-title">Amenities &amp; Features</h2>
      <p class="section-subtitle">Thoughtfully incorporated infrastructure elevating everyday urban living into an effortless, serene routine.</p>

      <div class="amenities-grid">
        <div class="amenity-card">
          <div class="amenity-icon">&#128663;</div>
          <div class="amenity-info">
            <h4>Allotted Stilt Parking</h4>
            <p>Demarcated covered parking bays on the ground stilt floor ensuring safe vehicular parking for each home.</p>
          </div>
        </div>
        <div class="amenity-card">
          <div class="amenity-icon">&#128711;</div>
          <div class="amenity-info">
            <h4>Dual Passenger Elevators</h4>
            <p>Dedicated 6'0" x 6'0" automatic passenger elevators servicing Wing 'A' and Wing 'B' with battery backup.</p>
          </div>
        </div>
        <div class="amenity-card">
          <div class="amenity-icon">&#128167;</div>
          <div class="amenity-info">
            <h4>24 Hours Dual Water</h4>
            <p>Uninterrupted municipal mains connection complemented by high-yield deep borewell water supply.</p>
          </div>
        </div>
        <div class="amenity-card">
          <div class="amenity-icon">&#128293;</div>
          <div class="amenity-info">
            <h4>Internal Gas Pipeline</h4>
            <p>Direct internal gas pipelines routed safely from the kitchen to every bathroom and toilet.</p>
          </div>
        </div>
        <div class="amenity-card">
          <div class="amenity-icon">&#129683;</div>
          <div class="amenity-info">
            <h4>Private Balconies</h4>
            <p>Spacious 10'0" x 6'0" private sit-outs extending from the living room overlooking wide open vistas.</p>
          </div>
        </div>
        <div class="amenity-card">
          <div class="amenity-icon">&#128225;</div>
          <div class="amenity-info">
            <h4>Cable &amp; Telephony</h4>
            <p>Pre-installed concealed conduits for television entertainment and broadband telephone connectivity.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 04. MASTER FLOOR PLANS SECTION -->
    <section class="brochure-section" id="floorplans">
      <span class="section-tag">ARCHITECTURAL BLUEPRINTS</span>
      <h2 class="section-title">Master Floor Plans &amp; Layout</h2>
      <p class="section-subtitle">Explore the demarcated ground site layout, commercial arcade, and typical 2 BHK floor plans across Wings A and B.</p>

      <div class="plans-wrapper">
        <div class="plan-tabs">
          <button type="button" class="plan-tab-btn active" data-target="tab-layout">Ground Layout &amp; Parking</button>
          <button type="button" class="plan-tab-btn" data-target="tab-wing-a">Wing 'A' Typical Floor Plan</button>
          <button type="button" class="plan-tab-btn" data-target="tab-wing-b">Wing 'B' Typical Floor Plan</button>
        </div>

        <div class="plan-tab-pane active" id="tab-layout">
          <div class="plan-image-box" data-zoom-src="assets/plan-layout.webp" title="Click to enlarge Ground Layout Plan">
            <img src="assets/plan-layout.webp" alt="Shree Niketan Ground Layout Plan and Parking" />
            <div class="plan-zoom-hint">&#128269; Click to Enlarge Blueprint</div>
          </div>
          <table class="plan-details-table">
            <thead>
              <tr>
                <th>Wing / Sector</th>
                <th>Units / Configuration</th>
                <th>Salient Feature</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Commercial Arcade (S-1 to S-6)</strong></td>
                <td>6 Commercial Shops (235 to 315 sq.ft)</td>
                <td>Direct 24.00M DP road frontage with dedicated customer walkway</td>
              </tr>
              <tr>
                <td><strong>Wing 'A' Stilt Level</strong></td>
                <td>Parking Bays A-1 to A-24</td>
                <td>Demarcated covered car &amp; two-wheeler bays with central lift core</td>
              </tr>
              <tr>
                <td><strong>Wing 'B' Stilt Level</strong></td>
                <td>Parking Bays B-1 to B-12</td>
                <td>Secluded parking arcade with private lift lobby &amp; watchman cabin</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="plan-tab-pane" id="tab-wing-a">
          <div class="plan-image-box" data-zoom-src="assets/plan-wing-a.webp" title="Click to enlarge Wing A Typical Floor Plan">
            <img src="assets/plan-wing-a.webp" alt="Shree Niketan Wing A Typical Floor Plan" />
            <div class="plan-zoom-hint">&#128269; Click to Enlarge Blueprint</div>
          </div>
          <table class="plan-details-table">
            <thead>
              <tr>
                <th>Residences</th>
                <th>Typology</th>
                <th>Key Dimensions</th>
                <th>Saleable Area</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Flats 1 to 24 (4 flats/floor)</td>
                <td>2 BHK Luxury Flat</td>
                <td>Living 10'0"x15'5" &bull; Sit-out 10'0"x6'0" &bull; Kitchen 9'0"x14'0" &bull; Bed 1 10'2"x12'4" &bull; Bed 2 11'0"x10'0"</td>
                <td><strong>890.00 sq.ft</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="plan-tab-pane" id="tab-wing-b">
          <div class="plan-image-box" data-zoom-src="assets/plan-wing-b.webp" title="Click to enlarge Wing B Typical Floor Plan">
            <img src="assets/plan-wing-b.webp" alt="Shree Niketan Wing B Typical Floor Plan" />
            <div class="plan-zoom-hint">&#128269; Click to Enlarge Blueprint</div>
          </div>
          <table class="plan-details-table">
            <thead>
              <tr>
                <th>Residences</th>
                <th>Typology</th>
                <th>Key Dimensions</th>
                <th>Saleable Area</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Flats B-1 to B-12 (2 flats/floor)</td>
                <td>2 BHK Luxury Flat</td>
                <td>Living 10'0"x15'5" &bull; Sit-out 10'0"x6'0" &bull; Kitchen 9'0"x13'6" &bull; Utility 7'0"x3'6" &bull; Bed 1 10'2"x12'0" &bull; Bed 2 10'0"x11'0"</td>
                <td><strong>890.00 sq.ft</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- 05. SPECIFICATIONS SECTION -->
    <section class="brochure-section" id="specifications">
      <span class="section-tag">BUILD INTEGRITY</span>
      <h2 class="section-title">Technical Specifications</h2>
      <p class="section-subtitle">Exhaustive engineering and architectural specifications executed to certified durability standards.</p>

      <div class="specs-grid">
        <div class="spec-card">
          <div class="spec-category">&#9670; Structure</div>
          <div class="spec-detail">Earthquake resistant R.C.C. frame structure designed to high seismic safety codes.</div>
        </div>
        <div class="spec-card">
          <div class="spec-category">&#9670; Brick Work</div>
          <div class="spec-detail">External perimeter walls 6" thick and internal partition walls 4.5" thick brick masonry.</div>
        </div>
        <div class="spec-card">
          <div class="spec-category">&#9670; Plaster &amp; Paint</div>
          <div class="spec-detail">Double coat external plaster with semi-acrylic paint; Neeru-finish internal plaster with Asian Oil Bound Distemper.</div>
        </div>
        <div class="spec-card">
          <div class="spec-category">&#9670; Flooring</div>
          <div class="spec-detail">Good quality 2' x 2' Johnson Vitrified tile flooring uniformly laid across the entire flat.</div>
        </div>
        <div class="spec-card">
          <div class="spec-category">&#9670; Kitchen Platform</div>
          <div class="spec-detail">Polished G20 granite platform with stainless steel sink and 4' high designer glazed tile dado.</div>
        </div>
        <div class="spec-card">
          <div class="spec-category">&#9670; Aluminium Windows</div>
          <div class="spec-detail">3-track powder-coated aluminium sliding windows with mosquito netting, safety M.S. grills &amp; marble sills.</div>
        </div>
        <div class="spec-card">
          <div class="spec-category">&#9670; Doors &amp; Frames</div>
          <div class="spec-detail">Laminated entrance main door with brass hardware and Night Latch; waterproof flush internal doors.</div>
        </div>
        <div class="spec-card">
          <div class="spec-category">&#9670; Bath &amp; Toilet</div>
          <div class="spec-detail">7' height glazed wall ceramic tiles; PVC doors with marble frames; concealed plumbing with wall mixer.</div>
        </div>
        <div class="spec-card">
          <div class="spec-category">&#9670; Gas Pipeline</div>
          <div class="spec-detail">Dedicated internal gas pipeline safely routed from the kitchen counter to all bathrooms and toilets.</div>
        </div>
        <div class="spec-card">
          <div class="spec-category">&#9670; Electrification</div>
          <div class="spec-detail">Concealed copper wiring with adequate electrical points, TV socket, and telephone connection in living room.</div>
        </div>
        <div class="spec-card">
          <div class="spec-category">&#9670; Parking</div>
          <div class="spec-detail">Separate allotted covered stilt parking space demarcated for each individual residence.</div>
        </div>
        <div class="spec-card">
          <div class="spec-category">&#9670; Water Supply</div>
          <div class="spec-detail">24-hour dual water supply from Nashik Municipal Corporation mains and reliable deep borewell system.</div>
        </div>
      </div>
    </section>

    <!-- 06. LOCATION & CONNECTIVITY SECTION -->
    <section class="brochure-section" id="location">
      <span class="section-tag">STRATEGIC ARTERIAL ACCESS</span>
      <h2 class="section-title">Location &amp; Connectivity</h2>
      <p class="section-subtitle">Situated in Gulmohar Colony, Kamatwada — offering rapid transit to Mumbai-Agra Highway, City Centre Mall, and educational institutions.</p>

      <div class="location-grid">
        <div class="location-map-box" data-zoom-src="assets/location-map.webp" title="Click to view full Location Map">
          <img src="assets/location-map.webp" alt="Shree Niketan Location Map" />
          <div class="plan-zoom-hint">&#128269; View Map</div>
        </div>

        <div class="landmarks-list">
          <div class="landmark-item">
            <div class="landmark-dot"></div>
            <div>
              <div class="landmark-title">Symbiosis School &amp; College</div>
              <div class="landmark-desc">Premier academic institutions situated within immediate walking distance.</div>
            </div>
          </div>
          <div class="landmark-item">
            <div class="landmark-dot"></div>
            <div>
              <div class="landmark-title">Trimurti Chowk &amp; Divya Adlabs</div>
              <div class="landmark-desc">Major lifestyle and entertainment intersection reachable in under 3 minutes.</div>
            </div>
          </div>
          <div class="landmark-item">
            <div class="landmark-dot"></div>
            <div>
              <div class="landmark-title">City Centre Mall &amp; Trimbak Road</div>
              <div class="landmark-desc">5 minutes to Nashik's premier retail, dining, and commercial nerve centres.</div>
            </div>
          </div>
          <div class="landmark-item">
            <div class="landmark-dot"></div>
            <div>
              <div class="landmark-title">Pathardi Phata &amp; Mumbai-Agra NH-3</div>
              <div class="landmark-desc">Swift arterial connection to Mumbai and Pune highways with zero traffic friction.</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 07. TEAM & CREDENTIALS SECTION -->
    <section class="brochure-section" id="credentials">
      <span class="section-tag">PROFESSIONAL CONSULTANTS</span>
      <h2 class="section-title">Leadership &amp; Advisory Team</h2>
      <p class="section-subtitle">Spearheaded by respected engineering, design, and legal stalwarts of Nashik.</p>

      <div class="team-grid">
        <div class="team-card">
          <div class="team-role">Promoters &amp; Developers</div>
          <div class="team-name">KALE B. M.</div>
          <div class="team-meta">Shreeyog Builders &amp; Land Developers<br/>Ph: 0253 2310351</div>
        </div>
        <div class="team-card">
          <div class="team-role">Project Architect</div>
          <div class="team-name">Ar. Umesh Bagul</div>
          <div class="team-meta">Bagul Architects, Nashik<br/>Ph: 0253 2579667</div>
        </div>
        <div class="team-card">
          <div class="team-role">R.C.C. Designer</div>
          <div class="team-name">Prasanna Bhore</div>
          <div class="team-meta">Structural Engineers, Nashik<br/>Ph: 0253 2313180</div>
        </div>
        <div class="team-card">
          <div class="team-role">Legal Advisor</div>
          <div class="team-name">Adv. Subodh M. Shah</div>
          <div class="team-meta">High Court &amp; Civil Advocate<br/>Ph: 0253 2312638</div>
        </div>
      </div>
    </section>

    <!-- 08. ORIGINAL BROCHURE GALLERY SECTION -->
    <section class="brochure-section" id="pdf-pages">
      <span class="section-tag">ARCHIVAL DOCUMENTATION</span>
      <h2 class="section-title">Original Brochure Gallery</h2>
      <p class="section-subtitle">Inspect the complete authentic brochure pages published at the project's inception.</p>

      <div class="gallery-grid">
        <div class="gallery-card" data-zoom-src="assets/page-1.webp">
          <img src="assets/page-1.webp" alt="Shree Niketan Brochure Page 01 - Cover" />
          <div class="gallery-caption">
            <span class="gallery-title">Page 01 &bull; Identity &amp; Cover</span>
            <span class="gallery-zoom-badge">&#128269; Enlarge</span>
          </div>
        </div>
        <div class="gallery-card" data-zoom-src="assets/page-2.webp">
          <img src="assets/page-2.webp" alt="Shree Niketan Brochure Page 02 - Elevation &amp; Amenities" />
          <div class="gallery-caption">
            <span class="gallery-title">Page 02 &bull; 3D Elevation &amp; Amenities</span>
            <span class="gallery-zoom-badge">&#128269; Enlarge</span>
          </div>
        </div>
        <div class="gallery-card" data-zoom-src="assets/page-3.webp">
          <img src="assets/page-3.webp" alt="Shree Niketan Brochure Page 03 - Layout &amp; Wing A Plan" />
          <div class="gallery-caption">
            <span class="gallery-title">Page 03 &bull; Ground Layout &amp; Wing A</span>
            <span class="gallery-zoom-badge">&#128269; Enlarge</span>
          </div>
        </div>
        <div class="gallery-card" data-zoom-src="assets/page-4.webp">
          <img src="assets/page-4.webp" alt="Shree Niketan Brochure Page 04 - Wing B Plan &amp; Map" />
          <div class="gallery-caption">
            <span class="gallery-title">Page 04 &bull; Wing B Plan &amp; Location Map</span>
            <span class="gallery-zoom-badge">&#128269; Enlarge</span>
          </div>
        </div>
        <div class="gallery-card" data-zoom-src="assets/page-5.webp">
          <img src="assets/page-5.webp" alt="Shree Niketan Brochure Page 05 - Team &amp; Credentials" />
          <div class="gallery-caption">
            <span class="gallery-title">Page 05 &bull; Credentials &amp; Contacts</span>
            <span class="gallery-zoom-badge">&#128269; Enlarge</span>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- LIGHTBOX MODAL -->
  <div class="lightbox-modal" id="imageLightbox">
    <button type="button" class="lightbox-close-btn" id="lightboxClose" aria-label="Close Lightbox">&times;</button>
    <img id="lightboxImg" src="" alt="Enlarged Brochure View" />
  </div>

  <script src="niketan-brochure.js"></script>
</body>
</html>
"""

with open('public/projects/shree-niketan/brochure/index.html', 'w', encoding='utf-8') as f:
    f.write(niketan_html)

print('Successfully generated Shree Niketan brochure files (HTML, CSS, JS).')


# -----------------------------------------------------------------------------
# 2. GENERATE SHREE CHINTAMANI BROCHURE
# -----------------------------------------------------------------------------

chintamani_css = """/* Shree Chintamani Digital Brochure Stylesheet - Heritage Maroon & Warm Amber */
:root {
  --sc-bg: #100e0e;
  --sc-card-bg: #181414;
  --sc-card-hover: #221c1c;
  --sc-border: rgba(212, 167, 88, 0.22);
  --sc-border-strong: rgba(212, 167, 88, 0.55);
  --sc-gold: #d4a758;
  --sc-gold-light: #ebd08d;
  --sc-maroon: #8e1f24;
  --sc-maroon-light: #b33238;
  --sc-text-main: #f5f2eb;
  --sc-text-muted: #aca59c;
  --sc-radius-sm: 8px;
  --sc-radius-md: 12px;
  --sc-radius-lg: 16px;
  --sc-shadow: 0 16px 36px rgba(0, 0, 0, 0.55);
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
  background-color: var(--sc-bg);
  color: var(--sc-text-main);
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-x: hidden;
}

body {
  background-color: var(--sc-bg);
  color: var(--sc-text-main);
  line-height: 1.65;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

h1, h2, h3, h4, .hero-title, .section-title, .sidebar-brand-title {
  font-family: 'Cinzel', serif;
  letter-spacing: 0.02em;
  color: #ffffff;
}

a {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s ease;
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: var(--sc-bg);
}
::-webkit-scrollbar-thumb {
  background: rgba(212, 167, 88, 0.35);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--sc-gold);
}

/* SIDEBAR */
.brochure-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 290px;
  background: #141111;
  border-right: 1px solid var(--sc-border);
  padding: 2.2rem 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 100;
  overflow-y: auto;
}

.sidebar-header {
  margin-bottom: 2rem;
  text-align: center;
}

.sidebar-brand-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.sidebar-logo {
  max-width: 220px;
  max-height: 85px;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.6));
}

.sidebar-tagline {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--sc-gold);
  font-weight: 600;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex-grow: 1;
}

.sidebar-nav-link {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.7rem 0.9rem;
  border-radius: var(--sc-radius-sm);
  color: var(--sc-text-muted);
  font-size: 0.88rem;
  font-weight: 500;
  transition: all 0.25s ease;
  border-left: 2px solid transparent;
}

.sidebar-nav-link:hover,
.sidebar-nav-link.active {
  color: #ffffff;
  background: rgba(212, 167, 88, 0.12);
  border-left-color: var(--sc-gold);
  padding-left: 1.1rem;
}

.nav-link-num {
  font-family: 'Cinzel', serif;
  font-size: 0.78rem;
  color: var(--sc-gold);
  font-weight: 700;
}

.sidebar-footer {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sidebar-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1rem;
  border-radius: var(--sc-radius-sm);
  font-size: 0.86rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
}

.sidebar-action-btn--primary {
  background: linear-gradient(135deg, #d4a758 0%, #a4782b 100%);
  color: #121010;
  box-shadow: 0 4px 15px rgba(212, 167, 88, 0.35);
}

.sidebar-action-btn--primary:hover {
  background: linear-gradient(135deg, #ebd08d 0%, #bf903d 100%);
  box-shadow: 0 6px 20px rgba(212, 167, 88, 0.5);
}

.sidebar-action-btn--outline {
  border: 1px solid var(--sc-border);
  color: var(--sc-text-muted);
  background: transparent;
}

.sidebar-action-btn--outline:hover {
  border-color: var(--sc-gold);
  color: #ffffff;
  background: rgba(212, 167, 88, 0.08);
}

/* MOBILE TOPBAR */
.mobile-topbar {
  display: none;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 68px;
  background: #141111;
  border-bottom: 1px solid var(--sc-border);
  padding: 0 1.2rem;
  align-items: center;
  justify-content: space-between;
  z-index: 200;
}

.mobile-logo {
  max-height: 48px;
  max-width: 170px;
  object-fit: contain;
}

.mobile-menu-btn {
  background: transparent;
  border: 1px solid var(--sc-border);
  color: var(--sc-gold);
  padding: 0.5rem 0.9rem;
  border-radius: var(--sc-radius-sm);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.mobile-drawer {
  display: none;
  position: fixed;
  top: 68px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(16, 14, 14, 0.98);
  backdrop-filter: blur(12px);
  padding: 1.5rem;
  overflow-y: auto;
  z-index: 199;
  flex-direction: column;
  gap: 0.6rem;
}

.mobile-drawer.open {
  display: flex;
}

/* MAIN CONTENT */
.brochure-main {
  margin-left: 290px;
  padding: 3rem 4rem 6rem;
  max-width: 1350px;
  width: calc(100% - 290px);
}

.brochure-section {
  margin-bottom: 5.5rem;
  scroll-margin-top: 2rem;
}

.section-tag {
  display: inline-block;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: var(--sc-gold);
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: clamp(1.8rem, 3.2vw, 2.6rem);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.section-subtitle {
  color: var(--sc-text-muted);
  font-size: 1.05rem;
  max-width: 780px;
  margin-bottom: 2.2rem;
  line-height: 1.6;
}

/* HERO */
.hero-section {
  margin-bottom: 5rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 3rem;
  align-items: center;
}

.hero-badges-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.2rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.85rem;
  border-radius: 30px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-badge--status {
  background: rgba(34, 197, 94, 0.15);
  color: #4ade80;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.hero-badge--luxury {
  background: rgba(142, 31, 36, 0.25);
  color: #fca5a5;
  border: 1px solid rgba(142, 31, 36, 0.5);
}

.hero-badge--rera {
  background: rgba(212, 167, 88, 0.15);
  color: var(--sc-gold);
  border: 1px solid var(--sc-border);
}

.hero-title {
  font-size: clamp(2.4rem, 4.5vw, 3.4rem);
  margin-bottom: 0.5rem;
  color: #ffffff;
}

.hero-tagline {
  font-size: 1.1rem;
  color: var(--sc-gold);
  font-style: italic;
  margin-bottom: 1.4rem;
  font-weight: 500;
}

.hero-desc {
  color: var(--sc-text-muted);
  font-size: 0.98rem;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.hero-stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2.2rem;
}

.hero-stat-card {
  background: var(--sc-card-bg);
  border: 1px solid var(--sc-border);
  border-radius: var(--sc-radius-sm);
  padding: 1.1rem 1.3rem;
  transition: all 0.3s ease;
}

.hero-stat-card:hover {
  border-color: var(--sc-gold);
  background: var(--sc-card-hover);
  transform: translateY(-3px);
}

.hero-stat-num {
  font-family: 'Cinzel', serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--sc-gold);
  margin-bottom: 0.2rem;
}

.hero-stat-label {
  font-size: 0.8rem;
  color: var(--sc-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.hero-ctas-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.hero-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1.6rem;
  border-radius: var(--sc-radius-sm);
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hero-cta-btn--primary {
  background: linear-gradient(135deg, #d4a758 0%, #a4782b 100%);
  color: #121010;
  box-shadow: 0 4px 18px rgba(212, 167, 88, 0.35);
}

.hero-cta-btn--primary:hover {
  background: linear-gradient(135deg, #ebd08d 0%, #bf903d 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(212, 167, 88, 0.5);
}

.hero-cta-btn--secondary {
  border: 1px solid var(--sc-border);
  color: #ffffff;
  background: rgba(212, 167, 88, 0.08);
}

.hero-cta-btn--secondary:hover {
  border-color: var(--sc-gold);
  background: rgba(212, 167, 88, 0.16);
  transform: translateY(-2px);
}

.hero-media-wrapper {
  position: relative;
  border-radius: var(--sc-radius-md);
  overflow: hidden;
  border: 1px solid var(--sc-border);
  box-shadow: var(--sc-shadow);
  background: #1b1717;
  cursor: pointer;
}

.hero-media-wrapper img {
  width: 100%;
  height: 100%;
  max-height: 480px;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}

.hero-media-wrapper:hover img {
  transform: scale(1.03);
}

.hero-media-badge {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(16, 14, 14, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid var(--sc-border);
  color: var(--sc-gold);
  padding: 0.4rem 0.8rem;
  border-radius: var(--sc-radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

/* PILLARS */
.pillar-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.pillar-card {
  background: var(--sc-card-bg);
  border: 1px solid var(--sc-border);
  border-radius: var(--sc-radius-md);
  padding: 1.8rem 1.4rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.pillar-card:hover {
  background: var(--sc-card-hover);
  border-color: var(--sc-gold);
  transform: translateY(-5px);
  box-shadow: var(--sc-shadow);
}

.pillar-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--sc-maroon), var(--sc-gold));
  opacity: 0.7;
}

.pillar-num {
  font-family: 'Cinzel', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--sc-gold);
  margin-bottom: 0.8rem;
}

.pillar-title {
  font-size: 1.05rem;
  margin-bottom: 0.6rem;
  color: #ffffff;
}

.pillar-text {
  font-size: 0.88rem;
  color: var(--sc-text-muted);
  line-height: 1.6;
}

/* AMENITIES */
.amenities-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.amenity-card {
  background: var(--sc-card-bg);
  border: 1px solid var(--sc-border);
  border-radius: var(--sc-radius-md);
  padding: 1.6rem;
  display: flex;
  gap: 1.2rem;
  align-items: flex-start;
  transition: all 0.3s ease;
}

.amenity-card:hover {
  border-color: var(--sc-gold);
  background: var(--sc-card-hover);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.4);
}

.amenity-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(212, 167, 88, 0.12);
  border: 1px solid var(--sc-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--sc-gold);
  flex-shrink: 0;
}

.amenity-info h4 {
  font-size: 1rem;
  color: #ffffff;
  margin-bottom: 0.4rem;
}

.amenity-info p {
  font-size: 0.86rem;
  color: var(--sc-text-muted);
  line-height: 1.5;
}

/* PLANS */
.plans-wrapper {
  background: var(--sc-card-bg);
  border: 1px solid var(--sc-border);
  border-radius: var(--sc-radius-md);
  padding: 2rem;
  box-shadow: var(--sc-shadow);
}

.plan-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--sc-border);
  padding-bottom: 1.2rem;
}

.plan-tab-btn {
  background: rgba(212, 167, 88, 0.08);
  border: 1px solid var(--sc-border);
  color: var(--sc-text-muted);
  padding: 0.7rem 1.4rem;
  border-radius: var(--sc-radius-sm);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.plan-tab-btn.active,
.plan-tab-btn:hover {
  background: linear-gradient(135deg, #d4a758 0%, #a4782b 100%);
  color: #121010;
  border-color: var(--sc-gold);
}

.plan-tab-pane {
  display: none;
}

.plan-tab-pane.active {
  display: block;
}

.plan-image-box {
  position: relative;
  background: #ffffff;
  border-radius: var(--sc-radius-sm);
  overflow: hidden;
  margin-bottom: 1.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.plan-image-box img {
  max-width: 100%;
  max-height: 540px;
  width: auto;
  height: auto;
  object-fit: contain;
  transition: transform 0.4s ease;
}

.plan-image-box:hover img {
  transform: scale(1.02);
}

.plan-zoom-hint {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(18, 16, 16, 0.85);
  color: var(--sc-gold);
  border: 1px solid var(--sc-border);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.plan-details-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.plan-details-table th,
.plan-details-table td {
  padding: 0.8rem 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(212, 167, 88, 0.15);
}

.plan-details-table th {
  color: var(--sc-gold);
  font-family: 'Cinzel', serif;
  font-size: 0.85rem;
  background: rgba(212, 167, 88, 0.05);
}

.plan-details-table td {
  color: var(--sc-text-main);
}

/* SPECS */
.specs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.spec-card {
  background: var(--sc-card-bg);
  border: 1px solid var(--sc-border);
  border-radius: var(--sc-radius-md);
  padding: 1.6rem;
  transition: all 0.3s ease;
}

.spec-card:hover {
  background: var(--sc-card-hover);
  border-color: var(--sc-gold);
  transform: translateY(-3px);
}

.spec-category {
  font-family: 'Cinzel', serif;
  font-size: 0.88rem;
  color: var(--sc-gold);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.spec-detail {
  font-size: 0.88rem;
  color: var(--sc-text-muted);
  line-height: 1.6;
}

/* LOCATION */
.location-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: center;
}

.location-map-box {
  position: relative;
  border-radius: var(--sc-radius-md);
  overflow: hidden;
  border: 1px solid var(--sc-border);
  background: #ffffff;
  padding: 1rem;
  cursor: pointer;
}

.location-map-box img {
  width: 100%;
  max-height: 480px;
  object-fit: contain;
  display: block;
}

.landmarks-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.landmark-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: var(--sc-card-bg);
  border: 1px solid var(--sc-border);
  border-radius: var(--sc-radius-sm);
  padding: 1rem 1.2rem;
  transition: all 0.3s ease;
}

.landmark-item:hover {
  border-color: var(--sc-gold);
  transform: translateX(4px);
}

.landmark-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--sc-gold);
  margin-top: 0.4rem;
  flex-shrink: 0;
}

.landmark-title {
  font-weight: 600;
  color: #ffffff;
  font-size: 0.95rem;
  margin-bottom: 0.2rem;
}

.landmark-desc {
  font-size: 0.84rem;
  color: var(--sc-text-muted);
}

/* TEAM */
.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.team-card {
  background: var(--sc-card-bg);
  border: 1px solid var(--sc-border);
  border-radius: var(--sc-radius-md);
  padding: 1.6rem 1.3rem;
  text-align: center;
  transition: all 0.3s ease;
}

.team-card:hover {
  border-color: var(--sc-gold);
  background: var(--sc-card-hover);
  transform: translateY(-4px);
}

.team-role {
  font-size: 0.78rem;
  color: var(--sc-gold);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.team-name {
  font-family: 'Cinzel', serif;
  font-size: 1.15rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.team-meta {
  font-size: 0.84rem;
  color: var(--sc-text-muted);
}

/* GALLERY */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.gallery-card {
  background: var(--sc-card-bg);
  border: 1px solid var(--sc-border);
  border-radius: var(--sc-radius-md);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.gallery-card:hover {
  border-color: var(--sc-gold);
  transform: translateY(-5px);
  box-shadow: var(--sc-shadow);
}

.gallery-card img {
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  display: block;
}

.gallery-caption {
  padding: 1rem 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--sc-border);
  background: #141111;
}

.gallery-title {
  font-size: 0.88rem;
  font-weight: 600;
  color: #ffffff;
}

.gallery-zoom-badge {
  font-size: 0.76rem;
  color: var(--sc-gold);
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

/* LIGHTBOX */
.lightbox-modal {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(10, 8, 8, 0.94);
  backdrop-filter: blur(14px);
  z-index: 999;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lightbox-modal.active {
  display: flex;
}

.lightbox-modal img {
  max-width: 95vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: var(--sc-radius-sm);
  box-shadow: 0 25px 60px rgba(0,0,0,0.9);
}

.lightbox-close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.8rem;
  background: transparent;
  border: 1px solid var(--sc-border);
  color: #ffffff;
  font-size: 1.6rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lightbox-close-btn:hover {
  background: var(--sc-gold);
  color: #100e0e;
  border-color: var(--sc-gold);
}

/* RESPONSIVE */
@media (max-width: 1200px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
  .pillar-grid, .specs-grid, .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .amenities-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1024px) {
  .brochure-sidebar {
    display: none;
  }
  .mobile-topbar {
    display: flex;
  }
  .brochure-main {
    margin-left: 0;
    width: 100%;
    padding: 2rem 1.5rem 4rem;
  }
  .location-grid {
    grid-template-columns: 1fr;
  }
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .hero-stats-grid {
    grid-template-columns: 1fr;
  }
  .pillar-grid, .specs-grid, .amenities-grid, .team-grid {
    grid-template-columns: 1fr;
  }
  .hero-ctas-row {
    flex-direction: column;
  }
  .hero-cta-btn {
    width: 100%;
    justify-content: center;
  }
}
"""

with open('public/projects/shree-chintamani/brochure/chintamani-brochure.css', 'w', encoding='utf-8') as f:
    f.write(chintamani_css)

chintamani_js = """// Shree Chintamani Digital Brochure Interactions
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileMenuToggle && mobileDrawer) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileMenuToggle.innerHTML = isOpen ? '<span>Close</span> &times;' : '<span>Menu</span> &#9776;';
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuToggle.innerHTML = '<span>Menu</span> &#9776;';
      });
    });
  }

  const tabBtns = document.querySelectorAll('.plan-tab-btn');
  const tabPanes = document.querySelectorAll('.plan-tab-pane');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const target = this.getAttribute('data-target');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const pane = document.getElementById(target);
      if (pane) pane.classList.add('active');
    });
  });

  const lightboxModal = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('[data-zoom-src]').forEach(item => {
    item.addEventListener('click', function() {
      const src = this.getAttribute('data-zoom-src') || this.getAttribute('src');
      if (lightboxImg && lightboxModal && src) {
        lightboxImg.src = src;
        lightboxModal.classList.add('active');
      }
    });
  });

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', () => lightboxModal.classList.remove('active'));
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) lightboxModal.classList.remove('active');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') lightboxModal.classList.remove('active');
    });
  }

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar-nav-link');
  window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.pageYOffset >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
});
"""

with open('public/projects/shree-chintamani/brochure/chintamani-brochure.js', 'w', encoding='utf-8') as f:
    f.write(chintamani_js)

chintamani_html = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <base href="/projects/shree-chintamani/brochure/" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Shree Chintamani (श्री चिंतामणी) — Official Digital Brochure | Shreeyog Builders</title>
  <meta name="description" content="Explore Shree Chintamani by Shreeyog Builders &amp; Land Developers at Gangapur Road, Nashik. 2 &amp; 3 BHK luxurious apartments near Nirmala Convent, College Road, and Godapark." />

  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="chintamani-brochure.css" />
</head>
<body>

  <!-- MOBILE TOPBAR -->
  <div class="mobile-topbar">
    <a href="/projects" class="mobile-brand" title="Back to Shreeyog Projects">
      <img src="assets/logo.png" alt="Shree Chintamani Logo" class="mobile-logo" />
    </a>
    <button type="button" class="mobile-menu-btn" id="mobileMenuToggle" aria-label="Toggle Navigation">
      <span>Menu</span> &#9776;
    </button>
  </div>

  <!-- MOBILE NAVIGATION DRAWER -->
  <div class="mobile-drawer" id="mobileDrawer">
    <a href="#overview" class="sidebar-nav-link active"><span class="nav-link-num">01</span> Overview &amp; Identity</a>
    <a href="#vision" class="sidebar-nav-link"><span class="nav-link-num">02</span> Vision &amp; Legacy</a>
    <a href="#amenities" class="sidebar-nav-link"><span class="nav-link-num">03</span> Amenities &amp; Features</a>
    <a href="#floorplans" class="sidebar-nav-link"><span class="nav-link-num">04</span> Master Floor Plans</a>
    <a href="#specifications" class="sidebar-nav-link"><span class="nav-link-num">05</span> Specifications</a>
    <a href="#location" class="sidebar-nav-link"><span class="nav-link-num">06</span> Location &amp; Connectivity</a>
    <a href="#credentials" class="sidebar-nav-link"><span class="nav-link-num">07</span> Consultants &amp; Team</a>
    <a href="#pdf-pages" class="sidebar-nav-link"><span class="nav-link-num">08</span> Original Brochure Gallery</a>

    <div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.8rem;">
      <a href="/brochures/shree-chintamani-brochure.pdf" download="Shree-Chintamani-Brochure.pdf" class="sidebar-action-btn sidebar-action-btn--primary">
        &darr; Download PDF Brochure
      </a>
      <a href="/projects" class="sidebar-action-btn sidebar-action-btn--outline">
        &larr; Return to Projects
      </a>
    </div>
  </div>

  <!-- DESKTOP FIXED SIDEBAR -->
  <aside class="brochure-sidebar">
    <div class="sidebar-header">
      <a href="/projects" class="sidebar-brand-link" title="Back to Shreeyog Projects">
        <img src="assets/logo.png" alt="Shree Chintamani Logo" class="sidebar-logo" />
        <span class="sidebar-tagline">Gangapur Road, Nashik</span>
      </a>
    </div>

    <nav class="sidebar-nav" aria-label="Brochure Sections">
      <a href="#overview" class="sidebar-nav-link active"><span class="nav-link-num">01</span> Overview &amp; Identity</a>
      <a href="#vision" class="sidebar-nav-link"><span class="nav-link-num">02</span> Vision &amp; Legacy</a>
      <a href="#amenities" class="sidebar-nav-link"><span class="nav-link-num">03</span> Amenities &amp; Features</a>
      <a href="#floorplans" class="sidebar-nav-link"><span class="nav-link-num">04</span> Master Floor Plans</a>
      <a href="#specifications" class="sidebar-nav-link"><span class="nav-link-num">05</span> Specifications</a>
      <a href="#location" class="sidebar-nav-link"><span class="nav-link-num">06</span> Location &amp; Connectivity</a>
      <a href="#credentials" class="sidebar-nav-link"><span class="nav-link-num">07</span> Consultants &amp; Team</a>
      <a href="#pdf-pages" class="sidebar-nav-link"><span class="nav-link-num">08</span> Original Brochure Gallery</a>
    </nav>

    <div class="sidebar-footer">
      <a href="/brochures/shree-chintamani-brochure.pdf" download="Shree-Chintamani-Brochure.pdf" class="sidebar-action-btn sidebar-action-btn--primary">
        &darr; Download PDF Brochure
      </a>
      <a href="/projects" class="sidebar-action-btn sidebar-action-btn--outline">
        &larr; Return to Projects
      </a>
    </div>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="brochure-main">

    <!-- 01. OVERVIEW & HERO SECTION -->
    <section class="hero-section" id="overview">
      <div class="hero-grid">
        <div class="hero-content">
          <div class="hero-badges-row">
            <span class="hero-badge hero-badge--status">Completed Landmark</span>
            <span class="hero-badge hero-badge--luxury">2 &amp; 3 BHK Apartments</span>
            <span class="hero-badge hero-badge--rera">Gangapur Road, Nashik</span>
          </div>

          <h1 class="hero-title">Shree Chintamani</h1>
          <p class="hero-tagline">"The Prestigious Location for Your Home Fulfilled with Happiness.. Peace of Mind.. &amp; Prosperity !"</p>
          <p class="hero-desc">
            Situated at Datta Chowk, opposite Mauli Hotel and behind Siddhi Vinayak Apartments on Nirmala Convent Road in prime Gangapur Road, Nashik, <strong>Shree Chintamani (श्री चिंतामणी)</strong> is an exclusive completed residential community crafted by Shreeyog Builders &amp; Land Developers. Rising gracefully across Stilt + 5 floors, Shree Chintamani features 18 luxurious <strong>2 and 3 BHK family residences</strong> designed with Vastu compliance, allocated stilt parking, automatic passenger elevator, panoramic vistas of the Godavari River and Godapark, and 24-hour dual municipal and borewell water supply.
          </p>

          <div class="hero-stats-grid">
            <div class="hero-stat-card">
              <div class="hero-stat-num">Stilt + 5</div>
              <div class="hero-stat-label">Boutique Landmark with Elevator</div>
            </div>
            <div class="hero-stat-card">
              <div class="hero-stat-num">2 &amp; 3 BHK</div>
              <div class="hero-stat-label">18 Luxurious Family Residences</div>
            </div>
            <div class="hero-stat-card">
              <div class="hero-stat-num">Godapark View</div>
              <div class="hero-stat-label">Adjacent to Riverfront Green Corridor</div>
            </div>
            <div class="hero-stat-card">
              <div class="hero-stat-num">Gangapur Rd</div>
              <div class="hero-stat-label">Near Nirmala Convent &amp; College Road</div>
            </div>
          </div>

          <div class="hero-ctas-row">
            <a href="/brochures/shree-chintamani-brochure.pdf" download="Shree-Chintamani-Brochure.pdf" class="hero-cta-btn hero-cta-btn--primary">
              &darr; Download PDF Brochure
            </a>
            <a href="#floorplans" class="hero-cta-btn hero-cta-btn--secondary">
              View Master Floor Plans &rarr;
            </a>
          </div>
        </div>

        <div class="hero-media-wrapper" data-zoom-src="assets/elevation.webp" title="Click to view full architectural elevation">
          <img src="assets/elevation.webp" alt="Shree Chintamani 3D Building Elevation" />
          <div class="hero-media-badge">
            <span>&#128269; View Elevation</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 02. VISION & LEGACY SECTION -->
    <section class="brochure-section" id="vision">
      <span class="section-tag">ELITE PROVEN HERITAGE</span>
      <h2 class="section-title">Vision &amp; Architectural Legacy</h2>
      <p class="section-subtitle">Rooted in 19 years of verified excellence across Gangapur Road, Govind Nagar, and Indira Nagar — shaping serene living spaces that sink you with nature.</p>

      <div class="pillar-grid">
        <div class="pillar-card">
          <div class="pillar-num">01</div>
          <h3 class="pillar-title">19+ Years Trust</h3>
          <p class="pillar-text">Backed by nearly two decades of proven reliability, meticulous engineering, and timely completion across Nashik's most coveted residential nodes.</p>
        </div>
        <div class="pillar-card">
          <div class="pillar-num">02</div>
          <h3 class="pillar-title">Gangapur Road Elite</h3>
          <p class="pillar-text">Enviably positioned in one of Nashik's highest-value residential avenues, mere minutes from College Road, Canada Corner, and academic institutions.</p>
        </div>
        <div class="pillar-card">
          <div class="pillar-num">03</div>
          <h3 class="pillar-title">Nature &amp; Riverfront</h3>
          <p class="pillar-text">Direct visual and environmental harmony with the lush Godavari river greenbelt and tranquil Godapark promenades.</p>
        </div>
        <div class="pillar-card">
          <div class="pillar-num">04</div>
          <h3 class="pillar-title">Complete Vastu Flow</h3>
          <p class="pillar-text">Scientifically oriented layouts maximizing natural breezes, morning sunlight, and lifelong domestic prosperity.</p>
        </div>
      </div>
    </section>

    <!-- 03. AMENITIES SECTION -->
    <section class="brochure-section" id="amenities">
      <span class="section-tag">PREMIUM CONVENIENCES</span>
      <h2 class="section-title">Amenities &amp; Features</h2>
      <p class="section-subtitle">Engineered with high-grade fittings and reliable utilities for enduring comfort and peace of mind.</p>

      <div class="amenities-grid">
        <div class="amenity-card">
          <div class="amenity-icon">&#128663;</div>
          <div class="amenity-info">
            <h4>Allotted Stilt Parking</h4>
            <p>Designated covered parking bays on the ground stilt floor ensuring effortless access for every homeowner.</p>
          </div>
        </div>
        <div class="amenity-card">
          <div class="amenity-icon">&#128711;</div>
          <div class="amenity-info">
            <h4>Automatic Passenger Lift</h4>
            <p>Modern passenger elevator with emergency battery backup servicing all residential floors.</p>
          </div>
        </div>
        <div class="amenity-card">
          <div class="amenity-icon">&#128167;</div>
          <div class="amenity-info">
            <h4>24 Hours Dual Water</h4>
            <p>Continuous municipal corporation drinking water connection supplemented by an on-site deep borewell.</p>
          </div>
        </div>
        <div class="amenity-card">
          <div class="amenity-icon">&#129683;</div>
          <div class="amenity-info">
            <h4>Scenic Sit-Outs</h4>
            <p>Private sit-out balconies extending from living spaces offering tranquil cross-breezes and garden views.</p>
          </div>
        </div>
        <div class="amenity-card">
          <div class="amenity-icon">&#128225;</div>
          <div class="amenity-info">
            <h4>Cable &amp; Telephony</h4>
            <p>Pre-installed concealed conduits for television cable connections and telephone connectivity in living room.</p>
          </div>
        </div>
        <div class="amenity-card">
          <div class="amenity-icon">&#127795;</div>
          <div class="amenity-info">
            <h4>River Greenbelt</h4>
            <p>Unspoiled scenic greenery and serene Godapark walkways moments away from your front door.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 04. MASTER FLOOR PLANS SECTION -->
    <section class="brochure-section" id="floorplans">
      <span class="section-tag">ENGINEERED LAYOUTS</span>
      <h2 class="section-title">Master Floor Plans &amp; Views</h2>
      <p class="section-subtitle">Explore the Stilt to Fifth Floor master blueprints, Ground Floor demarcated parking, and river greenery views.</p>

      <div class="plans-wrapper">
        <div class="plan-tabs">
          <button type="button" class="plan-tab-btn active" data-target="tab-c-typical">Stilt to 5th Floor Plan (2 &amp; 3 BHK)</button>
          <button type="button" class="plan-tab-btn" data-target="tab-c-parking">Ground Floor Parking Layout</button>
          <button type="button" class="plan-tab-btn" data-target="tab-c-nature">River Greenery &amp; Godapark</button>
        </div>

        <div class="plan-tab-pane active" id="tab-c-typical">
          <div class="plan-image-box" data-zoom-src="assets/plan-typical.webp" title="Click to enlarge Typical Floor Plan">
            <img src="assets/plan-typical.webp" alt="Shree Chintamani Typical Floor Plan" />
            <div class="plan-zoom-hint">&#128269; Click to Enlarge Blueprint</div>
          </div>
          <table class="plan-details-table">
            <thead>
              <tr>
                <th>Flat Units</th>
                <th>Typology</th>
                <th>Key Dimensions</th>
                <th>Orientation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Flats 1, 4, 7, 10, 13, 16</td>
                <td>3 BHK Luxury Apartment</td>
                <td>Living 11'0"x17'0" &bull; Sit-out 7'0"x12'3" &bull; Kit/Din 9'6"x17'0" &bull; Bed 1 12'7"x12'0" &bull; Bed 2 11'0"x12'0" &bull; Bed 3 10'8"x12'0"</td>
                <td>Facing Road Frontage</td>
              </tr>
              <tr>
                <td>Flats 3, 6, 9, 12, 15, 18</td>
                <td>3 BHK Luxury Apartment</td>
                <td>Living 11'0"x17'0" &bull; Sit-out 7'0"x12'3" &bull; Kit/Din 9'6"x17'0" &bull; Bed 1 12'7"x12'0" &bull; Bed 2 11'0"x12'0" &bull; Bed 3 10'8"x12'0"</td>
                <td>Facing Road Frontage</td>
              </tr>
              <tr>
                <td>Flats 2, 5, 8, 11, 14, 17</td>
                <td>2 BHK Luxury Apartment</td>
                <td>Living 16'0"x11'0" &bull; Sit-out 12'4"x6'6" &bull; Kit/Din 16'0"x9'0" &bull; Utility 4'1"x9'4" &bull; Bed 1 11'0"x12'0" &bull; Bed 2 11'0"x12'0"</td>
                <td>Facing Garden &amp; River Greenery</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="plan-tab-pane" id="tab-c-parking">
          <div class="plan-image-box" data-zoom-src="assets/plan-parking.webp" title="Click to enlarge Ground Parking Plan">
            <img src="assets/plan-parking.webp" alt="Shree Chintamani Ground Parking Floor Plan" />
            <div class="plan-zoom-hint">&#128269; Click to Enlarge Blueprint</div>
          </div>
          <table class="plan-details-table">
            <thead>
              <tr>
                <th>Sector</th>
                <th>Capacity</th>
                <th>Features</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ground Stilt Parking</td>
                <td>18 Demarcated Vehicle Bays</td>
                <td>Ample turning radius, perimeter garden setback, direct central elevator core &amp; staircase</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="plan-tab-pane" id="tab-c-nature">
          <div class="plan-image-box" data-zoom-src="assets/godapark-nature.webp" title="Click to enlarge Godapark River Greenery">
            <img src="assets/godapark-nature.webp" alt="Shree Chintamani Surrounding Nature - Godapark and Godavari River" />
            <div class="plan-zoom-hint">&#128269; View Nature Photograph</div>
          </div>
          <p style="font-size: 0.9rem; color: var(--sc-text-muted); margin-top: 1rem; text-align: center;">
            <em>Actual photograph captured from the project vicinity — tranquil Godavari riverbank and lush Godapark tree cover.</em>
          </p>
        </div>
      </div>
    </section>

    <!-- 05. SPECIFICATIONS SECTION -->
    <section class="brochure-section" id="specifications">
      <span class="section-tag">CONSTRUCTION RIGOUR</span>
      <h2 class="section-title">Technical Specifications</h2>
      <p class="section-subtitle">Built with uncompromising structural materials and proven architectural craftsmanship.</p>

      <div class="specs-grid">
        <div class="spec-card">
          <div class="spec-category">&#9670; Structure</div>
          <div class="spec-detail">Earthquake resistant R.C.C. frame structure designed to rigorous seismic safety standards.</div>
        </div>
        <div class="spec-card">
          <div class="spec-category">&#9670; Brick Work</div>
          <div class="spec-detail">External perimeter walls 6" thick and internal partition walls 4.5" thick brick masonry.</div>
        </div>
        <div class="spec-card">
          <div class="spec-category">&#9670; Plaster &amp; Paint</div>
          <div class="spec-detail">Double coat external plaster with semi-acrylic paint; Neeru-finish internal plaster with Asian Oil Bound Distemper.</div>
        </div>
        <div class="spec-card">
          <div class="spec-category">&#9670; Flooring</div>
          <div class="spec-detail">Good quality 2' x 2' Johnson Vitrified tile flooring uniformly laid across the entire flat.</div>
        </div>
        <div class="spec-card">
          <div class="spec-category">&#9670; Kitchen Platform</div>
          <div class="spec-detail">Granite kitchen platform (G20) with stainless steel sink and 4' high glazed ceramic tile dado.</div>
        </div>
        <div class="spec-card">
          <div class="spec-category">&#9670; Aluminium Windows</div>
          <div class="spec-detail">3-track powder-coated aluminium sliding windows with mosquito netting, safety M.S. grills &amp; marble sills.</div>
        </div>
        <div class="spec-card">
          <div class="spec-category">&#9670; Doors &amp; Frames</div>
          <div class="spec-detail">Laminated entrance main door with brass hardware and Night Latch; waterproof flush internal doors.</div>
        </div>
        <div class="spec-card">
          <div class="spec-category">&#9670; Bath &amp; Toilet</div>
          <div class="spec-detail">7' height glazed wall ceramic tiles; PVC doors with marble frames; concealed plumbing with quality fittings &amp; wall mixer.</div>
        </div>
        <div class="spec-card">
          <div class="spec-category">&#9670; Electrification</div>
          <div class="spec-detail">Concealed copper wiring with adequate electrical points, TV socket, and telephone connection in living room.</div>
        </div>
        <div class="spec-card">
          <div class="spec-category">&#9670; Parking</div>
          <div class="spec-detail">Separate allocated parking space demarcated for each individual residence on ground stilt level.</div>
        </div>
        <div class="spec-card">
          <div class="spec-category">&#9670; Water Supply</div>
          <div class="spec-detail">24-hour dual water supply from Nashik Municipal Corporation mains and reliable deep borewell system.</div>
        </div>
        <div class="spec-card">
          <div class="spec-category">&#9670; Vertical Transit</div>
          <div class="spec-detail">Modern automatic passenger elevator servicing all residential floors with safety battery backup.</div>
        </div>
      </div>
    </section>

    <!-- 06. LOCATION & CONNECTIVITY SECTION -->
    <section class="brochure-section" id="location">
      <span class="section-tag">GANGAPUR ROAD PRECINCT</span>
      <h2 class="section-title">Location &amp; Connectivity</h2>
      <p class="section-subtitle">Located at Datta Chowk on Nirmala Convent Road, Gangapur Road — seamlessly connected to Nashik's finest cultural, educational, and commercial centers.</p>

      <div class="location-grid">
        <div class="location-map-box" data-zoom-src="assets/location-map.webp" title="Click to view full Location Map">
          <img src="assets/location-map.webp" alt="Shree Chintamani Location Map" />
          <div class="plan-zoom-hint">&#128269; View Map</div>
        </div>

        <div class="landmarks-list">
          <div class="landmark-item">
            <div class="landmark-dot"></div>
            <div>
              <div class="landmark-title">Nirmala Convent High School</div>
              <div class="landmark-desc">Prestigious educational institute situated just 200 meters from the property.</div>
            </div>
          </div>
          <div class="landmark-item">
            <div class="landmark-dot"></div>
            <div>
              <div class="landmark-title">College Road &amp; Canada Corner</div>
              <div class="landmark-desc">Nashik's premier dining, shopping, and cafe district reachable in under 4 minutes.</div>
            </div>
          </div>
          <div class="landmark-item">
            <div class="landmark-dot"></div>
            <div>
              <div class="landmark-title">Old Gangapur Naka &amp; Ashok Stambh</div>
              <div class="landmark-desc">Direct connectivity to core municipal centers and business hubs of old and new Nashik.</div>
            </div>
          </div>
          <div class="landmark-item">
            <div class="landmark-dot"></div>
            <div>
              <div class="landmark-title">Godavari River &amp; Godapark</div>
              <div class="landmark-desc">Picturesque riverfront promenades and fresh environmental breezes right behind the enclave.</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 07. TEAM & CREDENTIALS SECTION -->
    <section class="brochure-section" id="credentials">
      <span class="section-tag">DEVELOPER &amp; CONSULTANTS</span>
      <h2 class="section-title">Leadership &amp; Advisory Team</h2>
      <p class="section-subtitle">Guided by thirty years of steadfast building tradition and high professional integrity.</p>

      <div class="team-grid">
        <div class="team-card">
          <div class="team-role">Promoters &amp; Developers</div>
          <div class="team-name">KALE B. M.</div>
          <div class="team-meta">Shreeyog Builders &amp; Land Developers<br/>Ph: 0253 2310351</div>
        </div>
        <div class="team-card">
          <div class="team-role">Project Architect</div>
          <div class="team-name">Ar. Umesh Bagul</div>
          <div class="team-meta">Bagul Architects, Nashik<br/>Ph: 0253 2579667</div>
        </div>
        <div class="team-card">
          <div class="team-role">R.C.C. Designer</div>
          <div class="team-name">Prasanna Bhore</div>
          <div class="team-meta">Structural Engineers, Nashik<br/>Ph: 0253 2313180</div>
        </div>
        <div class="team-card">
          <div class="team-role">Legal Advisor</div>
          <div class="team-name">Adv. Subodh M. Shah</div>
          <div class="team-meta">High Court &amp; Civil Advocate<br/>Ph: 0253 2312638</div>
        </div>
      </div>
    </section>

    <!-- 08. ORIGINAL BROCHURE GALLERY SECTION -->
    <section class="brochure-section" id="pdf-pages">
      <span class="section-tag">ARCHIVAL DOCUMENTATION</span>
      <h2 class="section-title">Original Brochure Gallery</h2>
      <p class="section-subtitle">Examine the authentic brochure spreads published during the launch of Shree Chintamani.</p>

      <div class="gallery-grid">
        <div class="gallery-card" data-zoom-src="assets/page-1.webp">
          <img src="assets/page-1.webp" alt="Shree Chintamani Brochure Page 01 - Cover &amp; Location Map" />
          <div class="gallery-caption">
            <span class="gallery-title">Page 01 &bull; Cover, Location Map &amp; Team</span>
            <span class="gallery-zoom-badge">&#128269; Enlarge</span>
          </div>
        </div>
        <div class="gallery-card" data-zoom-src="assets/page-2.webp">
          <img src="assets/page-2.webp" alt="Shree Chintamani Brochure Page 02 - Vision &amp; Typical Floor Plan" />
          <div class="gallery-caption">
            <span class="gallery-title">Page 02 &bull; Vision &amp; Typical Floor Plan</span>
            <span class="gallery-zoom-badge">&#128269; Enlarge</span>
          </div>
        </div>
        <div class="gallery-card" data-zoom-src="assets/page-3.webp">
          <img src="assets/page-3.webp" alt="Shree Chintamani Brochure Page 03 - Amenities &amp; 3D Elevation" />
          <div class="gallery-caption">
            <span class="gallery-title">Page 03 &bull; Amenities &amp; 3D Elevation</span>
            <span class="gallery-zoom-badge">&#128269; Enlarge</span>
          </div>
        </div>
        <div class="gallery-card" data-zoom-src="assets/page-4.webp">
          <img src="assets/page-4.webp" alt="Shree Chintamani Brochure Page 04 - Ground Parking &amp; Nature View" />
          <div class="gallery-caption">
            <span class="gallery-title">Page 04 &bull; Ground Parking &amp; River Greenery</span>
            <span class="gallery-zoom-badge">&#128269; Enlarge</span>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- LIGHTBOX MODAL -->
  <div class="lightbox-modal" id="imageLightbox">
    <button type="button" class="lightbox-close-btn" id="lightboxClose" aria-label="Close Lightbox">&times;</button>
    <img id="lightboxImg" src="" alt="Enlarged Brochure View" />
  </div>

  <script src="chintamani-brochure.js"></script>
</body>
</html>
"""

with open('public/projects/shree-chintamani/brochure/index.html', 'w', encoding='utf-8') as f:
    f.write(chintamani_html)

print('Successfully generated Shree Chintamani brochure files (HTML, CSS, JS).')
