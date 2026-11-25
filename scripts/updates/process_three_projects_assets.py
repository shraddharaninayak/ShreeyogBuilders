import os
import shutil
from PIL import Image
import pymupdf

# Create target directories
dirs = [
    'public/projects/shree-samarth/brochure/assets',
    'public/projects/shree-vinayak/brochure/assets',
    'public/projects/shree-nisarg/brochure/assets',
    'public/images/shreeyog/logos',
    'public/images/shreeyog/slider',
    'public/images/shreeyog/buildings',
    'public/brochures'
]
for d in dirs:
    os.makedirs(d, exist_ok=True)

# -------------------------------------------------------------
# 1. SHREE SAMARTH ASSETS
# -------------------------------------------------------------
# Logo
samarth_logo_src = r'C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795543540128_3f72b3b7.png'
im_sl = Image.open(samarth_logo_src).convert('RGBA')

# Convert white/transparent background
datas_sl = list(im_sl.getdata())
newData_sl = []
for item in datas_sl:
    # check white/transparent
    if item[3] == 0:
        newData_sl.append((255, 255, 255, 0))
    elif item[0] > 235 and item[1] > 235 and item[2] > 235:
        newData_sl.append((255, 255, 255, 0))
    else:
        avg = (item[0] + item[1] + item[2]) / 3
        if avg > 215:
            alpha = int(255 * (240 - avg) / 25)
            alpha = max(0, min(255, alpha))
            newData_sl.append((item[0], item[1], item[2], min(item[3], alpha)))
        else:
            newData_sl.append(item)

im_sl.putdata(newData_sl)
bbox = im_sl.getbbox()
if bbox:
    im_sl = im_sl.crop(bbox)

im_sl.save('public/images/shreeyog/logos/shree-samarth-logo-transparent.png', 'PNG')
im_sl.save('public/projects/shree-samarth/brochure/assets/logo.png', 'PNG')
print(f'Saved Shree Samarth transparent logo ({im_sl.size})')

# Elevation Render
samarth_elev_src = r'C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795543725708_96a9d445.jpg'
im_se = Image.open(samarth_elev_src).convert('RGB')
im_se.save('public/images/shreeyog/slider/shree-samarth.webp', 'WEBP', quality=90)
im_se.save('public/images/shreeyog/buildings/shree-samarth.webp', 'WEBP', quality=90)
im_se.save('public/projects/shree-samarth/brochure/assets/elevation.webp', 'WEBP', quality=92)
print(f'Saved Shree Samarth elevation ({im_se.size})')

# Samarth Floor Plans from rendered temp pages
# Page 3: Parking Floor Plan
sp3 = Image.open('scripts/temp_pages/samarth_page_3.jpg')
sp3.save('public/projects/shree-samarth/brochure/assets/plan-parking.webp', 'WEBP', quality=90)

# Page 4: Typical Floor Plan (Wings A & B)
sp4 = Image.open('scripts/temp_pages/samarth_page_4.jpg')
sp4.save('public/projects/shree-samarth/brochure/assets/plan-typical.webp', 'WEBP', quality=90)

# Page 5: 4th Floor Penthouse Plan
sp5 = Image.open('scripts/temp_pages/samarth_page_5.jpg')
sp5.save('public/projects/shree-samarth/brochure/assets/plan-penthouse.webp', 'WEBP', quality=90)

# All 6 pages
for i in range(1, 7):
    p_img = Image.open(f'scripts/temp_pages/samarth_page_{i}.jpg')
    p_img.save(f'public/projects/shree-samarth/brochure/assets/page-{i}.webp', 'WEBP', quality=85)

# Compile web-optimized PDF for Samarth
doc_s = pymupdf.open()
for i in range(1, 7):
    img_path = f'public/projects/shree-samarth/brochure/assets/page-{i}.webp'
    img = Image.open(img_path).convert('RGB')
    temp_jpg = f'scripts/temp_pages/s_page_{i}_pdf.jpg'
    img.save(temp_jpg, 'JPEG', quality=82)
    img_doc = pymupdf.open(temp_jpg)
    rect = img_doc[0].rect
    pdf_bytes = img_doc.convert_to_pdf()
    img_pdf = pymupdf.open('pdf', pdf_bytes)
    page = doc_s.new_page(width=rect.width, height=rect.height)
    page.show_pdf_page(rect, img_pdf, 0)

