with open('public/projects/shree-malhar/brochure/index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()
for i, l in enumerate(lines):
    if 'terrace' in l.lower() or 'car parkings' in l.lower():
        print(f'{i+1}: {l.strip()[:80]}')
