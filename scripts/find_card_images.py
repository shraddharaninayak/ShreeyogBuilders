import os
import re
import json

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb"
files = [
    os.path.join(base_dir, 'public', 'projects', 'index.html'),
    os.path.join(base_dir, 'public', 'projects.html'),
    os.path.join(base_dir, 'public', 'data', 'projects.json')
]

for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    print('===', os.path.basename(f), '===')
    m1 = set(re.findall(r'[^"\'\s<>]*shree-nath-enclave[^"\'\s<>]*', content))
    m2 = set(re.findall(r'[^"\'\s<>]*shree-samruddhi-park[^"\'\s<>]*', content))
    print('Nath images:', [x for x in m1 if any(ext in x for ext in ['.jpg', '.webp', '.png'])])
    print('Samruddhi images:', [x for x in m2 if any(ext in x for ext in ['.jpg', '.webp', '.png'])])
