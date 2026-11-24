import fitz

doc = fitz.open('assets/Projects Brouchers/Shree Padma Brochure.pdf')
print(f"Total Pages: {len(doc)}")

for i, page in enumerate(doc):
    text = page.get_text()
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    print(f"\n--- PAGE {i+1} ---")
    print(f"Lines count: {len(lines)}")
    for line in lines[:25]:
        print("  ", line)
    imgs = page.get_images()
    print(f"Images count: {len(imgs)}")
    for img in imgs[:5]:
        xref = img[0]
        base = doc.extract_image(xref)
        print(f"  img xref={xref}: {base['width']}x{base['height']} ext={base['ext']}")
