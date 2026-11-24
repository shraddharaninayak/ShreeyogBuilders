from PIL import Image
import numpy as np

img_path = r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795504626721_771c24d8.jpg"
im = Image.open(img_path)
arr = np.array(im)

# Sky is blue: R ~ 110-140, G ~ 130-170, B ~ 170-210
# Roof has dark grey / white / terracotta blocks
# Let's find building apex from top
for y in range(0, 300):
    row = arr[y, 150:600]
    # Check for dark grey (roof corner) or white blocks
    is_roof = (row[:, 0] < 100) & (row[:, 1] < 100) & (row[:, 2] < 100)
    is_white_roof = (row[:, 0] > 220) & (row[:, 1] > 220) & (row[:, 2] > 220)
    if np.any(is_roof) or np.any(is_white_roof):
        print(f"Building roof detected at y={y}")
        break

# Let's find building base / ground level:
# Road is dark grey (R~60, G~60, B~60)
for y in range(400, 700):
    row = arr[y, 200:500]
    # Building ground floor shops / entrance
    pass

print(f"im width={im.width}, height={im.height}")
