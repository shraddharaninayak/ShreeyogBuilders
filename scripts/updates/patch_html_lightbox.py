# -*- coding: utf-8 -*-
import re

with open('scripts/updates/generate_three_brochure_html.py', 'r', encoding='utf-8') as f:
    code = f.read()

pattern = re.compile(r'<div class="floorplan-display-card"\s+data-lightbox="([^"]*)"\s+data-caption="([^"]*)">\s*<div class="floorplan-img-container">')
matches = pattern.findall(code)
print('Found matches:', len(matches))

new_code = pattern.sub(r'<div class="floorplan-display-card">\n              <div class="floorplan-img-container" data-lightbox="\1" data-caption="\2">', code)
with open('scripts/updates/generate_three_brochure_html.py', 'w', encoding='utf-8') as f:
    f.write(new_code)

print('Updated generate_three_brochure_html.py successfully!')
