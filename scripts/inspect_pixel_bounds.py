from PIL import Image
import numpy as np

img1_path = r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503441489_11054319.jpg"
img2_path = r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503496106_b0641a2a.jpg"

im1 = Image.open(img1_path)
im2 = Image.open(img2_path)

print("Image 1 mode:", im1.mode, "size:", im1.size)
print("Image 2 mode:", im2.mode, "size:", im2.size)

# Let's save crops or check edges
# In Image 1:
# Let's check left edge, right edge, top edge, bottom edge
# We can sample colors at boundaries
print("Image 1 top-left pixel:", im1.getpixel((10, 10)))
print("Image 1 top-right pixel:", im1.getpixel((im1.width - 10, 10)))
print("Image 1 bottom-left pixel:", im1.getpixel((10, im1.height - 10)))
print("Image 1 bottom-right pixel:", im1.getpixel((im1.width - 10, im1.height - 10)))

print("Image 2 top-left pixel:", im2.getpixel((10, 10)))
print("Image 2 top-right pixel:", im2.getpixel((im2.width - 10, 10)))
print("Image 2 bottom-left pixel:", im2.getpixel((10, im2.height - 10)))
print("Image 2 bottom-right pixel:", im2.getpixel((im2.width - 10, im2.height - 10)))
