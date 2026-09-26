import urllib.request
import re
from bs4 import BeautifulSoup

url = 'https://shreeyogbuilders.com/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

soup = BeautifulSoup(html, 'html.parser')

print("=== ALL IMAGES ON SHREEYOGBUILDERS.COM ===")
for i, img in enumerate(soup.find_all('img')):
    src = img.get('src') or img.get('data-src')
    srcset = img.get('srcset')
    alt = img.get('alt', '')
    
    # Get surrounding text/context
    parent = img.parent
    context = ""
    for _ in range(4):
        if parent:
            text = parent.get_text(strip=True)
            if len(text) > 5 and len(text) < 200:
                context = text
                break
            parent = parent.parent

    print(f"\n[{i+1}] SRC: {src}")
    if srcset:
        print(f"    SRCSET: {srcset}")
    print(f"    ALT: {alt}")
    print(f"    CONTEXT: {context[:150]}")
