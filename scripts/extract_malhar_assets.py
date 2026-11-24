import fitz
import os
from PIL import Image

ws = 'd:/INTERNSHIPS/SOCIAL MEDIA MANANGMENT[SKILLNEX]/WEBSITES/Shreeyogweb'
pdf_path = os.path.join(ws, 'assets/Projects Brouchers/Shree Malhar.pdf')
doc = fitz.open(pdf_path)

out_dir = os.path.join(ws, 'public/projects/shree-malhar/brochure/assets')
os.makedirs(out_dir, exist_ok=True)

# 1. Export all 7 pages as high-quality WebP images
for i in range(len(doc)):
    page = doc[i]
    pix = page.get_pixmap(dpi=200)
    page_img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    webp_path = os.path.join(out_dir, f'page-{i+1}.webp')
    page_img.save(webp_path, 'WEBP', quality=88)
    print(f'Exported {webp_path} ({pix.width}x{pix.height})')

# 2. Extract embedded images across pages
for i, page in enumerate(doc):
    for img_info in page.get_images():
        xref = img_info[0]
        base = doc.extract_image(xref)
        w, h, ext = base['width'], base['height'], base['ext']
        if w > 400 or h > 400:
            extracted_path = os.path.join(out_dir, f'img_p{i+1}_{xref}_{w}x{h}.{ext}')
            with open(extracted_path, 'wb') as f:
                f.write(base['image'])
            print(f'Extracted image P{i+1} xref={xref}: {w}x{h} -> {extracted_path}')

# 3. Copy transparent logo
logo_src = os.path.join(ws, 'public/images/shreeyog/logos/shree-malhar-logo.png')
if os.path.exists(logo_src):
    logo_dst = os.path.join(out_dir, 'logo.png')
    with open(logo_src, 'rb') as f_in, open(logo_dst, 'wb') as f_out:
        f_out.write(f_in.read())
    print('Copied logo to brochure assets')

print('All assets prepared!')
