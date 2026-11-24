import os
import json
import re

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb"

# 1. Update public/data/projects.json
json_path = os.path.join(base_dir, "public", "data", "projects.json")
with open(json_path, 'r', encoding='utf-8') as f:
    projects = json.load(f)

for p in projects:
    if p.get("slug") == "shree-nath-enclave":
        print("Found Shree Nath Enclave in projects.json, previous mainImage:", p.get("mainImage"))
        p["mainImage"] = "/images/shreeyog/slider/shree-nath-enclave.webp"
        if "gallery" in p and len(p["gallery"]) > 0:
            p["gallery"][0] = "/images/shreeyog/slider/shree-nath-enclave.webp"

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(projects, f, indent=2, ensure_ascii=False)
print("Updated projects.json")

# 2. Update data/projects.js
js_path = os.path.join(base_dir, "data", "projects.js")
if os.path.exists(js_path):
    with open(js_path, 'r', encoding='utf-8') as f:
        js_content = f.read()
    # Replace mainImage for shree-nath-enclave
    js_content_updated = re.sub(
        r'(\"slug\":\s*\"shree-nath-enclave\"[\s\S]*?\"mainImage\":\s*\")([^\"]*)(\")',
        r'\g<1>/images/shreeyog/slider/shree-nath-enclave.webp\g<3>',
        js_content
    )
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js_content_updated)
    print("Updated data/projects.js")

# 3. Update public/projects/index.html and public/projects.html
for html_rel in ["public/projects/index.html", "public/projects.html"]:
    html_path = os.path.join(base_dir, html_rel)
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # In highlightedItems and completedItems:
    # {"name":"Shree Nath Enclave"..."mainImage":"/images/shreeyog/buildings/contemporary-avenue.webp"...}
    # Also in satellite card:
    # <img alt="Shree Nath Enclave - Mumbai Naka, Nashik" loading="lazy" src="/images/shreeyog/buildings/contemporary-avenue.webp"/>
    old_snippet1 = '"name":"Shree Nath Enclave","slug":"shree-nath-enclave","location":"Mumbai Naka, Nashik","status":"Completed","logo":"/images/shreeyog/logos/shree-nath-enclave-logo.png","mainImage":"/images/shreeyog/buildings/contemporary-avenue.webp"'
    new_snippet1 = '"name":"Shree Nath Enclave","slug":"shree-nath-enclave","location":"Mumbai Naka, Nashik","status":"Completed","logo":"/images/shreeyog/logos/shree-nath-enclave-logo.png","mainImage":"/images/shreeyog/slider/shree-nath-enclave.webp"'
    
    html = html.replace(old_snippet1, new_snippet1)

    # Satellite card
    old_sat = '<img alt="Shree Nath Enclave - Mumbai Naka, Nashik" loading="lazy" src="/images/shreeyog/buildings/contemporary-avenue.webp"/>'
    new_sat = '<img alt="Shree Nath Enclave - Mumbai Naka, Nashik" loading="lazy" src="/images/shreeyog/slider/shree-nath-enclave.webp"/>'
    html = html.replace(old_sat, new_sat)

    # Any other contemporary-avenue.webp associated with Shree Nath Enclave
    pattern = re.compile(r'(\"name\":\s*\"Shree Nath Enclave\"[\s\S]*?\"mainImage\":\s*\")[^\"]*(\")')
    html = pattern.sub(r'\g<1>/images/shreeyog/slider/shree-nath-enclave.webp\g<2>', html)

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Updated {html_rel}")
