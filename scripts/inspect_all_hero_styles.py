import os
import re

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects"

for proj in ["shree-safalya", "shree-bramhand", "shree-nandan", "shree-anant", "shree-niwas", "shree-padma"]:
    brochure_dir = os.path.join(base_dir, proj, "brochure")
    for f in os.listdir(brochure_dir):
        if f.endswith('.css'):
            with open(os.path.join(brochure_dir, f), 'r', encoding='utf-8') as fp:
                css = fp.read()
            m = re.findall(r'(\.overview-image-card|\.hero-elevation-frame|\.overview-frame)[\s\S]*?\{[\s\S]*?\}', css)
            if m:
                print(f"=== {proj} ({f}) ===")
                for match in m:
                    print(match[:400])
                    print()
