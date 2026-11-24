import pymupdf as fitz
from PIL import Image
import os
import shutil
import numpy as np

os.makedirs("public/projects/shree-navashakti/brochure/assets", exist_ok=True)
os.makedirs("public/brochures", exist_ok=True)
os.makedirs("public/images/shreeyog/logos", exist_ok=True)
os.makedirs("public/images/shreeyog/slider", exist_ok=True)
os.makedirs("public/images/shreeyog/projects", exist_ok=True)

# 1. Copy PDF
src_pdf = "assets/Projects Brouchers/Shree Navashakti Brochure .pdf"
dst_pdf = "public/brochures/shree-navashakti-brochure.pdf"
dst_brochure_pdf = "public/projects/shree-navashakti/brochure/assets/Shree-Navashakti-Brochure.pdf"

print("Copying PDF...")
shutil.copy2(src_pdf, dst_pdf)
shutil.copy2(src_pdf, dst_brochure_pdf)
print(f"PDF copied to {dst_pdf} and {dst_brochure_pdf}")

# 2. Render Spreads and split into 8 pages
doc = fitz.open(src_pdf)
print(f"Total spreads in PDF: {len(doc)}")

spread_imgs = []
for i, page in enumerate(doc):
    pix = page.get_pixmap(dpi=180)
    mode = "RGBA" if pix.alpha else "RGB"
    img = Image.frombytes(mode, [pix.width, pix.height], pix.samples)
    spread_path = f"public/projects/shree-navashakti/brochure/assets/spread-{i+1}.webp"
    img.save(spread_path, "WEBP", quality=90)
    spread_imgs.append(img)
    print(f"Saved spread {i+1} ({img.size}) -> {spread_path}")

# Split spreads into 8 pages:
# Spread 1: Left = Back Cover (Page 8), Right = Front Cover (Page 1)
w1, h1 = spread_imgs[0].size
half_w1 = w1 // 2
page_8 = spread_imgs[0].crop((0, 0, half_w1, h1))
page_1 = spread_imgs[0].crop((half_w1, 0, w1, h1))

# Spread 2: Left = Page 2 (Vision & Trust), Right = Page 3 (3D Elevation / Vision)
w2, h2 = spread_imgs[1].size
half_w2 = w2 // 2
page_2 = spread_imgs[1].crop((0, 0, half_w2, h2))
page_3 = spread_imgs[1].crop((half_w2, 0, w2, h2))

# Spread 3: Left = Page 4 (Ground Floor Plan), Right = Page 5 (Typical Floor Plan)
w3, h3 = spread_imgs[2].size
half_w3 = w3 // 2
page_4 = spread_imgs[2].crop((0, 0, half_w3, h3))
page_5 = spread_imgs[2].crop((half_w3, 0, w3, h3))

# Spread 4: Left = Page 6 (Specifications & Amenities), Right = Page 7 (Location Plan & Map)
w4, h4 = spread_imgs[3].size
half_w4 = w4 // 2
page_6 = spread_imgs[3].crop((0, 0, half_w4, h4))
page_7 = spread_imgs[3].crop((half_w4, 0, w4, h4))

pages = [page_1, page_2, page_3, page_4, page_5, page_6, page_7, page_8]
for idx, p in enumerate(pages):
    p_path = f"public/projects/shree-navashakti/brochure/assets/page-{idx+1}.webp"
    p.save(p_path, "WEBP", quality=90)
    print(f"Saved page {idx+1} ({p.size}) -> {p_path}")

# Save cropped plans
page_4.save("public/projects/shree-navashakti/brochure/assets/plan-ground.webp", "WEBP", quality=92)
page_5.save("public/projects/shree-navashakti/brochure/assets/plan-typical.webp", "WEBP", quality=92)
page_7.save("public/projects/shree-navashakti/brochure/assets/location-map.webp", "WEBP", quality=92)
print("Saved dedicated plans and location map.")

# 3. Process Logo from user upload media_1795497923672_a72be659.jpg
logo_src = "C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795497923672_a72be659.jpg"
logo_raw = Image.open(logo_src).convert("RGBA")
print(f"Original logo size: {logo_raw.size}")

# The logo has a pure white background (255, 255, 255).
# Red Kalash/circle, Gold "Navshakti" script, Black "SHREE" and "2 & 3 BHK LUXURIOUS FLATS".
# Create a transparent version by removing pure white with smooth alpha ramp.
np_img = np.array(logo_raw, dtype=np.float32)
r, g, b = np_img[:, :, 0], np_img[:, :, 1], np_img[:, :, 2]

