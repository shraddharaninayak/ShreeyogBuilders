import os
import fitz
from PIL import Image

ws = 'D:/INTERNSHIPS/SOCIAL MEDIA MANANGMENT[SKILLNEX]/WEBSITES/Shreeyogweb'
os.chdir(ws)

out_dir = 'references/niwas_pages'
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open('assets/Projects Brouchers/Shree Niwas.pdf')
print(f"Rendering {len(doc)} pages...")

for i, page in enumerate(doc):
    pix = page.get_pixmap(dpi=200)
    page_img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    out_path = os.path.join(out_dir, f'page_{i+1}.png')
    page_img.save(out_path)
    print(f"Saved {out_path} ({pix.width}x{pix.height})")

print("Finished rendering pages!")
