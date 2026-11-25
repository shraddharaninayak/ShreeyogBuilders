# -*- coding: utf-8 -*-
"""
Generator for Samarth, Vinayak, and Nisarg Digital Brochure HTML pages.
Matches the exact structure, design, navigation, tabs, gallery, and lightbox modal of Shreeyog digital brochures.
"""
import os

# Define navigation items
NAV_ITEMS = [
    ("overview", "Overview"),
    ("vision", "Vision & Legacy"),
    ("amenities", "Amenities"),
    ("floorplans", "Floor Plans"),
    ("specifications", "Specifications"),
    ("location", "Location & Connectivity"),
    ("team", "Leadership Team"),
    ("gallery", "Brochure Archive"),
    ("download", "Download PDF")
]

def make_sidebar(project_name, logo_path, nav_items, pdf_path):
    links = "\n".join([
        f'      <a href="#{link_id}" class="sidebar-nav-link{" active" if link_id == "overview" else ""}"><span>{title}</span></a>'
        for link_id, title in nav_items
    ])
    return f'''  <!-- DESKTOP FIXED SIDEBAR -->
  <aside class="brochure-sidebar">
    <div class="sidebar-brand-wrapper">
      <a href="/projects" class="sidebar-back-link">&larr; All Projects</a>
      <div class="sidebar-logo-container">
        <img src="{logo_path}" alt="{project_name} Logo" class="sidebar-project-logo" />
      </div>
      <h2 class="sidebar-brand-title">{project_name}</h2>
      <p class="sidebar-brand-meta">Delivered Landmark &bull; Nashik</p>
    </div>

    <nav class="sidebar-nav">
{links}
    </nav>

    <div class="sidebar-actions">
      <a href="{pdf_path}" download class="sidebar-action-btn sidebar-action-btn--primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        Download PDF
      </a>
      <a href="/contact" class="sidebar-action-btn sidebar-action-btn--outline">
        Enquire Now
      </a>
    </div>
  </aside>'''

def make_mobile_topbar(project_name, logo_path, nav_items, pdf_path):
    links = "\n".join([
        f'    <a href="#{link_id}" class="sidebar-nav-link"><span>{title}</span></a>'
        for link_id, title in nav_items
    ])
    return f'''  <!-- MOBILE TOPBAR -->
  <div class="mobile-topbar">
    <a href="/projects" class="mobile-brand" title="Back to Shreeyog Projects">
      <img src="{logo_path}" alt="{project_name} Logo" class="mobile-logo" />
    </a>
    <button type="button" class="mobile-menu-btn" id="mobileMenuToggle" aria-label="Toggle Navigation">
      <span>Menu</span> &#9776;
    </button>
  </div>

  <!-- MOBILE NAVIGATION DRAWER -->
  <div class="mobile-drawer" id="mobileDrawer">
    <a href="/projects" class="sidebar-back-link" style="margin-bottom:0.8rem;">&larr; Back to All Projects</a>
{links}
    <div style="margin-top:1.5rem; display:flex; flex-direction:column; gap:0.6rem;">
      <a href="{pdf_path}" download class="sidebar-action-btn sidebar-action-btn--primary" style="text-align:center;">
        Download PDF Brochure
      </a>
      <a href="/contact" class="sidebar-action-btn sidebar-action-btn--outline" style="text-align:center;">
        Enquire Now
      </a>
    </div>
  </div>'''

def make_lightbox():
    return '''  <!-- LIGHTBOX MODAL -->
  <div class="lightbox-modal" id="lightboxModal" aria-hidden="true">
    <div class="lightbox-backdrop" id="lightboxBackdrop"></div>
    <div class="lightbox-container">
      <button type="button" class="lightbox-close" id="lightboxClose" aria-label="Close modal">&times;</button>
      <div class="lightbox-img-wrapper">
        <img src="" alt="Enlarged View" class="lightbox-img" id="lightboxImg" />
      </div>
      <div class="lightbox-caption" id="lightboxCaption"></div>
    </div>
  </div>'''

def make_leadership_team():
    return '''      <!-- 07. LEADERSHIP TEAM -->
      <section class="brochure-section" id="team">
        <span class="section-tag">Visionary Leadership</span>
        <h2 class="section-title">Guided by Integrity &amp; Experience</h2>
        <p class="section-subtitle">Delivered under the visionary direction of Shreeyog Builders' founding principals, ensuring structural precision, meticulous craftsmanship, and enduring community value.</p>

        <div class="team-grid">
          <div class="team-card">
            <div class="team-card-header">
              <div class="team-avatar">SS</div>
              <div>
                <h3 class="team-name">Mr. Sanjay S. Shinde</h3>
                <p class="team-role">Founder &amp; Managing Director</p>
              </div>
            </div>
            <p class="team-bio">Spearheading Shreeyog Builders with over 30 years of civil engineering excellence, pioneering landmark residential communities across Nashik's most coveted corridors.</p>
          </div>

          <div class="team-card">
            <div class="team-card-header">
              <div class="team-avatar">SB</div>
              <div>
                <h3 class="team-name">Mr. Santosh S. Bora</h3>
                <p class="team-role">Partner &amp; Technical Director</p>
              </div>
            </div>
            <p class="team-bio">Directing planning precision, architectural detailing, and construction milestones to guarantee impeccable execution and lifetime structural security.</p>
          </div>
        </div>
      </section>'''


# =============================================================================
# 1. GENERATE SHREE SAMARTH BROCHURE HTML
# =============================================================================
def generate_samarth_html():
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <base href="/projects/shree-samarth/brochure/" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Shree Samarth — Official Digital Brochure | Shreeyog Builders</title>
  <meta name="description" content="Explore Shree Samarth by Shreeyog Builders: 2 &amp; 3 BHK luxurious flats and penthouses at Indira Nagar Annex, Nashik. Children play area, green gym, landscaped lawn, twin lifts, and demarcated stilt parking." />

  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="samarth-brochure.css" />
</head>
<body>

