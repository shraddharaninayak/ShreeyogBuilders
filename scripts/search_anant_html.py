import os

ws = 'D:/INTERNSHIPS/SOCIAL MEDIA MANANGMENT[SKILLNEX]/WEBSITES/Shreeyogweb'

for root, dirs, files in os.walk(ws):
    if 'node_modules' in root or '.git' in root or 'references' in root:
        continue
    for f in files:
        if f.endswith('.html') or f.endswith('.js'):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8', errors='ignore') as fl:
                c = fl.read()
                if 'shree-anant' in c:
                    print(f"Found in: {p} (length: {len(c)})")
