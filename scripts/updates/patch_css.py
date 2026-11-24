with open('public/_nuxt/shreeyog-projects.css', 'r', encoding='utf-8') as f:
    css = f.read()

target = '''/* Surrounding Satellite Cards */
.satellite-cards {
  display: none;
}

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
    transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease !important;
    cursor: pointer !important;
  }

  .satellite-card:hover {
    transform: translateY(-4px) scale(1.02) !important;
    border-color: rgba(196, 154, 108, 0.55) !important;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.75) !important;
    z-index: 15 !important;
  }

  .satellite-card img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    display: block !important;
  }

  .satellite-card .sat-overlay {
    position: absolute !important;
    inset: 0 !important;
    background: linear-gradient(180deg, transparent 40%, rgba(21, 20, 21, 0.95) 100%) !important;
    padding: 0.9rem !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-end !important;
  }

  .satellite-card .sat-num {
    font-family: var(--font-t-1), "Voyage", serif !important;
    font-size: 0.85rem !important;
    color: var(--sy-gold, #c6a76a) !important;
  }

  .satellite-card .sat-name {
    font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
    font-size: 0.82rem !important;
    font-weight: 500 !important;
    color: var(--sy-cream, #f1eade) !important;
    margin-top: 0.15rem !important;
  }

  /* Default Positions (Used for Highlighted & Ongoing 5-satellite stage) */
  .sat-1 { top: 3% !important; left: 3% !important; width: 220px !important; height: 260px !important; }
  .sat-2 { bottom: 4% !important; left: 4% !important; width: 230px !important; height: 165px !important; }
  .sat-3 { top: 4% !important; right: 3% !important; width: 220px !important; height: 270px !important; }
  .sat-4 { bottom: 4% !important; right: 4% !important; width: 230px !important; height: 165px !important; }
  .sat-5 { top: 48% !important; left: 1.5% !important; transform: translateY(-50%) !important; width: 175px !important; height: 200px !important; }

  /* Completed Stage 10-Satellite Balanced Framing (5 on Left, 5 on Right) */
  .completed-stage { min-height: 920px !important; }
  .completed-stage .sat-1 { top: 2% !important; left: 2.5% !important; width: 215px !important; height: 165px !important; transform: none !important; }
  .completed-stage .sat-7 { top: 21% !important; left: 1.5% !important; width: 200px !important; height: 145px !important; transform: none !important; }
  .completed-stage .sat-5 { top: 41% !important; left: 1.5% !important; width: 200px !important; height: 145px !important; transform: none !important; }
  .completed-stage .sat-9 { top: 61% !important; left: 1.5% !important; width: 200px !important; height: 145px !important; transform: none !important; }
  .completed-stage .sat-2 { bottom: 2% !important; left: 2.5% !important; width: 215px !important; height: 165px !important; transform: none !important; }

  .completed-stage .sat-3 { top: 2% !important; right: 2.5% !important; width: 215px !important; height: 165px !important; transform: none !important; }
  .completed-stage .sat-8 { top: 21% !important; right: 1.5% !important; width: 200px !important; height: 145px !important; transform: none !important; }
  .completed-stage .sat-6 { top: 41% !important; right: 1.5% !important; width: 200px !important; height: 145px !important; transform: none !important; }
  .completed-stage .sat-10 { top: 61% !important; right: 1.5% !important; width: 200px !important; height: 145px !important; transform: none !important; }
  .completed-stage .sat-4 { bottom: 2% !important; right: 2.5% !important; width: 215px !important; height: 165px !important; transform: none !important; }
}'''

