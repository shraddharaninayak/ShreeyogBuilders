with open('public/projects/shree-neelkanth/brochure/index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines[:120]):
    print(f'{i+1}: {l.rstrip()}')
