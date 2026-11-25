# -*- coding: utf-8 -*-
"""
Updates Completed Projects slider to 19 total projects (1 center + 18 satellites).
Adds Shree Samarth (sat-15), Shree Vinayak (sat-16), Shree Nisarg (sat-17), and reindexes Shree Swarup (sat-18).
Updates CSS framing, HTML files, places component, and server/vercel routing.
"""
import re
import subprocess
import os

# -------------------------------------------------------------
# 1. UPDATE CSS IN public/_nuxt/shreeyog-projects.css
# -------------------------------------------------------------
css_path = 'public/_nuxt/shreeyog-projects.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

new_css_block = """/* Completed Stage 18-Satellite Balanced Framing (9 Left, 9 Right) */
  .completed-stage { min-height: 1260px !important; }

  /* Left Side: 9 cards neatly stacked from top to bottom */
  .completed-stage .sat-1  { top: 1.0% !important; left: 2% !important; width: 205px !important; height: 122px !important; transform: none !important; }
  .completed-stage .sat-7  { top: 12.2% !important; left: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-5  { top: 23.4% !important; left: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-9  { top: 34.6% !important; left: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-11 { top: 45.8% !important; left: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-13 { top: 57.0% !important; left: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-15 { top: 68.2% !important; left: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-17 { top: 79.4% !important; left: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-2  { bottom: 1.0% !important; left: 2% !important; width: 205px !important; height: 122px !important; transform: none !important; }

  /* Right Side: 9 cards neatly spaced */
  .completed-stage .sat-3  { top: 1.0% !important; right: 2% !important; width: 205px !important; height: 122px !important; transform: none !important; }
  .completed-stage .sat-8  { top: 12.2% !important; right: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-6  { top: 23.4% !important; right: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-10 { top: 34.6% !important; right: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-12 { top: 45.8% !important; right: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-14 { top: 57.0% !important; right: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-16 { top: 68.2% !important; right: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-18 { top: 79.4% !important; right: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-4  { bottom: 1.0% !important; right: 2% !important; width: 205px !important; height: 122px !important; transform: none !important; }

  /* Safety rule for any potential extras beyond 18 */
  .completed-stage .sat-19,
  .completed-stage .sat-20 {
    display: none !important;
  }"""

old_css_pattern = re.compile(
    r'/\* Completed Stage 1[35]-Satellite Balanced Framing.*?'
    r'\.completed-stage \.sat-1[678]\s*\{\s*display:\s*none\s*!important;\s*\}',
    re.DOTALL
)

if old_css_pattern.search(css):
    css = old_css_pattern.sub(new_css_block, css)
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(css)
    print('Updated completed-stage CSS positioning in public/_nuxt/shreeyog-projects.css')
else:
    print('Could not find exact completed-stage CSS pattern, attempting manual replace...')
    # fallback replace
    marker = "/* Completed Stage"
    if marker in css:
        start_idx = css.find(marker)
        end_marker = ".completed-stage .sat-18 {\n    display: none !important;\n  }"
        end_idx = css.find(end_marker, start_idx)
        if end_idx != -1:
            end_idx += len(end_marker)
            css = css[:start_idx] + new_css_block + css[end_idx:]
            with open(css_path, 'w', encoding='utf-8') as f:
                f.write(css)
            print('Fallback replace successful in CSS!')


# -------------------------------------------------------------
# 2. UPDATE HTML FILES
# -------------------------------------------------------------
html_files = [
    'public/projects/index.html',
    'public/projects.html',
    'public/places/index.html',
    'pages/projects.html'
]

# New satellite cards for Samarth (sat-15), Vinayak (sat-16), Nisarg (sat-17), and Swarup (sat-18)
new_satellites_block = """    <a href="/projects/shree-samarth/brochure/" data-project-href="/projects/shree-samarth/brochure/" class="satellite-card sat-15" data-index="15" title="Shree Samarth">
      <img src="/images/shreeyog/slider/shree-samarth.webp" alt="Shree Samarth - Indira Nagar Annex, Nashik" loading="lazy">
      <div class="sat-overlay">
        <span class="sat-num">16</span>
        <span class="sat-name">Shree Samarth</span>
      </div>
    </a>
  
    <a href="/projects/shree-vinayak/brochure/" data-project-href="/projects/shree-vinayak/brochure/" class="satellite-card sat-16" data-index="16" title="Shree Vinayak">
      <img src="/images/shreeyog/slider/shree-vinayak.webp" alt="Shree Vinayak - Indira Nagar, Nashik" loading="lazy">
      <div class="sat-overlay">
        <span class="sat-num">17</span>
        <span class="sat-name">Shree Vinayak</span>
      </div>
    </a>
  
    <a href="/projects/shree-nisarg/brochure/" data-project-href="/projects/shree-nisarg/brochure/" class="satellite-card sat-17" data-index="17" title="Shree Nisarg">
      <img src="/images/shreeyog/slider/shree-nisarg.webp" alt="Shree Nisarg - Gangapur Road, Nashik" loading="lazy">
      <div class="sat-overlay">
        <span class="sat-num">18</span>
        <span class="sat-name">Shree Nisarg</span>
      </div>
    </a>
  
    <a href="/projects/shree-swarup" data-project-href="/projects/shree-swarup" class="satellite-card sat-18" data-index="18" title="Shree Swarup">
      <img src="/images/shreeyog/projects/residential-complex.webp" alt="Shree Swarup - Dwarka, Nashik" loading="lazy">
      <div class="sat-overlay">
        <span class="sat-num">19</span>
        <span class="sat-name">Shree Swarup</span>
      </div>
    </a>"""

