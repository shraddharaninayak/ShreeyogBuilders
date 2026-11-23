import fitz
import os
from PIL import Image

os.makedirs('references/extracted_pdf_images', exist_ok=True)
doc = fitz.open('assets/Projects Brouchers/Shree Pandurag.pdf')

for xref in [38, 1515, 1845]:
    try:
        base_img = doc.extract_image(xref)
        ext = base_img['ext']
        out_name = f'references/extracted_pdf_images/img_xref_{xref}.{ext}'
        with open(out_name, 'wb') as f:
            f.write(base_img['image'])
        im = Image.open(out_name)
        thumb_name = f'references/extracted_pdf_images/thumb_xref_{xref}.jpg'
        im.resize((800, int(800 * im.height / im.width))).save(thumb_name)
        print('Saved', out_name, im.size)
    except Exception as e:
        print('Error on xref', xref, e)
