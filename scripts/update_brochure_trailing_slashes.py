import re

files = ['public/projects.html', 'public/projects/index.html', 'pages/projects.html', 'data/projects.js']
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

for fp in files:
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    orig = content
    for s in slugs:
        content = re.sub(rf'/projects/{s}/brochure(?=[\"\'])', f'/projects/{s}/brochure/', content)
    if content != orig:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(content)
        print('Updated trailing slashes in', fp)
    else:
        print('No changes needed in', fp)
