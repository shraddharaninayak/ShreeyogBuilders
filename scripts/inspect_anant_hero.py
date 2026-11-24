import os
import re

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects"

for proj in ["shree-anant", "shree-niwas", "shree-padma", "shree-navashakti"]:
    path = os.path.join(base_dir, proj, "brochure", "index.html")
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as fp:
            html = fp.read()
        print(f"=== {proj} ===")
        # Find section 01 or overview
        m = re.search(r'<section[^>]*id=[\'"](?:overview|hero|sec-01)[\'"][^>]*>([\s\S]*?)</section>', html)
        if m:
            imgs = re.findall(r'<img[^>]*>', m.group(1))
            print("  Imgs in section:", imgs)
