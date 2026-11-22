import fitz # PyMuPDF
import os

pdf_path = 'assets/Projects Brouchers/Shree Samruddhi Park.pdf'
doc = fitz.open(pdf_path)
print(f"Total pages in Samruddhi PDF: {len(doc)}")

img_count = 0
for page_num in range(len(doc)):
    page = doc[page_num]
    image_list = page.get_images(full=True)
    print(f"Page {page_num + 1} has {len(image_list)} images")
    for img_idx, img in enumerate(image_list):
        xref = img[0]
        base_img = doc.extract_image(xref)
        image_bytes = base_img["image"]
        image_ext = base_img["ext"]
        w = base_img["width"]
        h = base_img["height"]
        print(f"  Img {img_idx}: xref={xref}, size={w}x{h}, ext={image_ext}")
        if w > 500 and h > 500:
            with open(f"samruddhi_pdf_img_{page_num+1}_{img_idx}.{image_ext}", "wb") as f:
                f.write(image_bytes)
            print(f"    Saved samruddhi_pdf_img_{page_num+1}_{img_idx}.{image_ext}")
