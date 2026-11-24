import os

files = [
    'public/projects/index.html',
    'public/projects.html',
    'pages/projects.html'
]

old_json = '{"name":"Shree Niwas","slug":"shree-niwas","location":"College Road, Nashik","status":"Completed","logo":null,"mainImage":"/images/shreeyog/buildings/tanvi-residency.webp","description":"Located within walking distance of Nashik\'s premier colleges, cafes, and shopping districts, Shree Niwas represents prime city center living at its finest.","brochure":null}'

new_json = '{"name":"Shree Niwas","slug":"shree-niwas","location":"Indira Nagar, Nashik","status":"Completed","logo":"/images/shreeyog/logos/shree-niwas-logo.png","mainImage":"/images/shreeyog/slider/shree-niwas.webp","description":"Situated in prime Indira Nagar opposite LIC Colony, Shree Niwas offers 12 exclusive 2 & 3 BHK luxurious flats built with natural red soil bricks, rooftop solar net-metering, campus play garden, and a private celebration terrace.","brochure":"/projects/shree-niwas/brochure/","brochurePdf":"/brochures/shree-niwas-brochure.pdf"}'

old_card = '''<a class="satellite-card sat-3" data-index="5" data-project-href="/projects/shree-niwas" href="javascript:void(0)" title="Shree Niwas">
<img alt="Shree Niwas - College Road, Nashik" loading="lazy" src="/images/shreeyog/buildings/tanvi-residency.webp"/>
<div class="sat-overlay">
<span class="sat-num">06</span>
<span class="sat-name">Shree Niwas</span>
</div>
</a>'''

new_card = '''<a class="satellite-card sat-3" data-index="5" data-project-href="/projects/shree-niwas/brochure/" href="/projects/shree-niwas/brochure/" title="Shree Niwas">
<img alt="Shree Niwas - Indira Nagar, Nashik" loading="lazy" src="/images/shreeyog/slider/shree-niwas.webp"/>
<div class="sat-overlay">
<span class="sat-num">06</span>
<span class="sat-name">Shree Niwas</span>
</div>
</a>'''

for fpath in files:
    if not os.path.exists(fpath):
        print(f"Skipping {fpath}: not found")
        continue
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    modified = False
    if old_json in content:
        content = content.replace(old_json, new_json)
        modified = True
        print(f"Replaced JSON in {fpath}")
    else:
        print(f"old_json not found in {fpath}")

    if old_card in content:
        content = content.replace(old_card, new_card)
        modified = True
        print(f"Replaced card in {fpath}")
    else:
        # Check normalized newlines
        c_norm = content.replace('\r\n', '\n')
        oc_norm = old_card.replace('\r\n', '\n')
        nc_norm = new_card.replace('\r\n', '\n')
        if oc_norm in c_norm:
            content = c_norm.replace(oc_norm, nc_norm)
            modified = True
            print(f"Replaced normalized card in {fpath}")
        else:
            print(f"old_card not found in {fpath}")

    if modified:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Saved {fpath}")
