import os
import re
from html.parser import HTMLParser

class AssetExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))

brochures = [
    'public/projects/shree-bramhand/brochure',
    'public/projects/shree-vishwa/brochure',
    'public/projects/shree-safalya/brochure',
    'public/projects/shree-samruddhi-park/brochure',
    'public/projects/shree-venkatesh-park/brochure',
    'public/projects/shree-nath-enclave/brochure'
]

workspace = r"D:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb"

for b in brochures:
    idx_path = os.path.join(workspace, b, 'index.html')
    if not os.path.exists(idx_path):
        print(f'Missing index.html in {b}')
        continue
    with open(idx_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    parser = AssetExtractor()
    parser.feed(html)
    
    # Check <base> tag
    base_tag = next((attrs.get('href') for tag, attrs in parser.tags if tag == 'base'), None)
    
    missing_assets = []
    links = []
    for tag, attrs in parser.tags:
        for attr in ['src', 'href']:
            val = attrs.get(attr)
            if not val:
                continue
            if val.startswith(('http://', 'https://', '#', 'tel:', 'mailto:', 'javascript:')):
                continue
            
            # Resolve relative vs absolute
            if val.startswith('/'):
                target = os.path.join(workspace, 'public', val.lstrip('/'))
            elif base_tag and base_tag.startswith('/'):
                target = os.path.join(workspace, 'public', base_tag.lstrip('/'), val)
            else:
                target = os.path.join(workspace, b, val)
                
            clean_target = target.split('?')[0].split('#')[0].replace('/', '\\')
            
            if attr == 'src':
                if not os.path.exists(clean_target):
                    missing_assets.append((tag, val, clean_target))
            elif attr == 'href' and not val.startswith('#'):
                # Check if it's a page or file
                exists = os.path.exists(clean_target) or os.path.exists(clean_target + '.html') or os.path.exists(os.path.join(clean_target, 'index.html'))
                links.append((val, clean_target, exists))
                
    print(f'\n=== {b} (base: {base_tag}) ===')
    if missing_assets:
        print(f'  [MISSING ASSETS ({len(missing_assets)})]:')
        for m in missing_assets:
            print(f'    <{m[0]} src="{m[1]}"> -> Not found: {m[2]}')
    else:
        print('  All <img>, <script>, and other src assets exist!')
        
    broken_links = [l for l in links if not l[2]]
    if broken_links:
        print(f'  [BROKEN LINKS ({len(broken_links)})]:')
        for l in broken_links:
            print(f'    href="{l[0]}" -> Not found: {l[1]}')
    else:
        print(f'  All {len(links)} relative href links exist!')
