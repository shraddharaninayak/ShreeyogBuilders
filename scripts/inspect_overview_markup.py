import os
import re

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects"

for proj in ["shree-bramhand", "shree-safalya", "shree-nandan", "shree-samruddhi-park", "shree-venkatesh-park"]:
    html_path = os.path.join(base_dir, proj, "brochure", "index.html")
    if not os.path.exists(html_path):
        continue
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()
    print(f"================ {proj} ================")
    # Find Section 01 or overview
    sec_match = re.search(r'(<section[^>]*id=[\'"]overview[\'"][^>]*>[\s\S]*?</section>)', html)
    if sec_match:
        sec = sec_match.group(1)
        # Find the right-side visual container
        # Search for div with class containing overview-visual, elevation, preview, etc.
        divs = re.findall(r'<div[^>]*class=[\'"][^\'"]*(?:visual|preview|elevation|frame|image|col)[^\'"]*[\'"][^>]*>[\s\S]*?</div>', sec)
        for d in divs[:3]:
            # print first 300 chars of d
            print("  DIV:", d[:300].replace('\n', ' '))
            print()
    else:
        print("  Overview section not found")
