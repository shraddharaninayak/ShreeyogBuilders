import fitz
import os

pdf_path = r'assets/Projects Brouchers/Shree Shakuntal Brochure.pdf'
doc = fitz.open(pdf_path)

print(f'Page count: {len(doc)}')

for i, page in enumerate(doc):
    print(f'=== PAGE {i+1} ===')
    print(f'Rect: {page.rect}')
    text = page.get_text()
    print(f'Text length: {len(text)}')
    if len(text) > 0:
        print(text[:1000])
    imgs = page.get_images()
    print(f'Images count: {len(imgs)}')
