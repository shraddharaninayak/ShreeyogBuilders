from PIL import Image

im1 = Image.open(r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503441489_11054319.jpg")
im2 = Image.open(r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503496106_b0641a2a.jpg")

# In im1 (788 x 670):
# Building top apex: center corner roof
# Building left: left wall/wing
# Building right: right wall
# Building bottom: stilt parking / cars / compound wall / road
# Let's inspect vertical slices to see where colors change sharply
print("im1 dimensions:", im1.size)
print("im2 dimensions:", im2.size)
