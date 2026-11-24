import os
from PIL import Image

assets_dir = 'public/projects/shree-nandan/brochure/assets'

for f in sorted(os.listdir(assets_dir)):
    p = os.path.join(assets_dir, f)
    if os.path.isfile(p):
        with Image.open(p) as im:
            print(f'{f}: {im.size}, mode={im.mode}')
