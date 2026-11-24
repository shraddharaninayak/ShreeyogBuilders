from PIL import Image
import numpy as np

im1 = Image.open(r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503441489_11054319.jpg")
arr1 = np.array(im1)

# Check left 150px
print("Checking left 150px for white silhouette:")
for x in range(150):
    for y in range(500, 670):
        if np.all(arr1[y, x] > 240):
            print(f"White pixel at x={x}, y={y}")
            break
    else:
        continue
    break

# Let's see the full extent of this silhouette
white_coords = []
for x in range(150):
    for y in range(500, 670):
        if np.all(arr1[y, x] > 240):
            white_coords.append((x, y))

if white_coords:
    xs = [c[0] for c in white_coords]
    ys = [c[1] for c in white_coords]
    print(f"Silhouette x range: {min(xs)} to {max(xs)}, y range: {min(ys)} to {max(ys)}")
else:
    print("No white silhouette found in left 150px")
