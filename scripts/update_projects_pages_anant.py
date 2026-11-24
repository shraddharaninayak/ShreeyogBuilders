import os

files = [
    'public/projects/index.html',
    'public/projects.html',
    'pages/projects.html'
]

old_json = '{"name":"Shree Anant","slug":"shree-anant","location":"Govind Nagar, Nashik","status":"Completed","logo":null,"mainImage":"/images/shreeyog/buildings/modern-luxury.webp","description":"Shree Anant in Govind Nagar reflects Shreeyog\'s core philosophy: building homes that stand the test of time with genuine construction quality and thoughtful layouts.","brochure":null}'

new_json = '{"name":"Shree Anant","slug":"shree-anant","location":"Indira Nagar, Nashik","status":"Completed","logo":"/images/shreeyog/logos/shree-anant-logo.png","mainImage":"/images/shreeyog/slider/shree-anant.webp","description":"Situated in prime Indira Nagar opposite LIC Colony, Shree Anant offers 2 & 3 BHK luxurious homes built with natural red soil bricks, solar net metering, and a private celebration terrace.","brochure":"/projects/shree-anant/brochure/","brochurePdf":"/brochures/shree-anant-brochure.pdf"}'

old_card = '''<a class="satellite-card sat-2" data-index="4" data-project-href="/projects/shree-anant" href="javascript:void(0)" title="Shree Anant">
<img alt="Shree Anant - Govind Nagar, Nashik" loading="lazy" src="/images/shreeyog/buildings/modern-luxury.webp"/>
<div class="sat-overlay">
<span class="sat-num">05</span>
<span class="sat-name">Shree Anant</span>
</div>
</a>'''

new_card = '''<a class="satellite-card sat-2" data-index="4" data-project-href="/projects/shree-anant/brochure/" href="/projects/shree-anant/brochure/" title="Shree Anant">
<img alt="Shree Anant - Indira Nagar, Nashik" loading="lazy" src="/images/shreeyog/slider/shree-anant.webp"/>
<div class="sat-overlay">
<span class="sat-num">05</span>
<span class="sat-name">Shree Anant</span>
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
