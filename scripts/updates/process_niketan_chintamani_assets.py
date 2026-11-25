import os
import shutil
from PIL import Image, ImageChops
import pymupdf

# Create target directories
os.makedirs('public/projects/shree-niketan/brochure/assets', exist_ok=True)
os.makedirs('public/projects/shree-chintamani/brochure/assets', exist_ok=True)
os.makedirs('public/images/shreeyog/logos', exist_ok=True)
os.makedirs('public/images/shreeyog/slider', exist_ok=True)
os.makedirs('public/images/shreeyog/buildings', exist_ok=True)
os.makedirs('public/brochures', exist_ok=True)

# -------------------------------------------------------------
# 1. PROCESS SHREE NIKETAN LOGO (media_1795540790551_cb13c52e.jpg)
# -------------------------------------------------------------
niketan_logo_src = r'C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795540790551_cb13c52e.jpg'
im_nl = Image.open(niketan_logo_src).convert('RGBA')

# Convert white background to transparent
datas = im_nl.getdata()
newData = []
for item in datas:
    # white/near white threshold
    if item[0] > 235 and item[1] > 235 and item[2] > 235:
        newData.append((255, 255, 255, 0))
    else:
        # Smooth alpha edge
        avg = (item[0] + item[1] + item[2]) / 3
        if avg > 215:
            alpha = int(255 * (240 - avg) / 25)
            alpha = max(0, min(255, alpha))
            newData.append((item[0], item[1], item[2], alpha))
        else:
            newData.append(item)

im_nl.putdata(newData)
# Autocrop transparent borders
bbox = im_nl.getbbox()
if bbox:
    im_nl = im_nl.crop(bbox)

# Save logo
nl_transparent_path = 'public/images/shreeyog/logos/shree-niketan-logo-transparent.png'
im_nl.save(nl_transparent_path, 'PNG')
im_nl.save('public/projects/shree-niketan/brochure/assets/logo.png', 'PNG')
print(f'Saved Shree Niketan transparent logo ({im_nl.size})')

# -------------------------------------------------------------
# 2. PROCESS SHREE NIKETAN ELEVATION (media_1795540972693_7d63e456.jpg)
# -------------------------------------------------------------
niketan_elev_src = r'C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795540972693_7d63e456.jpg'
im_ne = Image.open(niketan_elev_src).convert('RGB')
w, h = im_ne.size

# Crop the white outer border and top logo text cleanly to focus on the 3D twin-wing facade
# Top: around 16% down, Bottom: around 96%, Left: around 3%, Right: around 97%
crop_ne = im_ne.crop((int(w * 0.025), int(h * 0.165), int(w * 0.975), int(h * 0.975)))
crop_ne.save('public/images/shreeyog/slider/shree-niketan.webp', 'WEBP', quality=90)
crop_ne.save('public/images/shreeyog/buildings/shree-niketan.webp', 'WEBP', quality=90)
crop_ne.save('public/projects/shree-niketan/brochure/assets/elevation.webp', 'WEBP', quality=92)
print(f'Saved Shree Niketan elevation ({crop_ne.size})')


# -------------------------------------------------------------
# 3. PROCESS SHREE CHINTAMANI LOGO (media_1795540995720_225400a5.jpg)
# -------------------------------------------------------------
chintamani_logo_src = r'C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795540995720_225400a5.jpg'
im_cl = Image.open(chintamani_logo_src).convert('RGBA')

datas_cl = im_cl.getdata()
newData_cl = []
for item in datas_cl:
    if item[0] > 235 and item[1] > 235 and item[2] > 235:
        newData_cl.append((255, 255, 255, 0))
    else:
        avg = (item[0] + item[1] + item[2]) / 3
        if avg > 215:
            alpha = int(255 * (240 - avg) / 25)
            alpha = max(0, min(255, alpha))
            newData_cl.append((item[0], item[1], item[2], alpha))
        else:
            newData_cl.append(item)

im_cl.putdata(newData_cl)
bbox_cl = im_cl.getbbox()
if bbox_cl:
    im_cl = im_cl.crop(bbox_cl)

cl_transparent_path = 'public/images/shreeyog/logos/shree-chintamani-logo-transparent.png'
im_cl.save(cl_transparent_path, 'PNG')
im_cl.save('public/projects/shree-chintamani/brochure/assets/logo.png', 'PNG')
print(f'Saved Shree Chintamani transparent logo ({im_cl.size})')


# -------------------------------------------------------------
# 4. PROCESS SHREE CHINTAMANI ELEVATION (media_1795541006717_93b648f9.jpg)
# -------------------------------------------------------------
chintamani_elev_src = r'C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795541006717_93b648f9.jpg'
im_ce = Image.open(chintamani_elev_src).convert('RGB')
wc, hc = im_ce.size

# Crop white border and top text cleanly
crop_ce = im_ce.crop((int(wc * 0.05), int(hc * 0.14), int(wc * 0.95), int(hc * 0.95)))
crop_ce.save('public/images/shreeyog/slider/shree-chintamani.webp', 'WEBP', quality=90)
crop_ce.save('public/images/shreeyog/buildings/shree-chintamani.webp', 'WEBP', quality=90)
crop_ce.save('public/projects/shree-chintamani/brochure/assets/elevation.webp', 'WEBP', quality=92)
print(f'Saved Shree Chintamani elevation ({crop_ce.size})')


# -------------------------------------------------------------
# 5. PROCESS SHREE NIKETAN BROCHURE PAGES & FLOOR PLANS
# -------------------------------------------------------------
doc_n = pymupdf.open('assets/Projects Brouchers/Shree Niketan.pdf')
# Save full pages as high-res webp
for i, page in enumerate(doc_n):
    pix = page.get_pixmap(dpi=200)
    page_img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    page_img.save(f'public/projects/shree-niketan/brochure/assets/page-{i+1}.webp', 'WEBP', quality=88)

