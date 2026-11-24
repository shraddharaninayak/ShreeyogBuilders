with open('public/projects/shree-neelkanth/brochure/neelkanth-brochure.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()
for i, l in enumerate(lines[:100]):
    print(f'{i+1}: {l.rstrip()}')
