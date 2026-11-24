with open('public/_nuxt/MainFooter.8675ce94.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
matches = re.findall(r'@media\s*\(min-width:\s*1024px\)\s*\{([^}]+(?:\{[^}]+\}[^}]+)*)\}', css)
for m in matches:
    print('MEDIA BLOCK (len =', len(m), '):')
    for line in m.split(';'):
        if any(k in line for k in ['places', 'objects', 'about', 'people', 'nav', 'operating', 'independent']):
            print('  ', line.strip())
