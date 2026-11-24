import os
from PIL import Image

ws = 'D:/INTERNSHIPS/SOCIAL MEDIA MANANGMENT[SKILLNEX]/WEBSITES/Shreeyogweb'
os.chdir(ws)

for i in range(1, 8):
    p = f'references/niwas_pages/page_{i}.png'
    if os.path.exists(p):
        im = Image.open(p)
        # resize to 1400 width
        ratio = 1400.0 / im.width
        new_h = int(im.height * ratio)
        im_resized = im.resize((1400, new_h), Image.Resampling.LANCZOS)
        out_p = f'references/niwas_pages/page_{i}_preview.jpg'
        im_resized.save(out_p, 'JPEG', quality=85)
        print(f"Saved {out_p} ({1400}x{new_h}, {os.path.getsize(out_p)} bytes)")