replacement = '''/* Surrounding Satellite Cards - Mobile & Tablet: strictly hide */
.satellite-cards {
  display: none !important;
}
.satellite-card {
  display: none !important;
}

@media (min-width: 1024px) {
  .satellite-cards {
    display: block !important;
    position: absolute !important;
    inset: 0 !important;
    pointer-events: none !important;
    z-index: 5 !important;
  }

  .satellite-card {
    display: block !important;
    pointer-events: all !important;
    position: absolute !important;
    border-radius: 0.5rem !important;
    overflow: hidden !important;
    background-color: var(--sy-card-bg, #1c1b1c) !important;
    border: 1px solid rgba(196, 154, 108, 0.22) !important;
    box-shadow: 0 16px 35px rgba(0, 0, 0, 0.6) !important;
    transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease !important;
    cursor: pointer !important;
    z-index: 6 !important;
    /* Strict default bounding prevents raw image dimension blowout */
    width: 210px !important;
    height: 140px !important;
    max-width: 230px !important;
    max-height: 270px !important;
  }

  .satellite-card:hover {
    transform: translateY(-4px) scale(1.02) !important;
    border-color: rgba(196, 154, 108, 0.55) !important;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.75) !important;
    z-index: 15 !important;
  }

  .satellite-card img {
    width: 100% !important;
    height: 100% !important;
    max-width: 100% !important;
    max-height: 100% !important;
    object-fit: cover !important;
    display: block !important;
  }

  .satellite-card .sat-overlay {
    position: absolute !important;
    inset: 0 !important;
    background: linear-gradient(180deg, transparent 40%, rgba(21, 20, 21, 0.95) 100%) !important;
    padding: 0.75rem 0.9rem !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-end !important;
    pointer-events: none !important;
  }

  .satellite-card .sat-num {
    font-family: var(--font-t-1), "Voyage", serif !important;
    font-size: 0.85rem !important;
    color: var(--sy-gold, #c6a76a) !important;
  }

  .satellite-card .sat-name {
    font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
    font-size: 0.82rem !important;
    font-weight: 500 !important;
    color: var(--sy-cream, #f1eade) !important;
    margin-top: 0.15rem !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  /* No logos on satellite cards */
  .satellite-card .featured-card-logo,
  .satellite-card .card-logo,
  .satellite-card .sat-logo {
    display: none !important;
  }

  /* Default 5-Satellite Positions (Highlighted & Ongoing stages) */
  .sat-1 { top: 3% !important; left: 3% !important; width: 220px !important; height: 260px !important; }
  .sat-2 { bottom: 4% !important; left: 4% !important; width: 230px !important; height: 165px !important; }
  .sat-3 { top: 4% !important; right: 3% !important; width: 220px !important; height: 270px !important; }
  .sat-4 { bottom: 4% !important; right: 4% !important; width: 230px !important; height: 165px !important; }
  .sat-5 { top: 48% !important; left: 1.5% !important; transform: translateY(-50%) !important; width: 175px !important; height: 200px !important; }

  /* Hide any satellite beyond 5 in Highlighted or Ongoing */
  .highlighted-stage:not(.completed-stage) .sat-6,
  .highlighted-stage:not(.completed-stage) .sat-7,
  .highlighted-stage:not(.completed-stage) .sat-8,
  .highlighted-stage:not(.completed-stage) .sat-9,
  .highlighted-stage:not(.completed-stage) .sat-10,
  .highlighted-stage:not(.completed-stage) .sat-11,
  .highlighted-stage:not(.completed-stage) .sat-12,
  .ongoing-stage .sat-6,
  .ongoing-stage .sat-7,
  .ongoing-stage .sat-8,
  .ongoing-stage .sat-9,
  .ongoing-stage .sat-10,
  .ongoing-stage .sat-11,
  .ongoing-stage .sat-12 {
    display: none !important;
  }

  /* Completed Stage 11-Satellite Balanced Framing (6 Left, 5 Right) */
  .completed-stage { min-height: 960px !important; }

  /* Left Side: 6 cards neatly stacked from top to bottom */
  .completed-stage .sat-1  { top: 2% !important; left: 2% !important; width: 210px !important; height: 135px !important; transform: none !important; }
  .completed-stage .sat-7  { top: 18% !important; left: 1.2% !important; width: 195px !important; height: 130px !important; transform: none !important; }
  .completed-stage .sat-5  { top: 34% !important; left: 1.2% !important; width: 195px !important; height: 130px !important; transform: none !important; }
  .completed-stage .sat-9  { top: 50% !important; left: 1.2% !important; width: 195px !important; height: 130px !important; transform: none !important; }
  .completed-stage .sat-11 { top: 66% !important; left: 1.2% !important; width: 195px !important; height: 130px !important; transform: none !important; }
  .completed-stage .sat-2  { bottom: 2% !important; left: 2% !important; width: 210px !important; height: 135px !important; transform: none !important; }

  /* Right Side: 5 cards neatly spaced */
  .completed-stage .sat-3  { top: 2% !important; right: 2% !important; width: 210px !important; height: 135px !important; transform: none !important; }
  .completed-stage .sat-8  { top: 21% !important; right: 1.2% !important; width: 195px !important; height: 130px !important; transform: none !important; }
  .completed-stage .sat-6  { top: 41% !important; right: 1.2% !important; width: 195px !important; height: 130px !important; transform: none !important; }
  .completed-stage .sat-10 { top: 61% !important; right: 1.2% !important; width: 195px !important; height: 130px !important; transform: none !important; }
  .completed-stage .sat-4  { bottom: 2% !important; right: 2% !important; width: 210px !important; height: 135px !important; transform: none !important; }

  /* Safety rule for any potential extras beyond 11 */
  .completed-stage .sat-12,
  .completed-stage .sat-13,
  .completed-stage .sat-14,
  .completed-stage .sat-15,
  .completed-stage .sat-16,
  .completed-stage .sat-17,
  .completed-stage .sat-18 {
    display: none !important;
  }
}'''

if target in css:
    new_css = css.replace(target, replacement)
    with open('public/_nuxt/shreeyog-projects.css', 'w', encoding='utf-8') as f:
        f.write(new_css)
    print('SUCCESS: Replaced target in shreeyog-projects.css')
else:
    print('ERROR: Target not found in shreeyog-projects.css')
