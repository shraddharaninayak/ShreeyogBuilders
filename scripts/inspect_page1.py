import pymupdf
from PIL import Image

pdf_path = 'assets/Projects Brouchers/Shree Nandan.pdf'
doc = pymupdf.open(pdf_path)
page1 = doc[0]
print('Page 1 text:', page1.get_text())
print('Page 1 drawings count:', len(page1.get_drawings()))
