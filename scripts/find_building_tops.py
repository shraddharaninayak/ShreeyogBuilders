from PIL import Image
import numpy as np

im1 = Image.open(r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503441489_11054319.jpg")
arr1 = np.array(im1)

# In im1, let's find where the building starts from top
# Sky is light: RGB mean > 180 and blue > red
# Building top has dark brown roof slab: RGB ~ (90, 80, 75)
print("Finding building top in im1:")
for y in range(8, 300, 5):
    # Check across columns
    row = arr1[y]
    # find pixels with R < 130 and G < 130 and B < 130
    dark_mask = (row[:, 0] < 140) & (row[:, 1] < 140) & (row[:, 2] < 140)
    dark_count = np.sum(dark_mask)
    if dark_count > 10:
        print(f"y={y}: dark pixels={dark_count}")
        break

# Let's inspect im2 building top:
im2 = Image.open(r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503496106_b0641a2a.jpg")
arr2 = np.array(im2)
print("\nFinding building top in im2:")
for y in range(5, 300, 5):
    row = arr2[y]
    # Building apex has white / light beige parapet or facade
    # Sky is dusk blue/grey
    # Let's print row summary
    pass
