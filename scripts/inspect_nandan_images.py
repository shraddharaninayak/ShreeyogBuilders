from PIL import Image
import os

assets = 'public/projects/shree-nandan/brochure/assets'

# Let's check page-1 vs p3_raw
im1 = Image.open(os.path.join(assets, 'page-1.webp'))
print('page-1 size:', im1.size)

# Let's save p3_raw as elevation
p3 = Image.open(os.path.join(assets, 'p3_raw_1_1709x992.jpeg'))
print('p3_raw size:', p3.size)
p3.save(os.path.join(assets, 'elevation.webp'), 'WEBP', quality=90)
print('Saved elevation.webp from p3_raw')

# Let's check p6_raw_1 vs p6_raw_2
p6_1 = Image.open(os.path.join(assets, 'p6_raw_1_1709x1015.jpeg'))
p6_1.save(os.path.join(assets, 'terrace-view-1.webp'), 'WEBP', quality=90)
p6_2 = Image.open(os.path.join(assets, 'p6_raw_2_1710x1013.jpeg'))
p6_2.save(os.path.join(assets, 'terrace-view-2.webp'), 'WEBP', quality=90)
print('Saved terrace views')

# Location map from page 8
p8 = Image.open(os.path.join(assets, 'page-8.webp'))
# Page 8 has the location map. Let's save it
p8.save(os.path.join(assets, 'location-map.webp'), 'WEBP', quality=90)

# Plans from page 4 and 5
p4 = Image.open(os.path.join(assets, 'page-4.webp'))
p4.save(os.path.join(assets, 'plan-floor.webp'), 'WEBP', quality=90)

p5 = Image.open(os.path.join(assets, 'page-5.webp'))
p5.save(os.path.join(assets, 'plan-terrace.webp'), 'WEBP', quality=90)

# Axonometric views from page 7
p7 = Image.open(os.path.join(assets, 'page-7.webp'))
p7.save(os.path.join(assets, 'axonometric-views.webp'), 'WEBP', quality=90)
