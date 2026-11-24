import os
import numpy as np
from PIL import Image

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb"
slider_dir = os.path.join(base_dir, "public", "images", "shreeyog", "slider")
os.makedirs(slider_dir, exist_ok=True)

# ==============================================================================
# 1. Shree Nath Enclave (Image 1)
# ==============================================================================
img1_path = r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503441489_11054319.jpg"
im1 = Image.open(img1_path)

# Trim top 8px white strip
im1_trimmed = im1.crop((0, 8, im1.width, im1.height))  # 788 x 662
w1, h1 = im1_trimmed.size

# Target 16:10 width for height h1:
target_w1 = int(round(h1 * 1.6))  # 662 * 1.6 = 1059.2 -> 1060
pad_l1 = (target_w1 - w1) // 2   # 136
pad_r1 = target_w1 - w1 - pad_l1 # 136

canvas1 = Image.new("RGB", (target_w1, h1))

# Replicate side strips with reflection and edge alignment
left_edge1 = im1_trimmed.crop((0, 0, min(pad_l1, w1), h1)).transpose(Image.FLIP_LEFT_RIGHT)
if left_edge1.width < pad_l1:
    left_edge1 = left_edge1.resize((pad_l1, h1), Image.LANCZOS)
else:
    left_edge1 = left_edge1.crop((left_edge1.width - pad_l1, 0, left_edge1.width, h1))

right_edge1 = im1_trimmed.crop((max(0, w1 - pad_r1), 0, w1, h1)).transpose(Image.FLIP_LEFT_RIGHT)
if right_edge1.width < pad_r1:
    right_edge1 = right_edge1.resize((pad_r1, h1), Image.LANCZOS)
else:
    right_edge1 = right_edge1.crop((0, 0, pad_r1, h1))

canvas1.paste(left_edge1, (0, 0))
canvas1.paste(right_edge1, (pad_l1 + w1, 0))
canvas1.paste(im1_trimmed, (pad_l1, 0))

# Upscale to pristine high-res 16:10 (1600 x 1000)
final_nath = canvas1.resize((1600, 1000), Image.LANCZOS)

nath_webp = os.path.join(slider_dir, "shree-nath-enclave.webp")
nath_jpg = os.path.join(slider_dir, "shree-nath-enclave.jpg")
final_nath.save(nath_webp, format="WEBP", quality=95)
final_nath.save(nath_jpg, format="JPEG", quality=95)
print(f"Generated Shree Nath Enclave: {nath_webp} & {nath_jpg} (size={final_nath.size})")

# ==============================================================================
# 2. Shree Samruddhi Park (Image 2)
# ==============================================================================
img2_path = r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503496106_b0641a2a.jpg"
im2 = Image.open(img2_path)

# Trim top 1px, bottom 3px (scanner margin)
im2_trimmed = im2.crop((0, 1, im2.width, im2.height - 3))  # 827 x 561
arr2 = np.array(im2_trimmed)

# Smooth scan seam at x=247 in sky
for y in range(0, 130):
    arr2[y, 247] = np.round((arr2[y, 246].astype(float) + arr2[y, 248].astype(float)) / 2).astype(np.uint8)

im2_clean = Image.fromarray(arr2)
w2, h2 = im2_clean.size

# Target 16:10 width for height h2:
target_w2 = int(round(h2 * 1.6))  # 561 * 1.6 = 897.6 -> 898
pad_l2 = (target_w2 - w2) // 2   # 35
pad_r2 = target_w2 - w2 - pad_l2 # 36

canvas2 = Image.new("RGB", (target_w2, h2))

left_edge2 = im2_clean.crop((0, 0, pad_l2, h2)).transpose(Image.FLIP_LEFT_RIGHT)
right_edge2 = im2_clean.crop((w2 - pad_r2, 0, w2, h2)).transpose(Image.FLIP_LEFT_RIGHT)

canvas2.paste(left_edge2, (0, 0))
canvas2.paste(right_edge2, (pad_l2 + w2, 0))
canvas2.paste(im2_clean, (pad_l2, 0))

# Upscale to pristine high-res 16:10 (1600 x 1000)
final_samruddhi = canvas2.resize((1600, 1000), Image.LANCZOS)

samruddhi_webp = os.path.join(slider_dir, "shree-samruddhi-park.webp")
samruddhi_jpg = os.path.join(slider_dir, "shree-samruddhi-park.jpg")
final_samruddhi.save(samruddhi_webp, format="WEBP", quality=95)
final_samruddhi.save(samruddhi_jpg, format="JPEG", quality=95)
print(f"Generated Shree Samruddhi Park: {samruddhi_webp} & {samruddhi_jpg} (size={final_samruddhi.size})")
