import os
import fitz
from PIL import Image

ws = 'D:/INTERNSHIPS/SOCIAL MEDIA MANANGMENT[SKILLNEX]/WEBSITES/Shreeyogweb'
os.chdir(ws)

pdf_doc = fitz.open('assets/Projects Brouchers/Shree Anant.pdf')
assets_dir = 'public/projects/shree-anant/brochure/assets'

# Render pages at 300 DPI for crisp crops
p3 = pdf_doc[2].get_pixmap(dpi=300)
p3_img = Image.frombytes("RGB", [p3.width, p3.height], p3.samples)
print("Page 3 high-res:", p3_img.size)

p4 = pdf_doc[3].get_pixmap(dpi=300)
p4_img = Image.frombytes("RGB", [p4.width, p4.height], p4.samples)
print("Page 4 high-res:", p4_img.size)

p6 = pdf_doc[5].get_pixmap(dpi=300)
p6_img = Image.frombytes("RGB", [p6.width, p6.height], p6.samples)
print("Page 6 high-res:", p6_img.size)

# 1. Ground floor plan (Page 3)
# In page 3, let's crop the actual drawing area
w3, h3 = p3_img.size
# Page 3 has a title at the top, decorative borders, and the ground floor layout
# Let's save the full page 3 layout as ground floor plan
p3_crop = p3_img.crop((int(w3 * 0.05), int(h3 * 0.12), int(w3 * 0.95), int(h3 * 0.92)))
p3_crop.save(os.path.join(assets_dir, 'plan-ground.webp'), 'WEBP', quality=92)
p3_crop.save(os.path.join(assets_dir, 'plan-ground.jpg'), 'JPEG', quality=92)

# 2. Typical 1st to 4th floor plan (Page 4)
w4, h4 = p4_img.size
p4_crop = p4_img.crop((int(w4 * 0.05), int(h4 * 0.10), int(w4 * 0.95), int(h4 * 0.92)))
p4_crop.save(os.path.join(assets_dir, 'plan-typical.webp'), 'WEBP', quality=92)
p4_crop.save(os.path.join(assets_dir, 'plan-typical.jpg'), 'JPEG', quality=92)

# 3. Let's crop individual 2 BHK and 3 BHK unit sections from page 4 if discernible,
# or crop Left half (Flats 101, 102, 103) and Right half (Flats 104, 105, 106)
p4_left = p4_img.crop((int(w4 * 0.05), int(h4 * 0.15), int(w4 * 0.52), int(h4 * 0.88)))
p4_right = p4_img.crop((int(w4 * 0.48), int(h4 * 0.15), int(w4 * 0.95), int(h4 * 0.88)))
p4_left.save(os.path.join(assets_dir, 'unit-wings-west.webp'), 'WEBP', quality=92)
p4_right.save(os.path.join(assets_dir, 'unit-wings-east.webp'), 'WEBP', quality=92)

# 4. Location map from Page 6
w6, h6 = p6_img.size
# On page 6, let's find the map
# In page 6, the map is typically in the center/main area
p6_map = p6_img.crop((int(w6 * 0.08), int(h6 * 0.22), int(w6 * 0.92), int(h6 * 0.88)))
p6_map.save(os.path.join(assets_dir, 'location-map.webp'), 'WEBP', quality=92)
p6_map.save(os.path.join(assets_dir, 'location-map.jpg'), 'JPEG', quality=92)

print("Saved high-res plans and maps successfully!")
