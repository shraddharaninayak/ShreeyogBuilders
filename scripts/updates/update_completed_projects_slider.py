import re
import subprocess
import os

# -------------------------------------------------------------
# 1. UPDATE CSS IN public/_nuxt/shreeyog-projects.css
# -------------------------------------------------------------
css_path = 'public/_nuxt/shreeyog-projects.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

old_css_pattern = re.compile(
    r'/\* Completed Stage 13-Satellite Balanced Framing \(7 Left, 6 Right\) \*/.*?'
    r'\.completed-stage \.sat-18\s*\{\s*display:\s*none\s*!important;\s*\}',
    re.DOTALL
)

new_css_block = """/* Completed Stage 15-Satellite Balanced Framing (8 Left, 7 Right) */
  .completed-stage { min-height: 1120px !important; }

  /* Left Side: 8 cards neatly stacked from top to bottom */
  .completed-stage .sat-1  { top: 1.2% !important; left: 2% !important; width: 205px !important; height: 122px !important; transform: none !important; }
  .completed-stage .sat-7  { top: 13.8% !important; left: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-5  { top: 26.2% !important; left: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-9  { top: 38.6% !important; left: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-11 { top: 51.0% !important; left: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-13 { top: 63.4% !important; left: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-15 { top: 75.8% !important; left: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-2  { bottom: 1.2% !important; left: 2% !important; width: 205px !important; height: 122px !important; transform: none !important; }

  /* Right Side: 7 cards neatly spaced */
  .completed-stage .sat-3  { top: 1.2% !important; right: 2% !important; width: 205px !important; height: 122px !important; transform: none !important; }
  .completed-stage .sat-8  { top: 15.5% !important; right: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-6  { top: 29.8% !important; right: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-10 { top: 44.1% !important; right: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-12 { top: 58.4% !important; right: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-14 { top: 72.7% !important; right: 1.2% !important; width: 195px !important; height: 118px !important; transform: none !important; }
  .completed-stage .sat-4  { bottom: 1.2% !important; right: 2% !important; width: 205px !important; height: 122px !important; transform: none !important; }

  /* Safety rule for any potential extras beyond 15 */
  .completed-stage .sat-16,
  .completed-stage .sat-17,
  .completed-stage .sat-18 {
    display: none !important;
  }"""

if old_css_pattern.search(css):
    css = old_css_pattern.sub(new_css_block, css)
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(css)
    print('Updated completed-stage CSS positioning in public/_nuxt/shreeyog-projects.css')
else:
    print('Could not find exact completed-stage CSS pattern, checking if already updated...')


# -------------------------------------------------------------
# 2. UPDATE HTML FILES
# -------------------------------------------------------------
html_files = [
    'public/projects/index.html',
    'public/projects.html',
    'public/places/index.html',
    'pages/projects.html'
]

# New satellite cards for Niketan (sat-13), Chintamani (sat-14), and Swarup (sat-15)
new_satellites_block = """    <a href="/projects/shree-niketan/brochure/" data-project-href="/projects/shree-niketan/brochure/" class="satellite-card sat-13" data-index="13" title="Shree Niketan">
      <img src="/images/shreeyog/slider/shree-niketan.webp" alt="Shree Niketan - Kamatwada, Nashik" loading="lazy">
      <div class="sat-overlay">
        <span class="sat-num">14</span>
        <span class="sat-name">Shree Niketan</span>
      </div>
    </a>
  
    <a href="/projects/shree-chintamani/brochure/" data-project-href="/projects/shree-chintamani/brochure/" class="satellite-card sat-14" data-index="14" title="Shree Chintamani">
      <img src="/images/shreeyog/slider/shree-chintamani.webp" alt="Shree Chintamani - Gangapur Road, Nashik" loading="lazy">
      <div class="sat-overlay">
        <span class="sat-num">15</span>
        <span class="sat-name">Shree Chintamani</span>
      </div>
    </a>
  
    <a href="/projects/shree-swarup" data-project-href="/projects/shree-swarup" class="satellite-card sat-15" data-index="15" title="Shree Swarup">
      <img src="/images/shreeyog/projects/residential-complex.webp" alt="Shree Swarup - Dwarka, Nashik" loading="lazy">
      <div class="sat-overlay">
        <span class="sat-num">16</span>
        <span class="sat-name">Shree Swarup</span>
      </div>
    </a>"""

