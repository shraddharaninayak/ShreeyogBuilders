from PIL import Image
import os

assets = 'public/projects/shree-nandan/brochure/assets'

# Page 4 is 2736 x 1944. Let's crop ground floor vs typical floor
# In PDF Page 4: Top/Left is typically Ground Floor or Typical Floor.
p4 = Image.open(os.path.join(assets, 'page-4.webp'))
w, h = p4.size
print('Page 4 size:', w, h)

# Let's crop left half and right half or top/bottom
# Let's check where the titles are
# Let's crop Left (w*0 to w*0.5) and Right (w*0.5 to w)
p4_left = p4.crop((0, 0, int(w*0.5), h))
p4_right = p4.crop((int(w*0.5), 0, w, h))

p4_left.save(os.path.join(assets, 'plan-ground.webp'), 'WEBP', quality=90)
p4_right.save(os.path.join(assets, 'plan-typical.webp'), 'WEBP', quality=90)

# Page 7 has 2 BHK and 3 BHK axonometric views
p7 = Image.open(os.path.join(assets, 'page-7.webp'))
w7, h7 = p7.size
p7_left = p7.crop((0, 0, int(w7*0.5), h7))
p7_right = p7.crop((int(w7*0.5), 0, w7, h7))

p7_left.save(os.path.join(assets, 'axon-2bhk.webp'), 'WEBP', quality=90)
p7_right.save(os.path.join(assets, 'axon-3bhk.webp'), 'WEBP', quality=90)

# Page 5 has Terrace plan
p5 = Image.open(os.path.join(assets, 'page-5.webp'))
p5.save(os.path.join(assets, 'plan-terrace.webp'), 'WEBP', quality=90)

# Also ensure elevation.webp is present
el = Image.open(os.path.join(assets, 'p3_raw_1_1709x992.jpeg'))
el.save(os.path.join(assets, 'elevation.webp'), 'WEBP', quality=92)
el.save(os.path.join(assets, 'elevation-hero.jpg'), 'JPEG', quality=95)
el.save(os.path.join(assets, 'elevation-full.jpg'), 'JPEG', quality=95)

print('Cropped plans successfully!')
