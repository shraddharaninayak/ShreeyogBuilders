import os, glob, re

pages = [
    'public/index.html',
    'public/about/index.html',
    'public/projects/index.html',
    'public/contact/index.html'
]
pages += glob.glob('public/projects/*.html')
pages += glob.glob('public/projects/*/index.html')
pages += glob.glob('public/projects/*/brochure/index.html')

pages = sorted(list(set(pages)))

print(f"Total pages to check: {len(pages)}")

for p in pages:
    with open(p, 'r', encoding='utf-8') as f:
        content = f.read()
    footers = re.findall(r'<footer[\s\S]*?<\/footer>', content)
    has_after = any('after' in ft and 'footer-shreeyog-brand-logo' in ft for ft in footers)
    has_stone = any('stone-3' in ft for ft in footers)
    print(f"{p}: footers={len(footers)}, has_after={has_after}, has_stone3={has_stone}")
