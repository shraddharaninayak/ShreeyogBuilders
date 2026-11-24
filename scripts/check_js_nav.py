import os

slugs = [
    ('shree-bramhand', 'bramhand-brochure.js'),
    ('shree-vishwa', 'vishwa-brochure.js'),
    ('shree-safalya', 'safalya-brochure.js'),
    ('shree-nath-enclave', 'nath-brochure.js'),
    ('shree-neelkanth', 'neelkanth-brochure.js'),
    ('shree-pandurang', 'pandurang-brochure.js'),
    ('shree-samruddhi-park', 'samruddhi-brochure.js'),
    ('shree-venkatesh-park', 'venkatesh-brochure.js')
]

for s, js_file in slugs:
    p = f'public/projects/{s}/brochure/{js_file}'
    if os.path.exists(p):
        with open(p, 'r', encoding='utf-8') as f:
            content = f.read()
        has_nav_click = 'navLink' in content or 'sidebar-nav' in content
        has_prevent = 'preventDefault' in content
        has_scrollspy = 'scroll' in content.lower()
        print(f'{s}: has_nav={has_nav_click}, preventDefault={has_prevent}, scrollspy={has_scrollspy}')
