import fitz
import os
from PIL import Image

pdf_path = r'assets/Projects Brouchers/Shree Vithal Park - brochure.pdf'
out_dir = r'public/projects/shree-vithal-park/brochure/assets'
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)
print(f'Rendering {len(doc)} pages...')

for i, page in enumerate(doc):
    pix = page.get_pixmap(dpi=200)
    img_path = os.path.join(out_dir, f'page-{i+1}.webp')
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    img.save(img_path, "WEBP", quality=88)
    print(f'Page {i+1} saved: {img.size} -> {img_path}')

print('Done rendering pages.')
