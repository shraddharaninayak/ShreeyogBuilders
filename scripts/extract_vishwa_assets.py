import os
import shutil
from PIL import Image

BASE_DIR = r"D:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb"
IMG_SRC_DIR = os.path.join(BASE_DIR, "public", "projects", "shree-vishwa", "brochure", "assets", "images")
ASSET_OUT_DIR = os.path.join(BASE_DIR, "public", "projects", "shree-vishwa", "brochure", "assets")
os.makedirs(ASSET_OUT_DIR, exist_ok=True)

# 1. Setup Logos
USER_UPLOAD_DIR = r"C:\Users\nshra\.gemini\antigravity\brain\800a5d15-806c-4771-a416-43290e357368\.user_uploaded"
white_logo = os.path.join(USER_UPLOAD_DIR, "media_1795334506892_c80c8645.png")
color_logo = os.path.join(USER_UPLOAD_DIR, "media_1795334497933_fb1987e5.png")

if os.path.exists(white_logo):
    shutil.copy2(white_logo, os.path.join(ASSET_OUT_DIR, "logo.png"))
    print("Copied white logo to assets/logo.png")

if os.path.exists(color_logo):
    shutil.copy2(color_logo, os.path.join(ASSET_OUT_DIR, "logo-color.png"))
    logo_dest2 = os.path.join(BASE_DIR, "public", "images", "shreeyog", "logos", "shree-vishwa-logo.png")
    os.makedirs(os.path.dirname(logo_dest2), exist_ok=True)
    shutil.copy2(color_logo, logo_dest2)
    print("Copied color logo to assets/logo-color.png and public/images/shreeyog/logos/")

# 2. Extract key assets from 150 DPI page renders
# Dimensions of each rendered page is 3675 x 1800

def get_page(num):
    return Image.open(os.path.join(IMG_SRC_DIR, f"page_{num:02d}.jpg"))

# Page 02: Godaghat Nashik
with get_page(2) as p2:
    w, h = p2.size
    # Crop right photo part (Nashik Godaghat)
    # The curve starts around x = 850
    godaghat = p2.crop((850, 40, w - 40, h - 40))
    godaghat.save(os.path.join(ASSET_OUT_DIR, "godaghat.jpg"), quality=92)
    print("Saved godaghat.jpg")

# Page 03: Aerial 3D View of Shree Vishwa
with get_page(3) as p3:
    w, h = p3.size
    aerial = p3.crop((40, 40, 2600, h - 40))
    aerial.save(os.path.join(ASSET_OUT_DIR, "aerial-view.jpg"), quality=92)
    # Also save as preview-cover for overview card
    preview = aerial.crop((450, 80, 1950, 1550))
    preview.save(os.path.join(ASSET_OUT_DIR, "preview-cover.jpg"), quality=92)
    print("Saved aerial-view.jpg and preview-cover.jpg")

# Page 04: Interior Living Room
with get_page(4) as p4:
    w, h = p4.size
    interior = p4.crop((850, 40, w - 40, h - 40))
    interior.save(os.path.join(ASSET_OUT_DIR, "interior-living.jpg"), quality=92)
    print("Saved interior-living.jpg")

# Page 05: Amenities 3D Campus & True Pictures
with get_page(5) as p5:
    w, h = p5.size
    amenities_hero = p5.crop((40, 40, 2750, h - 40))
    amenities_hero.save(os.path.join(ASSET_OUT_DIR, "amenities-hero.jpg"), quality=92)
    
    # Sitting Space true pic (around x: 2850 to 3550, y: 600 to 950 approx)
    sitting = p5.crop((2870, 610, 3500, 930))
    sitting.save(os.path.join(ASSET_OUT_DIR, "amenity-sitting.jpg"), quality=92)
    
    # Lawn true pic (y: 960 to 1280 approx)
    lawn = p5.crop((2870, 960, 3500, 1280))
    lawn.save(os.path.join(ASSET_OUT_DIR, "amenity-lawn.jpg"), quality=92)
    
    # Stage true pic (y: 1310 to 1630 approx)
    stage = p5.crop((2870, 1310, 3500, 1630))
    stage.save(os.path.join(ASSET_OUT_DIR, "amenity-stage.jpg"), quality=92)
    print("Saved amenities-hero.jpg, sitting, lawn, stage")

# Page 06: Ground Floor Plan & True Pictures (Play Area, Multi Court, Net Cricket)
with get_page(6) as p6:
    w, h = p6.size
    # Ground floor plan drawing (from x: 1000 to w-40)
    ground_plan = p6.crop((1150, 70, w - 40, h - 60))
    ground_plan.save(os.path.join(ASSET_OUT_DIR, "plan-ground.png"))
    
    # Play area (x: 160 to 790, y: 610 to 920 approx)
    play = p6.crop((165, 610, 790, 920))
    play.save(os.path.join(ASSET_OUT_DIR, "amenity-playarea.jpg"), quality=92)
    
    # Multipurpose court (y: 980 to 1270 approx)
    court = p6.crop((165, 970, 790, 1275))
    court.save(os.path.join(ASSET_OUT_DIR, "amenity-multicourt.jpg"), quality=92)
    
    # Net Cricket (y: 1330 to 1625 approx)
    cricket = p6.crop((165, 1330, 790, 1630))
    cricket.save(os.path.join(ASSET_OUT_DIR, "amenity-cricket.jpg"), quality=92)
    print("Saved plan-ground.png, playarea, multicourt, cricket")

# Page 07: Daytime Architectural Elevation Hero
with get_page(7) as p7:
    w, h = p7.size
    elevation = p7.crop((40, 40, 2600, h - 40))
    elevation.save(os.path.join(ASSET_OUT_DIR, "elevation-hero.jpg"), quality=92)
    print("Saved elevation-hero.jpg")

# Page 08: Typical Floor Plan (1st to 11th)
with get_page(8) as p8:
    w, h = p8.size
    typ_plan = p8.crop((70, 140, w - 70, h - 100))
    typ_plan.save(os.path.join(ASSET_OUT_DIR, "plan-typical.png"))
    print("Saved plan-typical.png")

# Page 09: Unit Plans 2 BHK & 3 BHK
with get_page(9) as p9:
    w, h = p9.size
    # 2 BHK half (left)
    unit_2bhk = p9.crop((70, 100, 1780, h - 80))
    unit_2bhk.save(os.path.join(ASSET_OUT_DIR, "unit-2bhk.png"))
    
    # 3 BHK half (right)
    unit_3bhk = p9.crop((1800, 100, w - 70, h - 80))
    unit_3bhk.save(os.path.join(ASSET_OUT_DIR, "unit-3bhk.png"))
    print("Saved unit-2bhk.png and unit-3bhk.png")

# Page 10: Twilight Elevation & Location Map
with get_page(10) as p10:
    w, h = p10.size
    twilight = p10.crop((40, 40, 1800, h - 40))
    twilight.save(os.path.join(ASSET_OUT_DIR, "evening-hero.jpg"), quality=92)
    
    loc_map = p10.crop((1850, 100, w - 60, h - 100))
    loc_map.save(os.path.join(ASSET_OUT_DIR, "location-map.png"))
    print("Saved evening-hero.jpg and location-map.png")

print("All Shree Vishwa assets extracted successfully!")
