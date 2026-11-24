import json
import re
import subprocess

html_files = [
    'public/projects/index.html',
    'public/projects.html',
    'public/places/index.html',
    'pages/projects.html'
]

# Shakuntal satellite markup
shakuntal_sat = """    <a href="/projects/shree-shakuntal/brochure/" data-project-href="/projects/shree-shakuntal/brochure/" class="satellite-card sat-12" data-index="12" title="Shree Shakuntal">
      <img src="/images/shreeyog/slider/shree-shakuntal.webp" alt="Shree Shakuntal - Indira Nagar, Nashik" loading="lazy">
      <div class="sat-overlay">
        <span class="sat-num">13</span>
        <span class="sat-name">Shree Shakuntal</span>
      </div>
    </a>
  
    <a href="/projects/shree-swarup" data-project-href="/projects/shree-swarup" class="satellite-card sat-13" data-index="13" title="Shree Swarup">
      <img src="/images/shreeyog/projects/residential-complex.webp" alt="Shree Swarup - Dwarka, Nashik" loading="lazy">
      <div class="sat-overlay">
        <span class="sat-num">14</span>
        <span class="sat-name">Shree Swarup</span>
      </div>
    </a>"""

old_swarup_sat = """    <a href="/projects/shree-swarup" data-project-href="/projects/shree-swarup" class="satellite-card sat-12" data-index="12" title="Shree Swarup">
      <img src="/images/shreeyog/projects/residential-complex.webp" alt="Shree Swarup - Dwarka, Nashik" loading="lazy">
      <div class="sat-overlay">
        <span class="sat-num">013</span>
        <span class="sat-name">Shree Swarup</span>
      </div>
    </a>"""

# Shakuntal slider item JSON
shakuntal_item_json = '{"name":"Shree Shakuntal","slug":"shree-shakuntal","location":"Indira Nagar, Nashik","status":"Completed","mainImage":"/images/shreeyog/slider/shree-shakuntal.webp","description":"Situated in the prime, serene neighbourhood of Indira Nagar near Saraf Lawn on Pethe Nagar Road in Nashik, Shree Shakuntal is an exclusive completed boutique residential community developed by KALE B. M. & Shreeyog Associates. Offering 1 & 2 BHK premium residences across Stilt + 4 storeys with demarcated covered stilt car parking, passenger elevator, private sit-outs, and 24-hour dual water supply.","logo":"/images/shreeyog/logos/shree-shakuntal-logo-transparent.png","brochure":"/projects/shree-shakuntal/brochure/"},'

swarup_item_target = '{"name":"Shree Swarup","slug":"shree-swarup"'

for path in html_files:
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Update subtitle
    html = html.replace('Thirteen delivered residential landmarks', 'Fourteen delivered residential landmarks')

    # 2. Update initial counter
    html = html.replace(
        '<span class="featured-counter" id="featCounterCompleted"><span>01</span> / 13</span>',
        '<span class="featured-counter" id="featCounterCompleted"><span>01</span> / 14</span>'
    )

    # 3. Fix 3-digit sat-nums (011 -> 11, 012 -> 12)
    html = html.replace('<span class="sat-num">011</span>', '<span class="sat-num">11</span>')
    html = html.replace('<span class="sat-num">012</span>', '<span class="sat-num">12</span>')

    # 4. Insert satellite card
    if 'shree-shakuntal' not in html:
        if old_swarup_sat in html:
            html = html.replace(old_swarup_sat, shakuntal_sat)
            print(f'Replaced old swarup sat in {path}')
        else:
            # Fallback regex
            sat_match = re.search(r'<a href="[^"]*shree-swarup"[^>]*class="satellite-card sat-12".*?</a>', html, re.DOTALL)
            if sat_match:
                html = html[:sat_match.start()] + shakuntal_sat + html[sat_match.end():]
                print(f'Regex replaced swarup sat in {path}')
            else:
                print(f'Warning: Could not find sat-12 swarup in {path}')

    # 5. Insert slider item
    if '"slug":"shree-shakuntal"' not in html:
        if swarup_item_target in html:
            # Only replace the one in completed-projects
            idx = html.find("sectionId: 'completed-projects'")
            if idx != -1:
                swarup_idx = html.find(swarup_item_target, idx)
                if swarup_idx != -1:
                    html = html[:swarup_idx] + shakuntal_item_json + html[swarup_idx:]
                    print(f'Inserted shakuntal slider item in {path}')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Updated {path}')

# Rebuild places component
subprocess.run(['node', 'scripts/updates/build_places_component.js'], check=True)
print('Places component rebuilt successfully!')
