from PIL import Image
import numpy as np

im1 = Image.open(r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503441489_11054319.jpg")
arr1 = np.array(im1)

print("im1 top 15 rows mean and min:")
for y in range(15):
    print(f"y={y}: min={arr1[y].min()}, mean={arr1[y].mean():.1f}")

print("\nim1 bottom 10 rows mean and min:")
for y in range(im1.height - 10, im1.height):
    print(f"y={y}: min={arr1[y].min()}, mean={arr1[y].mean():.1f}")
