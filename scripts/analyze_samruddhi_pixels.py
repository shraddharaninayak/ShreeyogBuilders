from PIL import Image
import numpy as np

im2 = Image.open(r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503496106_b0641a2a.jpg")
arr2 = np.array(im2)

# Sky in im2 is dusk blue/grey (R ~ 110-150, G ~ 125-165, B ~ 140-180)
# Building top has white rooftop canopy/parapet (R>200, G>200, B>200)
# Let's find building apex in im2:
for y in range(5, 200):
    # Check in middle columns 200..600
    row = arr2[y, 250:550]
    # Check if any pixel has high brightness (white parapet)
    bright = (row[:, 0] > 190) & (row[:, 1] > 190) & (row[:, 2] > 190)
    if np.any(bright):
        print(f"im2 Building apex first detected at y={y}")
        break

# Ground level in im2:
print(f"im2 height is {im2.height}")
# Bottom-most rows:
# Let's see rows from 500 to 564:
for y in range(520, im2.height):
    row = arr2[y]
    print(f"y={y}: min={row.min()}, mean={row.mean():.1f}")
