import os
import re

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects"

for proj in ["shree-anant", "shree-niwas", "shree-padma", "shree-navashakti"]:
    path = os.path.join(base_dir, proj, "brochure", "index.html")
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as fp:
            html = fp.read()
        m = re.findall(r'<div class=[\'"]overview-image-card[\'"]>[\s\S]*?</div>\s*</div>', html)
        print(f"=== {proj} ===")
        for match in m:
            print(match)
