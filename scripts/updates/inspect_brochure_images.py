import pymupdf
import os

os.makedirs('scripts/temp_pages', exist_ok=True)

# 1. Render Chintamani pages
doc_c = pymupdf.open('assets/Projects Brouchers/Shree Chintamani brochure.pdf')
print('Rendering Chintamani pages...')
for i, page in enumerate(doc_c):
    # render at moderate res for inspection
    pix = page.get_pixmap(dpi=150)
    out_path = f'scripts/temp_pages/chintamani_page_{i+1}.jpg'
    pix.save(out_path)
    print(f'Saved {out_path} ({pix.width}x{pix.height})')

# 2. Render Niketan pages
doc_n = pymupdf.open('assets/Projects Brouchers/Shree Niketan.pdf')
print('Rendering Niketan pages...')
for i, page in enumerate(doc_n):
    pix = page.get_pixmap(dpi=150)
    out_path = f'scripts/temp_pages/niketan_page_{i+1}.jpg'
    pix.save(out_path)
    print(f'Saved {out_path} ({pix.width}x{pix.height})')
