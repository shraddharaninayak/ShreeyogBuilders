import fitz
import os

pdf_path = r'assets/Projects Brouchers/Shree Vithal Park - brochure.pdf'
doc = fitz.open(pdf_path)

# Let's inspect the drawings and text in detail
for i, page in enumerate(doc):
    print(f'=== Page {i+1} ===')
    # check text blocks
    blocks = page.get_text('blocks')
    print(f'Text blocks count: {len(blocks)}')
    for b in blocks:
        text = b[4].strip()
        if text:
            print(f'  [{b[0]:.1f}, {b[1]:.1f}, {b[2]:.1f}, {b[3]:.1f}]: {text}')

