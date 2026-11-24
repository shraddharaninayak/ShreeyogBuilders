with open('data/projects.js', 'r', encoding='utf-8') as f:
    js_text = f.read()

import re
matches = re.findall(r'\{\s*"id":\s*\d+,[^}]+"slug":\s*"(?:shree-malhar|shree-neelkanth|shree-pandurang|shree-nandan)"[^}]*\}', js_text, re.DOTALL)
for m in matches:
    print(m)
    print('='*50)