{make_mobile_topbar("Shree Samarth", "assets/logo.png", NAV_ITEMS, "assets/Shree-Samarth-Brochure.pdf")}
{make_sidebar("Shree Samarth", "assets/logo.png", NAV_ITEMS, "assets/Shree-Samarth-Brochure.pdf")}

  <!-- MAIN CONTENT CONTAINER -->
  <main class="brochure-main">

    <div class="brochure-content-wrapper">

      <!-- 01. HERO / OVERVIEW SECTION -->
      <section class="brochure-section hero-section" id="overview">
        <div class="hero-grid">
          <div class="hero-text-col">
            <div class="hero-badges-row">
              <span class="hero-badge hero-badge--status">&#x25CF; Completed Benchmark</span>
              <span class="hero-badge hero-badge--luxury">2 &amp; 3 BHK &bull; Penthouses</span>
              <span class="hero-badge hero-badge--rera">Indira Nagar Annex</span>
            </div>

            <h1 class="hero-title">Shree Samarth</h1>
            <p class="hero-tagline">"Make your life divine!" &bull; 2 &amp; 3 BHK Luxurious Flats &amp; Penthouses</p>
            <p class="hero-desc">
              Nestled opposite LIC Colony in prime Indira Nagar Annex, Shree Samarth stands as a testament to harmonious living. Comprising twin wings (A &amp; B) rising over a dedicated stilt parking level, this distinguished community offers 26 residences including exclusive 4th-floor penthouses with private open sky terraces, landscaped gardens, green gym, and children's play arena.
            </p>

            <div class="hero-stats-grid">
              <div class="hero-stat-card">
                <div class="hero-stat-num">Stilt + 4</div>
                <div class="hero-stat-label">Twin Wings A &amp; B</div>
              </div>
              <div class="hero-stat-card">
                <div class="hero-stat-num">26 Units</div>
                <div class="hero-stat-label">Flats &amp; Penthouses</div>
              </div>
              <div class="hero-stat-card">
                <div class="hero-stat-num">2 &amp; 3 BHK</div>
                <div class="hero-stat-label">Luxurious Typologies</div>
              </div>
              <div class="hero-stat-card">
                <div class="hero-stat-num">100% Covered</div>
                <div class="hero-stat-label">Demarcated Stilt Bays</div>
              </div>
            </div>

            <div class="hero-ctas-row">
              <a href="assets/Shree-Samarth-Brochure.pdf" download class="hero-cta-btn hero-cta-btn--primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download Official Brochure
              </a>
              <a href="#gallery" class="hero-cta-btn hero-cta-btn--secondary">
                View Brochure Archive
              </a>
            </div>
          </div>

          <div class="hero-media-col">
            <div class="hero-media-wrapper" data-lightbox="assets/elevation.webp" data-caption="Shree Samarth — Exterior Architectural Elevation">
              <img src="assets/elevation.webp" alt="Shree Samarth Building Elevation" />
              <div class="hero-media-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                Click to Enlarge Elevation
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 02. VISION & LEGACY -->
      <section class="brochure-section" id="vision">
        <span class="section-tag">Architectural Philosophy</span>
        <h2 class="section-title">Harmonious Living, Divine Comfort</h2>
        <p class="section-subtitle">Every square foot at Shree Samarth was planned with spiritual balance, structural integrity, and generous open spaces to nurture multi-generational happiness.</p>

        <div class="pillar-grid">
          <div class="pillar-card">
            <div class="pillar-num">01</div>
            <h3 class="pillar-title">Vastu &amp; Natural Light</h3>
            <p class="pillar-desc">East-West cross ventilation ensures every room receives invigorating daylight and fresh cross breeze across all floors.</p>
          </div>
          <div class="pillar-card">
            <div class="pillar-num">02</div>
            <h3 class="pillar-title">Twin Wing Privacy</h3>
            <p class="pillar-desc">Independent cores with separate lifts and staircases for Wing A and Wing B maximize privacy and eliminate corridor crowding.</p>
          </div>
          <div class="pillar-card">
            <div class="pillar-num">03</div>
            <h3 class="pillar-title">Sky Terraces</h3>
            <p class="pillar-desc">Exclusive 4th-floor penthouses (A-13 and B-13) feature private rooftop terraces offering panoramic skyline views of Indira Nagar.</p>
          </div>
          <div class="pillar-card">
            <div class="pillar-num">04</div>
            <h3 class="pillar-title">Community Wellness</h3>
            <p class="pillar-desc">Dedicated children's play arena, open-air green gym, performance stage, and lush lawn create a vibrant neighborhood oasis.</p>
          </div>
        </div>
      </section>

      <!-- 03. AMENITIES SECTION -->
      <section class="brochure-section" id="amenities">
        <span class="section-tag">Curated Amenities</span>
        <h2 class="section-title">Designed for Joy &amp; Complete Rejuvenation</h2>
        <p class="section-subtitle">Thoughtful lifestyle additions integrated into the ground landscape to ensure daily relaxation for children, adults, and senior citizens alike.</p>

        <div class="amenities-grid">
          <div class="amenity-card">
            <div class="amenity-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
            </div>
            <h3 class="amenity-name">Children's Play Area</h3>
            <p class="amenity-desc">Equipped with safe, child-friendly swings, slides, sand pit, and soft lawn mounds for wholesome childhood fun.</p>
          </div>

          <div class="amenity-card">
            <div class="amenity-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"></path></svg>
            </div>
            <h3 class="amenity-name">Open-Air Green Gym</h3>
            <p class="amenity-desc">Modern outdoor fitness equipment stationed amidst greenery to encourage healthy daily morning workouts.</p>
          </div>

          <div class="amenity-card">
            <div class="amenity-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
            </div>
            <h3 class="amenity-name">Landscaped Mound &amp; Lawn</h3>
            <p class="amenity-desc">Centrally manicured green lawns with ornamental shrubs, flowering plantations, and perimeter hedges.</p>
          </div>

          <div class="amenity-card">
            <div class="amenity-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <h3 class="amenity-name">Stage &amp; Seating Arena</h3>
            <p class="amenity-desc">Elevated community stage and shaded seating areas for festivals, cultural gatherings, and evening conversations.</p>
          </div>

          <div class="amenity-card">
            <div class="amenity-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <h3 class="amenity-name">Twin Automatic Elevators</h3>
            <p class="amenity-desc">Two high-speed elevators (independent for Wing A and Wing B) equipped with battery backup and emergency rescue.</p>
          </div>

          <div class="amenity-card">
            <div class="amenity-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
            </div>
            <h3 class="amenity-name">Demarcated Stilt Parking</h3>
            <p class="amenity-desc">26 clearly numbered bays (A-1 to A-13 and B-1 to B-13) serviced by a wide 6.00M internal peripheral driveway.</p>
          </div>
        </div>
      </section>

      <!-- 04. FLOOR PLANS (INTERACTIVE TABS) -->
      <section class="brochure-section" id="floorplans">
        <span class="section-tag">Architectural Blueprints</span>
        <h2 class="section-title">Master Layouts &amp; Floor Plans</h2>
        <p class="section-subtitle">Explore the carefully dimensioned architectural plans. Click any blueprint to inspect full high-resolution details.</p>

        <div class="floorplan-tabs-wrapper">
          <div class="floorplan-tabs">
            <button type="button" class="floorplan-tab-btn active" data-tab="tab-parking">Ground Stilt &amp; Amenities</button>
            <button type="button" class="floorplan-tab-btn" data-tab="tab-typical">Typical 1st-3rd Floors (2 &amp; 3 BHK)</button>
            <button type="button" class="floorplan-tab-btn" data-tab="tab-penthouse">4th Floor Penthouses &amp; Terraces</button>
          </div>

          <!-- Tab 1: Ground Parking -->
          <div class="floorplan-tab-content active" id="tab-parking">
            <div class="floorplan-display-card">
              <div class="floorplan-img-container" data-lightbox="assets/plan-parking.webp" data-caption="Shree Samarth — Ground Stilt Parking &amp; Amenities Master Layout">
                <img src="assets/plan-parking.webp" alt="Ground Stilt Parking Layout" />
                <div class="zoom-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> Click to Zoom Blueprint
                </div>
              </div>
              <div class="floorplan-card-body">
                <h3 class="floorplan-card-title">Ground Stilt Parking &amp; Amenity Zone</h3>
                <p class="floorplan-card-desc">Featuring 26 demarcated vehicle bays, wide 6.00-meter peripheral driveway, twin lift lobbies, security cabin, children's play area, green gym, landscaped mound, lawn, and open-air stage.</p>
              </div>
            </div>
          </div>

          <!-- Tab 2: Typical Floor Plan -->
          <div class="floorplan-tab-content" id="tab-typical">
            <div class="floorplan-display-card">
              <div class="floorplan-img-container" data-lightbox="assets/plan-typical.webp" data-caption="Shree Samarth — Typical 1st, 2nd &amp; 3rd Floor Plan (Wings A &amp; B)">
                <img src="assets/plan-typical.webp" alt="Typical 1st to 3rd Floor Plan" />
                <div class="zoom-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> Click to Zoom Blueprint
                </div>
              </div>
              <div class="floorplan-card-body">
                <h3 class="floorplan-card-title">Typical 1st, 2nd &amp; 3rd Floor Layout (Wings A &amp; B)</h3>
                <p class="floorplan-card-desc">Showcasing luxurious 2 &amp; 3 BHK residences (Flats A-1 to A-12 and B-1 to B-12). Each residence features expansive living rooms with personal terraces, well-ventilated master suites, and dedicated utility spaces.</p>
              </div>
            </div>
          </div>

          <!-- Tab 3: Penthouse Plan -->
          <div class="floorplan-tab-content" id="tab-penthouse">
            <div class="floorplan-display-card">
              <div class="floorplan-img-container" data-lightbox="assets/plan-penthouse.webp" data-caption="Shree Samarth — 4th Floor Penthouse &amp; Private Sky Terrace Layout">
                <img src="assets/plan-penthouse.webp" alt="4th Floor Penthouse Layout" />
                <div class="zoom-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> Click to Zoom Blueprint
                </div>
              </div>
              <div class="floorplan-card-body">
                <h3 class="floorplan-card-title">4th Floor Exclusive Penthouses (A-13 &amp; B-13)</h3>
                <p class="floorplan-card-desc">Elite top-floor penthouses with sweeping private open-to-sky terraces, offering majestic elevated living, private sky gardening spaces, and unhindered horizon views.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 05. SPECIFICATIONS SECTION -->
      <section class="brochure-section" id="specifications">
        <span class="section-tag">Quality Engineering</span>
        <h2 class="section-title">Construction Specifications</h2>
        <p class="section-subtitle">Engineered to strict Indian Standard (IS) codes, incorporating premium materials, reliable fittings, and durable craftsmanship throughout.</p>

        <div class="specs-grid">
          <div class="spec-card">
            <h3 class="spec-category">Structure &amp; Masonry</h3>
            <ul class="spec-list">
              <li>Earthquake-resistant RCC framed structure compliant with IS codes</li>
              <li>6" external brickwork with double-coat sand-faced plaster</li>
              <li>Smooth neeru plaster finish on all interior walls</li>
            </ul>
          </div>

          <div class="spec-card">
            <h3 class="spec-category">Flooring &amp; Tiling</h3>
            <ul class="spec-list">
              <li>Premium 2' x 2' vitrified tile flooring in living, dining, and bedrooms</li>
              <li>Anti-skid designer ceramic tile flooring in terraces &amp; dry balconies</li>
              <li>Full height glazed ceramic tiles in toilets and bathrooms</li>
            </ul>
          </div>

          <div class="spec-card">
            <h3 class="spec-category">Doors &amp; Windows</h3>
            <ul class="spec-list">
              <li>Decorative main door with brass hardware, night latch &amp; nameplate</li>
              <li>Waterproof flush doors with cylindrical locks for bedrooms</li>
              <li>Powder-coated 3-track aluminum sliding windows with mosquito mesh &amp; safety MS grills</li>
            </ul>
          </div>

          <div class="spec-card">
            <h3 class="spec-category">Kitchen &amp; Utility</h3>
            <ul class="spec-list">
              <li>Fine-polished granite kitchen platform with stainless steel sink</li>
              <li>Glazed designer tiles up to lintel level above platform</li>
              <li>Provision for water purifier and exhaust fan</li>
            </ul>
          </div>

          <div class="spec-card">
            <h3 class="spec-category">Electrical &amp; Telecom</h3>
            <ul class="spec-list">
              <li>Concealed fire-resistant copper wiring with modular switches</li>
              <li>Adequate light, fan, TV, and telephone points in living &amp; master bedroom</li>
              <li>AC point provision in master bedroom &amp; inverter wiring point</li>
            </ul>
          </div>

          <div class="spec-card">
            <h3 class="spec-category">Plumbing &amp; Paint</h3>
            <ul class="spec-list">
              <li>Concealed CPVC plumbing with branded CP fittings &amp; sanitaryware</li>
              <li>Solar water heating provision and overhead/underground water storage tanks</li>
              <li>Interior premium acrylic wash paint; exterior weather-shield apex paint</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 06. LOCATION & CONNECTIVITY -->
      <section class="brochure-section" id="location">
        <span class="section-tag">Strategic Address</span>
        <h2 class="section-title">Indira Nagar Annex, Nashik</h2>
        <p class="section-subtitle">Located opposite LIC Colony, behind Samrat Sweet and near Anmol Apartment, Shree Samarth places you in one of Nashik's most coveted and peaceful residential pockets with effortless transit access.</p>

        <div class="location-grid">
          <div class="location-card">
            <div class="location-icon">&#x1F697;</div>
            <h3 class="location-title">Transit &amp; Arterials</h3>
            <ul class="location-list">
              <li>Mumbai-Agra National Highway (NH-3) — 3 mins</li>
              <li>Indira Nagar Jogging Track &amp; Circle — 2 mins</li>
              <li>Nashik Road Railway Station — 15 mins</li>
              <li>CBS Bus Terminal — 12 mins</li>
            </ul>
          </div>

          <div class="location-card">
            <div class="location-icon">&#x1F393;</div>
            <h3 class="location-title">Education &amp; Schools</h3>
            <ul class="location-list">
              <li>Symbiosis School &amp; College — 5 mins</li>
              <li>Ashoka Universal School — 8 mins</li>
              <li>Guru Gobind Singh College — 6 mins</li>
              <li>St. Francis High School — 7 mins</li>
            </ul>
          </div>

          <div class="location-card">
            <div class="location-icon">&#x1F3E5;</div>
            <h3 class="location-title">Healthcare &amp; Daily Needs</h3>
            <ul class="location-list">
              <li>Wockhardt Super Speciality Hospital — 7 mins</li>
              <li>Apollo Hospital &amp; Medical Centers — 10 mins</li>
              <li>City Center Mall &amp; Multiplexes — 10 mins</li>
              <li>Indira Nagar Daily Fresh Market — 2 mins</li>
            </ul>
          </div>
        </div>
      </section>

