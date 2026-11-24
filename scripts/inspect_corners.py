from PIL import Image
import numpy as np

im2 = Image.open(r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503496106_b0641a2a.jpg")
arr2 = np.array(im2)

# Top right quadrant of im2: x from 500 to 827, y from 0 to 150
# Let's inspect what is there:
print("im2 top-right corner (x=600..827, y=10..100):")
print("Mean RGB:", arr2[10:100, 600:827].mean(axis=(0,1)))
# Is it sky?
# Sky in dusk: R~80..130, G~95..145, B~110..165

im1 = Image.open(r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503441489_11054319.jpg")
arr1 = np.array(im1)
print("im1 top-right corner (x=550..788, y=10..100):")
print("Mean RGB:", arr1[10:100, 550:788].mean(axis=(0,1)))
