import os

# Create directories
os.makedirs('public/projects/shree-samarth/brochure', exist_ok=True)
os.makedirs('public/projects/shree-vinayak/brochure', exist_ok=True)
os.makedirs('public/projects/shree-nisarg/brochure', exist_ok=True)

# Helper function to generate clean standard CSS
def get_brochure_css(prefix, accent_color, gold_color, bg_color, card_bg):
    return f"""/* {prefix.upper()} Digital Brochure Stylesheet */
:root {{
  --{prefix}-bg: {bg_color};
  --{prefix}-card-bg: {card_bg};
  --{prefix}-card-hover: rgba(255, 255, 255, 0.05);
  --{prefix}-border: rgba(200, 157, 85, 0.22);
  --{prefix}-gold: {gold_color};
  --{prefix}-accent: {accent_color};
  --{prefix}-text-main: #f5f2eb;
  --{prefix}-text-muted: #aca59c;
  --{prefix}-radius-sm: 8px;
  --{prefix}-radius-md: 12px;
  --{prefix}-shadow: 0 16px 36px rgba(0, 0, 0, 0.55);
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
}}

body {{
  background-color: var(--{prefix}-bg);
  color: var(--{prefix}-text-main);
  line-height: 1.65;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}}

h1, h2, h3, h4, .hero-title, .section-title {{
  font-family: 'Cinzel', serif;
  letter-spacing: 0.02em;
  color: #ffffff;
}}

a {{
  color: inherit;
  text-decoration: none;
  transition: all 0.3s ease;
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

/* SIDEBAR */
.brochure-sidebar {{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 290px;
  background: {card_bg};
  border-right: 1px solid var(--{prefix}-border);
  padding: 2.2rem 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 100;
  overflow-y: auto;
}}

.sidebar-header {{
  margin-bottom: 2rem;
  text-align: center;
}}

.sidebar-brand-link {{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}}

.sidebar-logo {{
  max-width: 220px;
  max-height: 85px;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.6));
}}

.sidebar-tagline {{
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--{prefix}-gold);
  font-weight: 600;
}}

.sidebar-nav {{
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex-grow: 1;
}}

.sidebar-nav-link {{
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.7rem 0.9rem;
  border-radius: var(--{prefix}-radius-sm);
  color: var(--{prefix}-text-muted);
  font-size: 0.88rem;
  font-weight: 500;
  transition: all 0.25s ease;
  border-left: 2px solid transparent;
}}

.sidebar-nav-link:hover,
.sidebar-nav-link.active {{
  color: #ffffff;
  background: rgba(200, 157, 85, 0.12);
  border-left-color: var(--{prefix}-gold);
  padding-left: 1.1rem;
}}

.nav-link-num {{
  font-family: 'Cinzel', serif;
  font-size: 0.78rem;
  color: var(--{prefix}-gold);
  font-weight: 700;
}}

.sidebar-footer {{
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}}

.sidebar-action-btn {{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1rem;
  border-radius: var(--{prefix}-radius-sm);
  font-size: 0.86rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
}}

.sidebar-action-btn--primary {{
  background: linear-gradient(135deg, #c89d55 0%, #9e7534 100%);
  color: #121014;
  box-shadow: 0 4px 15px rgba(200, 157, 85, 0.35);
}}

.sidebar-action-btn--primary:hover {{
  background: linear-gradient(135deg, #dfba7c 0%, #b88a42 100%);
  box-shadow: 0 6px 20px rgba(200, 157, 85, 0.5);
}}

.sidebar-action-btn--outline {{
  border: 1px solid var(--{prefix}-border);
  color: var(--{prefix}-text-muted);
  background: transparent;
}}

.sidebar-action-btn--outline:hover {{
  border-color: var(--{prefix}-gold);
  color: #ffffff;
  background: rgba(200, 157, 85, 0.08);
}}

/* MOBILE TOPBAR */
.mobile-topbar {{
  display: none;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 68px;
  background: {card_bg};
  border-bottom: 1px solid var(--{prefix}-border);
  padding: 0 1.2rem;
  align-items: center;
  justify-content: space-between;
  z-index: 200;
}}

.mobile-logo {{
  max-height: 48px;
  max-width: 170px;
  object-fit: contain;
}}

.mobile-menu-btn {{
  background: transparent;
  border: 1px solid var(--{prefix}-border);
  color: var(--{prefix}-gold);
  padding: 0.5rem 0.9rem;
  border-radius: var(--{prefix}-radius-sm);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}}

.mobile-drawer {{
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
}}

.mobile-drawer.open {{
  display: flex;
}}

/* MAIN CONTENT */
.brochure-main {{
  margin-left: 290px;
  padding: 3rem 4rem 6rem;
  max-width: 1350px;
  width: calc(100% - 290px);
}}

.brochure-section {{
  margin-bottom: 5.5rem;
  scroll-margin-top: 2rem;
}}

.section-tag {{
  display: inline-block;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: var(--{prefix}-gold);
  font-weight: 700;
  margin-bottom: 0.5rem;
}}

.section-title {{
  font-size: clamp(1.8rem, 3.2vw, 2.6rem);
  margin-bottom: 1rem;
  line-height: 1.2;
}}

.section-subtitle {{
  color: var(--{prefix}-text-muted);
  font-size: 1.05rem;
  max-width: 780px;
  margin-bottom: 2.2rem;
  line-height: 1.6;
}}

/* HERO */
.hero-section {{
  margin-bottom: 5rem;
}}

.hero-grid {{
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 3rem;
  align-items: center;
}}

.hero-badges-row {{
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.2rem;
}}

.hero-badge {{
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.85rem;
  border-radius: 30px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
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

.hero-badge--accent {{
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}}

.hero-title {{
  font-size: clamp(2.4rem, 4.5vw, 3.4rem);
  margin-bottom: 0.5rem;
  color: #ffffff;
}}

.hero-tagline {{
  font-size: 1.1rem;
  color: var(--{prefix}-gold);
  font-style: italic;
  margin-bottom: 1.4rem;
  font-weight: 500;
}}

.hero-desc {{
  color: var(--{prefix}-text-muted);
  font-size: 0.98rem;
  line-height: 1.7;
  margin-bottom: 2rem;
}}

.hero-stats-grid {{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2.2rem;
}}

.hero-stat-card {{
  background: var(--{prefix}-card-bg);
  border: 1px solid var(--{prefix}-border);
  border-radius: var(--{prefix}-radius-sm);
  padding: 1.1rem 1.3rem;
  transition: all 0.3s ease;
}}

.hero-stat-card:hover {{
  border-color: var(--{prefix}-gold);
  background: var(--{prefix}-card-hover);
  transform: translateY(-3px);
}}

.hero-stat-num {{
  font-family: 'Cinzel', serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--{prefix}-gold);
  margin-bottom: 0.2rem;
}}

.hero-stat-label {{
  font-size: 0.8rem;
  color: var(--{prefix}-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}}

.hero-ctas-row {{
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}}

.hero-cta-btn {{
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1.6rem;
  border-radius: var(--{prefix}-radius-sm);
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}}

.hero-cta-btn--primary {{
  background: linear-gradient(135deg, #c89d55 0%, #9e7534 100%);
  color: #121014;
  box-shadow: 0 4px 18px rgba(200, 157, 85, 0.35);
}}

.hero-cta-btn--primary:hover {{
  background: linear-gradient(135deg, #dfba7c 0%, #b88a42 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(200, 157, 85, 0.5);
}}

.hero-cta-btn--secondary {{
  border: 1px solid var(--{prefix}-border);
  color: #ffffff;
  background: rgba(200, 157, 85, 0.08);
}}

.hero-cta-btn--secondary:hover {{
  border-color: var(--{prefix}-gold);
  background: rgba(200, 157, 85, 0.16);
  transform: translateY(-2px);
}}

.hero-media-wrapper {{
  position: relative;
  border-radius: var(--{prefix}-radius-md);
  overflow: hidden;
  border: 1px solid var(--{prefix}-border);
  box-shadow: var(--{prefix}-shadow);
  background: #19161e;
  cursor: pointer;
}}

.hero-media-wrapper img {{
  width: 100%;
  height: 100%;
  max-height: 480px;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}}

.hero-media-wrapper:hover img {{
  transform: scale(1.03);
}}

.hero-media-badge {{
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(15, 13, 17, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid var(--{prefix}-border);
  color: var(--{prefix}-gold);
  padding: 0.4rem 0.8rem;
  border-radius: var(--{prefix}-radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}}

/* PILLARS */
.pillar-grid {{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}}

.pillar-card {{
  background: var(--{prefix}-card-bg);
  border: 1px solid var(--{prefix}-border);
  border-radius: var(--{prefix}-radius-md);
  padding: 1.8rem 1.4rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}}

.pillar-card:hover {{
  background: var(--{prefix}-card-hover);
  border-color: var(--{prefix}-gold);
  transform: translateY(-5px);
  box-shadow: var(--{prefix}-shadow);
}}

.pillar-card::before {{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, {accent_color}, var(--{prefix}-gold));
  opacity: 0.7;
}}

.pillar-num {{
  font-family: 'Cinzel', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--{prefix}-gold);
  margin-bottom: 0.8rem;
}}

.pillar-title {{
  font-size: 1.05rem;
  margin-bottom: 0.6rem;
  color: #ffffff;
}}

.pillar-text {{
  font-size: 0.88rem;
  color: var(--{prefix}-text-muted);
  line-height: 1.6;
}}

/* AMENITIES */
.amenities-grid {{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}}

.amenity-card {{
  background: var(--{prefix}-card-bg);
  border: 1px solid var(--{prefix}-border);
  border-radius: var(--{prefix}-radius-md);
  padding: 1.6rem;
  display: flex;
  gap: 1.2rem;
  align-items: flex-start;
  transition: all 0.3s ease;
}}

.amenity-card:hover {{
  border-color: var(--{prefix}-gold);
  background: var(--{prefix}-card-hover);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.4);
}}

.amenity-icon {{
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(200, 157, 85, 0.12);
  border: 1px solid var(--{prefix}-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--{prefix}-gold);
  flex-shrink: 0;
}}

.amenity-info h4 {{
  font-size: 1rem;
  color: #ffffff;
  margin-bottom: 0.4rem;
}}

.amenity-info p {{
  font-size: 0.86rem;
  color: var(--{prefix}-text-muted);
  line-height: 1.5;
}}

/* PLANS */
.plans-wrapper {{
  background: var(--{prefix}-card-bg);
  border: 1px solid var(--{prefix}-border);
  border-radius: var(--{prefix}-radius-md);
  padding: 2rem;
  box-shadow: var(--{prefix}-shadow);
}}

.plan-tabs {{
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--{prefix}-border);
  padding-bottom: 1.2rem;
}}

.plan-tab-btn {{
  background: rgba(200, 157, 85, 0.08);
  border: 1px solid var(--{prefix}-border);
  color: var(--{prefix}-text-muted);
  padding: 0.7rem 1.4rem;
  border-radius: var(--{prefix}-radius-sm);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}}

.plan-tab-btn.active,
.plan-tab-btn:hover {{
  background: linear-gradient(135deg, #c89d55 0%, #9e7534 100%);
  color: #121014;
  border-color: var(--{prefix}-gold);
}}

.plan-tab-pane {{
  display: none;
}}

.plan-tab-pane.active {{
  display: block;
}}

.plan-image-box {{
  position: relative;
  background: #ffffff;
  border-radius: var(--{prefix}-radius-sm);
  overflow: hidden;
  margin-bottom: 1.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}}

.plan-image-box img {{
  max-width: 100%;
  max-height: 540px;
  width: auto;
  height: auto;
  object-fit: contain;
  transition: transform 0.4s ease;
}}

.plan-image-box:hover img {{
  transform: scale(1.02);
}}

.plan-zoom-hint {{
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(18, 16, 20, 0.85);
  color: var(--{prefix}-gold);
  border: 1px solid var(--{prefix}-border);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}}

.plan-details-table {{
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: 0.9rem;
}}

.plan-details-table th,
.plan-details-table td {{
  padding: 0.8rem 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(200, 157, 85, 0.15);
}}

.plan-details-table th {{
  color: var(--{prefix}-gold);
  font-family: 'Cinzel', serif;
  font-size: 0.85rem;
  background: rgba(200, 157, 85, 0.05);
}}

.plan-details-table td {{
  color: var(--{prefix}-text-main);
}}

/* SPECS */
.specs-grid {{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}}

.spec-card {{
  background: var(--{prefix}-card-bg);
  border: 1px solid var(--{prefix}-border);
  border-radius: var(--{prefix}-radius-md);
  padding: 1.6rem;
  transition: all 0.3s ease;
}}

.spec-card:hover {{
  background: var(--{prefix}-card-hover);
  border-color: var(--{prefix}-gold);
  transform: translateY(-3px);
}}

.spec-category {{
  font-family: 'Cinzel', serif;
  font-size: 0.88rem;
  color: var(--{prefix}-gold);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}}

.spec-detail {{
  font-size: 0.88rem;
  color: var(--{prefix}-text-muted);
  line-height: 1.6;
}}

/* LOCATION */
.location-grid {{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: center;
}}

.location-map-box {{
  position: relative;
  border-radius: var(--{prefix}-radius-md);
  overflow: hidden;
  border: 1px solid var(--{prefix}-border);
  background: #ffffff;
  padding: 1rem;
  cursor: pointer;
}}

.location-map-box img {{
  width: 100%;
  max-height: 480px;
  object-fit: contain;
  display: block;
}}

.landmarks-list {{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}}

.landmark-item {{
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: var(--{prefix}-card-bg);
  border: 1px solid var(--{prefix}-border);
  border-radius: var(--{prefix}-radius-sm);
  padding: 1rem 1.2rem;
  transition: all 0.3s ease;
}}

.landmark-item:hover {{
  border-color: var(--{prefix}-gold);
  transform: translateX(4px);
}}

.landmark-dot {{
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--{prefix}-gold);
  margin-top: 0.4rem;
  flex-shrink: 0;
}}

.landmark-title {{
  font-weight: 600;
  color: #ffffff;
  font-size: 0.95rem;
  margin-bottom: 0.2rem;
}}

.landmark-desc {{
  font-size: 0.84rem;
  color: var(--{prefix}-text-muted);
}}

/* TEAM */
.team-grid {{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}}

.team-card {{
  background: var(--{prefix}-card-bg);
  border: 1px solid var(--{prefix}-border);
  border-radius: var(--{prefix}-radius-md);
  padding: 1.6rem 1.3rem;
  text-align: center;
  transition: all 0.3s ease;
}}

.team-card:hover {{
  border-color: var(--{prefix}-gold);
  background: var(--{prefix}-card-hover);
  transform: translateY(-4px);
}}

.team-role {{
  font-size: 0.78rem;
  color: var(--{prefix}-gold);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 700;
  margin-bottom: 0.5rem;
}}

.team-name {{
  font-family: 'Cinzel', serif;
  font-size: 1.15rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
}}

.team-meta {{
  font-size: 0.84rem;
  color: var(--{prefix}-text-muted);
}}

/* GALLERY */
.gallery-grid {{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}}

.gallery-card {{
  background: var(--{prefix}-card-bg);
  border: 1px solid var(--{prefix}-border);
  border-radius: var(--{prefix}-radius-md);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}}

.gallery-card:hover {{
  border-color: var(--{prefix}-gold);
  transform: translateY(-5px);
  box-shadow: var(--{prefix}-shadow);
}}

.gallery-card img {{
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  display: block;
}}

.gallery-caption {{
  padding: 1rem 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--{prefix}-border);
  background: {card_bg};
}}

.gallery-title {{
  font-size: 0.88rem;
  font-weight: 600;
  color: #ffffff;
}}

.gallery-zoom-badge {{
  font-size: 0.76rem;
  color: var(--{prefix}-gold);
  display: flex;
  align-items: center;
  gap: 0.3rem;
}}

/* LIGHTBOX */
.lightbox-modal {{
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(10, 8, 12, 0.94);
  backdrop-filter: blur(14px);
  z-index: 999;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}}

.lightbox-modal.active {{
  display: flex;
}}

.lightbox-modal img {{
  max-width: 95vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: var(--{prefix}-radius-sm);
  box-shadow: 0 25px 60px rgba(0,0,0,0.9);
}}

.lightbox-close-btn {{
  position: absolute;
  top: 1.5rem;
  right: 1.8rem;
  background: transparent;
  border: 1px solid var(--{prefix}-border);
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
}}

.lightbox-close-btn:hover {{
  background: var(--{prefix}-gold);
  color: {bg_color};
  border-color: var(--{prefix}-gold);
}}

/* RESPONSIVE */
@media (max-width: 1200px) {{
  .hero-grid {{
    grid-template-columns: 1fr;
  }}
  .pillar-grid, .specs-grid, .team-grid {{
    grid-template-columns: repeat(2, 1fr);
  }}
  .amenities-grid {{
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
    padding: 2rem 1.5rem 4rem;
  }}
  .location-grid {{
    grid-template-columns: 1fr;
  }}
  .gallery-grid {{
    grid-template-columns: 1fr;
  }}
}}

@media (max-width: 640px) {{
  .hero-stats-grid {{
    grid-template-columns: 1fr;
  }}
  .pillar-grid, .specs-grid, .amenities-grid, .team-grid {{
    grid-template-columns: 1fr;
  }}
  .hero-ctas-row {{
    flex-direction: column;
  }}
  .hero-cta-btn {{
    width: 100%;
    justify-content: center;
  }}
}}
"""

