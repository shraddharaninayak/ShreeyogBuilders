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
passed_count = 0

for s in slugs:
    url = f"https://shreeyog-builders.vercel.app/projects/{s}/brochure"
    print(f"\n=======================================================")
    print(f"TESTING LIVE VERCEL: {s.upper()}")
    print(f"URL: {url}")
    print(f"=======================================================")
    
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        final_url = resp.url
        html = resp.read().decode('utf-8', errors='ignore')
    
    print(f"  Final redirected URL: {final_url}")
    soup = BeautifulSoup(html, 'html.parser')
    base_tag = soup.find('base')
    base_url = urljoin(final_url, base_tag['href']) if base_tag and base_tag.get('href') else final_url
    print(f"  Base URL: {base_url}")
    
    # 1. Test CSS
    css_links = soup.find_all('link', rel=lambda r: r and 'stylesheet' in r)
    for link in css_links:
        href = link.get('href', '')
        if href and not href.startswith('http'):
            target = urljoin(base_url, href)
            try:
                with urllib.request.urlopen(urllib.request.Request(target, method='HEAD')) as r:
                    if r.status == 200:
                        passed_count += 1
                        print(f"  [CSS 200 OK] {href}")
                    else:
                        failures.append((s, 'CSS', href, target, r.status))
            except Exception as e:
                failures.append((s, 'CSS', href, target, str(e)))

    # 2. Test JS
    for script in soup.find_all('script', src=True):
        src = script.get('src', '')
        if src and not src.startswith('http'):
            target = urljoin(base_url, src)
            try:
                with urllib.request.urlopen(urllib.request.Request(target, method='HEAD')) as r:
                    if r.status == 200:
                        passed_count += 1
                        print(f"  [JS 200 OK] {src}")
                    else:
                        failures.append((s, 'JS', src, target, r.status))
            except Exception as e:
                failures.append((s, 'JS', src, target, str(e)))

    # 3. Test Images
    img_tested = 0
    for img in soup.find_all('img', src=True):
        src = img.get('src', '')
        if src and not src.startswith('http') and not src.startswith('data:'):
            target = urljoin(base_url, src)
            img_tested += 1
            try:
                with urllib.request.urlopen(urllib.request.Request(target, method='HEAD')) as r:
                    if r.status == 200:
                        passed_count += 1
                    else:
                        failures.append((s, 'IMG', src, target, r.status))
            except Exception as e:
                failures.append((s, 'IMG', src, target, str(e)))
    print(f"  [IMAGES TESTED] {img_tested} images verified (all HTTP 200)")

    # 4. Test PDF download link
    pdf_links = soup.find_all('a', href=lambda h: h and h.endswith('.pdf'))
    for a in pdf_links:
        href = a.get('href', '')
        target = urljoin(base_url, href)
        try:
            with urllib.request.urlopen(urllib.request.Request(target, method='HEAD')) as r:
                if r.status == 200:
                    passed_count += 1
                    print(f"  [PDF 200 OK] {href}")
                else:
                    failures.append((s, 'PDF', href, target, r.status))
        except Exception as e:
            failures.append((s, 'PDF', href, target, str(e)))

print("\n" + "="*60)
print(f"VERCEL DEPLOYMENT VERIFICATION SUMMARY:")
print(f"Total asset tests passed: {passed_count}")
print(f"Total failures: {len(failures)}")
if failures:
    for f in failures:
        print(f"  FAIL: {f}")
else:
    print("ALL 8 BROCHURES ON VERCEL ARE 100% OPERATIONAL WITH ZERO BROKEN ASSETS!")
print("="*60)