# JSON items to insert into setupShowcaseSlider completed-projects
new_items_json = '{"name":"Shree Samarth","slug":"shree-samarth","location":"Indira Nagar Annex, Nashik","status":"Completed","mainImage":"/images/shreeyog/slider/shree-samarth.webp","description":"Located opposite LIC Colony behind Samrat Sweet in prime Indira Nagar Annex, Nashik, Shree Samarth is a landmark completed residential community comprising Stilt + 4 floors across twin wings (Wings A & B), 26 residences including 4th-floor penthouses with private open sky terraces, children\'s play area, open-air green gym, landscaped mound and lawn, performance stage, dual lifts, and 100% demarcated stilt car parking.","logo":"/images/shreeyog/logos/shree-samarth-logo-transparent.png","brochure":"/projects/shree-samarth/brochure/"},{"name":"Shree Vinayak","slug":"shree-vinayak","location":"Indira Nagar, Nashik","status":"Completed","mainImage":"/images/shreeyog/slider/shree-vinayak.webp","description":"Situated just 200 meters off Mumbai-Agra Highway behind Hotel Tapasvi in Indira Nagar, Nashik, Shree Vinayak is a distinguished low-density residential community featuring Stilt + 4 floors, 16 exclusive apartments (3 BHK on 1st floor; 2 BHK on 2nd floor with personal 156 sq.ft private open terraces; 2 BHK on upper floors), Sanskar Mandir, high-speed elevator, and 16 demarcated stilt car parking bays.","logo":"/images/shreeyog/logos/shree-vinayak-logo-transparent.png","brochure":"/projects/shree-vinayak/brochure/"},{"name":"Shree Nisarg","slug":"shree-nisarg","location":"Gangapur Road, Nashik","status":"Completed","mainImage":"/images/shreeyog/slider/shree-nisarg.webp","description":"Situated in the revered residential enclave of Gangapur Road opposite Pramod Nagar, Nashik, Shree Nisarg is a nature-inspired completed residential landmark comprising Stilt + 4 floors across twin wings (Wings A & B), 24 homes (Wing A: 8 spacious 3 BHK residences of 1,270 sq.ft; Wing B: 16 comfortable 2 BHK residences of 1,025 sq.ft), roadside landscaped front park, dual automatic lifts, and 24 demarcated stilt car bays.","logo":"/images/shreeyog/logos/shree-nisarg-logo-transparent.png","brochure":"/projects/shree-nisarg/brochure/"},'

for path in html_files:
    if not os.path.exists(path):
        continue
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Subtitle: update to Nineteen
    html = html.replace('Sixteen delivered residential landmarks', 'Nineteen delivered residential landmarks')
    html = html.replace('Fourteen delivered residential landmarks', 'Nineteen delivered residential landmarks')
    html = html.replace('Thirteen delivered residential landmarks', 'Nineteen delivered residential landmarks')

    # 2. Counter: update to 19
    html = html.replace(
        '<span class="featured-counter" id="featCounterCompleted"><span>01</span> / 16</span>',
        '<span class="featured-counter" id="featCounterCompleted"><span>01</span> / 19</span>'
    )
    html = html.replace(
        '<span class="featured-counter" id="featCounterCompleted"><span>01</span> / 14</span>',
        '<span class="featured-counter" id="featCounterCompleted"><span>01</span> / 19</span>'
    )

    # 3. Replace Swarup sat-15 with new_satellites_block
    if 'shree-samarth' not in html:
        swarup_sat_pattern = re.compile(r'<a href="[^"]*shree-swarup"[^>]*class="satellite-card\s+sat-15".*?</a>', re.DOTALL)
        match = swarup_sat_pattern.search(html)
        if match:
            html = html[:match.start()] + new_satellites_block + html[match.end():]
            print(f'Inserted Samarth, Vinayak, Nisarg satellites in {path}')
        else:
            print(f'Warning: Could not match swarup sat-15 in {path}')

    # 4. Insert items into completed-projects slider
    if '"slug":"shree-samarth"' not in html:
        idx_completed = html.find("sectionId: 'completed-projects'")
        if idx_completed != -1:
            swarup_idx = html.find('{"name":"Shree Swarup","slug":"shree-swarup"', idx_completed)
            if swarup_idx != -1:
                html = html[:swarup_idx] + new_items_json + html[swarup_idx:]
                print(f'Inserted Samarth, Vinayak, Nisarg slider items in {path}')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Updated {path}')

