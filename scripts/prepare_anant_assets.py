import os
import shutil
import fitz
from PIL import Image

ws = 'D:/INTERNSHIPS/SOCIAL MEDIA MANANGMENT[SKILLNEX]/WEBSITES/Shreeyogweb'
os.chdir(ws)

pdf_src = 'assets/Projects Brouchers/Shree Anant.pdf'
pdf_doc = fitz.open(pdf_src)
print(f"Opened PDF with {len(pdf_doc)} pages")

assets_dir = 'public/projects/shree-anant/brochure/assets'
os.makedirs(assets_dir, exist_ok=True)

# 1. Copy official PDF
shutil.copyfile(pdf_src, 'public/brochures/shree-anant-brochure.pdf')
shutil.copyfile(pdf_src, os.path.join(assets_dir, 'Shree-Anant-Brochure.pdf'))
print("Copied PDF to public/brochures and brochure folder")

# 2. Render all 7 pages as high-quality WebP images
for i, page in enumerate(pdf_doc):
    pix = page.get_pixmap(dpi=200)
    page_img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    page_path = os.path.join(assets_dir, f'page-{i+1}.webp')
    page_img.save(page_path, 'WEBP', quality=90)
    print(f"Rendered Page {i+1}: {pix.width}x{pix.height} -> {page_path}")

# 3. Extract embedded images
for i, page in enumerate(pdf_doc):
    for img_info in page.get_images():
        xref = img_info[0]
        base = pdf_doc.extract_image(xref)
        w, h, ext = base['width'], base['height'], base['ext']
        if w > 300 or h > 300:
            extracted_path = os.path.join(assets_dir, f'img_p{i+1}_{xref}_{w}x{h}.{ext}')
            with open(extracted_path, 'wb') as f:
                f.write(base['image'])
            print(f"Extracted image P{i+1} xref={xref}: {w}x{h} -> {extracted_path}")

# 4. Handle logo
logo_src = 'C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795492452110_3e944b8b.png'
im_logo = Image.open(logo_src)
bbox = im_logo.getbbox()
if bbox:
    pad = 4
    crop_box = (max(0, bbox[0]-pad), max(0, bbox[1]-pad), min(im_logo.width, bbox[2]+pad), min(im_logo.height, bbox[3]+pad))
    trimmed_logo = im_logo.crop(crop_box)
else:
    trimmed_logo = im_logo

logo_dest1 = os.path.join(assets_dir, 'logo.png')
logo_dest2 = 'public/images/shreeyog/logos/shree-anant-logo.png'
logo_dest3 = 'assets/logo-shree-anant.png'
os.makedirs('public/images/shreeyog/logos', exist_ok=True)

trimmed_logo.save(logo_dest1, 'PNG')
trimmed_logo.save(logo_dest2, 'PNG')
trimmed_logo.save(logo_dest3, 'PNG')
print(f"Saved trimmed logo ({trimmed_logo.size}) to:\n  {logo_dest1}\n  {logo_dest2}\n  {logo_dest3}")

# 5. Process elevation image
# Raw elevation xref 23 is 2440x1912 JPEG
raw_elevation = os.path.join(assets_dir, 'img_p2_23_2440x1912.jpeg')
if not os.path.exists(raw_elevation):
    # Try references
    raw_elevation = 'references/anant_raw_elevation_xref23.jpg'

if os.path.exists(raw_elevation):
    el_img = Image.open(raw_elevation)
    print(f"Elevation image source found: {el_img.size}")
    
    # Save standard webp and jpegs in brochure assets
    el_img.save(os.path.join(assets_dir, 'elevation.webp'), 'WEBP', quality=92)
    el_img.save(os.path.join(assets_dir, 'elevation-hero.jpg'), 'JPEG', quality=95)
    el_img.save(os.path.join(assets_dir, 'elevation-full.jpg'), 'JPEG', quality=95)
    
    # Also save to public/images/shreeyog/slider and projects
    os.makedirs('public/images/shreeyog/slider', exist_ok=True)
    os.makedirs('public/images/shreeyog/projects', exist_ok=True)
    el_img.save('public/images/shreeyog/slider/shree-anant.webp', 'WEBP', quality=90)
    el_img.save('public/images/shreeyog/projects/shree-anant.webp', 'WEBP', quality=90)
    el_img.save('public/images/shreeyog/slider/shree-anant.jpg', 'JPEG', quality=90)
    el_img.save('public/images/shreeyog/projects/shree-anant.jpg', 'JPEG', quality=90)
    print("Saved elevation to brochure assets and website slider/projects directories")

print("Asset preparation script finished!")