# JSON items to insert into setupShowcaseSlider completed-projects
new_items_json = '{"name":"Shree Niketan","slug":"shree-niketan","location":"Kamatwada, Nashik","status":"Completed","mainImage":"/images/shreeyog/slider/shree-niketan.webp","description":"Standing along a prominent 24.00-meter wide DP road at Gulmohar Colony on DGP Nagar Road in Kamatwada, Nashik, Shree Niketan is an accomplished residential and retail community featuring Stilt + 6 storeys across twin wings (Wings A & B), 36 luxurious 2 BHK apartments, 6 ground commercial shops, dual elevators, internal gas pipelines, and dedicated parking.","logo":"/images/shreeyog/logos/shree-niketan-logo-transparent.png","brochure":"/projects/shree-niketan/brochure/"},{"name":"Shree Chintamani","slug":"shree-chintamani","location":"Gangapur Road, Nashik","status":"Completed","mainImage":"/images/shreeyog/slider/shree-chintamani.webp","description":"Situated at Datta Chowk on Nirmala Convent Road in prime Gangapur Road, Nashik, Shree Chintamani is an exclusive completed residential community offering 18 luxurious 2 and 3 BHK apartments across Stilt + 5 storeys with allocated stilt parking, passenger elevator, private sit-outs, and panoramic views of the Godavari river greenbelt and Godapark.","logo":"/images/shreeyog/logos/shree-chintamani-logo-transparent.png","brochure":"/projects/shree-chintamani/brochure/"},'

for path in html_files:
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Subtitle: update to Sixteen
    html = html.replace('Fourteen delivered residential landmarks', 'Sixteen delivered residential landmarks')
    html = html.replace('Thirteen delivered residential landmarks', 'Sixteen delivered residential landmarks')

    # 2. Counter: update to 16
    html = html.replace(
        '<span class="featured-counter" id="featCounterCompleted"><span>01</span> / 14</span>',
        '<span class="featured-counter" id="featCounterCompleted"><span>01</span> / 16</span>'
    )
    html = html.replace(
        '<span class="featured-counter" id="featCounterCompleted"><span>01</span> / 13</span>',
        '<span class="featured-counter" id="featCounterCompleted"><span>01</span> / 16</span>'
    )

    # 3. Replace Swarup sat-13 (or sat-12) with new_satellites_block
    if 'shree-niketan' not in html:
        swarup_sat_pattern = re.compile(r'<a href="[^"]*shree-swarup"[^>]*class="satellite-card\s+sat-(?:12|13)".*?</a>', re.DOTALL)
        match = swarup_sat_pattern.search(html)
        if match:
            html = html[:match.start()] + new_satellites_block + html[match.end():]
            print(f'Inserted Niketan & Chintamani satellites in {path}')
        else:
            print(f'Warning: Could not match swarup sat in {path}')

    # 4. Insert items into completed-projects slider
    if '"slug":"shree-niketan"' not in html:
        idx_completed = html.find("sectionId: 'completed-projects'")
        if idx_completed != -1:
            swarup_idx = html.find('{"name":"Shree Swarup","slug":"shree-swarup"', idx_completed)
            if swarup_idx != -1:
                html = html[:swarup_idx] + new_items_json + html[swarup_idx:]
                print(f'Inserted Niketan & Chintamani slider items in {path}')

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

