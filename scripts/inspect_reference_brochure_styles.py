import os
import re

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects"

for proj in ["shree-nandan", "shree-safalya", "shree-bramhand"]:
    for f in os.listdir(os.path.join(base_dir, proj, "brochure")):
        if f.endswith('.css'):
            with open(os.path.join(base_dir, proj, "brochure", f), 'r', encoding='utf-8') as fp:
                css = fp.read()
            print(f"=== {proj} ({f}) ===")
            m = re.findall(r'(\.overview-image-card[^{]*\{[^}]*\})', css)
            for match in m:
                print(match)
            m2 = re.findall(r'(\.overview-building-img[^{]*\{[^}]*\})', css)
            for match in m2:
                print(match)
