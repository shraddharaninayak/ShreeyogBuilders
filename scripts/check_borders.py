from PIL import Image

im2 = Image.open(r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503496106_b0641a2a.jpg")

# Check rows and cols
print("im2 size:", im2.size)
# Check if there is a border on row 0, row -1, col 0, col -1
top_row = [im2.getpixel((x, 0)) for x in range(0, im2.width, 50)]
bottom_row = [im2.getpixel((x, im2.height - 1)) for x in range(0, im2.width, 50)]
left_col = [im2.getpixel((0, y)) for y in range(0, im2.height, 50)]
right_col = [im2.getpixel((im2.width - 1, y)) for y in range(0, im2.height, 50)]

print("Top row samples:", top_row[:5])
print("Bottom row samples:", bottom_row[:5])
print("Left col samples:", left_col[:5])
print("Right col samples:", right_col[:5])

# Also check im1 edges
im1 = Image.open(r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503441489_11054319.jpg")
print("im1 size:", im1.size)
top_row1 = [im1.getpixel((x, 0)) for x in range(0, im1.width, 50)]
bottom_row1 = [im1.getpixel((x, im1.height - 1)) for x in range(0, im1.width, 50)]
left_col1 = [im1.getpixel((0, y)) for y in range(0, im1.height, 50)]
right_col1 = [im1.getpixel((im1.width - 1, y)) for y in range(0, im1.height, 50)]

print("im1 Top row samples:", top_row1[:5])
print("im1 Bottom row samples:", bottom_row1[:5])
print("im1 Left col samples:", left_col1[:5])
print("im1 Right col samples:", right_col1[:5])
