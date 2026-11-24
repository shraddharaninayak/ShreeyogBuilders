import os
from PIL import Image

p1 = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects\shree-samruddhi-park\brochure\assets\images\elevation-hero.jpg"
p2 = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects\shree-venkatesh-park\brochure\assets\images\elevation-hero.jpg"

im1 = Image.open(p1)
im2 = Image.open(p2)

print(f"Samruddhi elevation-hero.jpg: size={im1.size}, aspect={im1.width/im1.height:.3f}")
print(f"Venkatesh elevation-hero.jpg: size={im2.size}, aspect={im2.width/im2.height:.3f}")
