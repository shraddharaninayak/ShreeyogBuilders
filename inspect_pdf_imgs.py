import glob
from PIL import Image

for f in sorted(glob.glob('samruddhi_pdf_img_*.*')):
    im = Image.open(f)
    # Save a small preview
    im.resize((300, int(300 * im.height / im.width))).save(f"thumb_{f}.jpg")
    print(f"Saved thumb_{f}.jpg ({im.size})")
