from PIL import Image
import numpy as np

im1 = Image.open(r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503441489_11054319.jpg")
arr1 = np.array(im1)

# In im1 (788, 670):
# Let's find:
# 1. Rooftop apex:
# Let's inspect rows around y=100..250.
# Where is the top of the roof parapet?
# The roof is brown/grey with concrete parapet. Sky is light cyan (R>160, G>190, B>200).
# Let's find the minimum y where non-sky pixels appear in columns 200..600.
non_sky = ~((arr1[:, :, 0] > 150) & (arr1[:, :, 1] > 180) & (arr1[:, :, 2] > 195))

for y in range(8, 300):
    if np.any(non_sky[y, 250:550]):
        print(f"im1 Building top first detected at y={y}")
        break

# Ground level:
# Where are the cars / stilt parking columns / driveway?
# Let's see bottom:
print(f"im1 height is {im1.height}")
# Let's inspect rows from 500 to 669:
print("Row 550 mean:", arr1[550].mean(axis=0))
print("Row 600 mean:", arr1[600].mean(axis=0))
print("Row 650 mean:", arr1[650].mean(axis=0))
print("Row 669 mean:", arr1[669].mean(axis=0))

# Building left and right:
for x in range(0, 300):
    if np.any(non_sky[200:500, x]):
        print(f"im1 non-sky left detected at x={x}")
        break

for x in range(im1.width - 1, im1.width - 300, -1):
    if np.any(non_sky[200:500, x]):
        print(f"im1 non-sky right detected at x={x}")
        break
