# -*- coding: utf-8 -*-
"""
Fixes oversized layout and scaling issues in:
1. Shree Samarth
2. Shree Vinayak
3. Shree Nisarg

Ensures floor plans fit neatly, images maintain aspect ratio with proper containment,
gallery cards show full scanned pages without clipping or stretching,
zoom lightbox modal works properly, and responsive scaling is clean across desktop, tablet, and mobile.
"""
import os

def generate_brochure_css(prefix, accent_color, gold_color, bg_color, card_bg):
    return f"""/* ==========================================================================
   {prefix.upper()} DIGITAL BROCHURE STYLESHEET
   Clean, balanced luxury layout with proper image containment & responsive scaling
   ========================================================================== */
:root {{
  --{prefix}-bg: {bg_color};
  --{prefix}-card-bg: {card_bg};
  --{prefix}-card-hover: rgba(255, 255, 255, 0.04);
  --{prefix}-border: rgba(200, 157, 85, 0.22);
  --{prefix}-border-strong: rgba(200, 157, 85, 0.5);
  --{prefix}-gold: {gold_color};
  --{prefix}-gold-light: #dfba7c;
  --{prefix}-accent: {accent_color};
  --{prefix}-text-main: #f5f2eb;
  --{prefix}-text-muted: #aca59c;
  --{prefix}-radius-sm: 8px;
  --{prefix}-radius-md: 12px;
  --{prefix}-shadow: 0 16px 36px rgba(0, 0, 0, 0.55);
  --sidebar-w: 280px;
}}

*, *::before, *::after {{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}}

html {{
  scroll-behavior: smooth;
  font-size: 16px;
  background-color: var(--{prefix}-bg);
  color: var(--{prefix}-text-main);
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-x: hidden;
  max-width: 100vw;
}}

body {{
  background-color: var(--{prefix}-bg);
  color: var(--{prefix}-text-main);
  line-height: 1.6;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  max-width: 100vw;
}}

h1, h2, h3, h4, .hero-title, .section-title, .sidebar-brand-title {{
  font-family: 'Cinzel', serif;
  letter-spacing: 0.02em;
  color: #ffffff;
}}

a {{
  color: inherit;
  text-decoration: none;
  transition: all 0.25s ease;
}}

::-webkit-scrollbar {{
  width: 8px;
}}
::-webkit-scrollbar-track {{
  background: var(--{prefix}-bg);
}}
::-webkit-scrollbar-thumb {{
  background: rgba(200, 157, 85, 0.35);
  border-radius: 4px;
}}
::-webkit-scrollbar-thumb:hover {{
  background: var(--{prefix}-gold);
}}

/* ==========================================================================
   DESKTOP FIXED SIDEBAR
   ========================================================================== */
.brochure-sidebar {{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--sidebar-w);
  background: rgba(14, 12, 14, 0.96);
  border-right: 1px solid var(--{prefix}-border);
  display: flex;
  flex-direction: column;
  padding: 2rem 1.4rem;
  z-index: 100;
  overflow-y: auto;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.4);
}}

.sidebar-brand-wrapper {{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 1.4rem;
  border-bottom: 1px solid var(--{prefix}-border);
  margin-bottom: 1.2rem;
}}

.sidebar-back-link {{
  align-self: flex-start;
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--{prefix}-gold);
  margin-bottom: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
}}
.sidebar-back-link:hover {{
  color: #ffffff;
  transform: translateX(-3px);
}}

.sidebar-logo-container {{
  width: 100%;
  max-width: 170px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.8rem;
}}

.sidebar-project-logo {{
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
}}

.sidebar-brand-title {{
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 0.2rem;
}}

.sidebar-brand-meta {{
  font-size: 0.74rem;
  color: var(--{prefix}-text-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}}

.sidebar-nav {{
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
  margin-bottom: 1.4rem;
}}

.sidebar-nav-link {{
  display: flex;
  align-items: center;
  padding: 0.55rem 0.9rem;
  border-radius: var(--{prefix}-radius-sm);
  font-size: 0.84rem;
  color: var(--{prefix}-text-muted);
  font-weight: 500;
  transition: all 0.2s ease;
}}

.sidebar-nav-link:hover,
.sidebar-nav-link.active {{
  background: rgba(200, 157, 85, 0.12);
  color: var(--{prefix}-gold);
  border-left: 3px solid var(--{prefix}-gold);
  padding-left: 0.8rem;
}}

.sidebar-actions {{
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding-top: 1rem;
  border-top: 1px solid var(--{prefix}-border);
}}

.sidebar-action-btn {{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 1rem;
  border-radius: var(--{prefix}-radius-sm);
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
}}

.sidebar-action-btn--primary {{
  background: linear-gradient(135deg, var(--{prefix}-gold) 0%, #9e7534 100%);
  color: #121014;
  box-shadow: 0 4px 14px rgba(200, 157, 85, 0.3);
}}
.sidebar-action-btn--primary:hover {{
  background: linear-gradient(135deg, #dfba7c 0%, #b88a42 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(200, 157, 85, 0.45);
}}

.sidebar-action-btn--outline {{
  border: 1px solid var(--{prefix}-border);
  color: #ffffff;
  background: rgba(200, 157, 85, 0.06);
}}
.sidebar-action-btn--outline:hover {{
  border-color: var(--{prefix}-gold);
  color: #ffffff;
  background: rgba(200, 157, 85, 0.12);
}}

/* ==========================================================================
   MOBILE TOPBAR & DRAWER
   ========================================================================== */
.mobile-topbar {{
  display: none;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: rgba(14, 12, 14, 0.98);
  border-bottom: 1px solid var(--{prefix}-border);
  padding: 0 1.2rem;
  align-items: center;
  justify-content: space-between;
  z-index: 200;
  backdrop-filter: blur(8px);
}}

.mobile-logo {{
  max-height: 44px;
  max-width: 150px;
  object-fit: contain;
}}

.mobile-menu-btn {{
  background: transparent;
  border: 1px solid var(--{prefix}-border);
  color: var(--{prefix}-gold);
  padding: 0.45rem 0.85rem;
  border-radius: var(--{prefix}-radius-sm);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}}

.mobile-drawer {{
  display: none;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(14, 12, 14, 0.98);
  backdrop-filter: blur(12px);
  padding: 1.5rem;
  overflow-y: auto;
  z-index: 199;
  flex-direction: column;
  gap: 0.5rem;
}}
.mobile-drawer.open {{
  display: flex;
}}

/* ==========================================================================
   MAIN CONTENT AREA (BALANCED SCALING & CONTAINMENT)
   ========================================================================== */
.brochure-main {{
  margin-left: var(--sidebar-w);
  padding: 2.5rem 3.5rem 5rem;
  max-width: 1280px;
  width: calc(100% - var(--sidebar-w));
  box-sizing: border-box;
  overflow-x: hidden;
}}

.brochure-content-wrapper {{
  width: 100%;
  max-width: 100%;
}}

.brochure-section {{
  margin-bottom: 4.5rem;
  scroll-margin-top: 2rem;
}}

.section-tag {{
  display: inline-block;
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: var(--{prefix}-gold);
  font-weight: 700;
  margin-bottom: 0.4rem;
}}

.section-title {{
  font-size: clamp(1.6rem, 2.8vw, 2.3rem);
  margin-bottom: 0.8rem;
  line-height: 1.25;
}}

.section-subtitle {{
  color: var(--{prefix}-text-muted);
  font-size: 0.98rem;
  max-width: 720px;
  margin-bottom: 2rem;
  line-height: 1.6;
}}

/* ==========================================================================
   01. HERO SECTION (CONTAINED & SCALED)
   ========================================================================== */
.hero-section {{
  margin-bottom: 4.5rem;
}}

.hero-grid {{
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 2.5rem;
  align-items: center;
}}

.hero-badges-row {{
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}}

.hero-badge {{
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}}

.hero-badge--status {{
  background: rgba(34, 197, 94, 0.15);
  color: #4ade80;
  border: 1px solid rgba(34, 197, 94, 0.3);
}}

.hero-badge--luxury {{
  background: rgba(200, 157, 85, 0.15);
  color: var(--{prefix}-gold);
  border: 1px solid var(--{prefix}-border);
}}

.hero-badge--rera {{
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.15);
}}

.hero-title {{
  font-size: clamp(2.2rem, 3.8vw, 3rem);
  margin-bottom: 0.4rem;
  color: #ffffff;
}}

.hero-tagline {{
  font-size: 1.02rem;
  color: var(--{prefix}-gold);
  font-style: italic;
  margin-bottom: 1.2rem;
  font-weight: 500;
}}

.hero-desc {{
  color: var(--{prefix}-text-muted);
  font-size: 0.94rem;
  line-height: 1.65;
  margin-bottom: 1.8rem;
}}

.hero-stats-grid {{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
  margin-bottom: 1.8rem;
}}

.hero-stat-card {{
  background: var(--{prefix}-card-bg);
  border: 1px solid var(--{prefix}-border);
  border-radius: var(--{prefix}-radius-sm);
  padding: 0.9rem 1.1rem;
  transition: all 0.25s ease;
}}
.hero-stat-card:hover {{
  border-color: var(--{prefix}-gold);
  background: var(--{prefix}-card-hover);
  transform: translateY(-2px);
}}

.hero-stat-num {{
  font-family: 'Cinzel', serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--{prefix}-gold);
  margin-bottom: 0.15rem;
}}

.hero-stat-label {{
  font-size: 0.76rem;
  color: var(--{prefix}-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}}

.hero-ctas-row {{
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}}

.hero-cta-btn {{
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.4rem;
  border-radius: var(--{prefix}-radius-sm);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}}

.hero-cta-btn--primary {{
  background: linear-gradient(135deg, var(--{prefix}-gold) 0%, #9e7534 100%);
  color: #121014;
  box-shadow: 0 4px 16px rgba(200, 157, 85, 0.3);
}}
.hero-cta-btn--primary:hover {{
  background: linear-gradient(135deg, #dfba7c 0%, #b88a42 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(200, 157, 85, 0.45);
}}

.hero-cta-btn--secondary {{
  border: 1px solid var(--{prefix}-border);
  color: #ffffff;
  background: rgba(200, 157, 85, 0.08);
}}
.hero-cta-btn--secondary:hover {{
  border-color: var(--{prefix}-gold);
  background: rgba(200, 157, 85, 0.14);
  transform: translateY(-2px);
}}

/* Hero Image: Perfectly Contained & Proportioned */
.hero-media-wrapper {{
  position: relative;
  border-radius: var(--{prefix}-radius-md);
  overflow: hidden;
  border: 1px solid var(--{prefix}-border);
  box-shadow: var(--{prefix}-shadow);
  background: #151318;
  max-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}}

.hero-media-wrapper img {{
  width: 100%;
  height: 100%;
  max-height: 400px;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.5s ease;
}}

.hero-media-wrapper:hover img {{
  transform: scale(1.03);
}}

.hero-media-badge {{
  position: absolute;
  bottom: 0.8rem;
  right: 0.8rem;
  background: rgba(14, 12, 14, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid var(--{prefix}-border);
  color: var(--{prefix}-gold);
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  pointer-events: none;
}}

/* ==========================================================================
   02. VISION & PILLARS SECTION
   ========================================================================== */
.pillar-grid {{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;
}}

.pillar-card {{
  background: var(--{prefix}-card-bg);
  border: 1px solid var(--{prefix}-border);
  border-radius: var(--{prefix}-radius-md);
  padding: 1.5rem 1.2rem;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}}

.pillar-card:hover {{
  background: var(--{prefix}-card-hover);
  border-color: var(--{prefix}-gold);
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
}}

.pillar-card::before {{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--{prefix}-accent), var(--{prefix}-gold));
  opacity: 0.8;
}}

.pillar-num {{
  font-family: 'Cinzel', serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--{prefix}-gold);
  margin-bottom: 0.6rem;
}}

.pillar-title {{
  font-size: 0.98rem;
  margin-bottom: 0.5rem;
  color: #ffffff;
}}

.pillar-desc {{
  font-size: 0.84rem;
  color: var(--{prefix}-text-muted);
  line-height: 1.55;
}}

/* ==========================================================================
   03. AMENITIES SECTION
   ========================================================================== */
.amenities-grid {{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
}}

.amenity-card {{
  background: var(--{prefix}-card-bg);
  border: 1px solid var(--{prefix}-border);
  border-radius: var(--{prefix}-radius-md);
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  transition: all 0.25s ease;
}}

.amenity-card:hover {{
  border-color: var(--{prefix}-gold);
  background: var(--{prefix}-card-hover);
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
}}

.amenity-icon-box {{
  width: 42px;
  height: 42px;
  border-radius: var(--{prefix}-radius-sm);
  background: rgba(200, 157, 85, 0.12);
  border: 1px solid var(--{prefix}-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--{prefix}-gold);
  flex-shrink: 0;
}}

.amenity-name {{
  font-size: 0.95rem;
  color: #ffffff;
}}

.amenity-desc {{
  font-size: 0.84rem;
  color: var(--{prefix}-text-muted);
  line-height: 1.5;
}}

/* ==========================================================================
   04. FLOOR PLANS SECTION (PROPER SIZING & FIT)
   ========================================================================== */
.floorplan-tabs-wrapper,
.plans-wrapper {{
  background: var(--{prefix}-card-bg);
  border: 1px solid var(--{prefix}-border);
  border-radius: var(--{prefix}-radius-md);
  padding: 1.6rem;
  box-shadow: var(--{prefix}-shadow);
  max-width: 100%;
  overflow: hidden;
}}

.floorplan-tabs,
.plan-tabs {{
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--{prefix}-border);
  padding-bottom: 1rem;
}}

.floorplan-tab-btn,
.plan-tab-btn {{
  background: rgba(200, 157, 85, 0.08);
  border: 1px solid var(--{prefix}-border);
  color: var(--{prefix}-text-muted);
  padding: 0.55rem 1.15rem;
  border-radius: var(--{prefix}-radius-sm);
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}}

.floorplan-tab-btn:hover,
.plan-tab-btn:hover {{
  color: #ffffff;
  border-color: var(--{prefix}-gold);
  background: rgba(200, 157, 85, 0.15);
}}

.floorplan-tab-btn.active,
.plan-tab-btn.active {{
  background: linear-gradient(135deg, var(--{prefix}-gold) 0%, #9e7534 100%);
  color: #121014;
  border-color: var(--{prefix}-gold);
  box-shadow: 0 4px 12px rgba(200, 157, 85, 0.25);
}}

.floorplan-tab-content,
.plan-tab-pane {{
  display: none;
}}

.floorplan-tab-content.active,
.plan-tab-pane.active {{
  display: block;
  animation: fadeIn 0.3s ease forwards;
}}

@keyframes fadeIn {{
  from {{ opacity: 0; transform: translateY(4px); }}
  to {{ opacity: 1; transform: translateY(0); }}
}}

.floorplan-display-card {{
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid var(--{prefix}-border);
  border-radius: var(--{prefix}-radius-sm);
  overflow: hidden;
}}

/* Strictly contain floorplan images within available section dimensions */
.floorplan-img-container,
.plan-image-box {{
  position: relative;
  background: #ffffff;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 480px;
  min-height: 280px;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
}}

.floorplan-img-container img,
.plan-image-box img {{
  max-width: 100%;
  max-height: 450px;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  transition: transform 0.3s ease;
}}

.floorplan-img-container:hover img,
.plan-image-box:hover img {{
  transform: scale(1.02);
}}

.zoom-pill,
.plan-zoom-hint {{
  position: absolute;
  bottom: 0.8rem;
  right: 0.8rem;
  background: rgba(14, 12, 14, 0.85);
  color: var(--{prefix}-gold);
  border: 1px solid var(--{prefix}-border);
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  font-size: 0.74rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  backdrop-filter: blur(6px);
  pointer-events: none;
}}

.floorplan-card-body {{
  padding: 1.2rem 1.4rem;
  background: var(--{prefix}-card-bg);
  border-top: 1px solid var(--{prefix}-border);
}}

.floorplan-card-title {{
  font-family: 'Cinzel', serif;
  font-size: 1.05rem;
  color: #ffffff;
  margin-bottom: 0.35rem;
}}

.floorplan-card-desc {{
  font-size: 0.86rem;
  color: var(--{prefix}-text-muted);
  line-height: 1.6;
}}

/* ==========================================================================
   05. SPECIFICATIONS SECTION
   ========================================================================== */
.specs-grid {{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
}}

.spec-card {{
  background: var(--{prefix}-card-bg);
  border: 1px solid var(--{prefix}-border);
  border-radius: var(--{prefix}-radius-md);
  padding: 1.4rem;
  transition: all 0.25s ease;
}}

.spec-card:hover {{
  background: var(--{prefix}-card-hover);
  border-color: var(--{prefix}-gold);
  transform: translateY(-2px);
}}

.spec-category {{
  font-family: 'Cinzel', serif;
  font-size: 0.88rem;
  color: var(--{prefix}-gold);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.8rem;
  border-bottom: 1px solid rgba(200, 157, 85, 0.15);
  padding-bottom: 0.4rem;
}}

.spec-list {{
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}}

.spec-list li {{
  font-size: 0.84rem;
  color: var(--{prefix}-text-muted);
  line-height: 1.5;
  position: relative;
  padding-left: 1.1rem;
}}

.spec-list li::before {{
  content: '▪';
  position: absolute;
  left: 0;
  color: var(--{prefix}-gold);
  font-size: 0.75rem;
}}

/* ==========================================================================
   06. LOCATION & CONNECTIVITY SECTION
   ========================================================================== */
.location-grid {{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
}}

.location-card {{
  background: var(--{prefix}-card-bg);
  border: 1px solid var(--{prefix}-border);
  border-radius: var(--{prefix}-radius-md);
  padding: 1.4rem;
  transition: all 0.25s ease;
}}

.location-card:hover {{
  border-color: var(--{prefix}-gold);
  transform: translateY(-2px);
}}

.location-icon {{
  font-size: 1.5rem;
  margin-bottom: 0.6rem;
}}

.location-title {{
  font-family: 'Cinzel', serif;
  font-size: 0.96rem;
  color: #ffffff;
  margin-bottom: 0.8rem;
  border-bottom: 1px solid rgba(200, 157, 85, 0.15);
  padding-bottom: 0.4rem;
}}

.location-list {{
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}}

.location-list li {{
  font-size: 0.84rem;
  color: var(--{prefix}-text-muted);
  line-height: 1.5;
  position: relative;
  padding-left: 1.1rem;
}}

.location-list li::before {{
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--{prefix}-gold);
  font-size: 0.75rem;
}}

/* ==========================================================================
   07. LEADERSHIP TEAM SECTION
   ========================================================================== */
.team-grid {{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.4rem;
}}

.team-card {{
  background: var(--{prefix}-card-bg);
  border: 1px solid var(--{prefix}-border);
  border-radius: var(--{prefix}-radius-md);
  padding: 1.4rem;
  transition: all 0.25s ease;
}}

.team-card:hover {{
  border-color: var(--{prefix}-gold);
  transform: translateY(-2px);
}}

.team-card-header {{
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.9rem;
}}

.team-avatar {{
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: rgba(200, 157, 85, 0.15);
  border: 1px solid var(--{prefix}-border);
  color: var(--{prefix}-gold);
  font-family: 'Cinzel', serif;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
}}

.team-name {{
  font-family: 'Cinzel', serif;
  font-size: 0.98rem;
  color: #ffffff;
  margin-bottom: 0.15rem;
}}

.team-role {{
  font-size: 0.76rem;
  color: var(--{prefix}-gold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}}

.team-bio {{
  font-size: 0.84rem;
  color: var(--{prefix}-text-muted);
  line-height: 1.55;
}}

/* ==========================================================================
   08. BROCHURE GALLERY ARCHIVE (PROPORTIONED SCANNED PAGES)
   ========================================================================== */
.gallery-grid {{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.4rem;
}}

.gallery-card {{
  background: var(--{prefix}-card-bg);
  border: 1px solid var(--{prefix}-border);
  border-radius: var(--{prefix}-radius-md);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}}

.gallery-card:hover {{
  border-color: var(--{prefix}-gold);
  transform: translateY(-4px);
  box-shadow: var(--{prefix}-shadow);
}}

.gallery-card img {{
  width: 100%;
  height: 280px;
  max-height: 300px;
  object-fit: contain;
  background: #ffffff;
  padding: 0.6rem;
  display: block;
  box-sizing: border-box;
  transition: transform 0.3s ease;
}}

.gallery-card:hover img {{
  transform: scale(1.02);
}}

.gallery-card-label {{
  padding: 0.75rem 0.9rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--{prefix}-gold);
  border-top: 1px solid var(--{prefix}-border);
  background: rgba(0, 0, 0, 0.35);
  text-align: center;
  letter-spacing: 0.02em;
}}

/* ==========================================================================
   09. DOWNLOAD BANNER SECTION
   ========================================================================== */
.download-section {{
  margin-top: 2rem;
  margin-bottom: 2rem;
}}

.download-banner {{
  background: linear-gradient(135deg, rgba(200, 157, 85, 0.12) 0%, rgba(200, 157, 85, 0.02) 100%);
  border: 1px solid var(--{prefix}-border-strong);
  border-radius: var(--{prefix}-radius-md);
  padding: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}}

.download-banner-text {{
  max-width: 600px;
}}

.download-banner-title {{
  font-size: 1.4rem;
  color: #ffffff;
  margin-bottom: 0.4rem;
}}

.download-banner-desc {{
  font-size: 0.88rem;
  color: var(--{prefix}-text-muted);
  line-height: 1.55;
}}

.download-banner-actions {{
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}}

/* ==========================================================================
   LIGHTBOX MODAL (CLEAN ZOOM FUNCTIONALITY)
   ========================================================================== */
.lightbox-modal {{
  display: none;
  position: fixed;
  inset: 0;
  z-index: 9999;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}}

.lightbox-modal.active {{
  display: flex;
}}

.lightbox-backdrop {{
  position: fixed;
  inset: 0;
  background: rgba(8, 7, 10, 0.92);
  backdrop-filter: blur(10px);
  z-index: 1;
}}

.lightbox-container {{
  position: relative;
  z-index: 2;
  max-width: 92vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}}

.lightbox-img-wrapper {{
  max-width: 90vw;
  max-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;
  border: 1px solid var(--{prefix}-border);
  border-radius: var(--{prefix}-radius-sm);
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9);
}}

.lightbox-img {{
  max-width: 88vw;
  max-height: 78vh;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
}}

.lightbox-caption {{
  margin-top: 0.8rem;
  color: #f5f2eb;
  font-size: 0.86rem;
  text-align: center;
  max-width: 750px;
  letter-spacing: 0.02em;
  background: rgba(0, 0, 0, 0.65);
  padding: 0.35rem 1rem;
  border-radius: 20px;
  border: 1px solid rgba(200, 157, 85, 0.2);
}}

.lightbox-close {{
  position: absolute;
  top: -2.8rem;
  right: -0.5rem;
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 2.2rem;
  line-height: 1;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  transition: color 0.2s;
}}

.lightbox-close:hover {{
  color: var(--{prefix}-gold);
}}

/* ==========================================================================
   RESPONSIVE DESIGN (DESKTOP, TABLET & MOBILE)
   ========================================================================== */
@media (max-width: 1200px) {{
  .brochure-main {{
    padding: 2.2rem 2.5rem 4rem;
  }}
  .pillar-grid {{
    grid-template-columns: repeat(2, 1fr);
  }}
}}

@media (max-width: 1024px) {{
  .brochure-sidebar {{
    display: none;
  }}
  .mobile-topbar {{
    display: flex;
  }}
  .brochure-main {{
    margin-left: 0;
    width: 100%;
    max-width: 100%;
    padding: 1.5rem 1.4rem 4rem;
  }}
  .hero-grid {{
    grid-template-columns: 1fr;
    gap: 2rem;
  }}
  .hero-media-wrapper {{
    max-height: 360px;
  }}
  .hero-media-wrapper img {{
    max-height: 360px;
  }}
  .specs-grid {{
    grid-template-columns: repeat(2, 1fr);
  }}
  .location-grid {{
    grid-template-columns: 1fr;
  }}
  .gallery-grid {{
    grid-template-columns: repeat(2, 1fr);
  }}
}}

@media (max-width: 768px) {{
  .brochure-main {{
    padding: 1.2rem 1rem 3rem;
  }}
  .hero-stats-grid {{
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
  }}
  .amenities-grid {{
    grid-template-columns: 1fr;
  }}
  .specs-grid {{
    grid-template-columns: 1fr;
  }}
  .team-grid {{
    grid-template-columns: 1fr;
  }}
  .floorplan-img-container,
  .plan-image-box {{
    max-height: 360px;
    min-height: 220px;
    padding: 0.8rem;
  }}
  .floorplan-img-container img,
  .plan-image-box img {{
    max-height: 340px;
  }}
  .gallery-card img {{
    height: 240px;
  }}
  .download-banner {{
    padding: 1.5rem;
    flex-direction: column;
    align-items: flex-start;
  }}
}}

@media (max-width: 520px) {{
  .gallery-grid {{
    grid-template-columns: 1fr;
  }}
  .pillar-grid {{
    grid-template-columns: 1fr;
  }}
  .hero-stats-grid {{
    grid-template-columns: 1fr;
  }}
  .floorplan-img-container,
  .plan-image-box {{
    max-height: 280px;
    min-height: 180px;
    padding: 0.5rem;
  }}
  .floorplan-img-container img,
  .plan-image-box img {{
    max-height: 260px;
  }}
  .gallery-card img {{
    height: 220px;
  }}
}}
"""

