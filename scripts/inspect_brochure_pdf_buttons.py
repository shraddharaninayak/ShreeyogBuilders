from bs4 import BeautifulSoup
import glob

brochures = [
    'public/projects/shree-bramhand/brochure/index.html',
    'public/projects/shree-vishwa/brochure/index.html',
    'public/projects/shree-safalya/brochure/index.html',
    'public/projects/shree-samruddhi-park/brochure/index.html',
    'public/projects/shree-venkatesh-park/brochure/index.html',
    'public/projects/shree-nath-enclave/brochure/index.html'
]

for b in brochures:
    with open(b, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    pdf_buttons = []
    for a in soup.find_all('a'):
        href = str(a.get('href') or '')
        dl = str(a.get('download') or '')
        cls = ' '.join(a.get('class') or [])
        title = str(a.get('title') or '')
        text = a.get_text(strip=True)
        if any('pdf' in x.lower() for x in [href, dl, cls, title, text]):
            pdf_buttons.append((text, href, dl, a.get('target')))
            
    print(f"\n=== {b} ===")
    print(f"Found {len(pdf_buttons)} PDF button(s):")
    for text, href, dl, target in pdf_buttons:
        print(f"  text: '{text}' | href: '{href}' | download: '{dl}' | target: '{target}'")
