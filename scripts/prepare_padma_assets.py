import pymupdf as fitz
from PIL import Image
import os
import shutil
import numpy as np

os.makedirs("public/projects/shree-padma/brochure/assets", exist_ok=True)
os.makedirs("public/brochures", exist_ok=True)
os.makedirs("public/images/shreeyog/logos", exist_ok=True)
os.makedirs("public/images/shreeyog/slider", exist_ok=True)
os.makedirs("public/images/shreeyog/projects", exist_ok=True)

# 1. Copy PDF
src_pdf = "assets/Projects Brouchers/Shree Padma Brochure.pdf"
dst_pdf = "public/brochures/shree-padma-brochure.pdf"
dst_brochure_pdf = "public/projects/shree-padma/brochure/assets/Shree-Padma-Brochure.pdf"

print("Copying PDF...")
shutil.copy2(src_pdf, dst_pdf)
shutil.copy2(src_pdf, dst_brochure_pdf)
print(f"PDF copied to {dst_pdf} and {dst_brochure_pdf}")

# 2. Render all 8 pages at 180 DPI
doc = fitz.open(src_pdf)
print(f"Rendering {len(doc)} pages...")
for i, page in enumerate(doc):
    pix = page.get_pixmap(dpi=180)
    mode = "RGBA" if pix.alpha else "RGB"
    img = Image.frombytes(mode, [pix.width, pix.height], pix.samples)
    img_path = f"public/projects/shree-padma/brochure/assets/page-{i+1}.webp"
    img.save(img_path, "WEBP", quality=88)
    print(f"Saved page {i+1} -> {img_path}")

# Crop specific plans
p4 = Image.open("public/projects/shree-padma/brochure/assets/page-4.webp")
p4.save("public/projects/shree-padma/brochure/assets/plan-ground.webp", "WEBP", quality=90)

p5 = Image.open("public/projects/shree-padma/brochure/assets/page-5.webp")
p5.save("public/projects/shree-padma/brochure/assets/plan-typical.webp", "WEBP", quality=90)

p6 = Image.open("public/projects/shree-padma/brochure/assets/page-6.webp")
p6.save("public/projects/shree-padma/brochure/assets/location-specs.webp", "WEBP", quality=90)

# 3. Process Logo from user upload media_1795495625679_51080ef4.jpg
logo_src = "C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795495625679_51080ef4.jpg"
logo_img = Image.open(logo_src).convert("RGBA")
print(f"Original logo size: {logo_img.size}")

np_img = np.array(logo_img, dtype=np.float32)
r, g, b = np_img[:, :, 0], np_img[:, :, 1], np_img[:, :, 2]

# Sample background from the 4 corners
bg_r = (np.mean(r[:25, :25]) + np.mean(r[:25, -25:]) + np.mean(r[-25:, :25]) + np.mean(r[-25:, -25:])) / 4.0
bg_g = (np.mean(g[:25, :25]) + np.mean(g[:25, -25:]) + np.mean(g[-25:, :25]) + np.mean(g[-25:, -25:])) / 4.0
bg_b = (np.mean(b[:25, :25]) + np.mean(b[:25, -25:]) + np.mean(b[-25:, :25]) + np.mean(b[-25:, -25:])) / 4.0
print(f"Detected background average RGB: ({bg_r:.1f}, {bg_g:.1f}, {bg_b:.1f})")

dist_to_bg = np.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)

# Build smooth alpha ramp
alpha = np.clip((dist_to_bg - 12.0) / (32.0 - 12.0), 0.0, 1.0) * 255.0

# Decontaminate background color from anti-aliased edge pixels
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
    padded = Image.new("RGBA", (logo_clean.width + 32, logo_clean.height + 32), (0, 0, 0, 0))
    padded.paste(logo_clean, (16, 16))
    logo_clean = padded

print(f"Processed logo size: {logo_clean.size}")
logo_clean.save("public/projects/shree-padma/brochure/assets/logo.png")
logo_clean.save("public/images/shreeyog/logos/shree-padma-logo.png")
logo_clean.save("assets/logo-shree-padma.png")
print("Saved transparent Shree Padma logo.")

# Also create a variant for dark backgrounds where dark blue text is brightened/contrasted if needed,
# or keep the crisp royal blue & magenta lotus which looks stunning with subtle drop-shadow or glow.
# Let's save a light-accentuated variant as well:
# Convert the dark blue text to vibrant gold/white or keep it rich. Let's see: on dark cards,
# creating a version where "Shree Padma" has white/gold fill makes it pop exceptionally well on black cards.
# Let's create `shree-padma-logo-light.png` for dark backgrounds:
logo_light = logo_clean.copy()
np_light = np.array(logo_light, dtype=np.float32)
# Pixels that are blue (r < 60, b > 90) -> change to crisp white/platinum or soft gold
is_blue_text = (np_light[:, :, 2] > 70) & (np_light[:, :, 0] < 80) & (np_light[:, :, 3] > 50)
np_light[is_blue_text, 0] = 255  # white/bright
np_light[is_blue_text, 1] = 255
np_light[is_blue_text, 2] = 255
logo_light_img = Image.fromarray(np_light.astype(np.uint8), mode="RGBA")
logo_light_img.save("public/images/shreeyog/logos/shree-padma-logo-light.png")
logo_light_img.save("public/projects/shree-padma/brochure/assets/logo-light.png")

# 4. Process Building Elevation from user upload media_1795495635886_a6f9785a.jpg
bldg_src = "C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795495635886_a6f9785a.jpg"
bldg_img = Image.open(bldg_src)
print(f"Original elevation size: {bldg_img.size}")

bldg_img.save("public/projects/shree-padma/brochure/assets/elevation.webp", "WEBP", quality=90)
bldg_img.save("public/projects/shree-padma/brochure/assets/elevation-hero.jpg", "JPEG", quality=92)
bldg_img.save("public/images/shreeyog/slider/shree-padma.webp", "WEBP", quality=90)
bldg_img.save("public/images/shreeyog/projects/shree-padma.webp", "WEBP", quality=90)
bldg_img.save("public/images/shreeyog/slider/shree-padma.jpg", "JPEG", quality=92)
print("Saved elevation images for brochure, slider and project card.")
print("ALL ASSETS PREPARED SUCCESSFULLY!")
