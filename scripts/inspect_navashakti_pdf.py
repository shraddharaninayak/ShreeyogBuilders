import pymupdf as fitz
import os

pdf_path = "assets/Projects Brouchers/Shree Navashakti Brochure .pdf"
doc = fitz.open(pdf_path)
print(f"Total pages: {len(doc)}")

for i, page in enumerate(doc):
    text = page.get_text()
    rect = page.rect
    imgs = page.get_images()
    print(f"\n--- PAGE {i+1} (Size: {rect.width}x{rect.height}, Images: {len(imgs)}) ---")
    lines = [line.strip() for line in text.split("\n") if line.strip()]
    if lines:
        print("Text snippet:", " // ".join(lines[:30]))
    else:
        print("[No extractable text - raster/scanned or vector text]")
