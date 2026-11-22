import os
from PIL import Image

BASE_DIR = r"D:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb"

# --- SAMRUDDHI PARK CROPS ---
s_dir = os.path.join(BASE_DIR, "public", "projects", "shree-samruddhi-park", "brochure", "assets", "images")

# Full elevation & hero preview from page 03 & 01
shutil_copy = lambda src, dst: Image.open(src).save(dst, quality=92)

# Page 03: Building render is on the left half or center
with Image.open(os.path.join(s_dir, "page_03.jpg")) as im:
    w, h = im.size
    # Hero building preview
    im.crop((0, 0, int(w * 0.55), h)).save(os.path.join(s_dir, "elevation-hero.jpg"), quality=92)
    im.save(os.path.join(s_dir, "elevation-full.jpg"), quality=92)

# Page 04: Lifestyle terrace feature
with Image.open(os.path.join(s_dir, "page_04.jpg")) as im:
    im.save(os.path.join(s_dir, "lifestyle-garden.jpg"), quality=92)

# Page 05: Typical floor plan
with Image.open(os.path.join(s_dir, "page_05.jpg")) as im:
    im.save(os.path.join(s_dir, "plan-typical.jpg"), quality=92)

# Page 07: Terrace view layout
with Image.open(os.path.join(s_dir, "page_07.jpg")) as im:
    im.save(os.path.join(s_dir, "plan-terrace.jpg"), quality=92)

# Page 08: Location map
with Image.open(os.path.join(s_dir, "page_08.jpg")) as im:
    w, h = im.size
    im.crop((0, 0, int(w * 0.65), h)).save(os.path.join(s_dir, "location-map.jpg"), quality=92)

print("Samruddhi crops saved.")

# --- VENKATESH PARK CROPS ---
v_dir = os.path.join(BASE_DIR, "public", "projects", "shree-venkatesh-park", "brochure", "assets", "images")

# Page 03: Hero building visual
with Image.open(os.path.join(v_dir, "page_03.jpg")) as im:
    w, h = im.size
    im.crop((0, 0, int(w * 0.55), h)).save(os.path.join(v_dir, "elevation-hero.jpg"), quality=92)
    im.save(os.path.join(v_dir, "elevation-full.jpg"), quality=92)

# Page 04: Floor Plan Wing A
with Image.open(os.path.join(v_dir, "page_04.jpg")) as im:
    im.save(os.path.join(v_dir, "plan-wing-a.jpg"), quality=92)

# Page 05: Dimensioned unit layouts along 18m road
with Image.open(os.path.join(v_dir, "page_05.jpg")) as im:
    im.save(os.path.join(v_dir, "plan-units.jpg"), quality=92)

# Page 06: Terrace floor view
with Image.open(os.path.join(v_dir, "page_06.jpg")) as im:
    im.save(os.path.join(v_dir, "plan-terrace.jpg"), quality=92)

# Page 08: Location plan
with Image.open(os.path.join(v_dir, "page_08.jpg")) as im:
    w, h = im.size
    im.crop((0, 0, int(w * 0.6), h)).save(os.path.join(v_dir, "location-map.jpg"), quality=92)

print("Venkatesh crops saved.")
