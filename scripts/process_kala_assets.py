import os
import shutil
import fitz
from PIL import Image

def process_assets():
    logo_src = r'C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795520927998_3d6421a6.png'
    bldg_src = r'C:/Users/nshra/.gemini/antigravity/brain/9519c930-8a4e-4d87-8f8c-fefffd44673c/.user_uploaded/media_1795520953432_70412986.jpg'
    pdf_src = r'assets/Projects Brouchers/Shree Kala Brochure.pdf'

    # Create destination directories
    os.makedirs('public/images/shreeyog/logos', exist_ok=True)
    os.makedirs('public/images/shreeyog/slider', exist_ok=True)
    os.makedirs('public/brochures', exist_ok=True)
    os.makedirs('public/projects/shree-kala/brochure/assets', exist_ok=True)
    os.makedirs('scratch/kala_pages', exist_ok=True)

    # 1. Logo
    logo = Image.open(logo_src)
    logo.save('public/images/shreeyog/logos/shree-kala-logo.png', 'PNG')
    logo.save('public/projects/shree-kala/brochure/assets/logo.png', 'PNG')
    print('Saved logos.')

    # 2. Building Image
    bldg = Image.open(bldg_src)
    bldg.save('public/images/shreeyog/slider/shree-kala.webp', 'WEBP', quality=92)
    bldg.save('public/images/shreeyog/slider/shree-kala.jpg', 'JPEG', quality=92)
    bldg.save('public/projects/shree-kala/brochure/assets/elevation.webp', 'WEBP', quality=92)
    bldg.save('public/projects/shree-kala/brochure/assets/elevation-hero.jpg', 'JPEG', quality=92)
    print('Saved building images.')

    # 3. PDF
    shutil.copyfile(pdf_src, 'public/brochures/shree-kala-brochure.pdf')
    shutil.copyfile(pdf_src, 'public/projects/shree-kala/brochure/assets/Shree-Kala-Brochure.pdf')
    print('Copied PDFs.')

    # 4. Render PDF pages at 200 DPI
    doc = fitz.open(pdf_src)
    for i, page in enumerate(doc):
        pix = page.get_pixmap(dpi=200)
        pix.save(f'scratch/kala_pages/page_{i+1}.png')
        # Also save webp for gallery
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        img.save(f'public/projects/shree-kala/brochure/assets/page-{i+1}.webp', 'WEBP', quality=88)
    print('Rendered and saved 4 brochure pages.')

    # 5. Extract Crops
    # Page 1: Location Map on left
    p1 = Image.open('scratch/kala_pages/page_1.png')
    w, h = p1.size
    # Left half: location plan
    loc_crop = p1.crop((int(w * 0.05), int(h * 0.08), int(w * 0.48), int(h * 0.72)))
    loc_crop.save('public/projects/shree-kala/brochure/assets/location-map.webp', 'WEBP', quality=90)

    # Page 2: Typical Floor Plan 1 (Flats 1, 4, 5, 8, 9, 12, 13, 16)
    p2 = Image.open('scratch/kala_pages/page_2.png')
    w2, h2 = p2.size
    plan1_crop = p2.crop((int(w2 * 0.51), int(h2 * 0.12), int(w2 * 0.96), int(h2 * 0.88)))
    plan1_crop.save('public/projects/shree-kala/brochure/assets/plan-typical-1.webp', 'WEBP', quality=90)

    # Page 3: Typical Floor Plan 2 (Flats 2, 3, 6, 7, 10, 11, 14, 15)
    p3 = Image.open('scratch/kala_pages/page_3.png')
    w3, h3 = p3.size
    plan2_crop = p3.crop((int(w3 * 0.04), int(h3 * 0.12), int(w3 * 0.49), int(h3 * 0.88)))
    plan2_crop.save('public/projects/shree-kala/brochure/assets/plan-typical-2.webp', 'WEBP', quality=90)

    # Page 4: Parking Floor Plan
    p4 = Image.open('scratch/kala_pages/page_4.png')
    w4, h4 = p4.size
    parking_crop = p4.crop((int(w4 * 0.51), int(h4 * 0.15), int(w4 * 0.98), int(h4 * 0.88)))
    parking_crop.save('public/projects/shree-kala/brochure/assets/plan-parking.webp', 'WEBP', quality=90)

    print('Saved cropped floor plans and location map.')

if __name__ == '__main__':
    process_assets()
