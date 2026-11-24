import os
import re

path = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects\shree-anant\brochure\index.html"
with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

m = re.search(r'<section[^>]*id=[\'"]overview[\'"][^>]*>([\s\S]*?)</section>', html)
if m:
    print(m.group(1))
