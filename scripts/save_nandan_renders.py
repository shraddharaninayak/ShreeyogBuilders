from PIL import Image

im = Image.open('public/projects/shree-nandan/brochure/assets/p3_raw_1_1709x992.jpeg')
print('p3 image size:', im.size)
# save as elevation-hero.jpg and elevation-full.jpg
im.save('public/projects/shree-nandan/brochure/assets/elevation-hero.jpg', quality=95)
im.save('public/projects/shree-nandan/brochure/assets/elevation-full.jpg', quality=95)

# Also check p6 images
im6_1 = Image.open('public/projects/shree-nandan/brochure/assets/p6_raw_1_1709x1015.jpeg')
im6_1.save('public/projects/shree-nandan/brochure/assets/terrace-amenity-1.jpg', quality=95)

im6_2 = Image.open('public/projects/shree-nandan/brochure/assets/p6_raw_2_1710x1013.jpeg')
im6_2.save('public/projects/shree-nandan/brochure/assets/terrace-amenity-2.jpg', quality=95)

print('Saved hero and terrace images')
