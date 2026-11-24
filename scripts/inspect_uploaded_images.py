from PIL import Image

img1_path = r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503441489_11054319.jpg"
img2_path = r"C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795503496106_b0641a2a.jpg"

im1 = Image.open(img1_path)
im2 = Image.open(img2_path)

print(f"Image 1 (Shree Nath Enclave): size={im1.size}, format={im1.format}, aspect={im1.width/im1.height:.4f}")
print(f"Image 2 (Shree Samruddhi Park): size={im2.size}, format={im2.format}, aspect={im2.width/im2.height:.4f}")
