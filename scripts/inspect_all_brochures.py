import os

brochures = []
base = 'public/projects'
for p in os.listdir(base):
    bdir = os.path.join(base, p, 'brochure')
    if os.path.isdir(bdir):
        brochures.append(p)

print('All brochures:', brochures)

for b in brochures:
    idx_path = os.path.join(base, b, 'brochure', 'index.html')
    if os.path.exists(idx_path):
        with open(idx_path, 'r', encoding='utf-8') as f:
            c = f.read()
        has_overlay = 'overview-image-overlay' in c
        has_hero_logo = 'hero-card-logo' in c
        print(f'{b}: overview-image-overlay={has_overlay}, hero-card-logo={has_hero_logo}')