new_server_routes = """    '/projects/shree-niketan/brochure': '/projects/shree-niketan/brochure/',
    '/projects/shree-niketan': '/projects/shree-niketan/brochure/',
    '/brochures/shree-niketan.pdf': '/brochures/shree-niketan-brochure.pdf',
    '/projects/shree-niketan/Shree-Niketan.pdf': '/brochures/shree-niketan-brochure.pdf',
    '/projects/shree-niketan/Shree-Niketan-Brochure.pdf': '/brochures/shree-niketan-brochure.pdf',
    '/projects/shree-niketan/brochure/Shree-Niketan-Brochure.pdf': '/brochures/shree-niketan-brochure.pdf',
    '/projects/shree-niketan/brochure/brochure.pdf': '/brochures/shree-niketan-brochure.pdf',

    '/projects/shree-chintamani/brochure': '/projects/shree-chintamani/brochure/',
    '/projects/shree-chintamani': '/projects/shree-chintamani/brochure/',
    '/brochures/shree-chintamani.pdf': '/brochures/shree-chintamani-brochure.pdf',
    '/projects/shree-chintamani/Shree-Chintamani.pdf': '/brochures/shree-chintamani-brochure.pdf',
    '/projects/shree-chintamani/Shree-Chintamani-Brochure.pdf': '/brochures/shree-chintamani-brochure.pdf',
    '/projects/shree-chintamani/brochure/Shree-Chintamani-Brochure.pdf': '/brochures/shree-chintamani-brochure.pdf',
    '/projects/shree-chintamani/brochure/brochure.pdf': '/brochures/shree-chintamani-brochure.pdf'
  };"""

if 'shree-niketan' not in srv:
    target_s = "'/projects/shree-shakuntal/brochure/brochure.pdf': '/brochures/shree-shakuntal-brochure.pdf'\n  };"
    replacement_s = "'/projects/shree-shakuntal/brochure/brochure.pdf': '/brochures/shree-shakuntal-brochure.pdf',\n\n" + new_server_routes
    srv = srv.replace(target_s, replacement_s)
    with open('server.js', 'w', encoding='utf-8') as f:
        f.write(srv)
    print('Updated server.js with Niketan and Chintamani routes')

with open('vercel.json', 'r', encoding='utf-8') as f:
    v = f.read()

new_vercel_routes = """,
    { "source": "/projects/shree-niketan/brochure", "destination": "/projects/shree-niketan/brochure/", "permanent": true },
    { "source": "/projects/shree-niketan", "destination": "/projects/shree-niketan/brochure/", "permanent": true },
    { "source": "/brochures/shree-niketan.pdf", "destination": "/brochures/shree-niketan-brochure.pdf", "permanent": true },
    { "source": "/projects/shree-niketan/Shree-Niketan.pdf", "destination": "/brochures/shree-niketan-brochure.pdf", "permanent": true },
    { "source": "/projects/shree-niketan/Shree-Niketan-Brochure.pdf", "destination": "/brochures/shree-niketan-brochure.pdf", "permanent": true },
    { "source": "/projects/shree-niketan/brochure/Shree-Niketan-Brochure.pdf", "destination": "/brochures/shree-niketan-brochure.pdf", "permanent": true },
    { "source": "/projects/shree-niketan/brochure/brochure.pdf", "destination": "/brochures/shree-niketan-brochure.pdf", "permanent": true },

    { "source": "/projects/shree-chintamani/brochure", "destination": "/projects/shree-chintamani/brochure/", "permanent": true },
    { "source": "/projects/shree-chintamani", "destination": "/projects/shree-chintamani/brochure/", "permanent": true },
    { "source": "/brochures/shree-chintamani.pdf", "destination": "/brochures/shree-chintamani-brochure.pdf", "permanent": true },
    { "source": "/projects/shree-chintamani/Shree-Chintamani.pdf", "destination": "/brochures/shree-chintamani-brochure.pdf", "permanent": true },
    { "source": "/projects/shree-chintamani/Shree-Chintamani-Brochure.pdf", "destination": "/brochures/shree-chintamani-brochure.pdf", "permanent": true },
    { "source": "/projects/shree-chintamani/brochure/Shree-Chintamani-Brochure.pdf", "destination": "/brochures/shree-chintamani-brochure.pdf", "permanent": true },
    { "source": "/projects/shree-chintamani/brochure/brochure.pdf", "destination": "/brochures/shree-chintamani-brochure.pdf", "permanent": true }"""

if 'shree-niketan' not in v:
    target_v = '{ "source": "/projects/shree-shakuntal/brochure/brochure.pdf", "destination": "/brochures/shree-shakuntal-brochure.pdf", "permanent": true }'
    replacement_v = target_v + new_vercel_routes
    v = v.replace(target_v, replacement_v)
    with open('vercel.json', 'w', encoding='utf-8') as f:
        f.write(v)
    print('Updated vercel.json with Niketan and Chintamani routes')
