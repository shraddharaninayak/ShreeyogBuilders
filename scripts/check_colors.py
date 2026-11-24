from PIL import Image
import numpy as np

for p in ['page-1.webp', 'page-2.webp', 'page-3.webp', 'page-6.webp', 'p3_raw_1_1709x992.jpeg']:
    im = Image.open(f'public/projects/shree-nandan/brochure/assets/{p}').convert('RGB')
    arr = np.array(im)
    avg_color = arr.mean(axis=(0,1)).astype(int)
    print(f'{p}: avg RGB={avg_color}')
