import fitz # PyMuPDF
import os

pdf_path = 'assets/Projects Brouchers/Shree Nandan.pdf'
doc = fitz.open(pdf_path)
print(f'Page count: {len(doc)}')

for i, page in enumerate(doc):
    print(f'--- PAGE {i+1} (rect={page.rect}) ---')
    text = page.get_text()
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    print('\n'.join(lines[:20]))
    if len(lines) > 20:
        print(f'... [{len(lines)-20} more lines]')
