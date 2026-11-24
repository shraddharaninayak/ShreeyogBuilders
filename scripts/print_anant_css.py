import os

p_anant = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects\shree-anant\brochure\anant-brochure.css"
with open(p_anant, 'r', encoding='utf-8') as f:
    css = f.read()

lines = css.splitlines()
for i, line in enumerate(lines):
    if '.hero-elevation-frame' in line or '.hero-visual' in line or '.hero-grid' in line:
        for j in range(max(0, i-1), min(len(lines), i+25)):
            print(lines[j])
        print("--------------------")
