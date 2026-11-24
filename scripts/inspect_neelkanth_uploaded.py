import os
from PIL import Image
import numpy as np

img_path = r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795505275839_1e1a6098.jpg"
im = Image.open(img_path)
print(f"Size: {im.size}, Format: {im.format}, Aspect: {im.width / im.height:.4f}")

arr = np.array(im)
# Check edges
print("Top row mean:", arr[0].mean(axis=0))
print("Bottom row mean:", arr[-1].mean(axis=0))
print("Left col mean:", arr[:, 0].mean(axis=0))
print("Right col mean:", arr[:, -1].mean(axis=0))

# Check top rows
for y in range(10):
    print(f"y={y}: min={arr[y].min()}, mean={arr[y].mean():.1f}")

# Check bottom rows
for y in range(im.height - 10, im.height):
    print(f"y={y}: min={arr[y].min()}, mean={arr[y].mean():.1f}")

# Check left cols
for x in range(10):
    col = arr[:, x]
    print(f"x={x}: min={col.min()}, mean={col.mean():.1f}")

# Check right cols
for x in range(im.width - 10, im.width):
    col = arr[:, x]
    print(f"x={x}: min={col.min()}, mean={col.mean():.1f}")
