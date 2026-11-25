import pymupdf
import os

os.makedirs('scripts/temp_pages', exist_ok=True)

# Render Shree Vinayak pages
doc_v = pymupdf.open('assets/Projects Brouchers/Shree vinayak - brochure.pdf')
print('Rendering Shree Vinayak pages...')
for i, page in enumerate(doc_v):
    pix = page.get_pixmap(dpi=150)
    out_path = f'scripts/temp_pages/vinayak_page_{i+1}.jpg'
    pix.save(out_path)
    print(f'Saved {out_path} ({pix.width}x{pix.height})')

# Render Shree Nisarg pages
doc_ni = pymupdf.open('assets/Projects Brouchers/Shree Nisarg.pdf')
print('Rendering Shree Nisarg pages...')
for i, page in enumerate(doc_ni):
    pix = page.get_pixmap(dpi=150)
    out_path = f'scripts/temp_pages/nisarg_page_{i+1}.jpg'
    pix.save(out_path)
    print(f'Saved {out_path} ({pix.width}x{pix.height})')

# Render Samarth pages for gallery & plans
doc_s = pymupdf.open('assets/Projects Brouchers/Samarth Brochure.pdf')
print('Rendering Samarth pages...')
for i, page in enumerate(doc_s):
    pix = page.get_pixmap(dpi=150)
    out_path = f'scripts/temp_pages/samarth_page_{i+1}.jpg'
    pix.save(out_path)
    print(f'Saved {out_path} ({pix.width}x{pix.height})')
