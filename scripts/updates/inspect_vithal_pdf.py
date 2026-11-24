import fitz
import os

pdf_path = r'assets/Projects Brouchers/Shree Vithal Park - brochure.pdf'
doc = fitz.open(pdf_path)

print(f'Page count: {len(doc)}')

for i, page in enumerate(doc):
    print(f'=== PAGE {i+1} ===')
    print(f'Rect: {page.rect}')
    text = page.get_text()
    print('Text preview:')
    print(text[:1200])
    print('---------------------------')
