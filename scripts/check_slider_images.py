import os
from PIL import Image

slider_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\images\shreeyog\slider"

for f in sorted(os.listdir(slider_dir)):
    if f.endswith(('.webp', '.jpg', '.png')):
        p = os.path.join(slider_dir, f)
        im = Image.open(p)
        print(f"{f}: size={im.size}, aspect={im.width/im.height:.3f}")
