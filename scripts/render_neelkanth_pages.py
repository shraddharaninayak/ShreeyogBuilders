import fitz
import os

pdf_path = r"assets/Projects Brouchers/Shree NeelKanth.pdf"
doc = fitz.open(pdf_path)

out_dir = r"public/projects/shree-neelkanth/brochure/assets"
os.makedirs(out_dir, exist_ok=True)

for i in range(len(doc)):
    page = doc[i]
    text = page.get_text()
    print(f"--- Page {i+1} Text ({len(text)} chars) ---")
    print(text[:200].replace('\n', ' '))
    # Render at 2x scale for high resolution display in brochure
    pix = page.get_pixmap(dpi=150)
    out_img = os.path.join(out_dir, f"page-{i+1}.webp")
    pix.pil_save(out_img, format="WEBP", quality=90)
    print(f"Saved: {out_img} ({os.path.getsize(out_img)} bytes)")
