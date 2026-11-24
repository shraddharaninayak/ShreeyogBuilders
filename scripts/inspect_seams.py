import os
from PIL import Image

scratch_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\scratch"

# Let's save a 500px wide crop around the left seam of nath_enclave:
im1_test = Image.open(os.path.join(scratch_dir, "nath_enclave_16_10.jpg"))
# Pad left was 136 out of 1060 -> in 1600 width, seam is at 136 * (1600/1060) = 205 px
crop_l1 = im1_test.crop((0, 400, 450, 1000))
crop_l1.save(os.path.join(scratch_dir, "nath_seam_left.jpg"))

# Right seam: seam is at 1600 - 205 = 1395 px
crop_r1 = im1_test.crop((1150, 400, 1600, 1000))
crop_r1.save(os.path.join(scratch_dir, "nath_seam_right.jpg"))

print("Seam crops saved.")
