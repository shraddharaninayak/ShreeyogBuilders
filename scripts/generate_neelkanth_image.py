import os
from PIL import Image

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb"
slider_dir = os.path.join(base_dir, "public", "images", "shreeyog", "slider")

img_path = r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795505275839_1e1a6098.jpg"
im = Image.open(img_path)

# Trim top 2px white scanner line
im_trimmed = im.crop((0, 2, im.width, im.height))  # 877 x 530
h = im_trimmed.height # 530
target_w = int(round(h * 1.6)) # 848

# Horizontally center-crop 848 from 877 (29px difference)
crop_l = (im_trimmed.width - target_w) // 2 # 14
crop_r = crop_l + target_w # 862

im_16_10 = im_trimmed.crop((crop_l, 0, crop_r, h)) # 848 x 530, exact 16:10

# Upscale to pristine high-res 1600x1000
final_im = im_16_10.resize((1600, 1000), Image.LANCZOS)

out_webp = os.path.join(slider_dir, "shree-neelkanth.webp")
out_jpg = os.path.join(slider_dir, "shree-neelkanth.jpg")

final_im.save(out_webp, format="WEBP", quality=95)
final_im.save(out_jpg, format="JPEG", quality=95)

print(f"Generated Shree Neelkanth: {out_webp} & {out_jpg} (size={final_im.size})")
