import os, shutil, json, fitz
from PIL import Image
from rapidocr_onnxruntime import RapidOCR

BASE_DIR = r"D:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb"
USER_UPLOADS = r"C:\Users\nshra\.gemini\antigravity\brain\800a5d15-806c-4771-a416-43290e357368\.user_uploaded"

SAMRUDDHI_DIR = os.path.join(BASE_DIR, "public", "projects", "shree-samruddhi-park", "brochure")
SAMRUDDHI_IMG = os.path.join(SAMRUDDHI_DIR, "assets", "images")
os.makedirs(SAMRUDDHI_IMG, exist_ok=True)

VENKATESH_DIR = os.path.join(BASE_DIR, "public", "projects", "shree-venkatesh-park", "brochure")
VENKATESH_IMG = os.path.join(VENKATESH_DIR, "assets", "images")
os.makedirs(VENKATESH_IMG, exist_ok=True)

LOGOS_DIR = os.path.join(BASE_DIR, "public", "images", "shreeyog", "logos")
os.makedirs(LOGOS_DIR, exist_ok=True)

# 1. Copy PDFs
pdf_samruddhi_src = os.path.join(BASE_DIR, "assets", "Projects Brouchers", "Shree Samruddhi Park.pdf")
shutil.copy2(pdf_samruddhi_src, os.path.join(SAMRUDDHI_DIR, "Shree-Samruddhi-Park.pdf"))
shutil.copy2(pdf_samruddhi_src, os.path.join(SAMRUDDHI_DIR, "brochure.pdf"))

pdf_venkatesh_src = os.path.join(BASE_DIR, "assets", "Projects Brouchers", "Shree Venkatesh Park.pdf")
shutil.copy2(pdf_venkatesh_src, os.path.join(VENKATESH_DIR, "Shree-Venkatesh-Park.pdf"))
shutil.copy2(pdf_venkatesh_src, os.path.join(VENKATESH_DIR, "brochure.pdf"))
print("Copied PDFs successfully.")

# 2. Copy Logos
logo_samruddhi = os.path.join(USER_UPLOADS, "media_1795340777350_780027ae.png")
if os.path.exists(logo_samruddhi):
    shutil.copy2(logo_samruddhi, os.path.join(SAMRUDDHI_DIR, "assets", "logo.png"))
    shutil.copy2(logo_samruddhi, os.path.join(LOGOS_DIR, "shree-samruddhi-park-logo.png"))

logo_venkatesh = os.path.join(USER_UPLOADS, "media_1795340794263_425fe4db.png")
if os.path.exists(logo_venkatesh):
    shutil.copy2(logo_venkatesh, os.path.join(VENKATESH_DIR, "assets", "logo.png"))
    shutil.copy2(logo_venkatesh, os.path.join(LOGOS_DIR, "shree-venkatesh-park-logo.png"))
print("Copied Logos successfully.")

# 3. Render Pages for Samruddhi Park
doc_s = fitz.open(pdf_samruddhi_src)
print(f"Rendering {len(doc_s)} pages for Shree Samruddhi Park...")
for i, p in enumerate(doc_s):
    pix = p.get_pixmap(dpi=150)
    pix.save(os.path.join(SAMRUDDHI_IMG, f"page_{i+1:02d}.jpg"))

# 4. Render Pages for Venkatesh Park
doc_v = fitz.open(pdf_venkatesh_src)
print(f"Rendering {len(doc_v)} pages for Shree Venkatesh Park...")
for i, p in enumerate(doc_v):
    pix = p.get_pixmap(dpi=150)
    pix.save(os.path.join(VENKATESH_IMG, f"page_{i+1:02d}.jpg"))

# 5. Extract text from Venkatesh Park
venkatesh_data = {}
for i, p in enumerate(doc_v):
    venkatesh_data[f"page_{i+1:02d}"] = p.get_text()
with open(os.path.join(BASE_DIR, "scripts", "venkatesh_extracted_text.json"), "w", encoding="utf-8") as f:
    json.dump(venkatesh_data, f, indent=2, ensure_ascii=False)
print("Saved Venkatesh text.")

# 6. OCR Samruddhi Park pages
print("Running OCR on Shree Samruddhi Park...")
engine = RapidOCR()
samruddhi_data = {}
for i in range(1, len(doc_s) + 1):
    img_p = os.path.join(SAMRUDDHI_IMG, f"page_{i:02d}.jpg")
    ocr_result, _ = engine(img_p)
    lines = []
    if ocr_result:
        for item in ocr_result:
            box, txt, score = item[0], item[1], item[2]
            try:
                s = float(score)
            except:
                s = 1.0
            if s > 0.35:
                lines.append(txt)
    samruddhi_data[f"page_{i:02d}"] = lines
    print(f"Samruddhi Page {i}: {len(lines)} lines extracted")

with open(os.path.join(BASE_DIR, "scripts", "samruddhi_extracted_text.json"), "w", encoding="utf-8") as f:
    json.dump(samruddhi_data, f, indent=2, ensure_ascii=False)

print("All preparation and extraction completed successfully!")
