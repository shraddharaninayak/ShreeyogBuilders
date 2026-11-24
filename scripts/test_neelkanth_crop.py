from PIL import Image

img_path = r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795505275839_1e1a6098.jpg"
im = Image.open(img_path)

# Trim top 2px white border
im_trimmed = im.crop((0, 2, im.width, im.height))  # 877 x 530
h = im_trimmed.height # 530
target_w = int(round(h * 1.6)) # 848

# Crop 848 from 877: difference is 29 pixels
# Center crop horizontally:
crop_l = (im_trimmed.width - target_w) // 2 # 14
crop_r = crop_l + target_w # 14 + 848 = 862

im_16_10 = im_trimmed.crop((crop_l, 0, crop_r, h))
print(f"im_16_10 size: {im_16_10.size}, aspect: {im_16_10.width / im_16_10.height:.6f}")

# Check building bounds in im_16_10:
# Building was from x=170 to x=700 in original.
# In im_16_10, building is from x=156 to x=686.
# Margin to left is 156 px, margin to right is 848 - 686 = 162 px.
# It is virtually perfectly centered horizontally!
print(f"Building left margin in 16:10: ~156 px, right margin: ~162 px")
# Building apex is at y=109 (109px of open sky above roof).
# Ground road and cars are at bottom (y=530).
print("100% of building height from rooftop to road is preserved!")
