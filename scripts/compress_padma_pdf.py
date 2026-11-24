import pymupdf as fitz
from PIL import Image
import os
import io

src = "assets/Projects Brouchers/Shree Padma Brochure.pdf"
print(f"Original size: {os.path.getsize(src) / (1024*1024):.1f} MB")

doc = fitz.open(src)
out_doc = fitz.open()

for i, page in enumerate(doc):
    pix = page.get_pixmap(dpi=150)
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=85, optimize=True)
    buf.seek(0)
    
    # Create page in out_doc with exact page rect
    rect = page.rect
    new_page = out_doc.new_page(width=rect.width, height=rect.height)
    new_page.insert_image(rect, stream=buf.getvalue())
    print(f"Compressed page {i+1}")

dst1 = "public/brochures/shree-padma-brochure.pdf"
dst2 = "public/projects/shree-padma/brochure/assets/Shree-Padma-Brochure.pdf"

out_doc.save(dst1, deflate=True, garbage=4)
out_doc.save(dst2, deflate=True, garbage=4)

print(f"New size: {os.path.getsize(dst1) / (1024*1024):.1f} MB")
