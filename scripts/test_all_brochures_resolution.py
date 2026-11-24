import urllib.request
from bs4 import BeautifulSoup
from urllib.parse import urljoin

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

failures = []

for s in slugs:
    for variant in [f'http://localhost:3000/projects/{s}/brochure', f'http://localhost:3000/projects/{s}/brochure/']:
        print(f'Testing {variant} ...')
        req = urllib.request.Request(variant, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            final_url = resp.url
            html = resp.read().decode('utf-8', errors='ignore')
        
        soup = BeautifulSoup(html, 'html.parser')
        base_tag = soup.find('base')
        base_url = urljoin(final_url, base_tag['href']) if base_tag and base_tag.get('href') else final_url
        
        # Test CSS
        css_links = soup.find_all('link', rel=lambda r: r and 'stylesheet' in r)
        for link in css_links:
            href = link.get('href', '')
            if href and not href.startswith('http'):
                target = urljoin(base_url, href)
                try:
                    with urllib.request.urlopen(urllib.request.Request(target, method='HEAD')) as r:
                        if r.status != 200:
                            failures.append((variant, 'CSS', href, target, r.status))
                except Exception as e:
                    failures.append((variant, 'CSS', href, target, str(e)))

        # Test Scripts
        scripts = soup.find_all('script', src=True)
        for script in scripts:
            src = script.get('src', '')
            if src and not src.startswith('http'):
                target = urljoin(base_url, src)
                try:
                    with urllib.request.urlopen(urllib.request.Request(target, method='HEAD')) as r:
                        if r.status != 200:
                            failures.append((variant, 'JS', src, target, r.status))
                except Exception as e:
                    failures.append((variant, 'JS', src, target, str(e)))

        # Test Images
        imgs = soup.find_all('img', src=True)
        for img in imgs:
            src = img.get('src', '')
            if src and not src.startswith('http'):
                target = urljoin(base_url, src)
                try:
                    with urllib.request.urlopen(urllib.request.Request(target, method='HEAD')) as r:
                        if r.status != 200:
                            failures.append((variant, 'IMG', src, target, r.status))
                except Exception as e:
                    failures.append((variant, 'IMG', src, target, str(e)))

print('='*60)
print(f'Total tests run across all 8 brochures. Failures count: {len(failures)}')
if failures:
    for f in failures:
        print('  FAIL:', f)
else:
    print('ALL 8 BROCHURES PASSED 100% IN BOTH WITH-SLASH AND WITHOUT-SLASH MODES!')