def generate_brochure_js():
    return """// Digital Brochure Interactions & Zoom Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
  'use strict';

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

  // 2. Floor Plan Tabs (Support both .floorplan-tab-btn / data-tab AND .plan-tab-btn / data-target)
  const tabBtns = document.querySelectorAll('.floorplan-tab-btn, .plan-tab-btn');
  const tabContents = document.querySelectorAll('.floorplan-tab-content, .plan-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetId = this.getAttribute('data-tab') || this.getAttribute('data-target');
      if (!targetId) return;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      this.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // 3. Lightbox Modal (Click to zoom floor plans, elevations & gallery pages)
  const lightboxModal = document.getElementById('lightboxModal') || document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');

  // Trigger on data-lightbox or data-zoom-src
  const zoomTriggers = document.querySelectorAll('[data-lightbox], [data-zoom-src]');
  zoomTriggers.forEach(el => {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      const imgSrc = this.getAttribute('data-lightbox') || this.getAttribute('data-zoom-src');
      const captionText = this.getAttribute('data-caption') || this.getAttribute('title') || '';

      if (lightboxModal && lightboxImg && imgSrc) {
        lightboxImg.src = imgSrc;
        if (lightboxCaption) {
          lightboxCaption.textContent = captionText;
          lightboxCaption.style.display = captionText ? 'block' : 'none';
        }
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightboxModal() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
      if (lightboxImg) lightboxImg.src = '';
    }
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightboxModal);
  }
  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', closeLightboxModal);
  }
  if (lightboxModal) {
    lightboxModal.addEventListener('click', function(e) {
      if (e.target === lightboxModal) {
        closeLightboxModal();
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      closeLightboxModal();
    }
  });

  // 4. ScrollSpy for Sidebar Navigation
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar-nav-link');

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', function() {
      let currentId = '';
      const scrollPos = window.pageYOffset + 140;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentId = section.getAttribute('id');
        }
      });

      if (currentId) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + currentId) {
            link.classList.add('active');
          }
        });
      }
    }, { passive: true });
  }
});
"""

