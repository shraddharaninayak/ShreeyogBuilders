with open('public/_nuxt/shreeyog-projects.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if any(k in l.lower() for k in ['footer', 'nav', 'places', 'objects', 'about', 'people', '.-w', 'block']):
        print(f'{i+1}: {l.rstrip()}')
