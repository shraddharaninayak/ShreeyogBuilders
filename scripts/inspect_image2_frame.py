from PIL import Image
import numpy as np

im2 = Image.open(r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503496106_b0641a2a.jpg")
arr2 = np.array(im2)

# Let's inspect the first 30 rows and last 30 rows, first 30 cols and last 30 cols
# Find any black line (pixels where values are very low, e.g. < 50)
print("Row min values top 20:")
for y in range(20):
    row = arr2[y]
    min_val = row.min()
    mean_val = row.mean()
    print(f"y={y}: min={min_val}, mean={mean_val:.1f}")

print("\nCol min values left 20:")
for x in range(20):
    col = arr2[:, x]
    min_val = col.min()
    mean_val = col.mean()
    print(f"x={x}: min={min_val}, mean={mean_val:.1f}")

print("\nCol min values right 20:")
for x in range(im2.width - 20, im2.width):
    col = arr2[:, x]
    min_val = col.min()
    mean_val = col.mean()
    print(f"x={x}: min={min_val}, mean={mean_val:.1f}")

print("\nRow min values bottom 20:")
for y in range(im2.height - 20, im2.height):
    row = arr2[y]
    min_val = row.min()
    mean_val = row.mean()
    print(f"y={y}: min={min_val}, mean={mean_val:.1f}")
