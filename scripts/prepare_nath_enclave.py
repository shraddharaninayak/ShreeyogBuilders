import os
import shutil
import pymupdf
from PIL import Image

BASE_DIR = r"D:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb"
NATH_DIR = os.path.join(BASE_DIR, "public", "projects", "shree-nath-enclave", "brochure")
NATH_IMG = os.path.join(NATH_DIR, "assets", "images")
os.makedirs(NATH_IMG, exist_ok=True)

PDF_SRC = os.path.join(BASE_DIR, "assets", "Projects Brouchers", "Shree Nath Enclave.pdf")

# 1. Ensure PDFs are in place
shutil.copy2(PDF_SRC, os.path.join(NATH_DIR, "Shree-Nath-Enclave-Brochure.pdf"))
shutil.copy2(PDF_SRC, os.path.join(NATH_DIR, "brochure.pdf"))
shutil.copy2(PDF_SRC, os.path.join(BASE_DIR, "public", "brochures", "shree-nath-enclave-brochure.pdf"))
print("Copied PDFs successfully.")

# 2. Copy Logo
LOGO_SRC = os.path.join(BASE_DIR, "public", "images", "shreeyog", "logos", "shree-nath-enclave-logo.png")
shutil.copy2(LOGO_SRC, os.path.join(NATH_DIR, "assets", "logo.png"))
print("Copied logo to assets/logo.png.")

# 3. Render all 7 pages at high DPI
doc = pymupdf.open(PDF_SRC)
print(f"Rendering {len(doc)} pages of Shree Nath Enclave...")
for i, p in enumerate(doc):
    pix = p.get_pixmap(dpi=150)
    out_page = os.path.join(NATH_IMG, f"page_{i+1:02d}.jpg")
    pix.save(out_page)
    print(f"  Rendered page_{i+1:02d}.jpg: {pix.width}x{pix.height}px")

# 4. Generate cropped architectural & plan assets
# Page 1: Building elevation perspective is prominently featured on the page
with Image.open(os.path.join(NATH_IMG, "page_01.jpg")) as im:
    w, h = im.size
    # elevation hero crop (focusing on the architectural render)
    im.crop((int(w * 0.40), int(h * 0.08), int(w * 0.98), int(h * 0.92))).save(os.path.join(NATH_IMG, "elevation-hero.jpg"), quality=94)
    im.save(os.path.join(NATH_IMG, "elevation-full.jpg"), quality=94)
print("Saved elevation-hero.jpg and elevation-full.jpg.")

# Page 4: Basement & Ground Floor Plans
with Image.open(os.path.join(NATH_IMG, "page_04.jpg")) as im:
    w, h = im.size
    im.crop((int(w * 0.02), int(h * 0.05), int(w * 0.98), int(h * 0.95))).save(os.path.join(NATH_IMG, "plan-basement-ground.jpg"), quality=94)
print("Saved plan-basement-ground.jpg.")

# Page 5: First & Second Floor Plans
with Image.open(os.path.join(NATH_IMG, "page_05.jpg")) as im:
    w, h = im.size
    im.crop((int(w * 0.02), int(h * 0.05), int(w * 0.98), int(h * 0.95))).save(os.path.join(NATH_IMG, "plan-first-second.jpg"), quality=94)
print("Saved plan-first-second.jpg.")

# Page 6: Third & Fourth Floor Plans
with Image.open(os.path.join(NATH_IMG, "page_06.jpg")) as im:
    w, h = im.size
    im.crop((int(w * 0.02), int(h * 0.05), int(w * 0.98), int(h * 0.95))).save(os.path.join(NATH_IMG, "plan-third-fourth.jpg"), quality=94)
print("Saved plan-third-fourth.jpg.")

# Page 7: Location Map & Specifications
with Image.open(os.path.join(NATH_IMG, "page_07.jpg")) as im:
    w, h = im.size
    # Location map is on the left half
    im.crop((int(w * 0.02), int(h * 0.05), int(w * 0.62), int(h * 0.95))).save(os.path.join(NATH_IMG, "location-map.jpg"), quality=94)
    im.save(os.path.join(NATH_IMG, "specs-full.jpg"), quality=94)
print("Saved location-map.jpg and specs-full.jpg.")

print("All assets prepared successfully!")
