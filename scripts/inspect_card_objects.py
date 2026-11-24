import os
import re
import json

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb"
projects_json = os.path.join(base_dir, 'public', 'data', 'projects.json')

with open(projects_json, 'r', encoding='utf-8') as f:
    data = json.load(f)

for p in data:
    if 'nath' in p.get('name', '').lower() or 'samruddhi' in p.get('name', '').lower():
        print(json.dumps(p, indent=2))

projects_html = os.path.join(base_dir, 'public', 'projects', 'index.html')
with open(projects_html, 'r', encoding='utf-8') as f:
    html = f.read()

# Let's find Nath and Samruddhi entries in arrays in html
for name in ['Nath Enclave', 'Samruddhi']:
    idx = html.find(name)
    if idx != -1:
        start = max(0, idx - 400)
        end = min(len(html), idx + 600)
        print(f"=== HTML snippet for {name} ===")
        print(html[start:end])
