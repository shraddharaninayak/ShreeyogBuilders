import os
import numpy as np
from PIL import Image

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb"
slider_dir = os.path.join(base_dir, "public", "images", "shreeyog", "slider")

img_path = r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795504626721_771c24d8.jpg"
im = Image.open(img_path)

# Trim bottom 3px white scanner border
im_trimmed = im.crop((0, 0, im.width, im.height - 3))  # 751 x 702
w, h = im_trimmed.size

# Target 16:10 width for height h
target_w = int(round(h * 1.6))  # 702 * 1.6 = 1123.2 -> 1124
pad_l = (target_w - w) // 2    # 186
pad_r = target_w - w - pad_l  # 187

canvas = Image.new("RGB", (target_w, h))

# Replicate side strips with reflection and edge alignment
left_edge = im_trimmed.crop((0, 0, min(pad_l, w), h)).transpose(Image.FLIP_LEFT_RIGHT)
if left_edge.width < pad_l:
    left_edge = left_edge.resize((pad_l, h), Image.LANCZOS)
else:
    left_edge = left_edge.crop((left_edge.width - pad_l, 0, left_edge.width, h))

right_edge = im_trimmed.crop((max(0, w - pad_r), 0, w, h)).transpose(Image.FLIP_LEFT_RIGHT)
if right_edge.width < pad_r:
    right_edge = right_edge.resize((pad_r, h), Image.LANCZOS)
else:
    right_edge = right_edge.crop((0, 0, pad_r, h))

canvas.paste(left_edge, (0, 0))
canvas.paste(right_edge, (pad_l + w, 0))
canvas.paste(im_trimmed, (pad_l, 0))

# Upscale to pristine 1600x1000
final_im = canvas.resize((1600, 1000), Image.LANCZOS)

out_webp = os.path.join(slider_dir, "shree-venkatesh.webp")
out_jpg = os.path.join(slider_dir, "shree-venkatesh.jpg")

final_im.save(out_webp, format="WEBP", quality=95)
final_im.save(out_jpg, format="JPEG", quality=95)

print(f"Generated Shree Venkatesh Park: {out_webp} & {out_jpg} (size={final_im.size})")
