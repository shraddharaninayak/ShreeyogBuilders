import os
import re

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects"

for proj in ["shree-samruddhi-park", "shree-venkatesh-park"]:
    path = os.path.join(base_dir, proj, "brochure", "index.html")
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    m = re.search(r'<section[^>]*id=[\'"]overview[\'"][^>]*>([\s\S]*?)</section>', html)
    print(f"================ {proj} ================")
    if m:
        print(m.group(1))
