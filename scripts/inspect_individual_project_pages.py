import glob
from bs4 import BeautifulSoup

for f in sorted(glob.glob('public/projects/*.html')):
    if f.endswith(('index.html', 'projects.html')):
        continue
    with open(f, 'r', encoding='utf-8') as fp:
        soup = BeautifulSoup(fp.read(), 'html.parser')
    brochure_links = soup.find_all(lambda tag: tag.name == 'a' and any('brochure' in (tag.get(attr) or '') for attr in ['href', 'data-project-href']))
    print(f"{f}: {len(brochure_links)} brochure links")
    for b in brochure_links:
        print(f"   text: {b.get_text(strip=True)[:30]} | href: {b.get('href')} | data-project-href: {b.get('data-project-href')}")
