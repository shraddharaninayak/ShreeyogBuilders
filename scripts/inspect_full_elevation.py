from PIL import Image
import numpy as np

p1 = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects\shree-samruddhi-park\brochure\assets\images\elevation-full.jpg"
im1 = Image.open(p1)
arr1 = np.array(im1)
print(f"im1 (Samruddhi elevation-full.jpg): size={im1.size}")
print("Left half mean:", arr1[:, :im1.width//2].mean(axis=(0,1)))
print("Right half mean:", arr1[:, im1.width//2:].mean(axis=(0,1)))

p2 = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects\shree-venkatesh-park\brochure\assets\images\elevation-full.jpg"
im2 = Image.open(p2)
arr2 = np.array(im2)
print(f"im2 (Venkatesh elevation-full.jpg): size={im2.size}")
print("Left half mean:", arr2[:, :im2.width//2].mean(axis=(0,1)))
print("Right half mean:", arr2[:, im2.width//2:].mean(axis=(0,1)))
