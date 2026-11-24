import pymupdf

doc = pymupdf.open('assets/Projects Brouchers/Shree Nandan.pdf')
for i, page in enumerate(doc):
    print(f'================= PAGE {i+1} =================')
    print(page.get_text())
