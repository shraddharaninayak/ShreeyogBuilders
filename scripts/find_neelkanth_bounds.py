from PIL import Image
import numpy as np

img_path = r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795505275839_1e1a6098.jpg"
im = Image.open(img_path)
arr = np.array(im)

# Sky is dusk blue/grey (R ~ 120-170, G ~ 140-190, B ~ 160-220)
# Building roof has white/grey parapet
# Let's find building apex from top (y=2..300) in columns 200..750:
for y in range(2, 300):
    row = arr[y, 200:750]
    # Check for non-sky: building parapet has white (R>220, G>220, B>220) or dark grey
    is_bright = (row[:, 0] > 210) & (row[:, 1] > 210) & (row[:, 2] > 210)
    if np.any(is_bright):
        print(f"Building roof detected at y={y}")
        break

# Leftmost building wall:
for x in range(1, 400):
    col = arr[100:400, x]
    is_building = (col[:, 0] > 180) & (col[:, 1] > 180) & (col[:, 2] > 180)
    if np.any(is_building):
        print(f"Building left wall detected at x={x}")
        break

# Rightmost building wall:
for x in range(im.width - 1, 400, -1):
    col = arr[100:400, x]
    is_building = (col[:, 0] > 180) & (col[:, 1] > 180) & (col[:, 2] > 180)
    if np.any(is_building):
        print(f"Building right wall detected at x={x}")
        break

# Ground roadway:
print("Total height:", im.height)