# Helper function for JS
def get_brochure_js():
    return """document.addEventListener('DOMContentLoaded', function() {
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

# Save JS files
with open('public/projects/shree-samarth/brochure/samarth-brochure.js', 'w', encoding='utf-8') as f:
    f.write(get_brochure_js())
with open('public/projects/shree-vinayak/brochure/vinayak-brochure.js', 'w', encoding='utf-8') as f:
    f.write(get_brochure_js())
with open('public/projects/shree-nisarg/brochure/nisarg-brochure.js', 'w', encoding='utf-8') as f:
    f.write(get_brochure_js())

# Save CSS files
with open('public/projects/shree-samarth/brochure/samarth-brochure.css', 'w', encoding='utf-8') as f:
    f.write(get_brochure_css('sm', '#c46238', '#c89d55', '#12100f', '#191514'))
with open('public/projects/shree-vinayak/brochure/vinayak-brochure.css', 'w', encoding='utf-8') as f:
    f.write(get_brochure_css('sv', '#5e6b48', '#d4a758', '#11120f', '#171914'))
with open('public/projects/shree-nisarg/brochure/nisarg-brochure.css', 'w', encoding='utf-8') as f:
    f.write(get_brochure_css('sn', '#2e7d32', '#c89d55', '#0f1310', '#141a15'))

print('Generated JS and CSS for all 3 projects.')
