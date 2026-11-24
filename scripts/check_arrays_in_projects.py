with open('public/projects/index.html', 'r', encoding='utf-8') as f:
    txt = f.read()

import re
m = re.search(r'const COMPLETED_PROJECTS\s*=\s*(\[.*?\]);', txt, re.DOTALL)
if m:
    print("Found COMPLETED_PROJECTS:")
    print(m.group(0)[:1000])

m2 = re.search(r'const ONGOING_PROJECTS\s*=\s*(\[.*?\]);', txt, re.DOTALL)
if m2:
    print("Found ONGOING_PROJECTS:")
    print(m2.group(0)[:1000])
