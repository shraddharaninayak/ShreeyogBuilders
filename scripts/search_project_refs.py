import os
import re

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb"

targets = ['contemporary-avenue', 'shree-samruddhi-park']
matches = {t: [] for t in targets}

for root, dirs, files in os.walk(base_dir):
    if '.git' in root or 'node_modules' in root or 'references' in root:
        continue
    for f in files:
        if f.endswith(('.html', '.js', '.json', '.css')):
            fpath = os.path.join(root, f)
            try:
                with open(fpath, 'r', encoding='utf-8') as fp:
                    content = fp.read()
                    for t in targets:
                        if t in content:
                            matches[t].append(os.path.relpath(fpath, base_dir))
            except Exception as e:
                pass

for t, fpaths in matches.items():
    print(f"=== Matches for {t} ===")
    for p in fpaths:
        print("  ", p)
