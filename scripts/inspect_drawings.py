import fitz

doc = fitz.open('assets/Projects Brouchers/Shree Niwas.pdf')
for i, page in enumerate(doc):
    blocks = page.get_text("blocks")
    words = page.get_text("words")
    drawings = len(page.get_drawings())
    print(f"Page {i+1}: {len(blocks)} blocks, {len(words)} words, {drawings} drawings")
    if words:
        print("  Sample words:", " ".join([w[4] for w in words[:20]]))
