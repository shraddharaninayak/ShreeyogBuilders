import urllib.request
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

print("=== CHECKING LIVE VERCEL DEPLOYMENT ===")

for s in slugs:
    url = f"https://shreeyog-builders.vercel.app/projects/{s}/brochure"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0', 'Cache-Control': 'no-cache'})
        with urllib.request.urlopen(req) as resp:
            final_url = resp.url
            html = resp.read().decode('utf-8', errors='ignore')
            has_base = f'<base href="/projects/{s}/brochure/"' in html
            print(f"[{s}]: final_url={final_url}, has_base={has_base}, html_len={len(html)}")
    except Exception as e:
        print(f"[{s}]: Error: {e}")
