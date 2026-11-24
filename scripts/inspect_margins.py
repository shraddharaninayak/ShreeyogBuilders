from PIL import Image
import numpy as np

im2 = Image.open(r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503496106_b0641a2a.jpg")
arr2 = np.array(im2)

# Check for near-white pixels (e.g. > 240 in all channels)
is_white = np.all(arr2 > 235, axis=-1)

# Find rows and cols that are not all white
non_white_rows = np.where(~np.all(is_white, axis=1))[0]
non_white_cols = np.where(~np.all(is_white, axis=0))[0]

print("Image 2 full shape:", arr2.shape)
if len(non_white_rows) > 0:
    print(f"Image 2 content box: rows {non_white_rows[0]} to {non_white_rows[-1]}, cols {non_white_cols[0]} to {non_white_cols[-1]}")
    # Let's inspect what is in the border
    print("Top border thickness:", non_white_rows[0])
    print("Bottom border thickness:", arr2.shape[0] - 1 - non_white_rows[-1])
    print("Left border thickness:", non_white_cols[0])
    print("Right border thickness:", arr2.shape[1] - 1 - non_white_cols[-1])

im1 = Image.open(r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503441489_11054319.jpg")
arr1 = np.array(im1)
is_white1 = np.all(arr1 > 240, axis=-1)
non_white_rows1 = np.where(~np.all(is_white1, axis=1))[0]
non_white_cols1 = np.where(~np.all(is_white1, axis=0))[0]
print("Image 1 full shape:", arr1.shape)
if len(non_white_rows1) > 0:
    print(f"Image 1 content box: rows {non_white_rows1[0]} to {non_white_rows1[-1]}, cols {non_white_cols1[0]} to {non_white_cols1[-1]}")
    print("Top border thickness:", non_white_rows1[0])
    print("Bottom border thickness:", arr1.shape[0] - 1 - non_white_rows1[-1])
    print("Left border thickness:", non_white_cols1[0])
    print("Right border thickness:", arr1.shape[1] - 1 - non_white_cols[-1])
