with open('public/projects/shree-nandan.html', 'r', encoding='utf-8') as f:
    c = f.read()

import re
matches = re.findall(r'<p[^>]*>.*?</p>|<h[1-3][^>]*>.*?</h[1-3]>', c)
for m in matches[:15]:
    print(m)