doc_s.save('public/brochures/shree-samarth-brochure.pdf', deflate=True)
doc_s.save('public/projects/shree-samarth/brochure/assets/Shree-Samarth-Brochure.pdf', deflate=True)
s_pdf_size = os.path.getsize('public/brochures/shree-samarth-brochure.pdf')
print(f'Compiled optimized Shree Samarth web PDF: {s_pdf_size / (1024*1024):.2f} MB')


# -------------------------------------------------------------
# 2. SHREE VINAYAK ASSETS
# -------------------------------------------------------------
# Logo (media_1795543765962_1a13e896.png) - green background (#637350 or similar)
vinayak_logo_src = r'C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795543765962_1a13e896.png'
im_vl = Image.open(vinayak_logo_src).convert('RGBA')

# The olive green background: r ~ 80-110, g ~ 95-125, b ~ 70-95
datas_vl = list(im_vl.getdata())
newData_vl = []
for item in datas_vl:
    # Olive background check
    r, g, b, a = item
    if 70 <= r <= 125 and 90 <= g <= 140 and 60 <= b <= 110:
        newData_vl.append((255, 255, 255, 0))
    elif r > 240 and g > 240 and b > 240:
        newData_vl.append((255, 255, 255, 0))
    else:
        # Keep text & Ganesha symbol (gold, white, orange)
        newData_vl.append(item)

im_vl.putdata(newData_vl)
bbox_v = im_vl.getbbox()
if bbox_v:
    im_vl = im_vl.crop(bbox_v)

im_vl.save('public/images/shreeyog/logos/shree-vinayak-logo-transparent.png', 'PNG')
im_vl.save('public/projects/shree-vinayak/brochure/assets/logo.png', 'PNG')
print(f'Saved Shree Vinayak transparent logo ({im_vl.size})')

# Elevation Render
vinayak_elev_src = r'C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795543841461_4a02cd37.jpg'
im_ve = Image.open(vinayak_elev_src).convert('RGB')
wve, hve = im_ve.size
# Crop white border
crop_ve = im_ve.crop((int(wve * 0.01), int(hve * 0.01), int(wve * 0.99), int(hve * 0.99)))
crop_ve.save('public/images/shreeyog/slider/shree-vinayak.webp', 'WEBP', quality=90)
crop_ve.save('public/images/shreeyog/buildings/shree-vinayak.webp', 'WEBP', quality=90)
crop_ve.save('public/projects/shree-vinayak/brochure/assets/elevation.webp', 'WEBP', quality=92)
print(f'Saved Shree Vinayak elevation ({crop_ve.size})')

# Vinayak Floor Plans from rendered temp pages
# Page 3: Left = Ground Floor Parking, Right = Typical 1st Floor Plan (3 BHK)
vp3 = Image.open('scripts/temp_pages/vinayak_page_3.jpg')
vw3, vh3 = vp3.size
vp_parking = vp3.crop((0, 0, int(vw3 * 0.49), vh3))
vp_parking.save('public/projects/shree-vinayak/brochure/assets/plan-parking.webp', 'WEBP', quality=90)

vp_typical = vp3.crop((int(vw3 * 0.50), 0, vw3, vh3))
vp_typical.save('public/projects/shree-vinayak/brochure/assets/plan-typical.webp', 'WEBP', quality=90)

# Page 4: Left = 2nd Floor Plan (Terrace), Right = 3rd Floor Plan
vp4 = Image.open('scripts/temp_pages/vinayak_page_4.jpg')
vw4, vh4 = vp4.size
vp_terrace = vp4.crop((0, 0, int(vw4 * 0.49), vh4))
vp_terrace.save('public/projects/shree-vinayak/brochure/assets/plan-terrace.webp', 'WEBP', quality=90)

vp_third = vp4.crop((int(vw4 * 0.50), 0, vw4, vh4))
vp_third.save('public/projects/shree-vinayak/brochure/assets/plan-upper.webp', 'WEBP', quality=90)

# Page 5: Left = Location Map
vp5 = Image.open('scripts/temp_pages/vinayak_page_5.jpg')
vw5, vh5 = vp5.size
vp_map = vp5.crop((0, 0, int(vw5 * 0.60), vh5))
vp_map.save('public/projects/shree-vinayak/brochure/assets/location-map.webp', 'WEBP', quality=90)

# All 5 pages
for i in range(1, 6):
    p_img = Image.open(f'scripts/temp_pages/vinayak_page_{i}.jpg')
    p_img.save(f'public/projects/shree-vinayak/brochure/assets/page-{i}.webp', 'WEBP', quality=88)

