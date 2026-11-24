import os
import re

slugs = [
    'shree-bramhand',
    'shree-vishwa',
    'shree-safalya',
    'shree-nath-enclave',
    'shree-neelkanth',
    'shree-pandurang',
    'shree-samruddhi-park',
    'shree-venkatesh-park'
]

for s in slugs:
    p = f'public/projects/{s}/brochure/index.html'
    if not os.path.exists(p):
        print(f'{s}: NOT FOUND')
        continue
    with open(p, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()
    
    has_base = '<base' in html
    css = re.findall(r'<link[^>]*rel=["\']stylesheet["\'][^>]*>', html)
    scripts = re.findall(r'<script[^>]*src=["\'][^"\']*["\']', html)
    imgs = re.findall(r'<img[^>]*src=["\']([^"\']*)["\']', html)[:3]
    
    print(f'=== {s} ===')
    print('  has_base:', has_base)
    print('  css:', css)
    print('  scripts:', scripts)
    print('  sample imgs:', imgs)
