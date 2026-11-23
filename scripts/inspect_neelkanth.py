import fitz
import os
from PIL import Image

pdf_path = r"assets/Projects Brouchers/Shree NeelKanth.pdf"
doc = fitz.open(pdf_path)
print(f"PDF Page count: {len(doc)}")
for i in range(len(doc)):
    page = doc[i]
    rect = page.rect
    print(f"Page {i+1}: width={rect.width}, height={rect.height}, rotation={page.rotation}")

uploaded_logo = r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795407888281_bde9edd1.png"
if os.path.exists(uploaded_logo):
    img = Image.open(uploaded_logo)
    print(f"Uploaded logo: size={img.size}, mode={img.mode}, format={img.format}")
else:
    print("Uploaded logo not found at path")
