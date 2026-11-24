import re

with open('public/_nuxt/shreeyog-projects.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Enhance .featured-card-logo
old_feat_logo = '''/* Floating Project Logo in Top-Right */
.featured-card-logo {
  position: absolute !important;
  top: 1.25rem !important;
  right: 1.25rem !important;
  z-index: 2 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  pointer-events: none !important;
}

.featured-card-logo img {
  width: auto !important;
  height: 38px !important;
  max-width: 140px !important;
  object-fit: contain !important;
  display: block !important;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.75)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.85)) !important;
  transform: none !important;
  transition: none !important;
}

@media (max-width: 768px) {
  .featured-card-logo {
    top: 1rem !important;
    right: 1rem !important;
  }
  .featured-card-logo img {
    height: 28px !important;
    max-width: 110px !important;
  }
}'''

new_feat_logo = '''/* Floating Project Logo in Top-Right */
.featured-card-logo {
  position: absolute !important;
  top: 1.25rem !important;
  right: 1.25rem !important;
  z-index: 2 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  pointer-events: none !important;
  background: rgba(21, 20, 21, 0.65) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  padding: 0.38rem 0.85rem !important;
  border-radius: 0.5rem !important;
  border: 1px solid rgba(198, 167, 106, 0.3) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45) !important;
}

.featured-card-logo img {
  width: auto !important;
  height: 44px !important;
  max-width: 155px !important;
  object-fit: contain !important;
  display: block !important;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.8)) !important;
  transform: none !important;
  transition: none !important;
}

@media (max-width: 768px) {
  .featured-card-logo {
    top: 1rem !important;
    right: 1rem !important;
    padding: 0.28rem 0.65rem !important;
  }
  .featured-card-logo img {
    height: 32px !important;
    max-width: 120px !important;
  }
}

/* Satellite Card Floating Project Logo in Top-Right */
.sat-card-logo {
  position: absolute !important;
  top: 0.6rem !important;
  right: 0.6rem !important;
  z-index: 3 !important;
  pointer-events: none !important;
  background: rgba(21, 20, 21, 0.7) !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  padding: 0.2rem 0.5rem !important;
  border-radius: 0.35rem !important;
  border: 1px solid rgba(198, 167, 106, 0.25) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.sat-card-logo img {
  height: 20px !important;
  max-width: 70px !important;
  width: auto !important;
  object-fit: contain !important;
  display: block !important;
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.8)) !important;
}'''

css = css.replace(old_feat_logo, new_feat_logo)

# 2. Update .completed-stage satellite positioning to 10 satellites (5 on Left, 5 on Right)
old_completed_stage = '''  /* Completed Stage 9-Satellite Balanced Framing (4 on Left, 5 on Right) */
  .completed-stage { min-height: 890px !important; }
  .completed-stage .sat-1 { top: 2% !important; left: 2.5% !important; width: 215px !important; height: 180px !important; transform: none !important; }
  .completed-stage .sat-7 { top: 26% !important; left: 1.5% !important; width: 200px !important; height: 150px !important; transform: none !important; }
  .completed-stage .sat-5 { top: 51% !important; left: 1.5% !important; width: 200px !important; height: 150px !important; transform: none !important; }
  .completed-stage .sat-2 { bottom: 2% !important; left: 2.5% !important; width: 215px !important; height: 180px !important; transform: none !important; }

  .completed-stage .sat-3 { top: 2% !important; right: 2.5% !important; width: 215px !important; height: 180px !important; transform: none !important; }
  .completed-stage .sat-8 { top: 21% !important; right: 1.5% !important; width: 200px !important; height: 150px !important; transform: none !important; }
  .completed-stage .sat-6 { top: 41% !important; right: 1.5% !important; width: 200px !important; height: 150px !important; transform: none !important; }
  .completed-stage .sat-9 { top: 61% !important; right: 1.5% !important; width: 200px !important; height: 150px !important; transform: none !important; }
  .completed-stage .sat-4 { bottom: 2% !important; right: 2.5% !important; width: 215px !important; height: 180px !important; transform: none !important; }'''

new_completed_stage = '''  /* Completed Stage 10-Satellite Balanced Framing (5 on Left, 5 on Right) */
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
  .completed-stage .sat-4 { bottom: 2% !important; right: 2.5% !important; width: 215px !important; height: 165px !important; transform: none !important; }'''

css = css.replace(old_completed_stage, new_completed_stage)

# Add sat-10 to default satellite positions list if not present
if '.sat-10' not in css:
    css = css.replace('.sat-9 {', '.sat-10 { top: 61%; right: 2%; width: 200px; height: 150px; }\n  .sat-9 {')

with open('public/_nuxt/shreeyog-projects.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('Updated public/_nuxt/shreeyog-projects.css with logo and stage styling successfully!')
