import os
import shutil
import fitz
from PIL import Image

ws = 'D:/INTERNSHIPS/SOCIAL MEDIA MANANGMENT[SKILLNEX]/WEBSITES/Shreeyogweb'
os.chdir(ws)

pdf_src = 'assets/Projects Brouchers/Shree Niwas.pdf'
pdf_doc = fitz.open(pdf_src)
print(f"Opened PDF with {len(pdf_doc)} pages")

assets_dir = 'public/projects/shree-niwas/brochure/assets'
os.makedirs(assets_dir, exist_ok=True)

# 1. Copy official PDF
shutil.copyfile(pdf_src, 'public/brochures/shree-niwas-brochure.pdf')
shutil.copyfile(pdf_src, os.path.join(assets_dir, 'Shree-Niwas-Brochure.pdf'))
print("Copied PDF to public/brochures and brochure folder")

# 2. Render all 7 pages as high-quality WebP images
for i, page in enumerate(pdf_doc):
    pix = page.get_pixmap(dpi=200)
    page_img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    page_path = os.path.join(assets_dir, f'page-{i+1}.webp')
    page_img.save(page_path, 'WEBP', quality=90)
    print(f"Rendered Page {i+1}: {pix.width}x{pix.height} -> {page_path}")

# 3. Logo processing from uploaded file
logo_src = 'C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795494726422_5927bb63.png'
im_logo = Image.open(logo_src)
bbox = im_logo.getbbox()
if bbox:
    pad = 4
    crop_box = (max(0, bbox[0]-pad), max(0, bbox[1]-pad), min(im_logo.width, bbox[2]+pad), min(im_logo.height, bbox[3]+pad))
    trimmed_logo = im_logo.crop(crop_box)
else:
    trimmed_logo = im_logo

logo_dest1 = os.path.join(assets_dir, 'logo.png')
logo_dest2 = 'public/images/shreeyog/logos/shree-niwas-logo.png'
logo_dest3 = 'assets/logo-shree-niwas.png'
os.makedirs('public/images/shreeyog/logos', exist_ok=True)

trimmed_logo.save(logo_dest1, 'PNG')
trimmed_logo.save(logo_dest2, 'PNG')
trimmed_logo.save(logo_dest3, 'PNG')
print(f"Saved trimmed logo ({trimmed_logo.size}) to:\n  {logo_dest1}\n  {logo_dest2}\n  {logo_dest3}")

# 4. Extract Elevation from high-res page 2 (4600x2400)
p2_img = Image.open('references/niwas_pages/page_2.png')
w2, h2 = p2_img.size
# On page 2, the left image frame runs from x=100 to x=2290, y=240 to y=2150
elevation_crop = p2_img.crop((int(w2 * 0.02), int(h2 * 0.10), int(w2 * 0.50), int(h2 * 0.90)))
# Trim any outer white borders
bbox_el = elevation_crop.getbbox()
if bbox_el:
    elevation_crop = elevation_crop.crop(bbox_el)

elevation_crop.save(os.path.join(assets_dir, 'elevation.webp'), 'WEBP', quality=92)
elevation_crop.save(os.path.join(assets_dir, 'elevation-hero.jpg'), 'JPEG', quality=95)
elevation_crop.save(os.path.join(assets_dir, 'elevation-full.jpg'), 'JPEG', quality=95)

# Save to public slider and projects
os.makedirs('public/images/shreeyog/slider', exist_ok=True)
os.makedirs('public/images/shreeyog/projects', exist_ok=True)
elevation_crop.save('public/images/shreeyog/slider/shree-niwas.webp', 'WEBP', quality=90)
elevation_crop.save('public/images/shreeyog/projects/shree-niwas.webp', 'WEBP', quality=90)
elevation_crop.save('public/images/shreeyog/slider/shree-niwas.jpg', 'JPEG', quality=90)
elevation_crop.save('public/images/shreeyog/projects/shree-niwas.jpg', 'JPEG', quality=90)
print(f"Saved elevation ({elevation_crop.size}) to brochure assets, slider and projects")

# 5. Extract Floor Plans from high-res page 3 (4600x2400)
p3_img = Image.open('references/niwas_pages/page_3.png')
w3, h3 = p3_img.size

# Left side: Ground Floor Plan
ground_crop = p3_img.crop((int(w3 * 0.04), int(h3 * 0.08), int(w3 * 0.49), int(h3 * 0.94)))
ground_crop.save(os.path.join(assets_dir, 'plan-ground.webp'), 'WEBP', quality=92)
ground_crop.save(os.path.join(assets_dir, 'plan-ground.jpg'), 'JPEG', quality=92)

# Right side: Typical Floor Plan (1st to 4th)
typical_crop = p3_img.crop((int(w3 * 0.51), int(h3 * 0.08), int(w3 * 0.98), int(h3 * 0.94)))
typical_crop.save(os.path.join(assets_dir, 'plan-typical.webp'), 'WEBP', quality=92)
typical_crop.save(os.path.join(assets_dir, 'plan-typical.jpg'), 'JPEG', quality=92)

# Crop 3 BHK layout (Flat 1/4/7/10) from right side of typical plan
typical_3bhk = p3_img.crop((int(w3 * 0.74), int(h3 * 0.35), int(w3 * 0.96), int(h3 * 0.76)))
typical_3bhk.save(os.path.join(assets_dir, 'unit-3bhk.webp'), 'WEBP', quality=92)

# Crop 2 BHK layout (Flat 2/3/5/6/8/9/11/12) from left side of typical plan
typical_2bhk = p3_img.crop((int(w3 * 0.51), int(h3 * 0.24), int(w3 * 0.74), int(h3 * 0.76)))
typical_2bhk.save(os.path.join(assets_dir, 'unit-2bhk.webp'), 'WEBP', quality=92)

print("Saved floor plans and unit layouts successfully!")

# 6. Extract Location Map from high-res page 4 (4600x2400)
p4_img = Image.open('references/niwas_pages/page_4.png')
w4, h4 = p4_img.size
# Right side: Location Plan
loc_crop = p4_img.crop((int(w4 * 0.51), int(h4 * 0.08), int(w4 * 0.97), int(h4 * 0.94)))
loc_crop.save(os.path.join(assets_dir, 'location-map.webp'), 'WEBP', quality=92)
loc_crop.save(os.path.join(assets_dir, 'location-map.jpg'), 'JPEG', quality=92)
print("Saved location map successfully!")

print("All Shree Niwas assets prepared successfully!")
