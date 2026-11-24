import os
import shutil
from PIL import Image

out_assets = r'public/projects/shree-vithal-park/brochure/assets'
os.makedirs(out_assets, exist_ok=True)
os.makedirs(r'public/images/shreeyog/logos', exist_ok=True)
os.makedirs(r'public/images/shreeyog/slider', exist_ok=True)
os.makedirs(r'public/images/shreeyog/buildings', exist_ok=True)
os.makedirs(r'public/brochures', exist_ok=True)

# 1. Process Logo
logo_src = r'C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795536163216_082bfe2b.png'
logo_img = Image.open(logo_src).convert("RGBA")
print(f'Original logo size: {logo_img.size}')

# Check transparency or remove white background if needed
datas = logo_img.getdata()
new_data = []
for item in datas:
    # If pixel is near white, make transparent
    if item[0] > 240 and item[1] > 240 and item[2] > 240:
        new_data.append((255, 255, 255, 0))
    else:
        new_data.append(item)

logo_trans = Image.new("RGBA", logo_img.size)
logo_trans.putdata(new_data)

# Trim borders
bbox = logo_trans.getbbox()
if bbox:
    logo_trans = logo_trans.crop(bbox)

logo_trans.save(r'public/images/shreeyog/logos/shree-vithal-park-logo-transparent.png', 'PNG')
logo_trans.save(os.path.join(out_assets, 'logo.png'), 'PNG')
print(f'Saved transparent logo: {logo_trans.size}')

# 2. Process Building Elevation Render
elev_src = r'C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795536337558_f32d8987.jpg'
elev_img = Image.open(elev_src).convert("RGB")
print(f'Original elevation size: {elev_img.size}')

elev_img.save(os.path.join(out_assets, 'elevation.webp'), 'WEBP', quality=92)
elev_img.save(r'public/images/shreeyog/slider/shree-vithal-park.webp', 'WEBP', quality=92)
elev_img.save(r'public/images/shreeyog/buildings/shree-vithal-park.webp', 'WEBP', quality=92)
print('Saved elevation images in WebP.')

# 3. Crop Specific Plans & Maps from Brochure Pages
# Page 2: Location Map (right half)
p2 = Image.open(os.path.join(out_assets, 'page-2.webp'))
w2, h2 = p2.size
# Location plan is roughly x: [w2 * 0.72 to w2 * 0.98], y: [h2 * 0.05 to h2 * 0.95]
loc_map = p2.crop((int(w2 * 0.73), int(h2 * 0.06), int(w2 * 0.98), int(h2 * 0.92)))
loc_map.save(os.path.join(out_assets, 'location-map.webp'), 'WEBP', quality=90)
print(f'Saved location map: {loc_map.size}')

# Page 3: Parking Plan (left half) & Stilt Floor Plan (right half)
p3 = Image.open(os.path.join(out_assets, 'page-3.webp'))
w3, h3 = p3.size
parking_plan = p3.crop((int(w3 * 0.03), int(h3 * 0.06), int(w3 * 0.48), int(h3 * 0.94)))
parking_plan.save(os.path.join(out_assets, 'plan-parking.webp'), 'WEBP', quality=90)

stilt_plan = p3.crop((int(w3 * 0.52), int(h3 * 0.06), int(w3 * 0.97), int(h3 * 0.94)))
stilt_plan.save(os.path.join(out_assets, 'plan-stilt.webp'), 'WEBP', quality=90)
print(f'Saved parking plan: {parking_plan.size}, stilt plan: {stilt_plan.size}')

# Page 4: Typical Floor Plan (left half)
p4 = Image.open(os.path.join(out_assets, 'page-4.webp'))
w4, h4 = p4.size
typical_plan = p4.crop((int(w4 * 0.03), int(h4 * 0.06), int(w4 * 0.48), int(h4 * 0.94)))
typical_plan.save(os.path.join(out_assets, 'plan-typical.webp'), 'WEBP', quality=90)
print(f'Saved typical plan: {typical_plan.size}')

# 4. Copy PDF for Web Download
pdf_src = r'assets/Projects Brouchers/Shree Vithal Park - brochure.pdf'
shutil.copyfile(pdf_src, r'public/brochures/shree-vithal-park-brochure.pdf')
shutil.copyfile(pdf_src, os.path.join(out_assets, 'Shree-Vithal-Park-Brochure.pdf'))
print('Saved web brochure PDF.')
