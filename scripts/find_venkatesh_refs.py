import os
import re

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb"
files = [
    os.path.join(base_dir, 'public', 'projects', 'index.html'),
    os.path.join(base_dir, 'public', 'projects.html'),
    os.path.join(base_dir, 'public', 'data', 'projects.json'),
    os.path.join(base_dir, 'data', 'projects.js')
]

for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    print("===", os.path.basename(f), "===")
    m = re.findall(r'[^"\'\s<>]*venkatesh[^"\'\s<>]*', c, re.IGNORECASE)
    print("Venkatesh matches:", set(m))
