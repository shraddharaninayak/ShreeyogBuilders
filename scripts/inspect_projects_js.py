import os
import re

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb"
projects_html = os.path.join(base_dir, 'public', 'projects', 'index.html')

with open(projects_html, 'r', encoding='utf-8') as f:
    html = f.read()

# Let's search for "Shree Nath Enclave" across all script tags or data structures
lines = html.splitlines()
for i, line in enumerate(lines):
    if 'Shree Nath Enclave' in line or 'Shree Samruddhi Park' in line:
        for j in range(max(0, i-5), min(len(lines), i+15)):
            print(f"{j+1}: {lines[j]}")
        print("-------------------")
