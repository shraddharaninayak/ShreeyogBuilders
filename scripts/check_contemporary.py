import os
from PIL import Image

f = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\images\shreeyog\buildings\contemporary-avenue.webp"
if os.path.exists(f):
    im = Image.open(f)
    print("contemporary-avenue:", im.size, im.format)
else:
    print("Not found")
