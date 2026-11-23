import fitz

doc = fitz.open("assets/Projects Brouchers/Shree NeelKanth.pdf")
for i, page in enumerate(doc):
    print(f"=== PAGE {i+1} ===")
    print(page.get_text())
