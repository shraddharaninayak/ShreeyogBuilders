with open('public/projects/index.html', 'r', encoding='utf-8') as f:
    txt = f.read()

import re
matches = [m.start() for m in re.finditer(r'shree-anant', txt, re.IGNORECASE)]
print(f"Total occurrences in public/projects/index.html: {len(matches)}")
for idx in matches:
    print("--- OCCURRENCE ---")
    print(txt[max(0, idx-200):min(len(txt), idx+400)])
