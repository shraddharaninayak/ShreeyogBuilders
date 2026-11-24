import os
import re

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects"

files = {
    "samruddhi": os.path.join(base_dir, "shree-samruddhi-park", "brochure", "index.html"),
    "venkatesh": os.path.join(base_dir, "shree-venkatesh-park", "brochure", "index.html"),
    "safalya": os.path.join(base_dir, "shree-safalya", "brochure", "index.html"),
    "nandan": os.path.join(base_dir, "shree-nandan", "brochure", "index.html")
}

for name, path in files.items():
    if not os.path.exists(path):
        print(f"{name}: NOT FOUND at {path}")
        continue
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    print(f"=== {name} ===")
    # Find hero section or overview section
    m = re.search(r'(<section[^>]*id=[\'"](?:overview|hero|sec-01)[\'"][^>]*>[\s\S]*?</section>)', html, re.IGNORECASE)
    if not m:
        # search for class containing hero
        m = re.search(r'(<section[^>]*class=[\'"][^\'"]*hero[^\'"]*[\'"][^>]*>[\s\S]*?</section>)', html, re.IGNORECASE)
    if m:
        snippet = m.group(1)
        # Find img tags inside hero section
        imgs = re.findall(r'<img[^>]*>', snippet)
        print("  Hero imgs:", imgs)
        # Find wrapper classes around images
        wrapper = re.findall(r'<div[^>]*class=[\'"][^\'"]*(?:preview|frame|visual|cover|elevation|hero-img)[^\'"]*[\'"][^>]*>', snippet)
        print("  Hero wrappers:", wrapper)
    else:
        print("  Hero section not found by regex")