{make_leadership_team()}

      <!-- 08. ORIGINAL BROCHURE GALLERY ARCHIVE -->
      <section class="brochure-section" id="gallery">
        <span class="section-tag">Document Archive</span>
        <h2 class="section-title">Original Print Brochure Gallery</h2>
        <p class="section-subtitle">Browse all 6 high-resolution scanned pages of the original printed Shree Samarth brochure. Click any page to open full-screen lightbox zoom.</p>

        <div class="gallery-grid">
          <div class="gallery-card" data-lightbox="assets/page-1.webp" data-caption="Shree Samarth Original Brochure — Page 1 (Cover &amp; Identity)">
            <img src="assets/page-1.webp" alt="Brochure Page 1" />
            <div class="gallery-card-label">Page 1: Cover &amp; Project Identity</div>
          </div>

          <div class="gallery-card" data-lightbox="assets/page-2.webp" data-caption="Shree Samarth Original Brochure — Page 2 (Vision &amp; Architectural Elevation)">
            <img src="assets/page-2.webp" alt="Brochure Page 2" />
            <div class="gallery-card-label">Page 2: Vision &amp; Architectural Elevation</div>
          </div>

          <div class="gallery-card" data-lightbox="assets/page-3.webp" data-caption="Shree Samarth Original Brochure — Page 3 (Ground Stilt Parking &amp; Amenities)">
            <img src="assets/page-3.webp" alt="Brochure Page 3" />
            <div class="gallery-card-label">Page 3: Ground Stilt &amp; Amenities</div>
          </div>

          <div class="gallery-card" data-lightbox="assets/page-4.webp" data-caption="Shree Samarth Original Brochure — Page 4 (Typical 1st-3rd Floor Plan Wings A &amp; B)">
            <img src="assets/page-4.webp" alt="Brochure Page 4" />
            <div class="gallery-card-label">Page 4: Typical 1st-3rd Floor Plan</div>
          </div>

          <div class="gallery-card" data-lightbox="assets/page-5.webp" data-caption="Shree Samarth Original Brochure — Page 5 (4th Floor Penthouse &amp; Sky Terrace Layout)">
            <img src="assets/page-5.webp" alt="Brochure Page 5" />
            <div class="gallery-card-label">Page 5: 4th Floor Penthouse Layout</div>
          </div>

          <div class="gallery-card" data-lightbox="assets/page-6.webp" data-caption="Shree Samarth Original Brochure — Page 6 (Specifications &amp; Location Map)">
            <img src="assets/page-6.webp" alt="Brochure Page 6" />
            <div class="gallery-card-label">Page 6: Specifications &amp; Location</div>
          </div>
        </div>
      </section>

      <!-- 09. DOWNLOAD SECTION -->
      <section class="brochure-section download-section" id="download">
        <div class="download-banner">
          <div class="download-banner-text">
            <h2 class="download-banner-title">Download Shree Samarth PDF Brochure</h2>
            <p class="download-banner-desc">Get the complete high-resolution document archive including floor plans, elevation renders, and technical specifications for offline viewing.</p>
          </div>
          <div class="download-banner-actions">
            <a href="assets/Shree-Samarth-Brochure.pdf" download class="hero-cta-btn hero-cta-btn--primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download PDF (3.28 MB)
            </a>
            <a href="/projects" class="hero-cta-btn hero-cta-btn--secondary">
              Explore More Projects
            </a>
          </div>
        </div>
      </section>

    </div>

  </main>