# PDF Copy (2.84MB)
shutil.copyfile(
    'assets/Projects Brouchers/Shree vinayak - brochure.pdf',
    'public/brochures/shree-vinayak-brochure.pdf'
)
shutil.copyfile(
    'assets/Projects Brouchers/Shree vinayak - brochure.pdf',
    'public/projects/shree-vinayak/brochure/assets/Shree-Vinayak-Brochure.pdf'
)
print('Saved Shree Vinayak brochure pages, plans & PDF')


# -------------------------------------------------------------
# 3. SHREE NISARG ASSETS
# -------------------------------------------------------------
# Logo (media_1795543880952_bd0e5495.png)
nisarg_logo_src = r'C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795543880952_bd0e5495.png'
im_nl = Image.open(nisarg_logo_src).convert('RGBA')

datas_nl = list(im_nl.getdata())
newData_nl = []
for item in datas_nl:
    if item[3] == 0:
        newData_nl.append((255, 255, 255, 0))
    elif item[0] > 235 and item[1] > 235 and item[2] > 235:
        newData_nl.append((255, 255, 255, 0))
    else:
        avg = (item[0] + item[1] + item[2]) / 3
        if avg > 215:
            alpha = int(255 * (240 - avg) / 25)
            alpha = max(0, min(255, alpha))
            newData_nl.append((item[0], item[1], item[2], min(item[3], alpha)))
        else:
            newData_nl.append(item)

im_nl.putdata(newData_nl)
bbox_n = im_nl.getbbox()
if bbox_n:
    im_nl = im_nl.crop(bbox_n)

im_nl.save('public/images/shreeyog/logos/shree-nisarg-logo-transparent.png', 'PNG')
im_nl.save('public/projects/shree-nisarg/brochure/assets/logo.png', 'PNG')
print(f'Saved Shree Nisarg transparent logo ({im_nl.size})')

# Elevation Render
nisarg_elev_src = r'C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795543901424_f6bba770.jpg'
im_ne = Image.open(nisarg_elev_src).convert('RGB')
wne, hne = im_ne.size
# Crop white borders
crop_ne = im_ne.crop((int(wne * 0.01), int(hne * 0.01), int(wne * 0.99), int(hne * 0.99)))
crop_ne.save('public/images/shreeyog/slider/shree-nisarg.webp', 'WEBP', quality=90)
crop_ne.save('public/images/shreeyog/buildings/shree-nisarg.webp', 'WEBP', quality=90)
crop_ne.save('public/projects/shree-nisarg/brochure/assets/elevation.webp', 'WEBP', quality=92)
print(f'Saved Shree Nisarg elevation ({crop_ne.size})')

# Nisarg Floor Plans from rendered temp pages
# Page 3: Left = Ground Floor Plan & Landscaped Front Park, Right = Typical Floor Plan (Wings A & B)
np3 = Image.open('scripts/temp_pages/nisarg_page_3.jpg')
nw3, nh3 = np3.size
np_parking = np3.crop((0, 0, int(nw3 * 0.49), nh3))
np_parking.save('public/projects/shree-nisarg/brochure/assets/plan-parking.webp', 'WEBP', quality=90)

np_typical = np3.crop((int(nw3 * 0.50), 0, nw3, nh3))
np_typical.save('public/projects/shree-nisarg/brochure/assets/plan-typical.webp', 'WEBP', quality=90)

# Page 4: Right = Location Map
np4 = Image.open('scripts/temp_pages/nisarg_page_4.jpg')
nw4, nh4 = np4.size
np_map = np4.crop((int(nw4 * 0.50), 0, nw4, nh4))
np_map.save('public/projects/shree-nisarg/brochure/assets/location-map.webp', 'WEBP', quality=90)

# All 5 pages
for i in range(1, 6):
    p_img = Image.open(f'scripts/temp_pages/nisarg_page_{i}.jpg')
    p_img.save(f'public/projects/shree-nisarg/brochure/assets/page-{i}.webp', 'WEBP', quality=88)

# PDF Copy (2.84MB)
shutil.copyfile(
    'assets/Projects Brouchers/Shree Nisarg.pdf',
    'public/brochures/shree-nisarg-brochure.pdf'
)
shutil.copyfile(
    'assets/Projects Brouchers/Shree Nisarg.pdf',
    'public/projects/shree-nisarg/brochure/assets/Shree-Nisarg-Brochure.pdf'
)
print('Saved Shree Nisarg brochure pages, plans & PDF')
print('=== ALL ASSET PROCESSING COMPLETE ===')
