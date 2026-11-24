from PIL import Image
import numpy as np

im1 = Image.open(r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503441489_11054319.jpg")
im2 = Image.open(r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503496106_b0641a2a.jpg")

print(f"im1 size: {im1.size}")
print(f"im2 size: {im2.size}")

# For im1:
# The user wants:
# - Ensure the complete buildings are clearly visible without awkward cropping.
# - Check both desktop and mobile views.
# - Maintain existing card design, dimensions, image proportions, and layout (16:10).

# If im1 is 788x670, height is 670.
# If we trim the 8px white strip at top: height = 662.
# Target 16:10 width for 662 height is 662 * 1.6 = 1059.2 -> 1060 px width.
# Width needed = 1060 px. im1 width is 788 px.
# Padding on left = (1060 - 788) // 2 = 136 px, padding on right = 136 px.
# What is on left of im1? Trees, sky, road.
# What is on right of im1? Trees, sky, grass, car.

# For im2 (827x565):
# Trim 1px top white line, 3px bottom white line:
# height = 561 px.
# Target 16:10 width for 561 height is 561 * 1.6 = 897.6 -> 898 px width.
# Width needed = 898 px. im2 width is 827 px.
# Padding on left = (898 - 827) // 2 = 35 px, right = 36 px.
# What is on left of im2? Trees, sky, road.
# What is on right of im2? Trees, sky, road, car.
