import os
from PIL import Image
import numpy as np

img_path = r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795504626721_771c24d8.jpg"
im = Image.open(img_path)
print(f"Size: {im.size}, Format: {im.format}, Aspect: {im.width / im.height:.4f}")

arr = np.array(im)
# Check edges
print("Top row mean:", arr[0].mean(axis=0))
print("Bottom row mean:", arr[-1].mean(axis=0))
print("Left col mean:", arr[:, 0].mean(axis=0))
print("Right col mean:", arr[:, -1].mean(axis=0))

# Check for borders or margins
# Top rows
for y in range(15):
    print(f"y={y}: min={arr[y].min()}, mean={arr[y].mean():.1f}")

# Bottom rows
for y in range(im.height - 15, im.height):
    print(f"y={y}: min={arr[y].min()}, mean={arr[y].mean():.1f}")
