import os
import numpy as np
from PIL import Image, ImageFilter

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb"
scratch_dir = os.path.join(base_dir, "scratch")
os.makedirs(scratch_dir, exist_ok=True)

# 1. Process Shree Nath Enclave (Image 1)
img1_path = r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503441489_11054319.jpg"
im1 = Image.open(img1_path)

# Trim top 8px white strip
im1_trimmed = im1.crop((0, 8, im1.width, im1.height)) # 788 x 662
w1, h1 = im1_trimmed.size

# Target 16:10
target_w1 = int(round(h1 * 1.6)) # 662 * 1.6 = 1059.2 -> 1060
pad_left1 = (target_w1 - w1) // 2
pad_right1 = target_w1 - w1 - pad_left1

# Create 16:10 canvas
canvas1 = Image.new("RGB", (target_w1, h1))

# Mirror / edge extension for left pad
left_strip = im1_trimmed.crop((0, 0, min(pad_left1, w1), h1)).transpose(Image.FLIP_LEFT_RIGHT)
if left_strip.width < pad_left1:
    left_strip = left_strip.resize((pad_left1, h1), Image.LANCZOS)
else:
    left_strip = left_strip.crop((left_strip.width - pad_left1, 0, left_strip.width, h1))

# Mirror / edge extension for right pad
right_strip = im1_trimmed.crop((max(0, w1 - pad_right1), 0, w1, h1)).transpose(Image.FLIP_LEFT_RIGHT)
if right_strip.width < pad_right1:
    right_strip = right_strip.resize((pad_right1, h1), Image.LANCZOS)
else:
    right_strip = right_strip.crop((0, 0, pad_right1, h1))

canvas1.paste(left_strip, (0, 0))
canvas1.paste(right_strip, (pad_left1 + w1, 0))
canvas1.paste(im1_trimmed, (pad_left1, 0))

# Gentle feathered blend on seams
arr_c1 = np.array(canvas1).astype(float)
blend_w = 20
for i in range(blend_w):
    alpha = i / float(blend_w)
    # Left seam: pad_left1
    x_l = pad_left1 - blend_w // 2 + i
    if 0 <= x_l < target_w1:
        pass # The boundary is naturally matched because of reflection

# Upscale to pristine 1600x1000
canvas1_hi = canvas1.resize((1600, 1000), Image.LANCZOS)
canvas1_hi.save(os.path.join(scratch_dir, "nath_enclave_16_10.jpg"), quality=95)
print("Saved nath_enclave_16_10.jpg, size:", canvas1_hi.size)

# 2. Process Shree Samruddhi Park (Image 2)
img2_path = r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503496106_b0641a2a.jpg"
im2 = Image.open(img2_path)

# Trim top 1px, bottom 3px
im2_trimmed = im2.crop((0, 1, im2.width, im2.height - 3)) # 827 x 561
arr2 = np.array(im2_trimmed)

# Smooth scan seam at x=247 in sky
# In rows y=0..120, x=247: replace with average of x=246 and x=248
for y in range(0, 130):
    arr2[y, 247] = np.round((arr2[y, 246].astype(float) + arr2[y, 248].astype(float)) / 2).astype(np.uint8)

im2_clean = Image.fromarray(arr2)
w2, h2 = im2_clean.size

# Target 16:10 width for 561 height:
target_w2 = int(round(h2 * 1.6)) # 898
pad_left2 = (target_w2 - w2) // 2 # 35
pad_right2 = target_w2 - w2 - pad_left2 # 36

canvas2 = Image.new("RGB", (target_w2, h2))

left_strip2 = im2_clean.crop((0, 0, pad_left2, h2)).transpose(Image.FLIP_LEFT_RIGHT)
right_strip2 = im2_clean.crop((w2 - pad_right2, 0, w2, h2)).transpose(Image.FLIP_LEFT_RIGHT)

canvas2.paste(left_strip2, (0, 0))
canvas2.paste(right_strip2, (pad_left2 + w2, 0))
canvas2.paste(im2_clean, (pad_left2, 0))

canvas2_hi = canvas2.resize((1600, 1000), Image.LANCZOS)
canvas2_hi.save(os.path.join(scratch_dir, "samruddhi_park_16_10.jpg"), quality=95)
print("Saved samruddhi_park_16_10.jpg, size:", canvas2_hi.size)
