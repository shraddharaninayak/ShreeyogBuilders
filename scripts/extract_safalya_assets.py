import os
from PIL import Image

BASE_DIR = r"D:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb"
IMG_DIR = os.path.join(BASE_DIR, "public", "projects", "shree-safalya", "brochure", "assets", "images")

# Let's inspect the dimensions of the rendered pages
for i in [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]:
    p = os.path.join(IMG_DIR, f"page_{i:02d}.jpg")
    with Image.open(p) as im:
        print(f"Page {i:02d} size: {im.size}")

# Let's write extraction logic
def crop_and_save(page_num, box_rel, filename):
    p = os.path.join(IMG_DIR, f"page_{page_num:02d}.jpg")
    out_p = os.path.join(IMG_DIR, filename)
    with Image.open(p) as im:
        w, h = im.size
        left = int(box_rel[0] * w)
        top = int(box_rel[1] * h)
        right = int(box_rel[2] * w)
        bottom = int(box_rel[3] * h)
        cropped = im.crop((left, top, right, bottom))
        cropped.save(out_p, quality=92)
        print(f"Saved {filename} ({cropped.size})")

# Page 05: Tower elevation
crop_and_save(5, (0.0, 0.0, 1.0, 1.0), "elevation-tower.jpg")
# Page 05: Hero preview crop
crop_and_save(5, (0.15, 0.05, 0.85, 0.95), "elevation-preview.jpg")

# Page 04: Lifestyle & Garden
crop_and_save(4, (0.0, 0.0, 1.0, 1.0), "highlights-visual.jpg")

# Page 06: Ground & Basement Plan
crop_and_save(6, (0.0, 0.0, 1.0, 1.0), "plan-ground-basement.jpg")

# Page 07: Typical Floor Plan
crop_and_save(7, (0.0, 0.0, 1.0, 1.0), "plan-typical.jpg")

# Page 08: Combined Floor Plan
crop_and_save(8, (0.0, 0.0, 1.0, 1.0), "plan-combined.jpg")

# Page 09: Duplex Floor Plan
crop_and_save(9, (0.0, 0.0, 1.0, 1.0), "plan-duplex.jpg")

# Page 10: XL Unit Layouts
crop_and_save(10, (0.0, 0.0, 1.0, 1.0), "plan-xl.jpg")

# Page 11: 12th Floor Recreational Plan
crop_and_save(11, (0.0, 0.0, 1.0, 1.0), "plan-recreational.jpg")

# Page 12: Recreational Amenities 3D Render
crop_and_save(12, (0.0, 0.0, 1.0, 1.0), "recreational-amenities-3d.jpg")

# Page 13: Rooftop Terrace Layout
crop_and_save(13, (0.0, 0.0, 1.0, 1.0), "plan-terrace.jpg")

# Page 14: Terrace Amenities 3D Render
crop_and_save(14, (0.0, 0.0, 1.0, 1.0), "terrace-amenities-3d.jpg")

# Page 16: Axonometric 3D Unit Views
crop_and_save(16, (0.0, 0.0, 1.0, 1.0), "axonometric-units.jpg")
crop_and_save(16, (0.0, 0.05, 0.5, 0.95), "axonometric-3bhk.jpg")
crop_and_save(16, (0.5, 0.05, 1.0, 0.95), "axonometric-4bhk.jpg")

# Page 17: Location Plan
crop_and_save(17, (0.0, 0.0, 1.0, 1.0), "location-map.jpg")

print("All asset extractions complete!")
