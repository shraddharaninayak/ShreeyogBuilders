import os
import urllib.request
import urllib.error
from html.parser import HTMLParser

BASE_URL = 'http://localhost:3000'

class AssetCollector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.assets = []
        self.links = []
        self.base = None
    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        if tag == 'base':
            self.base = attr_dict.get('href')
        if tag in ['img', 'script', 'video', 'source']:
            src = attr_dict.get('src')
            if src:
                self.assets.append((tag, src))
        elif tag == 'link':
            href = attr_dict.get('href')
            rel = attr_dict.get('rel', '')
            if href and ('stylesheet' in rel or 'icon' in rel or 'preload' in rel):
                self.assets.append((tag, href))
        elif tag == 'a':
            href = attr_dict.get('href')
            if href and not href.startswith(('#', 'tel:', 'mailto:', 'javascript:')):
                self.links.append(href)

def test_url(url, expected_status=200):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req)
        ct = res.headers.get('Content-Type')
        cl = res.headers.get('Content-Length')
        return res.status, ct, cl, None
    except urllib.error.HTTPError as e:
        return e.code, None, None, str(e)
    except Exception as e:
        return 0, None, None, str(e)

brochure_routes = [
    '/projects/shree-bramhand/brochure',
    '/projects/shree-bramhand/brochure/',
    '/projects/shree-vishwa/brochure',
    '/projects/shree-vishwa/brochure/',
    '/projects/shree-safalya/brochure',
    '/projects/shree-safalya/brochure/',
    '/projects/shree-samruddhi-park/brochure',
    '/projects/shree-samruddhi-park/brochure/',
    '/projects/shree-venkatesh-park/brochure',
    '/projects/shree-venkatesh-park/brochure/',
    '/projects/shree-nath-enclave/brochure',
    '/projects/shree-nath-enclave/brochure/'
]

print("=== 1. TESTING BROCHURE HTML ROUTES ===")
for r in brochure_routes:
    status, ct, cl, err = test_url(BASE_URL + r)
    print(f"{r:45} -> Status {status} ({ct}, len={cl}) {'[ERROR: '+err+']' if err else ''}")

pdf_urls = [
    '/brochures/shree-bramhand-brochure.pdf',
    '/brochures/shree-vishwa-brochure.pdf',
    '/brochures/shree-safalya-brochure.pdf',
    '/brochures/shree-samruddhi-park-brochure.pdf',
    '/brochures/shree-venkatesh-park-brochure.pdf',
    # Legacy / alias paths
    '/brochures/shree-bramhand.pdf',
    '/projects/shree-bramhand/Shree-Bramhand-Brochure.pdf',
    '/projects/shree-bramhand/brochure/Shree-Bramhand-Brochure.pdf',
    '/projects/shree-bramhand/brochure/brochure.pdf',
    '/brochures/shree-vishwa.pdf',
    '/projects/shree-vishwa/Shree-Vishwa-Brochure.pdf',
    '/projects/shree-vishwa/brochure/Shree-Vishwa-Brochure.pdf',
    '/projects/shree-vishwa/brochure/brochure.pdf',
    '/brochures/shree-safalya.pdf',
    '/projects/shree-safalya/Shree-Safalya-Brochure.pdf',
    '/projects/shree-safalya/brochure/Shree-Safalya-Brochure.pdf',
    '/projects/shree-safalya/brochure/brochure.pdf',
    '/brochures/shree-samruddhi-park.pdf',
    '/projects/shree-samruddhi-park/Shree-Samruddhi-Park.pdf',
    '/projects/shree-samruddhi-park/brochure/Shree-Samruddhi-Park.pdf',
    '/projects/shree-samruddhi-park/brochure/brochure.pdf',
    '/brochures/shree-venkatesh-park.pdf',
    '/brochures/shree-venkatesh.pdf',
    '/projects/shree-venkatesh-park/Shree-Venkatesh-Park.pdf',
    '/projects/shree-venkatesh-park/brochure/Shree-Venkatesh-Park.pdf',
    '/projects/shree-venkatesh/Shree-Venkatesh-Park.pdf',
    '/projects/shree-venkatesh/brochure/Shree-Venkatesh-Park.pdf'
]

print("\n=== 2. TESTING PDF URLS & REDIRECTS ===")
for p in pdf_urls:
    status, ct, cl, err = test_url(BASE_URL + p)
    size_str = f"{int(cl)/1024/1024:.2f} MB" if cl and cl.isdigit() else str(cl)
    status_flag = "OK" if status == 200 and 'pdf' in str(ct) else f"FAIL ({status})"
    print(f"[{status_flag}] {p:65} -> Status {status} ({ct}, {size_str})")

print("\n=== 3. TESTING ALL IN-PAGE ASSETS FOR EVERY BROCHURE ===")
checked_assets = {}
for r in [
    '/projects/shree-bramhand/brochure/',
    '/projects/shree-vishwa/brochure/',
    '/projects/shree-safalya/brochure/',
    '/projects/shree-samruddhi-park/brochure/',
    '/projects/shree-venkatesh-park/brochure/',
    '/projects/shree-nath-enclave/brochure/'
]:
    req = urllib.request.Request(BASE_URL + r, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    parser = AssetCollector()
    parser.feed(html)
    
    print(f"\nBrochure: {r} (Base: {parser.base})")
    print(f"  Found {len(parser.assets)} assets, {len(parser.links)} links")
    
    missing = []
    for tag, src in parser.assets:
        if src.startswith(('http://', 'https://')):
            continue
        if src.startswith('/'):
            asset_url = BASE_URL + src
        elif parser.base:
            asset_url = BASE_URL + parser.base + src
        else:
            asset_url = BASE_URL + r + src
            
        if asset_url not in checked_assets:
            astatus, act, acl, aerr = test_url(asset_url)
            checked_assets[asset_url] = (astatus, act, acl, aerr)
            
        astatus, act, acl, aerr = checked_assets[asset_url]
        if astatus != 200:
            missing.append((tag, src, asset_url, astatus))
            
    if missing:
        print(f"  [MISSING/FAILED ASSETS ({len(missing)})]:")
        for m in missing:
            print(f"    <{m[0]} src='{m[1]}'> -> {m[2]} returned HTTP {m[3]}")
    else:
        print(f"  All {len(parser.assets)} assets loaded with HTTP 200 OK!")
