from PIL import Image
import numpy as np

p1 = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects\shree-samruddhi-park\brochure\assets\images\elevation-hero.jpg"
im1 = Image.open(p1)
arr1 = np.array(im1)

# Check left half vs right half of im1:
# In the user screenshot, the left half is white brochure page!
print("im1 left half mean RGB:", arr1[:, :im1.width//2].mean(axis=(0,1)))
print("im1 right half mean RGB:", arr1[:, im1.width//2:].mean(axis=(0,1)))

p2 = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects\shree-venkatesh-park\brochure\assets\images\elevation-hero.jpg"
im2 = Image.open(p2)
arr2 = np.array(im2)
print("im2 left half mean RGB:", arr2[:, :im2.width//2].mean(axis=(0,1)))
print("im2 right half mean RGB:", arr2[:, im2.width//2:].mean(axis=(0,1)))
