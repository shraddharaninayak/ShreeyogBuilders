import re

for proj in ['shree-safalya', 'shree-venkatesh-park', 'shree-samruddhi-park']:
    css_file = f'public/projects/{proj}/brochure/{proj.split("-")[1]}-brochure.css'
    with open(css_file, 'r', encoding='utf-8') as f:
        css = f.read()
    print(f'=== {proj} ===')
    matches = re.finditer(r'overview-image', css)
    for m in matches:
        start = max(0, m.start() - 50)
        end = min(len(css), m.end() + 150)
        print(css[start:end])
        print('---')
