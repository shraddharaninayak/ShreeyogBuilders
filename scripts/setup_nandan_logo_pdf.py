import shutil
from PIL import Image

src_logo = 'C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795444081166_bec5348a.png'
dest_logo = 'public/projects/shree-nandan/brochure/assets/logo.png'

# Open and trim transparent margins
im = Image.open(src_logo)
bbox = im.getbbox()
if bbox:
    # pad by a few pixels
    pad = 4
    crop_box = (max(0, bbox[0]-pad), max(0, bbox[1]-pad), min(im.width, bbox[2]+pad), min(im.height, bbox[3]+pad))
    cropped = im.crop(crop_box)
    cropped.save(dest_logo, 'PNG')
    # Also save in root assets
    cropped.save('assets/logo-shree-nandan.png', 'PNG')
    print(f'Saved trimmed logo: {cropped.size} to {dest_logo}')
else:
    im.save(dest_logo, 'PNG')
    print('Saved original logo')

# Copy the PDF to public brochures
shutil.copyfile('assets/Projects Brouchers/Shree Nandan.pdf', 'public/brochures/shree-nandan-brochure.pdf')
shutil.copyfile('assets/Projects Brouchers/Shree Nandan.pdf', 'public/projects/shree-nandan/brochure/Shree-Nandan-Brochure.pdf')
print('Copied official PDFs to public/brochures and brochure folder')
