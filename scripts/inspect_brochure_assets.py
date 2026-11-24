import os
from PIL import Image

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects"

for proj in ["shree-samruddhi-park", "shree-venkatesh-park"]:
    img_dir = os.path.join(base_dir, proj, "brochure", "assets", "images")
    print(f"=== {proj} ===")
    if os.path.exists(img_dir):
        for f in os.listdir(img_dir):
            p = os.path.join(img_dir, f)
            if os.path.isfile(p):
                try:
                    im = Image.open(p)
                    print(f"  {f}: size={im.size}, aspect={im.width/im.height:.3f}")
                except Exception as e:
                    print(f"  {f}: not image ({e})")