{make_lightbox()}

  <script src="samarth-brochure.js"></script>
</body>
</html>'''


# =============================================================================
# 2. GENERATE SHREE VINAYAK BROCHURE HTML
# =============================================================================
def generate_vinayak_html():
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <base href="/projects/shree-vinayak/brochure/" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Shree Vinayak — Official Digital Brochure | Shreeyog Builders</title>
  <meta name="description" content="Explore Shree Vinayak by Shreeyog Builders: 2 &amp; 3 BHK premium apartments behind Hotel Tapasvi, Indira Nagar, Nashik. Featuring personal 2nd floor terraces, Sanskar Mandir, elevator, and demarcated stilt parking." />

  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="vinayak-brochure.css" />
</head>
<body>

{make_mobile_topbar("Shree Vinayak", "assets/logo.png", NAV_ITEMS, "assets/Shree-Vinayak-Brochure.pdf")}
{make_sidebar("Shree Vinayak", "assets/logo.png", NAV_ITEMS, "assets/Shree-Vinayak-Brochure.pdf")}

  <!-- MAIN CONTENT CONTAINER -->
  <main class="brochure-main">

    <div class="brochure-content-wrapper">

      <!-- 01. HERO / OVERVIEW SECTION -->
      <section class="brochure-section hero-section" id="overview">
        <div class="hero-grid">
          <div class="hero-text-col">
            <div class="hero-badges-row">
              <span class="hero-badge hero-badge--status">&#x25CF; Completed Benchmark</span>
              <span class="hero-badge hero-badge--luxury">2 &amp; 3 BHK &bull; Terrace Homes</span>
              <span class="hero-badge hero-badge--rera">200m from Highway</span>
            </div>

            <h1 class="hero-title">Shree Vinayak</h1>
            <p class="hero-tagline">"सुख-समृद्धीचा वास होऊ दे.. सर्व घराघरात !" &bull; 2 &amp; 3 BHK Premium Flats</p>
            <p class="hero-desc">
              Situated just 200 meters off the Mumbai-Agra National Highway behind Hotel Tapasvi in Indira Nagar, Shree Vinayak represents premium urban craftsmanship. Featuring 16 residences over a stilt parking level, the development offers spacious 3 BHK homes on the 1st floor, exclusive 2 BHK flats with personal 156 sq.ft private terraces on the 2nd floor, a Sanskar Mandir temple, high-speed elevator, and dedicated covered car parking for every homeowner.
            </p>

            <div class="hero-stats-grid">
              <div class="hero-stat-card">
                <div class="hero-stat-num">Stilt + 4</div>
                <div class="hero-stat-label">Low-Density Tower</div>
              </div>
              <div class="hero-stat-card">
                <div class="hero-stat-num">16 Homes</div>
                <div class="hero-stat-label">Exclusive Community</div>
              </div>
              <div class="hero-stat-card">
                <div class="hero-stat-num">2 &amp; 3 BHK</div>
                <div class="hero-stat-label">With Private Terraces</div>
              </div>
              <div class="hero-stat-card">
                <div class="hero-stat-num">200 Meters</div>
                <div class="hero-stat-label">From NH-3 Highway</div>
              </div>
            </div>

            <div class="hero-ctas-row">
              <a href="assets/Shree-Vinayak-Brochure.pdf" download class="hero-cta-btn hero-cta-btn--primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download Official Brochure
              </a>
              <a href="#gallery" class="hero-cta-btn hero-cta-btn--secondary">
                View Brochure Archive
              </a>
            </div>
          </div>

          <div class="hero-media-col">
            <div class="hero-media-wrapper" data-lightbox="assets/elevation.webp" data-caption="Shree Vinayak — Exterior Architectural Elevation">
              <img src="assets/elevation.webp" alt="Shree Vinayak Building Elevation" />
              <div class="hero-media-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                Click to Enlarge Elevation
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 02. VISION & LEGACY -->
      <section class="brochure-section" id="vision">
        <span class="section-tag">Architectural Heritage</span>
        <h2 class="section-title">Blessing Every Family with Peace &amp; Prosperity</h2>
        <p class="section-subtitle">Conceived to blend spiritual serenity with modern urban convenience, Shree Vinayak delivers an intimate neighborhood feel just footsteps away from Nashik's transit lifeline.</p>

        <div class="pillar-grid">
          <div class="pillar-card">
            <div class="pillar-num">01</div>
            <h3 class="pillar-title">Sanskar Mandir</h3>
            <p class="pillar-desc">An auspicious community temple integrated at ground level fosters spiritual tranquility and daily positivity for all residents.</p>
          </div>
          <div class="pillar-card">
            <div class="pillar-num">02</div>
            <h3 class="pillar-title">Personal Open Terraces</h3>
            <p class="pillar-desc">Second-floor apartments boast personal attached open terraces of 156 sq.ft, ideal for private sit-outs, plants, and tea evenings.</p>
          </div>
          <div class="pillar-card">
            <div class="pillar-num">03</div>
            <h3 class="pillar-title">Highway Convenience</h3>
            <p class="pillar-desc">A mere 200 meters off Mumbai-Agra Highway provides effortless Pune/Mumbai commutes while remaining insulated from highway noise.</p>
          </div>
          <div class="pillar-card">
            <div class="pillar-num">04</div>
            <h3 class="pillar-title">Private 16-Home Sanctum</h3>
            <p class="pillar-desc">With only 16 residences in the entire development, enjoy enhanced privacy, lower maintenance overheads, and true neighborly bonds.</p>
          </div>
        </div>
      </section>

      <!-- 03. AMENITIES SECTION -->
      <section class="brochure-section" id="amenities">
        <span class="section-tag">Key Amenities</span>
        <h2 class="section-title">Practical Comforts for Every Family Member</h2>
        <p class="section-subtitle">Engineered for hassle-free living with dependable vertical transit, dedicated parking, and dedicated community facilities.</p>

        <div class="amenities-grid">
          <div class="amenity-card">
            <div class="amenity-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
            </div>
            <h3 class="amenity-name">Sanskar Mandir</h3>
            <p class="amenity-desc">Dedicated temple area on the ground stilt floor providing a serene spiritual space for daily morning prayers.</p>
          </div>

          <div class="amenity-card">
            <div class="amenity-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <h3 class="amenity-name">Automatic Lift with Inverter</h3>
            <p class="amenity-desc">Branded passenger lift equipped with automatic rescue device (ARD) and battery backup for continuous vertical transit.</p>
          </div>

          <div class="amenity-card">
            <div class="amenity-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
            </div>
            <h3 class="amenity-name">16 Demarcated Car Bays</h3>
            <p class="amenity-desc">Covered ground stilt parking with 16 clearly numbered bays, ensuring every homeowner has guaranteed personal parking.</p>
          </div>

          <div class="amenity-card">
            <div class="amenity-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <h3 class="amenity-name">Watchman Cabin &amp; Security</h3>
            <p class="amenity-desc">Dedicated security watchman cabin at the entrance gate with intercom facilities and visitor registration.</p>
          </div>

          <div class="amenity-card">
            <div class="amenity-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            </div>
            <h3 class="amenity-name">Rainwater Harvesting</h3>
            <p class="amenity-desc">Eco-friendly ground percolation and dual underground and overhead water storage tanks with auto-level controllers.</p>
          </div>

          <div class="amenity-card">
            <div class="amenity-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
            </div>
            <h3 class="amenity-name">200m Highway Proximity</h3>
            <p class="amenity-desc">Instantaneous access to NH-3, making daily school, work, and interstate travel exceptionally convenient.</p>
          </div>
        </div>
      </section>

      <!-- 04. FLOOR PLANS (INTERACTIVE TABS) -->
      <section class="brochure-section" id="floorplans">
        <span class="section-tag">Architectural Blueprints</span>
        <h2 class="section-title">Floor Plans &amp; Spatial Layouts</h2>
        <p class="section-subtitle">Review the detailed architectural layouts across all levels. Click any plan to view enlarged high-resolution blueprints.</p>

        <div class="floorplan-tabs-wrapper">
          <div class="floorplan-tabs">
            <button type="button" class="floorplan-tab-btn active" data-tab="tab-parking">Ground Floor &amp; Mandir</button>
            <button type="button" class="floorplan-tab-btn" data-tab="tab-first">1st Floor (3 BHK Layout)</button>
            <button type="button" class="floorplan-tab-btn" data-tab="tab-terrace">2nd Floor (Terrace Flats)</button>
            <button type="button" class="floorplan-tab-btn" data-tab="tab-upper">3rd &amp; 4th Typical (2 BHK)</button>
            <button type="button" class="floorplan-tab-btn" data-tab="tab-map">Location Plan</button>
          </div>

          <!-- Tab 1: Ground Parking -->
          <div class="floorplan-tab-content active" id="tab-parking">
            <div class="floorplan-display-card">
              <div class="floorplan-img-container" data-lightbox="assets/plan-parking.webp" data-caption="Shree Vinayak — Ground Stilt Parking &amp; Sanskar Mandir Layout">
                <img src="assets/plan-parking.webp" alt="Ground Floor Parking Plan" />
                <div class="zoom-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> Click to Zoom Blueprint
                </div>
              </div>
              <div class="floorplan-card-body">
                <h3 class="floorplan-card-title">Ground Floor Stilt Parking &amp; Mandir</h3>
                <p class="floorplan-card-desc">Features 16 demarcated car parking slots, Sanskar Mandir, entrance lift foyer, staircase, watchman cabin, and smooth vehicular turning radius.</p>
              </div>
            </div>
          </div>

          <!-- Tab 2: 1st Floor Plan -->
          <div class="floorplan-tab-content" id="tab-first">
            <div class="floorplan-display-card">
              <div class="floorplan-img-container" data-lightbox="assets/plan-typical.webp" data-caption="Shree Vinayak — 1st Floor 3 BHK Plan (Flats 1 to 8)">
                <img src="assets/plan-typical.webp" alt="1st Floor 3 BHK Plan" />
                <div class="zoom-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> Click to Zoom Blueprint
                </div>
              </div>
              <div class="floorplan-card-body">
                <h3 class="floorplan-card-title">1st Floor 3 BHK Residential Layout</h3>
                <p class="floorplan-card-desc">Spacious 3-bedroom configurations offering separate dining spaces, master suites with attached toilets, large kitchen with service platform, and airy living room balconies.</p>
              </div>
            </div>
          </div>

          <!-- Tab 3: 2nd Floor Terrace -->
          <div class="floorplan-tab-content" id="tab-terrace">
            <div class="floorplan-display-card">
              <div class="floorplan-img-container" data-lightbox="assets/plan-terrace.webp" data-caption="Shree Vinayak — 2nd Floor 2 BHK Plan with 156 sq.ft Private Attached Terraces">
                <img src="assets/plan-terrace.webp" alt="2nd Floor Terrace Plan" />
                <div class="zoom-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> Click to Zoom Blueprint
                </div>
              </div>
              <div class="floorplan-card-body">
                <h3 class="floorplan-card-title">2nd Floor 2 BHK with 156 sq.ft Private Terraces</h3>
                <p class="floorplan-card-desc">Exclusive residences (Flats 9 to 12) featuring 156 sq.ft attached open sky terraces extending directly from the living zone, providing personal outdoor lounging space.</p>
              </div>
            </div>
          </div>

          <!-- Tab 4: 3rd & 4th Upper Floors -->
          <div class="floorplan-tab-content" id="tab-upper">
            <div class="floorplan-display-card">
              <div class="floorplan-img-container" data-lightbox="assets/plan-upper.webp" data-caption="Shree Vinayak — 3rd &amp; 4th Floor Typical 2 BHK Plan (Flats 13 to 16)">
                <img src="assets/plan-upper.webp" alt="3rd &amp; 4th Floor Plan" />
                <div class="zoom-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> Click to Zoom Blueprint
                </div>
              </div>
              <div class="floorplan-card-body">
                <h3 class="floorplan-card-title">3rd &amp; 4th Floor Typical 2 BHK Layout</h3>
                <p class="floorplan-card-desc">Optimized 2 BHK homes (Flats 13 to 16) maximizing usable carpet area, with cross-ventilated bedrooms, utility terraces, and sunlit living spaces.</p>
              </div>
            </div>
          </div>

          <!-- Tab 5: Location Map -->
          <div class="floorplan-tab-content" id="tab-map">
            <div class="floorplan-display-card">
              <div class="floorplan-img-container" data-lightbox="assets/location-map.webp" data-caption="Shree Vinayak — Location Map &amp; Highway Connectivity">
                <img src="assets/location-map.webp" alt="Location Map" />
                <div class="zoom-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> Click to Zoom Blueprint
                </div>
              </div>
              <div class="floorplan-card-body">
                <h3 class="floorplan-card-title">Location Plan &amp; Arterial Road Network</h3>
                <p class="floorplan-card-desc">Detailed neighborhood map showing immediate proximity to Hotel Tapasvi, Mumbai-Agra Highway (NH-3), and arterial access corridors.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 05. SPECIFICATIONS SECTION -->
      <section class="brochure-section" id="specifications">
        <span class="section-tag">Quality Engineering</span>
        <h2 class="section-title">Construction Specifications</h2>
        <p class="section-subtitle">Every element is selected to ensure lasting strength, aesthetic elegance, and low lifetime maintenance.</p>

        <div class="specs-grid">
          <div class="spec-card">
            <h3 class="spec-category">Structure &amp; Walls</h3>
            <ul class="spec-list">
              <li>Earthquake-resistant RCC frame structure as per IS specifications</li>
              <li>External 6" brick walls, internal 4" brick partitions</li>
              <li>Double-coat sand-faced external plaster; neeru finish internal plaster</li>
            </ul>
          </div>

          <div class="spec-card">
            <h3 class="spec-category">Flooring &amp; Finishes</h3>
            <ul class="spec-list">
              <li>2' x 2' vitrified tile flooring in all rooms</li>
              <li>Anti-skid ceramic tile flooring in terraces and washrooms</li>
              <li>Glazed wall tiles up to 7 ft height in all bathrooms</li>
            </ul>
          </div>

          <div class="spec-card">
            <h3 class="spec-category">Kitchen</h3>
            <ul class="spec-list">
              <li>Black granite kitchen platform with stainless steel sink</li>
              <li>Glazed ceramic tiles up to lintel level above platform</li>
              <li>Provision for exhaust fan and drinking water filter connection</li>
            </ul>
          </div>

          <div class="spec-card">
            <h3 class="spec-category">Doors &amp; Windows</h3>
            <ul class="spec-list">
              <li>Waterproof laminated main door with eye-hole &amp; safety brass fittings</li>
              <li>Waterproof flush doors for all bedrooms and bathrooms</li>
              <li>3-track powder-coated aluminum sliding windows with MS safety grill</li>
            </ul>
          </div>

          <div class="spec-card">
            <h3 class="spec-category">Electrical</h3>
            <ul class="spec-list">
              <li>Concealed copper wiring with Anchor/Legrand modular switches</li>
              <li>Adequate points in all rooms, TV &amp; phone points in living room</li>
              <li>Geyser point in bathroom &amp; inverter wiring provision</li>
            </ul>
          </div>

          <div class="spec-card">
            <h3 class="spec-category">Plumbing &amp; Paint</h3>
            <ul class="spec-list">
              <li>Concealed plumbing with premium chrome-plated fittings</li>
              <li>Solar water connection to master bathroom</li>
              <li>Oil-bound distemper internally; weather-shield acrylic paint externally</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 06. LOCATION & CONNECTIVITY -->
      <section class="brochure-section" id="location">
        <span class="section-tag">Prime Connectivity</span>
        <h2 class="section-title">Indira Nagar, Behind Hotel Tapasvi</h2>
        <p class="section-subtitle">200 meters from Mumbai-Agra Highway, Shree Vinayak places you at the epicenter of Nashik's southern transit zone while preserving residential tranquility.</p>

        <div class="location-grid">
          <div class="location-card">
            <div class="location-icon">&#x1F697;</div>
            <h3 class="location-title">Highway &amp; Transit</h3>
            <ul class="location-list">
              <li>Mumbai-Agra Highway (NH-3) — 200m (2 mins walk)</li>
              <li>Hotel Tapasvi Junction — 200m</li>
              <li>Nashik Road Railway Station — 15 mins</li>
              <li>Pathardi Phata Flyover — 4 mins</li>
            </ul>
          </div>

          <div class="location-card">
            <div class="location-icon">&#x1F393;</div>
            <h3 class="location-title">Schools &amp; Daily Life</h3>
            <ul class="location-list">
              <li>Indira Nagar Jogging Track — 3 mins</li>
              <li>Rathchakra Chowk Commercial Hub — 3 mins</li>
              <li>Symbiosis &amp; Reputed Schools — 5-8 mins</li>
              <li>Daily Vegetable &amp; Grocery Market — 3 mins</li>
            </ul>
          </div>

          <div class="location-card">
            <div class="location-icon">&#x1F3E5;</div>
            <h3 class="location-title">Healthcare &amp; Retail</h3>
            <ul class="location-list">
              <li>Wockhardt Super Speciality Hospital — 7 mins</li>
              <li>Six Sigma Hospital — 8 mins</li>
              <li>City Center Mall — 8 mins</li>
              <li>Banks, ATMs &amp; Pharmacies — Walking distance</li>
            </ul>
          </div>
        </div>
      </section>

{make_leadership_team()}

      <!-- 08. ORIGINAL BROCHURE GALLERY ARCHIVE -->
      <section class="brochure-section" id="gallery">
        <span class="section-tag">Document Archive</span>
        <h2 class="section-title">Original Print Brochure Gallery</h2>
        <p class="section-subtitle">Review all 5 high-resolution pages of the original printed Shree Vinayak brochure. Click any page to open full-screen lightbox zoom.</p>

        <div class="gallery-grid">
          <div class="gallery-card" data-lightbox="assets/page-1.webp" data-caption="Shree Vinayak Original Brochure — Page 1 (Cover &amp; Identity)">
            <img src="assets/page-1.webp" alt="Brochure Page 1" />
            <div class="gallery-card-label">Page 1: Cover &amp; Project Identity</div>
          </div>

          <div class="gallery-card" data-lightbox="assets/page-2.webp" data-caption="Shree Vinayak Original Brochure — Page 2 (Vision, Elevation &amp; Amenities)">
            <img src="assets/page-2.webp" alt="Brochure Page 2" />
            <div class="gallery-card-label">Page 2: Vision &amp; Architectural Elevation</div>
          </div>

          <div class="gallery-card" data-lightbox="assets/page-3.webp" data-caption="Shree Vinayak Original Brochure — Page 3 (Ground Floor &amp; 1st Floor Plan)">
            <img src="assets/page-3.webp" alt="Brochure Page 3" />
            <div class="gallery-card-label">Page 3: Ground Floor &amp; 1st Floor Plan</div>
          </div>

          <div class="gallery-card" data-lightbox="assets/page-4.webp" data-caption="Shree Vinayak Original Brochure — Page 4 (2nd Floor Terrace &amp; 3rd-4th Floor Plan)">
            <img src="assets/page-4.webp" alt="Brochure Page 4" />
            <div class="gallery-card-label">Page 4: 2nd Floor Terrace &amp; Typical Plans</div>
          </div>

          <div class="gallery-card" data-lightbox="assets/page-5.webp" data-caption="Shree Vinayak Original Brochure — Page 5 (Specifications &amp; Location Map)">
            <img src="assets/page-5.webp" alt="Brochure Page 5" />
            <div class="gallery-card-label">Page 5: Specifications &amp; Location Map</div>
          </div>
        </div>
      </section>

      <!-- 09. DOWNLOAD SECTION -->
      <section class="brochure-section download-section" id="download">
        <div class="download-banner">
          <div class="download-banner-text">
            <h2 class="download-banner-title">Download Shree Vinayak PDF Brochure</h2>
            <p class="download-banner-desc">Access the complete high-resolution brochure archive including floor plans, elevation renders, and technical specifications for offline viewing.</p>
          </div>
          <div class="download-banner-actions">
            <a href="assets/Shree-Vinayak-Brochure.pdf" download class="hero-cta-btn hero-cta-btn--primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download PDF (2.84 MB)
            </a>
            <a href="/projects" class="hero-cta-btn hero-cta-btn--secondary">
              Explore More Projects
            </a>
          </div>
        </div>
      </section>

    </div>

  </main>

{make_lightbox()}

  <script src="vinayak-brochure.js"></script>
</body>
</html>'''


