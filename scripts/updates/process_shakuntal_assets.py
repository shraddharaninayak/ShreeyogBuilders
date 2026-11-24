import fitz
import os
from PIL import Image

out_assets = r'public/projects/shree-shakuntal/brochure/assets'
os.makedirs(out_assets, exist_ok=True)
os.makedirs(r'public/images/shreeyog/logos', exist_ok=True)
os.makedirs(r'public/images/shreeyog/slider', exist_ok=True)
os.makedirs(r'public/images/shreeyog/buildings', exist_ok=True)
os.makedirs(r'public/brochures', exist_ok=True)

# 1. Process Logo (Gold lettering on black background -> make black transparent)
logo_src = r'C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795538912852_50d13bc0.jpg'
logo_img = Image.open(logo_src).convert("RGBA")
print(f'Original logo size: {logo_img.size}')

datas = logo_img.getdata()
new_data = []
for item in datas:
    # Black background check (r, g, b < 30)
    if item[0] < 30 and item[1] < 30 and item[2] < 30:
        new_data.append((0, 0, 0, 0))
    else:
        new_data.append(item)

logo_trans = Image.new("RGBA", logo_img.size)
logo_trans.putdata(new_data)

bbox = logo_trans.getbbox()
if bbox:
    logo_trans = logo_trans.crop(bbox)

logo_trans.save(r'public/images/shreeyog/logos/shree-shakuntal-logo-transparent.png', 'PNG')
logo_trans.save(os.path.join(out_assets, 'logo.png'), 'PNG')
print(f'Saved transparent logo: {logo_trans.size}')

# 2. Process Elevation Image
elev_src = r'C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795538933921_a249b0e6.jpg'
elev_img = Image.open(elev_src).convert("RGB")
print(f'Original elevation size: {elev_img.size}')

elev_img.save(os.path.join(out_assets, 'elevation.webp'), 'WEBP', quality=92)
elev_img.save(r'public/images/shreeyog/slider/shree-shakuntal.webp', 'WEBP', quality=92)
elev_img.save(r'public/images/shreeyog/buildings/shree-shakuntal.webp', 'WEBP', quality=92)
print('Saved elevation images in WebP.')

# 3. Render 4 spreads from the PDF
pdf_path = r'assets/Projects Brouchers/Shree Shakuntal Brochure.pdf'
doc = fitz.open(pdf_path)
print(f'Rendering {len(doc)} pages from PDF...')

pdf_images = []
for i, page in enumerate(doc):
    pix = page.get_pixmap(dpi=200)
    img_path = os.path.join(out_assets, f'page-{i+1}.webp')
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    img.save(img_path, "WEBP", quality=88)
    pdf_images.append(img)
    print(f'Page {i+1} saved: {img.size} -> {img_path}')

# 4. Crop Plans & Map
# Page 3: Parking Plan (left) & Typical Floor Plan (right)
p3 = Image.open(os.path.join(out_assets, 'page-3.webp'))
w3, h3 = p3.size

# Parking plan (left half)
parking_plan = p3.crop((int(w3 * 0.02), int(h3 * 0.05), int(w3 * 0.49), int(h3 * 0.95)))
parking_plan.save(os.path.join(out_assets, 'plan-parking.webp'), 'WEBP', quality=90)

# Typical floor plan (right half)
typical_plan = p3.crop((int(w3 * 0.51), int(h3 * 0.05), int(w3 * 0.98), int(h3 * 0.95)))
typical_plan.save(os.path.join(out_assets, 'plan-typical.webp'), 'WEBP', quality=90)
print(f'Saved parking plan: {parking_plan.size}, typical plan: {typical_plan.size}')

# Page 4: Specifications (left) & Location Map (right)
p4 = Image.open(os.path.join(out_assets, 'page-4.webp'))
w4, h4 = p4.size

# Location map (right half)
location_map = p4.crop((int(w4 * 0.51), int(h4 * 0.05), int(w4 * 0.98), int(h4 * 0.95)))
location_map.save(os.path.join(out_assets, 'location-map.webp'), 'WEBP', quality=90)
print(f'Saved location map: {location_map.size}')

# 5. Build optimized web PDF (< 3 MB instead of 42 MB)
opt_pdf_path = r'public/brochures/shree-shakuntal-brochure.pdf'
opt_doc = fitz.open()

for img in pdf_images:
    # Resize slightly for crisp 150 dpi web PDF
    temp_img = img.copy()
    if temp_img.width > 2400:
        ratio = 2400.0 / temp_img.width
        temp_img = temp_img.resize((2400, int(temp_img.height * ratio)), Image.LANCZOS)
    
    # Save as JPEG in memory
    import io
    buf = io.BytesIO()
    temp_img.save(buf, format='JPEG', quality=82)
    buf.seek(0)
    
    img_pdf = fitz.open("jpeg", buf.read())
    rect = img_pdf[0].rect
    pdf_bytes = img_pdf.convert_to_pdf()
    img_pdf.close()
    
    page_doc = fitz.open("pdf", pdf_bytes)
    opt_doc.insert_pdf(page_doc)
    page_doc.close()

opt_doc.save(opt_pdf_path)
opt_doc.save(os.path.join(out_assets, 'Shree-Shakuntal-Brochure.pdf'))
opt_doc.close()

size_mb = os.path.getsize(opt_pdf_path) / (1024 * 1024)
print(f'Saved optimized PDF: {size_mb:.2f} MB -> {opt_pdf_path}')
