import os, json
from rapidocr_onnxruntime import RapidOCR

BASE_DIR = r"D:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb"
THUMBS_DIR = os.path.join(BASE_DIR, "scripts", "safalya_thumbs")
OUTPUT_FILE = os.path.join(BASE_DIR, "scripts", "safalya_extracted_text.json")

engine = RapidOCR()
results = {}

for page_num in range(1, 19):
    thumb_path = os.path.join(THUMBS_DIR, f"thumb_page_{page_num:02d}.jpg")
    if not os.path.exists(thumb_path):
        continue
    print(f"Processing page {page_num}...")
    ocr_result, elapse = engine(thumb_path)
    lines = []
    if ocr_result:
        for item in ocr_result:
            box, txt, score = item[0], item[1], item[2]
            try:
                s = float(score)
            except:
                s = 1.0
            if s > 0.3:
                lines.append(txt)
    results[f"page_{page_num:02d}"] = lines
    print(f"Page {page_num}: {len(lines)} lines extracted")

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print(f"Successfully saved extracted text to {OUTPUT_FILE}")