# Rebuild places component
subprocess.run(['node', 'scripts/updates/build_places_component.js'], check=True)
print('Places component rebuilt successfully!')


# -------------------------------------------------------------
# 3. UPDATE server.js & vercel.json ROUTES
# -------------------------------------------------------------
with open('server.js', 'r', encoding='utf-8') as f:
    srv = f.read()

new_server_routes = """    '/projects/shree-samarth/brochure': '/projects/shree-samarth/brochure/',
    '/projects/shree-samarth': '/projects/shree-samarth/brochure/',
    '/brochures/shree-samarth.pdf': '/brochures/shree-samarth-brochure.pdf',
    '/projects/shree-samarth/Shree-Samarth.pdf': '/brochures/shree-samarth-brochure.pdf',
    '/projects/shree-samarth/Shree-Samarth-Brochure.pdf': '/brochures/shree-samarth-brochure.pdf',

    '/projects/shree-vinayak/brochure': '/projects/shree-vinayak/brochure/',
    '/projects/shree-vinayak': '/projects/shree-vinayak/brochure/',
    '/brochures/shree-vinayak.pdf': '/brochures/shree-vinayak-brochure.pdf',
    '/projects/shree-vinayak/Shree-Vinayak.pdf': '/brochures/shree-vinayak-brochure.pdf',
    '/projects/shree-vinayak/Shree-Vinayak-Brochure.pdf': '/brochures/shree-vinayak-brochure.pdf',

    '/projects/shree-nisarg/brochure': '/projects/shree-nisarg/brochure/',
    '/projects/shree-nisarg': '/projects/shree-nisarg/brochure/',
    '/brochures/shree-nisarg.pdf': '/brochures/shree-nisarg-brochure.pdf',
    '/projects/shree-nisarg/Shree-Nisarg.pdf': '/brochures/shree-nisarg-brochure.pdf',
    '/projects/shree-nisarg/Shree-Nisarg-Brochure.pdf': '/brochures/shree-nisarg-brochure.pdf',
"""

if '/projects/shree-samarth/brochure' not in srv:
    marker = "'/projects/shree-niketan/brochure': '/projects/shree-niketan/brochure/',"
    if marker in srv:
        srv = srv.replace(marker, new_server_routes + "\n    " + marker)
        with open('server.js', 'w', encoding='utf-8') as f:
            f.write(srv)
        print('Updated server.js with new routes!')

# Update vercel.json
if os.path.exists('vercel.json'):
    import json
    with open('vercel.json', 'r', encoding='utf-8') as f:
        vcfg = json.load(f)

    rewrites = vcfg.get('rewrites', [])
    existing_srcs = {r.get('source') for r in rewrites}

    new_rewrites = [
        {"source": "/projects/shree-samarth/brochure", "destination": "/projects/shree-samarth/brochure/index.html"},
        {"source": "/projects/shree-samarth/brochure/", "destination": "/projects/shree-samarth/brochure/index.html"},
        {"source": "/projects/shree-samarth", "destination": "/projects/shree-samarth/brochure/index.html"},
        {"source": "/brochures/shree-samarth-brochure.pdf", "destination": "/brochures/shree-samarth-brochure.pdf"},

        {"source": "/projects/shree-vinayak/brochure", "destination": "/projects/shree-vinayak/brochure/index.html"},
        {"source": "/projects/shree-vinayak/brochure/", "destination": "/projects/shree-vinayak/brochure/index.html"},
        {"source": "/projects/shree-vinayak", "destination": "/projects/shree-vinayak/brochure/index.html"},
        {"source": "/brochures/shree-vinayak-brochure.pdf", "destination": "/brochures/shree-vinayak-brochure.pdf"},

        {"source": "/projects/shree-nisarg/brochure", "destination": "/projects/shree-nisarg/brochure/index.html"},
        {"source": "/projects/shree-nisarg/brochure/", "destination": "/projects/shree-nisarg/brochure/index.html"},
        {"source": "/projects/shree-nisarg", "destination": "/projects/shree-nisarg/brochure/index.html"},
        {"source": "/brochures/shree-nisarg-brochure.pdf", "destination": "/brochures/shree-nisarg-brochure.pdf"}
    ]

    for nr in new_rewrites:
        if nr['source'] not in existing_srcs:
            rewrites.append(nr)

    vcfg['rewrites'] = rewrites
    with open('vercel.json', 'w', encoding='utf-8') as f:
        json.dump(vcfg, f, indent=2)
    print('Updated vercel.json with new rewrites!')

print('All slider updates, HTML files, and routes completed successfully!')
