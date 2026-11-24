from PIL import Image
import os

ws = 'd:/INTERNSHIPS/SOCIAL MEDIA MANANGMENT[SKILLNEX]/WEBSITES/Shreeyogweb'
assets = os.path.join(ws, 'public/projects/shree-malhar/brochure/assets')

# Page 3: Floor plan
p3 = Image.open(os.path.join(assets, 'page-3.webp'))
# Save floor plan
p3.save(os.path.join(assets, 'plan-typical.webp'), 'WEBP', quality=88)

# Page 4: Axonometric view
p4 = Image.open(os.path.join(assets, 'page-4.webp'))
p4.save(os.path.join(assets, 'axonometric-view.webp'), 'WEBP', quality=88)

# Page 5: Terrace layout & renders
p5 = Image.open(os.path.join(assets, 'page-5.webp'))
p5.save(os.path.join(assets, 'plan-terrace.webp'), 'WEBP', quality=88)

# Page 6: Ground floor & location map
p6 = Image.open(os.path.join(assets, 'page-6.webp'))
p6.save(os.path.join(assets, 'plan-ground.webp'), 'WEBP', quality=88)

# Also crop location map specifically from page 6 (left side / top-left area)
w, h = p6.size
# Top left is location plan, bottom right is ground floor
loc_map = p6.crop((0, 0, int(w * 0.55), int(h * 0.65)))
loc_map.save(os.path.join(assets, 'location-map.webp'), 'WEBP', quality=88)

print('All supplementary plan images saved')
