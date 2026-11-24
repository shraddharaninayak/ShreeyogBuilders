from PIL import Image
import numpy as np

im2 = Image.open(r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503496106_b0641a2a.jpg")
arr2 = np.array(im2)

# Check sky columns between x=200 and x=300 in rows y=10..30
sky_strip = arr2[10:30, :, :]
# Let's calculate mean per column in the sky
col_means = sky_strip.mean(axis=0)
# Look for sharp dip in brightness across columns
diffs = np.diff(col_means.mean(axis=1))
for x in range(len(diffs)):
    if abs(diffs[x]) > 4:
        print(f"Significant color jump at x={x}: diff={diffs[x]:.2f}")