# Measure background from the 4 corners
bg_r = (np.mean(r[:20, :20]) + np.mean(r[:20, -20:]) + np.mean(r[-20:, :20]) + np.mean(r[-20:, -20:])) / 4.0
bg_g = (np.mean(g[:20, :20]) + np.mean(g[:20, -20:]) + np.mean(g[-20:, :20]) + np.mean(g[-20:, -20:])) / 4.0
bg_b = (np.mean(b[:20, :20]) + np.mean(b[:20, -20:]) + np.mean(b[-20:, :20]) + np.mean(b[-20:, -20:])) / 4.0
print(f"Detected background RGB: ({bg_r:.1f}, {bg_g:.1f}, {bg_b:.1f})")

dist_to_bg = np.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)

# Alpha ramp: dist > 35 -> alpha=1.0; dist < 8 -> alpha=0.0
alpha = np.clip((dist_to_bg - 8.0) / (32.0 - 8.0), 0.0, 1.0) * 255.0

# Decontaminate white background from anti-aliased edge pixels
alpha_norm = np.clip(alpha / 255.0, 0.001, 1.0)[:, :, np.newaxis]
bg_arr = np.array([bg_r, bg_g, bg_b], dtype=np.float32)
cleaned_rgb = (np_img[:, :, :3] - (1.0 - alpha_norm) * bg_arr) / alpha_norm
cleaned_rgb = np.clip(cleaned_rgb, 0.0, 255.0)

result_rgba = np.zeros_like(np_img)
result_rgba[:, :, :3] = cleaned_rgb
result_rgba[:, :, 3] = alpha

logo_clean = Image.fromarray(result_rgba.astype(np.uint8), mode="RGBA")

# Autocrop transparent borders
bbox = logo_clean.getbbox()
if bbox:
    logo_clean = logo_clean.crop(bbox)
    padded = Image.new("RGBA", (logo_clean.width + 36, logo_clean.height + 36), (0, 0, 0, 0))
    padded.paste(logo_clean, (18, 18))
    logo_clean = padded

print(f"Cleaned logo size: {logo_clean.size}")
logo_clean.save("public/projects/shree-navashakti/brochure/assets/logo.png")
logo_clean.save("public/images/shreeyog/logos/shree-navshakti-logo.png")
logo_clean.save("public/images/shreeyog/logos/shree-navashakti-logo.png")
logo_clean.save("assets/logo-shree-navshakti.png")
print("Saved transparent Shree Navashakti logo.")

# Also create a light-accentuated variant for dark cards if needed
# (The red kalash and rich gold script look gorgeous, black text can be brightened for ultra contrast on pitch black if needed)
logo_light = logo_clean.copy()
np_light = np.array(logo_light, dtype=np.float32)
# Pixels that are dark black text (r < 50, g < 50, b < 50) and opaque -> turn white
is_black_text = (np_light[:, :, 0] < 60) & (np_light[:, :, 1] < 60) & (np_light[:, :, 2] < 60) & (np_light[:, :, 3] > 60)
np_light[is_black_text, 0] = 255
np_light[is_black_text, 1] = 255
np_light[is_black_text, 2] = 255
logo_light_img = Image.fromarray(np_light.astype(np.uint8), mode="RGBA")
logo_light_img.save("public/projects/shree-navashakti/brochure/assets/logo-light.png")
logo_light_img.save("public/images/shreeyog/logos/shree-navshakti-logo-light.png")
logo_light_img.save("public/images/shreeyog/logos/shree-navashakti-logo-light.png")

# 4. Process Building Elevation from user upload media_1795497954974_56492ba7.jpg
bldg_src = "C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795497954974_56492ba7.jpg"
bldg_img = Image.open(bldg_src)
print(f"Original elevation size: {bldg_img.size}")

bldg_img.save("public/projects/shree-navashakti/brochure/assets/elevation.webp", "WEBP", quality=92)
bldg_img.save("public/projects/shree-navashakti/brochure/assets/elevation-hero.jpg", "JPEG", quality=92)
bldg_img.save("public/images/shreeyog/slider/shree-navshakti.webp", "WEBP", quality=92)
bldg_img.save("public/images/shreeyog/slider/shree-navshakti.jpg", "JPEG", quality=92)
bldg_img.save("public/images/shreeyog/slider/shree-navashakti.webp", "WEBP", quality=92)
bldg_img.save("public/images/shreeyog/slider/shree-navashakti.jpg", "JPEG", quality=92)
bldg_img.save("public/images/shreeyog/projects/shree-navshakti.webp", "WEBP", quality=92)
bldg_img.save("public/images/shreeyog/projects/shree-navashakti.webp", "WEBP", quality=92)
print("Saved elevation images for brochure, slider and project card.")
print("ALL NAVASHAKTI ASSETS PREPARED SUCCESSFULLY!")
