import os
import shutil
import pymupdf as fitz
from PIL import Image
import numpy as np

os.makedirs("public/projects/shree-nakshatra/brochure/assets", exist_ok=True)
os.makedirs("public/brochures", exist_ok=True)
os.makedirs("public/images/shreeyog/logos", exist_ok=True)
os.makedirs("public/images/shreeyog/slider", exist_ok=True)
os.makedirs("public/images/shreeyog/projects", exist_ok=True)

# 1. Optimize and copy PDF
src_pdf = "assets/Projects Brouchers/Shree Nakshatra Brochure.pdf"
dst_pdf = "public/brochures/shree-nakshatra-brochure.pdf"
dst_brochure_pdf = "public/projects/shree-nakshatra/brochure/assets/Shree-Nakshatra-Brochure.pdf"

print("Optimizing PDF...")
doc = fitz.open(src_pdf)
new_doc = fitz.open()

for page_idx in range(len(doc)):
    page = doc[page_idx]
    pix = page.get_pixmap(dpi=150)
    img_data = pix.tobytes("jpeg")
    
    # Create page in new doc
    rect = fitz.Rect(0, 0, pix.width, pix.height)
    new_page = new_doc.new_page(width=pix.width, height=pix.height)
    new_page.insert_image(rect, stream=img_data)

new_doc.save(dst_pdf, garbage=4, deflate=True)
shutil.copy2(dst_pdf, dst_brochure_pdf)
orig_sz = os.path.getsize(src_pdf) / (1024*1024)
new_sz = os.path.getsize(dst_pdf) / (1024*1024)
print(f"PDF optimized from {orig_sz:.2f} MB to {new_sz:.2f} MB!")

# 2. Render spreads and split into 8 pages
print("Rendering spreads and splitting into 8 pages...")
spread_imgs = []
for i, page in enumerate(doc):
    pix = page.get_pixmap(dpi=180)
    mode = "RGBA" if pix.alpha else "RGB"
    img = Image.frombytes(mode, [pix.width, pix.height], pix.samples)
    spread_path = f"public/projects/shree-nakshatra/brochure/assets/spread-{i+1}.webp"
    img.save(spread_path, "WEBP", quality=90)
    spread_imgs.append(img)
    print(f"Saved spread {i+1} ({img.size}) -> {spread_path}")

# Spread 1: Left = Back Cover (Page 8), Right = Front Cover (Page 1)
w1, h1 = spread_imgs[0].size
half_w1 = w1 // 2
page_8 = spread_imgs[0].crop((0, 0, half_w1, h1))
page_1 = spread_imgs[0].crop((half_w1, 0, w1, h1))

# Spread 2: Left = Introduction (Page 2), Right = 3D Elevation / Vision (Page 3)
w2, h2 = spread_imgs[1].size
half_w2 = w2 // 2
page_2 = spread_imgs[1].crop((0, 0, half_w2, h2))
page_3 = spread_imgs[1].crop((half_w2, 0, w2, h2))

# Spread 3: Left = Ground Floor Plan (Page 4), Right = Typical Floor Plan (Page 5)
w3, h3 = spread_imgs[2].size
half_w3 = w3 // 2
page_4 = spread_imgs[2].crop((0, 0, half_w3, h3))
page_5 = spread_imgs[2].crop((half_w3, 0, w3, h3))

# Spread 4: Left = Location Plan & Map + Advisory (Page 6), Right = Amenities & Specifications (Page 7)
w4, h4 = spread_imgs[3].size
half_w4 = w4 // 2
page_6 = spread_imgs[3].crop((0, 0, half_w4, h4))
page_7 = spread_imgs[3].crop((half_w4, 0, w4, h4))

pages = [page_1, page_2, page_3, page_4, page_5, page_6, page_7, page_8]
for idx, p in enumerate(pages):
    p_path = f"public/projects/shree-nakshatra/brochure/assets/page-{idx+1}.webp"
    p.save(p_path, "WEBP", quality=90)
    print(f"Saved page {idx+1} ({p.size}) -> {p_path}")

# Save cropped plans and location map
page_4.save("public/projects/shree-nakshatra/brochure/assets/plan-ground.webp", "WEBP", quality=92)
page_5.save("public/projects/shree-nakshatra/brochure/assets/plan-typical.webp", "WEBP", quality=92)
page_6.save("public/projects/shree-nakshatra/brochure/assets/location-map.webp", "WEBP", quality=92)
print("Saved dedicated plans and location map.")

# 3. Process Shree Nakshatra Logo from user upload media_1795523439537_e2e256a7.png
logo_src = "C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795523439537_e2e256a7.png"
logo_raw = Image.open(logo_src).convert("RGBA")
print(f"Original user logo size: {logo_raw.size}")

# Autocrop transparent edges
bbox = logo_raw.getbbox()
if bbox:
    logo_clean = logo_raw.crop(bbox)
    padded = Image.new("RGBA", (logo_clean.width + 24, logo_clean.height + 24), (0, 0, 0, 0))
    padded.paste(logo_clean, (12, 12))
    logo_clean = padded
else:
    logo_clean = logo_raw

logo_clean.save("public/projects/shree-nakshatra/brochure/assets/logo.png")
logo_clean.save("public/images/shreeyog/logos/shree-nakshatra-logo.png")
print(f"Saved Shree Nakshatra logo: {logo_clean.size}")

# 4. Process Building Elevation from user upload media_1795523554490_cd62084a.jpg
bldg_src = "C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795523554490_cd62084a.jpg"
bldg_img = Image.open(bldg_src)
print(f"Original elevation size: {bldg_img.size}")

bldg_img.save("public/projects/shree-nakshatra/brochure/assets/elevation.webp", "WEBP", quality=92)
bldg_img.save("public/projects/shree-nakshatra/brochure/assets/elevation-hero.jpg", "JPEG", quality=92)
bldg_img.save("public/images/shreeyog/slider/shree-nakshatra.webp", "WEBP", quality=92)
bldg_img.save("public/images/shreeyog/slider/shree-nakshatra.jpg", "JPEG", quality=92)
bldg_img.save("public/images/shreeyog/projects/shree-nakshatra.webp", "WEBP", quality=92)
print("Saved building images for brochure, slider and project card.")
print("ALL NAKSHATRA ASSETS PREPARED SUCCESSFULLY!")
