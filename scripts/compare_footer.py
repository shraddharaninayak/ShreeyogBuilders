with open('public/projects.html', 'r', encoding='utf-8') as f:
    c_proj = f.read()

with open('public/index.html', 'r', encoding='utf-8') as f:
    c_idx = f.read()

import re
print('=== Stylesheets in public/projects.html ===')
for m in re.findall(r'<link[^>]*rel="stylesheet"[^>]*>', c_proj):
    print(' ', m)

print('=== Stylesheets in public/index.html ===')
for m in re.findall(r'<link[^>]*rel="stylesheet"[^>]*>', c_idx):
    print(' ', m)

print('=== Embedded <style> in projects.html ===')
for m in re.findall(r'<style[^>]*>.*?</style>', c_proj, re.DOTALL):
    print('Style tag length:', len(m))
    # check if footer or page-footer or .places or .about is in it
    if 'footer' in m.lower():
        print('  Contains footer styles!')
        for line in m.splitlines():
            if 'footer' in line.lower() or 'places' in line.lower() or 'nav' in line.lower() or 'operating' in line.lower():
                print('   ', line[:100])
