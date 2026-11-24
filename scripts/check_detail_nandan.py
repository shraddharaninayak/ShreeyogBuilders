with open('public/projects/shree-nandan.html', 'r', encoding='utf-8') as f:
    c = f.read()

import re
matches = [m.start() for m in re.finditer(r'/images/shreeyog/projects/shakuntal.webp', c)]
for idx in matches:
    print(c[idx-50:idx+150])