# =============================================================================
# 3. GENERATE SHREE NISARG BROCHURE HTML
# =============================================================================
def generate_nisarg_html():
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <base href="/projects/shree-nisarg/brochure/" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Shree Nisarg — Official Digital Brochure | Shreeyog Builders</title>
  <meta name="description" content="Explore Shree Nisarg by Shreeyog Builders: 2 &amp; 3 BHK luxurious flats on Gangapur Road, Nashik. Twin wings (A &amp; B) with landscaped front park, dual elevators, and covered parking near Nirmala Convent." />

  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="nisarg-brochure.css" />
</head>
<body>

{make_mobile_topbar("Shree Nisarg", "assets/logo.png", NAV_ITEMS, "assets/Shree-Nisarg-Brochure.pdf")}
{make_sidebar("Shree Nisarg", "assets/logo.png", NAV_ITEMS, "assets/Shree-Nisarg-Brochure.pdf")}

  <!-- MAIN CONTENT CONTAINER -->
  <main class="brochure-main">

    <div class="brochure-content-wrapper">

      <!-- 01. HERO / OVERVIEW SECTION -->
      <section class="brochure-section hero-section" id="overview">
        <div class="hero-grid">
          <div class="hero-text-col">
            <div class="hero-badges-row">
              <span class="hero-badge hero-badge--status">&#x25CF; Completed Benchmark</span>
              <span class="hero-badge hero-badge--luxury">2 &amp; 3 BHK &bull; Twin Wings</span>
              <span class="hero-badge hero-badge--rera">Prime Gangapur Road</span>
            </div>

            <h1 class="hero-title">Shree Nisarg</h1>
            <p class="hero-tagline">"Relax in the soothing lap of mother nature" &bull; 2 &amp; 3 BHK Luxurious Flats</p>
            <p class="hero-desc">
              Situated in the prestigious cultural and educational heartland of Gangapur Road opposite Pramod Nagar, Shree Nisarg harmonizes urban luxury with serene botanical greens. Featuring twin wings (A &amp; B) rising over a stilt parking level with a dedicated landscaped roadside front park, this boutique community offers 24 residences: 3 BHK homes (1,270 sq.ft) in Wing A and 2 BHK homes (1,025 sq.ft) in Wing B, dual elevators, and dedicated covered car bays.
            </p>

            <div class="hero-stats-grid">
              <div class="hero-stat-card">
                <div class="hero-stat-num">Stilt + 4</div>
                <div class="hero-stat-label">Twin Wings A &amp; B</div>
              </div>
              <div class="hero-stat-card">
                <div class="hero-stat-num">24 Homes</div>
                <div class="hero-stat-label">3 BHK (A) &amp; 2 BHK (B)</div>
              </div>
              <div class="hero-stat-card">
                <div class="hero-stat-num">Front Park</div>
                <div class="hero-stat-label">Landscaped Road Garden</div>
              </div>
              <div class="hero-stat-card">
                <div class="hero-stat-num">Dual Lifts</div>
                <div class="hero-stat-label">Independent Cores</div>
              </div>
            </div>

            <div class="hero-ctas-row">
              <a href="assets/Shree-Nisarg-Brochure.pdf" download class="hero-cta-btn hero-cta-btn--primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download Official Brochure
              </a>
              <a href="#gallery" class="hero-cta-btn hero-cta-btn--secondary">
                View Brochure Archive
              </a>
            </div>
          </div>

          <div class="hero-media-col">
            <div class="hero-media-wrapper" data-lightbox="assets/elevation.webp" data-caption="Shree Nisarg — Exterior Architectural Elevation">
              <img src="assets/elevation.webp" alt="Shree Nisarg Building Elevation" />
              <div class="hero-media-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                Click to Enlarge Elevation
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 02. VISION & LEGACY -->
      <section class="brochure-section" id="vision">
        <span class="section-tag">Nature-Centric Philosophy</span>
        <h2 class="section-title">Where Greenery Meets Sophistication</h2>
        <p class="section-subtitle">True to its name 'Nisarg' (Nature), the project is crafted around botanical landscaping, generous cross-breezes, and Gangapur Road's pleasant micro-climate.</p>

        <div class="pillar-grid">
          <div class="pillar-card">
            <div class="pillar-num">01</div>
            <h3 class="pillar-title">Landscaped Front Park</h3>
            <p class="pillar-desc">A lush green public-facing garden along the 12-meter road creates a green buffer and welcoming entrance experience.</p>
          </div>
          <div class="pillar-card">
            <div class="pillar-num">02</div>
            <h3 class="pillar-title">Distinct Wings A &amp; B</h3>
            <p class="pillar-desc">Wing A is exclusively dedicated to spacious 3 BHK residences (1,270 sq.ft) while Wing B hosts comfortable 2 BHK homes (1,025 sq.ft).</p>
          </div>
          <div class="pillar-card">
            <div class="pillar-num">03</div>
            <h3 class="pillar-title">Independent Lifts</h3>
            <p class="pillar-desc">Two distinct automatic elevators (one per wing) guarantee swift vertical movement and total resident privacy.</p>
          </div>
          <div class="pillar-card">
            <div class="pillar-num">04</div>
            <h3 class="pillar-title">Elite Address</h3>
            <p class="pillar-desc">Positioned opposite Pramod Nagar near Nirmala Convent, surrounded by Nashik's finest schools, cafes, and verdant avenues.</p>
          </div>
        </div>
      </section>

      <!-- 03. AMENITIES SECTION -->
      <section class="brochure-section" id="amenities">
        <span class="section-tag">Thoughtful Amenities</span>
        <h2 class="section-title">Enriching Amenities Surrounded by Greenery</h2>
        <p class="section-subtitle">Equipped with reliable infrastructure and natural community areas that make daily life delightful.</p>

        <div class="amenities-grid">
          <div class="amenity-card">
            <div class="amenity-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
            </div>
            <h3 class="amenity-name">Roadside Landscaped Park</h3>
            <p class="amenity-desc">Lush front landscaped garden with ornamental trees, flowering shrubs, lawn mounds, and decorative entrance pavers.</p>
          </div>

          <div class="amenity-card">
            <div class="amenity-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <h3 class="amenity-name">Dual High-Speed Lifts</h3>
            <p class="amenity-desc">Two independent passenger elevators (one in Wing A, one in Wing B) with battery backup and emergency descent.</p>
          </div>

          <div class="amenity-card">
            <div class="amenity-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
            </div>
            <h3 class="amenity-name">24 Demarcated Stilt Bays</h3>
            <p class="amenity-desc">Covered ground stilt parking with 24 numbered parking bays (A-1 to A-8 and B-1 to B-16) and wide driveway.</p>
          </div>

          <div class="amenity-card">
            <div class="amenity-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <h3 class="amenity-name">Security &amp; Boundary</h3>
            <p class="amenity-desc">Aesthetic perimeter compound wall, designer entrance gate, security cabin, and intercom connectivity.</p>
          </div>

          <div class="amenity-card">
            <div class="amenity-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            </div>
            <h3 class="amenity-name">Dual Water Supply</h3>
            <p class="amenity-desc">Municipal water connection coupled with on-site borewell, underground sump, and overhead tanks for uninterrupted water.</p>
          </div>

          <div class="amenity-card">
            <div class="amenity-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
            </div>
            <h3 class="amenity-name">Rainwater Recharge</h3>
            <p class="amenity-desc">Eco-conscious rainwater harvesting setup recharging groundwater tables and conserving resources.</p>
          </div>
        </div>
      </section>

      <!-- 04. FLOOR PLANS (INTERACTIVE TABS) -->
      <section class="brochure-section" id="floorplans">
        <span class="section-tag">Architectural Blueprints</span>
        <h2 class="section-title">Floor Plans &amp; Spatial Layouts</h2>
        <p class="section-subtitle">Inspect the architectural floor layouts for both wings. Click any plan to view enlarged high-resolution blueprints.</p>

        <div class="floorplan-tabs-wrapper">
          <div class="floorplan-tabs">
            <button type="button" class="floorplan-tab-btn active" data-tab="tab-parking">Ground Stilt &amp; Front Park</button>
            <button type="button" class="floorplan-tab-btn" data-tab="tab-typical">Typical Floor Wings A &amp; B</button>
            <button type="button" class="floorplan-tab-btn" data-tab="tab-map">Location Plan</button>
          </div>

          <!-- Tab 1: Ground Parking & Park -->
          <div class="floorplan-tab-content active" id="tab-parking">
            <div class="floorplan-display-card">
              <div class="floorplan-img-container" data-lightbox="assets/plan-parking.webp" data-caption="Shree Nisarg — Ground Stilt Parking &amp; Front Park Master Layout">
                <img src="assets/plan-parking.webp" alt="Ground Stilt Parking Layout" />
                <div class="zoom-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> Click to Zoom Blueprint
                </div>
              </div>
              <div class="floorplan-card-body">
                <h3 class="floorplan-card-title">Ground Stilt Parking &amp; Roadside Landscaped Park</h3>
                <p class="floorplan-card-desc">Detailed layout showing roadside front park, 24 demarcated car parking slots (bays A-1 to A-8 for Wing A, B-1 to B-16 for Wing B), dual entrance lobbies, security cabin, and driveways.</p>
              </div>
            </div>
          </div>

          <!-- Tab 2: Typical Floor Plan -->
          <div class="floorplan-tab-content" id="tab-typical">
            <div class="floorplan-display-card">
              <div class="floorplan-img-container" data-lightbox="assets/plan-typical.webp" data-caption="Shree Nisarg — Typical Floor Plan (Wing A: 3 BHK, Wing B: 2 BHK)">
                <img src="assets/plan-typical.webp" alt="Typical Floor Plan Wings A &amp; B" />
                <div class="zoom-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> Click to Zoom Blueprint
                </div>
              </div>
              <div class="floorplan-card-body">
                <h3 class="floorplan-card-title">Typical Floor Plan (Twin Wings A &amp; B)</h3>
                <p class="floorplan-card-desc">Master architectural blueprint showing Wing A's 3 BHK residences (1,270 sq.ft) with three expansive bedrooms and terrace, alongside Wing B's well-proportioned 2 BHK residences (1,025 sq.ft).</p>
              </div>
            </div>
          </div>

          <!-- Tab 3: Location Map -->
          <div class="floorplan-tab-content" id="tab-map">
            <div class="floorplan-display-card">
              <div class="floorplan-img-container" data-lightbox="assets/location-map.webp" data-caption="Shree Nisarg — Location Map &amp; Gangapur Road Connectivity">
                <img src="assets/location-map.webp" alt="Location Map" />
                <div class="zoom-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> Click to Zoom Blueprint
                </div>
              </div>
              <div class="floorplan-card-body">
                <h3 class="floorplan-card-title">Location Plan &amp; Educational Belt Network</h3>
                <p class="floorplan-card-desc">Detailed neighborhood map showing position opposite Pramod Nagar, near Nirmala Convent High School, and direct connectivity to Gangapur Road.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 05. SPECIFICATIONS SECTION -->
      <section class="brochure-section" id="specifications">
        <span class="section-tag">Quality Engineering</span>
        <h2 class="section-title">Construction Specifications</h2>
        <p class="section-subtitle">Engineered to high Indian Standard specifications, using top-tier structural materials, fittings, and refined interior finishes.</p>

        <div class="specs-grid">
          <div class="spec-card">
            <h3 class="spec-category">Structure &amp; Walls</h3>
            <ul class="spec-list">
              <li>Earthquake-resistant RCC frame structure engineered to high safety standards</li>
              <li>6" thick external and internal brick masonry</li>
              <li>Double-coat sand-faced plaster externally; smooth gypsum/neeru finish internally</li>
            </ul>
          </div>

          <div class="spec-card">
            <h3 class="spec-category">Flooring &amp; Tiling</h3>
            <ul class="spec-list">
              <li>Premium 2' x 2' vitrified tile flooring in drawing, dining, kitchen, and bedrooms</li>
              <li>Anti-skid ceramic flooring in attached terraces and washrooms</li>
              <li>Designer glazed full-height dado tiles in all bathrooms</li>
            </ul>
          </div>

          <div class="spec-card">
            <h3 class="spec-category">Kitchen</h3>
            <ul class="spec-list">
              <li>Fine-polished black granite counter with stainless steel sink</li>
              <li>Designer glazed tiles up to lintel level above platform</li>
              <li>Adequate electric points for exhaust fan, microwave, and water purifier</li>
            </ul>
          </div>

          <div class="spec-card">
            <h3 class="spec-category">Doors &amp; Windows</h3>
            <ul class="spec-list">
              <li>Teak wood frame ornamental main entrance door with brass fittings</li>
              <li>Waterproof flush doors for bedrooms and bathrooms</li>
              <li>Powder-coated aluminum sliding windows with mosquito mesh &amp; safety MS grills</li>
            </ul>
          </div>

          <div class="spec-card">
            <h3 class="spec-category">Electrification</h3>
            <ul class="spec-list">
              <li>Concealed copper wiring with Anchor/Legrand modular switches</li>
              <li>AC point in master bedroom; TV and telephone connections in living room</li>
              <li>Inverter wiring provision for uninterrupted illumination</li>
            </ul>
          </div>

          <div class="spec-card">
            <h3 class="spec-category">Plumbing &amp; Paint</h3>
            <ul class="spec-list">
              <li>Concealed plumbing with Jaguar or equivalent premium CP fittings</li>
              <li>Solar water heating connection in master bathroom</li>
              <li>Superior acrylic washable interior paint; durable weather-shield exterior coating</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 06. LOCATION & CONNECTIVITY -->
      <section class="brochure-section" id="location">
        <span class="section-tag">Prestigious Address</span>
        <h2 class="section-title">Opposite Pramod Nagar, Gangapur Road</h2>
        <p class="section-subtitle">Located in the most revered residential and educational corridor of Nashik, Shree Nisarg combines academic proximity, cultural prestige, and serene greenery.</p>

        <div class="location-grid">
          <div class="location-card">
            <div class="location-icon">&#x1F393;</div>
            <h3 class="location-title">Education Corridor</h3>
            <ul class="location-list">
              <li>Nirmala Convent High School — 2 mins (walking distance)</li>
              <li>KTHM College &amp; Campus — 5 mins</li>
              <li>BYK College of Commerce — 5 mins</li>
              <li>Horizon Academy &amp; Fravashi — 7 mins</li>
            </ul>
          </div>

          <div class="location-card">
            <div class="location-icon">&#x1F697;</div>
            <h3 class="location-title">Transit &amp; City Access</h3>
            <ul class="location-list">
              <li>Gangapur Road Main Arterial — 2 mins</li>
              <li>CBS (Central Bus Station) — 10 mins</li>
              <li>College Road Shopping Hub — 6 mins</li>
              <li>Nashik Road Railway Station — 20 mins</li>
            </ul>
          </div>

          <div class="location-card">
            <div class="location-icon">&#x1F3DE;&#xFE0F;</div>
            <h3 class="location-title">Leisure &amp; Culture</h3>
            <ul class="location-list">
              <li>Navshya Ganpati Temple — 7 mins</li>
              <li>Someshwar Waterfall &amp; Riverfront — 8 mins</li>
              <li>Gangapur Road Fine Dining &amp; Cafes — 3 mins</li>
              <li>City Center Mall — 12 mins</li>
            </ul>
          </div>
        </div>
      </section>

