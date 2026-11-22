import os, shutil, fitz, cv2
from PIL import Image

BASE_DIR = r"D:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb"
SAFALYA_DIR = os.path.join(BASE_DIR, "public", "projects", "shree-safalya", "brochure")
ASSETS_DIR = os.path.join(SAFALYA_DIR, "assets")
IMG_DIR = os.path.join(ASSETS_DIR, "images")
THUMBS_DIR = os.path.join(BASE_DIR, "scripts", "safalya_thumbs")
VIDEO_FRAMES_DIR = os.path.join(BASE_DIR, "scripts", "safalya_video_frames")

os.makedirs(IMG_DIR, exist_ok=True)
os.makedirs(THUMBS_DIR, exist_ok=True)
os.makedirs(VIDEO_FRAMES_DIR, exist_ok=True)

# 1. Copy PDF
src_pdf = os.path.join(BASE_DIR, "assets", "Projects Brouchers", "Shree Safalya Brochure.pdf")
dst_pdf1 = os.path.join(SAFALYA_DIR, "Shree-Safalya-Brochure.pdf")
dst_pdf2 = os.path.join(SAFALYA_DIR, "brochure.pdf")

if os.path.exists(src_pdf):
    print("Copying PDF...")
    shutil.copy2(src_pdf, dst_pdf1)
    shutil.copy2(src_pdf, dst_pdf2)
    print(f"Copied PDF ({os.path.getsize(dst_pdf1)} bytes)")

# 2. Copy Logo
user_uploads = r"C:\Users\nshra\.gemini\antigravity\brain\800a5d15-806c-4771-a416-43290e357368\.user_uploaded"
logo_src = os.path.join(user_uploads, "media_1795337516970_e4f9735d.png")
if os.path.exists(logo_src):
    shutil.copy2(logo_src, os.path.join(ASSETS_DIR, "logo.png"))
    # Also save in public/images/shreeyog/logos/
    logos_dir = os.path.join(BASE_DIR, "public", "images", "shreeyog", "logos")
    os.makedirs(logos_dir, exist_ok=True)
    shutil.copy2(logo_src, os.path.join(logos_dir, "shree-safalya-logo.png"))
    print("Copied logo to assets/logo.png and public/images/shreeyog/logos/")

# 3. Render all 18 pages of PDF
doc = fitz.open(src_pdf)
print(f"Rendering {len(doc)} pages of Shree Safalya PDF...")
for i, page in enumerate(doc):
    pix = page.get_pixmap(dpi=150)
    page_img_path = os.path.join(IMG_DIR, f"page_{i+1:02d}.jpg")
    pix.save(page_img_path)
    
    # Save a resized thumb for quick inspection
    with Image.open(page_img_path) as im:
        w, h = im.size
        new_h = int(h * 1200 / w)
        thumb = im.resize((1200, new_h), Image.Resampling.LANCZOS)
        thumb.save(os.path.join(THUMBS_DIR, f"thumb_page_{i+1:02d}.jpg"), quality=80)
    print(f"Rendered page {i+1:02d}")

# 4. Extract video frames from ShreeSafalya.mp4
video_path = os.path.join(BASE_DIR, "references", "ShreeSafalya.mp4")
if os.path.exists(video_path):
    print("Extracting frames from ShreeSafalya.mp4...")
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    step = max(1, int(fps * 2))
    idx = 0
    saved = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        if idx % step == 0:
            cv2.imwrite(os.path.join(VIDEO_FRAMES_DIR, f"frame_{saved:02d}_{idx/fps:.1f}s.jpg"), frame)
            saved += 1
        idx += 1
    cap.release()
    print(f"Saved {saved} video frames to {VIDEO_FRAMES_DIR}")

print("Preparation completed successfully!")
