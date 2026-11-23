import os
import pymupdf

pdf_dir = r"D:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\brochures"
pdf_files = [
    "shree-bramhand-brochure.pdf",
    "shree-vishwa-brochure.pdf",
    "shree-safalya-brochure.pdf",
    "shree-samruddhi-park-brochure.pdf",
    "shree-venkatesh-park-brochure.pdf"
]

print("=== CHECKING PDF FILES IN PUBLIC/BROCHURES ===")
for fname in pdf_files:
    fpath = os.path.join(pdf_dir, fname)
    if not os.path.exists(fpath):
        print(f"[MISSING FILE] {fname}")
        continue
    
    size_mb = os.path.getsize(fpath) / (1024 * 1024)
    print(f"\n--- {fname} ({size_mb:.2f} MB) ---")
    try:
        doc = pymupdf.open(fpath)
        print(f"Page count: {len(doc)}")
        for idx, page in enumerate(doc):
            rect = page.rect
            img_list = page.get_images(full=True)
            text = page.get_text().strip()
            
            # Test page rendering
            pix = page.get_pixmap(dpi=72)
            # Check if pixmap is completely blank (all white or all transparent)
            # sample some pixels or check sample
            samples = pix.samples
            # Check variance in samples
            is_uniform = len(set(samples[:1000])) <= 1 and len(set(samples[-1000:])) <= 1 and (samples[0] == 255 or samples[0] == 0)
            
            has_content = len(text) > 0 or len(img_list) > 0 or not is_uniform
            
            status = "OK" if has_content else "WARNING: POTENTIALLY BLANK"
            print(f"  Page {idx+1}: {rect.width:.1f}x{rect.height:.1f} pt | Images: {len(img_list)} | Text chars: {len(text)} | Pixmap: {pix.width}x{pix.height}px | Status: {status}")
            
    except Exception as e:
        print(f"  [ERROR OPENING/RENDERING]: {e}")