def main():
    projects = [
        {
            'dir': 'public/projects/shree-samarth/brochure',
            'css_name': 'samarth-brochure.css',
            'js_name': 'samarth-brochure.js',
            'prefix': 'sm',
            'accent': '#c46238',
            'gold': '#c89d55',
            'bg': '#12100f',
            'card_bg': '#191514'
        },
        {
            'dir': 'public/projects/shree-vinayak/brochure',
            'css_name': 'vinayak-brochure.css',
            'js_name': 'vinayak-brochure.js',
            'prefix': 'sv',
            'accent': '#5e6b48',
            'gold': '#d4a758',
            'bg': '#11120f',
            'card_bg': '#171914'
        },
        {
            'dir': 'public/projects/shree-nisarg/brochure',
            'css_name': 'nisarg-brochure.css',
            'js_name': 'nisarg-brochure.js',
            'prefix': 'sn',
            'accent': '#2e7d32',
            'gold': '#c89d55',
            'bg': '#0f1310',
            'card_bg': '#141a15'
        }
    ]

    for p in projects:
        css_content = generate_brochure_css(p['prefix'], p['accent'], p['gold'], p['bg'], p['card_bg'])
        js_content = generate_brochure_js()

        css_path = os.path.join(p['dir'], p['css_name'])
        js_path = os.path.join(p['dir'], p['js_name'])

        with open(css_path, 'w', encoding='utf-8') as f:
            f.write(css_content)
        with open(js_path, 'w', encoding='utf-8') as f:
            f.write(js_content)

        print(f"Updated {css_path} and {js_path}")

if __name__ == '__main__':
    main()