# Crop floor plans and layout from pages:
# Page 3: Left half = Layout Plan & Parking, Right half = Wing A Typical Plan
p3_img = Image.open('scripts/temp_pages/niketan_page_3.jpg')
p3_w, p3_h = p3_img.size
layout_plan = p3_img.crop((0, 0, int(p3_w * 0.49), p3_h))
layout_plan.save('public/projects/shree-niketan/brochure/assets/plan-layout.webp', 'WEBP', quality=90)

wing_a_plan = p3_img.crop((int(p3_w * 0.50), 0, p3_w, p3_h))
wing_a_plan.save('public/projects/shree-niketan/brochure/assets/plan-wing-a.webp', 'WEBP', quality=90)

# Page 4: Left half = Wing B Typical Plan, Right half = Location Plan
p4_img = Image.open('scripts/temp_pages/niketan_page_4.jpg')
p4_w, p4_h = p4_img.size
wing_b_plan = p4_img.crop((0, 0, int(p4_w * 0.49), p4_h))
wing_b_plan.save('public/projects/shree-niketan/brochure/assets/plan-wing-b.webp', 'WEBP', quality=90)

loc_plan_n = p4_img.crop((int(p4_w * 0.50), 0, p4_w, p4_h))
loc_plan_n.save('public/projects/shree-niketan/brochure/assets/location-map.webp', 'WEBP', quality=90)
print('Saved Shree Niketan brochure pages and floor plan crops')


# -------------------------------------------------------------
# 6. PROCESS SHREE CHINTAMANI BROCHURE PAGES & FLOOR PLANS
# -------------------------------------------------------------
doc_c = pymupdf.open('assets/Projects Brouchers/Shree Chintamani brochure.pdf')
for i, page in enumerate(doc_c):
    pix = page.get_pixmap(dpi=150)
    page_img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    page_img.save(f'public/projects/shree-chintamani/brochure/assets/page-{i+1}.webp', 'WEBP', quality=85)

# Page 1: Left half = Location Plan & Address/Team
cp1 = Image.open('scripts/temp_pages/chintamani_page_1.jpg')
cp1_w, cp1_h = cp1.size
loc_plan_c = cp1.crop((0, 0, int(cp1_w * 0.50), cp1_h))
loc_plan_c.save('public/projects/shree-chintamani/brochure/assets/location-map.webp', 'WEBP', quality=90)

# Page 2: Right half = Stilt to Fifth Floor Plan
cp2 = Image.open('scripts/temp_pages/chintamani_page_2.jpg')
cp2_w, cp2_h = cp2.size
typical_plan_c = cp2.crop((int(cp2_w * 0.50), 0, cp2_w, cp2_h))
typical_plan_c.save('public/projects/shree-chintamani/brochure/assets/plan-typical.webp', 'WEBP', quality=90)

# Page 4: Left half = Ground Parking Floor Plan, Right half = Nature photo
cp4 = Image.open('scripts/temp_pages/chintamani_page_4.jpg')
cp4_w, cp4_h = cp4.size
parking_plan_c = cp4.crop((0, 0, int(cp4_w * 0.50), cp4_h))
parking_plan_c.save('public/projects/shree-chintamani/brochure/assets/plan-parking.webp', 'WEBP', quality=90)

nature_c = cp4.crop((int(cp4_w * 0.50), 0, cp4_w, cp4_h))
nature_c.save('public/projects/shree-chintamani/brochure/assets/godapark-nature.webp', 'WEBP', quality=90)
print('Saved Shree Chintamani brochure pages and floor plan crops')


# -------------------------------------------------------------
# 7. PRODUCE WEB OPTIMIZED PDFs (<5MB)
# -------------------------------------------------------------
# Niketan PDF is 3.11MB, copy directly to public/brochures
shutil.copyfile(
    'assets/Projects Brouchers/Shree Niketan.pdf',
    'public/brochures/shree-niketan-brochure.pdf'
)
shutil.copyfile(
    'assets/Projects Brouchers/Shree Niketan.pdf',
    'public/projects/shree-niketan/brochure/assets/Shree-Niketan-Brochure.pdf'
)
print('Copied Shree Niketan brochure PDF')

# Chintamani PDF is 57.8MB, compress it using PyMuPDF image compilation to create a light ~1-2MB web PDF
comp_c_doc = pymupdf.open()
for i in range(1, 5):
    img_path = f'public/projects/shree-chintamani/brochure/assets/page-{i}.webp'
    img = Image.open(img_path).convert('RGB')
    temp_jpg = f'scripts/temp_pages/c_page_{i}_pdf.jpg'
    img.save(temp_jpg, 'JPEG', quality=82)
    img_doc = pymupdf.open(temp_jpg)
    rect = img_doc[0].rect
    pdf_bytes = img_doc.convert_to_pdf()
    img_pdf = pymupdf.open('pdf', pdf_bytes)
    page = comp_c_doc.new_page(width=rect.width, height=rect.height)
    page.show_pdf_page(rect, img_pdf, 0)

comp_c_doc.save('public/brochures/shree-chintamani-brochure.pdf', deflate=True)
comp_c_doc.save('public/projects/shree-chintamani/brochure/assets/Shree-Chintamani-Brochure.pdf', deflate=True)
c_pdf_size = os.path.getsize('public/brochures/shree-chintamani-brochure.pdf')
print(f'Compiled optimized Shree Chintamani web PDF: {c_pdf_size / (1024*1024):.2f} MB')
