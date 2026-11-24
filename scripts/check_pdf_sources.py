import os

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb"
pdf_samruddhi = os.path.join(base_dir, "public", "brochures", "shree-samruddhi-park-brochure.pdf")
pdf_venkatesh = os.path.join(base_dir, "public", "brochures", "shree-venkatesh-park-brochure.pdf")

print("Samruddhi PDF exists:", os.path.exists(pdf_samruddhi))
print("Venkatesh PDF exists:", os.path.exists(pdf_venkatesh))
