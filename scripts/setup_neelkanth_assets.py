import shutil
import os
from PIL import Image

src_pdf = r"assets/Projects Brouchers/Shree NeelKanth.pdf"
dest_pdf1 = r"public/brochures/shree-neelkanth-brochure.pdf"
dest_pdf2 = r"public/projects/shree-neelkanth/brochure/shree-neelkanth-brochure.pdf"
dest_pdf3 = r"public/projects/shree-neelkanth/brochure/brochure.pdf"

os.makedirs(os.path.dirname(dest_pdf1), exist_ok=True)
os.makedirs(os.path.dirname(dest_pdf2), exist_ok=True)

shutil.copy2(src_pdf, dest_pdf1)
shutil.copy2(src_pdf, dest_pdf2)
shutil.copy2(src_pdf, dest_pdf3)
print(f"Copied PDF to:\n  {dest_pdf1} ({os.path.getsize(dest_pdf1)} bytes)\n  {dest_pdf2}\n  {dest_pdf3}")

uploaded_logo = r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795407888281_bde9edd1.png"
dest_logo1 = r"public/images/shreeyog/logos/shree-neelkanth-logo.png"
dest_logo2 = r"public/images/shreeyog/logos/shree-neelkanth-logo-transparent.png"

img = Image.open(uploaded_logo)
# Save as optimized PNG with transparency intact
img.save(dest_logo1, format="PNG", optimize=True)
img.save(dest_logo2, format="PNG", optimize=True)
print(f"Saved logo to:\n  {dest_logo1} ({os.path.getsize(dest_logo1)} bytes)\n  {dest_logo2}")
