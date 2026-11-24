import pymupdf as fitz

pdf_path = "assets/Projects Brouchers/Shree Navashakti Brochure .pdf"
doc = fitz.open(pdf_path)

for i, page in enumerate(doc):
    print(f"================ SPREAD {i+1} ================")
    print(page.get_text())
