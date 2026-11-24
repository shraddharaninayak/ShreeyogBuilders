import pymupdf
import os
from PIL import Image
import io

pdf_path = 'assets/Projects Brouchers/Shree Nandan.pdf'
out_dir = 'public/projects/shree-nandan/brochure/assets'
os.makedirs(out_dir, exist_ok=True)
doc = pymupdf.open(pdf_path)

print('Extracting page images and renders...')
for i, page in enumerate(doc):
    zoom = 2.0
    mat = pymupdf.Matrix(zoom, zoom)
    pix = page.get_pixmap(matrix=mat, alpha=False)
    img_data = pix.tobytes('png')
    im = Image.open(io.BytesIO(img_data))
    page_img_path = os.path.join(out_dir, f'page-{i+1}.webp')
    im.save(page_img_path, 'WEBP', quality=88)
    print(f'Saved page {i+1} render: {page_img_path} ({im.size[0]}x{im.size[1]})')
    
    img_list = page.get_images(full=True)
    print(f'Page {i+1} embedded images count: {len(img_list)}')
    for j, img in enumerate(img_list):
        xref = img[0]
        base_img = doc.extract_image(xref)
        w = base_img['width']
        h = base_img['height']
        ext = base_img['ext']
        print(f'  Img {j+1}: xref={xref}, ext={ext}, {w}x{h}')
        # If it's a large image (> 500px), save it as raw
        if w > 400 and h > 400:
            raw_path = os.path.join(out_dir, f'p{i+1}_raw_{j+1}_{w}x{h}.{ext}')
            with open(raw_path, 'wb') as rf:
                rf.write(base_img['image'])
            print(f'    -> saved raw: {raw_path}')
