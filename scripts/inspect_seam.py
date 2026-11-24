from PIL import Image
import numpy as np

im2 = Image.open(r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503496106_b0641a2a.jpg")
arr2 = np.array(im2)

print("Values at x=245..249 for y=10..15:")
for y in range(10, 16):
    print(f"y={y}:", [list(arr2[y, x]) for x in range(244, 250)])
