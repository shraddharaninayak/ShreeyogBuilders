import os
import re

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb"
projects_html = os.path.join(base_dir, 'public', 'projects', 'index.html')

with open(projects_html, 'r', encoding='utf-8') as f:
    html = f.read()

lines = html.splitlines()

# Search for highlightedItems and completedItems
for i, line in enumerate(lines):
    if 'highlightedItems' in line or 'completedItems' in line:
        for j in range(i, min(len(lines), i + 25)):
            print(f"{j+1}: {lines[j]}")
        print("====================")