{make_leadership_team()}

      <!-- 08. ORIGINAL BROCHURE GALLERY ARCHIVE -->
      <section class="brochure-section" id="gallery">
        <span class="section-tag">Document Archive</span>
        <h2 class="section-title">Original Print Brochure Gallery</h2>
        <p class="section-subtitle">Review all 5 high-resolution scanned pages of the original printed Shree Nisarg brochure. Click any page to open full-screen lightbox zoom.</p>

        <div class="gallery-grid">
          <div class="gallery-card" data-lightbox="assets/page-1.webp" data-caption="Shree Nisarg Original Brochure — Page 1 (Cover &amp; Identity)">
            <img src="assets/page-1.webp" alt="Brochure Page 1" />
            <div class="gallery-card-label">Page 1: Cover &amp; Project Identity</div>
          </div>

          <div class="gallery-card" data-lightbox="assets/page-2.webp" data-caption="Shree Nisarg Original Brochure — Page 2 (Vision, Nature Theme &amp; Elevation)">
            <img src="assets/page-2.webp" alt="Brochure Page 2" />
            <div class="gallery-card-label">Page 2: Vision &amp; Architectural Elevation</div>
          </div>

          <div class="gallery-card" data-lightbox="assets/page-3.webp" data-caption="Shree Nisarg Original Brochure — Page 3 (Ground Parking &amp; Front Park Layout)">
            <img src="assets/page-3.webp" alt="Brochure Page 3" />
            <div class="gallery-card-label">Page 3: Ground Stilt &amp; Front Park</div>
          </div>

          <div class="gallery-card" data-lightbox="assets/page-4.webp" data-caption="Shree Nisarg Original Brochure — Page 4 (Typical Floor Plan Wings A &amp; B)">
            <img src="assets/page-4.webp" alt="Brochure Page 4" />
            <div class="gallery-card-label">Page 4: Typical Floor Plan (Wings A &amp; B)</div>
          </div>

          <div class="gallery-card" data-lightbox="assets/page-5.webp" data-caption="Shree Nisarg Original Brochure — Page 5 (Specifications &amp; Location Map)">
            <img src="assets/page-5.webp" alt="Brochure Page 5" />
            <div class="gallery-card-label">Page 5: Specifications &amp; Location Map</div>
          </div>
        </div>
      </section>

      <!-- 09. DOWNLOAD SECTION -->
      <section class="brochure-section download-section" id="download">
        <div class="download-banner">
          <div class="download-banner-text">
            <h2 class="download-banner-title">Download Shree Nisarg PDF Brochure</h2>
            <p class="download-banner-desc">Access the complete high-resolution brochure archive including floor plans, elevation renders, and technical specifications for offline viewing.</p>
          </div>
          <div class="download-banner-actions">
            <a href="assets/Shree-Nisarg-Brochure.pdf" download class="hero-cta-btn hero-cta-btn--primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download PDF (2.84 MB)
            </a>
            <a href="/projects" class="hero-cta-btn hero-cta-btn--secondary">
              Explore More Projects
            </a>
          </div>
        </div>
      </section>

    </div>

  </main>

{make_lightbox()}

  <script src="nisarg-brochure.js"></script>
</body>
</html>'''

if __name__ == "__main__":
    # Generate HTML files
    with open("public/projects/shree-samarth/brochure/index.html", "w", encoding="utf-8") as f:
        f.write(generate_samarth_html())
    print("Generated Shree Samarth brochure index.html")

    with open("public/projects/shree-vinayak/brochure/index.html", "w", encoding="utf-8") as f:
        f.write(generate_vinayak_html())
    print("Generated Shree Vinayak brochure index.html")

    with open("public/projects/shree-nisarg/brochure/index.html", "w", encoding="utf-8") as f:
        f.write(generate_nisarg_html())
    print("Generated Shree Nisarg brochure index.html")
