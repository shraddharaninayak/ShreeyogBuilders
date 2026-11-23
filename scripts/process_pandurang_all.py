import os
import shutil
import fitz # PyMuPDF
from PIL import Image

# 1. Paths
pdf_src = 'assets/Projects Brouchers/Shree Pandurag.pdf'
pdf_dst = 'public/brochures/shree-pandurang-brochure.pdf'
logo_src = r'C:\Users\nshra\.gemini\antigravity\brain\9519c930-8a4e-4d87-8f8c-fefffd44673c\.user_uploaded\media_1795409245792_6d69d9fc.png'

assets_dir = 'public/projects/shree-pandurang/brochure/assets'
os.makedirs(assets_dir, exist_ok=True)
os.makedirs('public/brochures', exist_ok=True)
os.makedirs('public/images/shreeyog/logos', exist_ok=True)
os.makedirs('public/images/shreeyog/slider', exist_ok=True)
os.makedirs('public/images/shreeyog/buildings', exist_ok=True)

# 2. Copy official PDF
shutil.copyfile(pdf_src, pdf_dst)
print(f'Copied PDF to {pdf_dst} ({os.path.getsize(pdf_dst)} bytes)')

# 3. Save Logo
logo_img = Image.open(logo_src)
logo_img.save('public/images/shreeyog/logos/shree-pandurang-logo.png')
logo_img.save('public/images/shreeyog/logos/shree-pandurang-logo-transparent.png')
logo_img.save(os.path.join(assets_dir, 'logo.png'))
print('Saved transparent logo to logos/ and brochure assets.')

# 4. Save building main elevation (day & night)
img_night = Image.open('references/extracted_pdf_images/img_xref_38.jpeg')
img_day = Image.open('references/extracted_pdf_images/img_xref_1515.jpeg')

img_night.save('public/images/shreeyog/slider/shree-pandurang.webp', 'WEBP', quality=95)
img_night.save('public/images/shreeyog/slider/shree-pandurang.jpg', 'JPEG', quality=95)
img_night.save('public/images/shreeyog/buildings/shree-pandurang.webp', 'WEBP', quality=95)
img_night.save('public/images/shreeyog/buildings/shree-pandurang-night.webp', 'WEBP', quality=95)
img_day.save('public/images/shreeyog/buildings/shree-pandurang-day.webp', 'WEBP', quality=95)
img_night.save(os.path.join(assets_dir, 'elevation-night.webp'), 'WEBP', quality=95)
img_day.save(os.path.join(assets_dir, 'elevation-day.webp'), 'WEBP', quality=95)
print('Saved building elevation images.')

# 5. Render and save all 9 PDF brochure pages in high resolution
doc = fitz.open(pdf_src)
for i, page in enumerate(doc):
    pix = page.get_pixmap(dpi=150)
    page_img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    page_out = os.path.join(assets_dir, f'page-{i+1}.webp')
    page_img.save(page_out, 'WEBP', quality=90)
    print(f'Saved Page {i+1} -> {page_out} ({pix.width}x{pix.height})')

# 6. Extract floor plans and special sections
# Page 4 contains Ground Floor Plan (left) and Typical Floor Plan (right)
# Page 4 dimensions: 3525 x 1875
page4_img = Image.open(os.path.join(assets_dir, 'page-4.webp'))
w4, h4 = page4_img.size
ground_plan = page4_img.crop((int(w4 * 0.15), int(h4 * 0.20), int(w4 * 0.58), int(h4 * 0.95)))
typical_plan = page4_img.crop((int(w4 * 0.58), int(h4 * 0.20), int(w4 * 0.98), int(h4 * 0.95)))
ground_plan.save(os.path.join(assets_dir, 'plan-ground.webp'), 'WEBP', quality=95)
typical_plan.save(os.path.join(assets_dir, 'plan-typical.webp'), 'WEBP', quality=95)

# Page 6 contains 3 BHK and 2 BHK unit plans
# Let's save full page 6 as unit plans
print('Asset processing complete!')
