# scripts/updates/process_vrundavan_assets.py
import os
import shutil
import fitz # PyMuPDF
from PIL import Image
import numpy as np

os.makedirs('public/projects/shree-vrundavan/brochure/assets', exist_ok=True)
os.makedirs('public/brochures', exist_ok=True)
os.makedirs('public/images/shreeyog/slider', exist_ok=True)
os.makedirs('public/images/shreeyog/buildings', exist_ok=True)
os.makedirs('public/images/shreeyog/logos', exist_ok=True)

# 1. Process Building Elevation Image
uploaded_bldg = r'C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795533309719_10a27338.jpg'
im_bldg = Image.open(uploaded_bldg)
im_bldg.save('public/projects/shree-vrundavan/brochure/assets/elevation.webp', 'WEBP', quality=92)
im_bldg.save('public/images/shreeyog/slider/shree-vrundavan.webp', 'WEBP', quality=92)
im_bldg.save('public/images/shreeyog/buildings/shree-vrundavan.webp', 'WEBP', quality=92)
print("Saved building elevation images.")

# 2. Process Logo
uploaded_logo = r'C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795533248798_a31e2f89.jpg'
im_logo = Image.open(uploaded_logo)
arr_logo = np.array(im_logo).astype(float)
brightness = np.max(arr_logo, axis=2)
alpha = np.clip((brightness - 12) / (45 - 12) * 255, 0, 255).astype(np.uint8)
alpha_norm = np.maximum(alpha.astype(float) / 255.0, 1e-4)
rgb_restored = np.clip(arr_logo / alpha_norm[:, :, None], 0, 255).astype(np.uint8)
out = np.dstack((rgb_restored, alpha))
out_img = Image.fromarray(out, 'RGBA')
bbox = out_img.getbbox()
cropped_logo = out_img.crop(bbox)
cropped_logo.save('public/images/shreeyog/logos/shree-vrundavan-logo-transparent.png')
cropped_logo.save('public/projects/shree-vrundavan/brochure/assets/logo.png')
print("Saved transparent logo images.")

# 3. Process PDF: Render pages, extract plans & map, create optimized PDF
pdf_path = r'assets/Projects Brouchers/Shree VRUNDAVAN Brochure.pdf'
doc = fitz.open(pdf_path)

# Render pages at 150 DPI (approx 2000px wide for crisp viewing without massive weight)
for i in range(len(doc)):
    page = doc[i]
    pix = page.get_pixmap(dpi=150)
    img_page = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    img_page.save(f'public/projects/shree-vrundavan/brochure/assets/page-{i+1}.webp', 'WEBP', quality=88)
    print(f"Saved page-{i+1}.webp ({pix.width}x{pix.height})")

# Page 3 contains Typical Floor Plan
page3 = doc[2]
pix3 = page3.get_pixmap(dpi=180)
img3 = Image.frombytes("RGB", [pix3.width, pix3.height], pix3.samples)
# Typical Floor Plan is the main content of Page 3
img3.save('public/projects/shree-vrundavan/brochure/assets/plan-typical.webp', 'WEBP', quality=90)
print("Saved plan-typical.webp")

# Page 4 contains Parking Floor Plan (Right side) and Location Map (Left middle)
page4 = doc[3]
pix4 = page4.get_pixmap(dpi=180)
img4 = Image.frombytes("RGB", [pix4.width, pix4.height], pix4.samples)

# In Page 4: Width = pix4.width, Height = pix4.height
# Let's crop Parking plan (right ~50% of the page)
# and Location Map (roughly x: 45%..75% or 30%..60%)
# Let's check coordinates by rendering full page 4
w4, h4 = img4.size
# Let's crop Parking Floor Plan (x: ~50% to 100%)
plan_parking = img4.crop((int(w4 * 0.48), int(h4 * 0.05), w4, h4))
plan_parking.save('public/projects/shree-vrundavan/brochure/assets/plan-parking.webp', 'WEBP', quality=90)
print("Saved plan-parking.webp")

# Location map is on the left-to-middle of page 4
location_map = img4.crop((int(w4 * 0.22), int(h4 * 0.1), int(w4 * 0.52), int(h4 * 0.95)))
location_map.save('public/projects/shree-vrundavan/brochure/assets/location-map.webp', 'WEBP', quality=90)
print("Saved location-map.webp")

# 4. Generate an optimized PDF for web downloads (~5-8 MB)
opt_doc = fitz.open()
for i in range(len(doc)):
    page = doc[i]
    pix = page.get_pixmap(dpi=150)
    img_bytes = pix.pil_tobytes("jpeg", quality=85)
    img_doc = fitz.open("pdf", fitz.open("jpeg", img_bytes).convert_to_pdf())
    opt_doc.insert_pdf(img_doc)

opt_pdf_path1 = 'public/brochures/shree-vrundavan-brochure.pdf'
opt_pdf_path2 = 'public/projects/shree-vrundavan/brochure/assets/Shree-Vrundavan-Brochure.pdf'
opt_doc.save(opt_pdf_path1, deflate=True)
shutil.copyfile(opt_pdf_path1, opt_pdf_path2)
size_mb = os.path.getsize(opt_pdf_path1) / (1024 * 1024)
print(f"Generated optimized PDF: {size_mb:.2f} MB")
