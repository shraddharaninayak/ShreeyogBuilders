import os

ws = 'd:/INTERNSHIPS/SOCIAL MEDIA MANANGMENT[SKILLNEX]/WEBSITES/Shreeyogweb'
dst = os.path.join(ws, 'public/temp_malhar_inspect')
os.makedirs(dst, exist_ok=True)

html = '''<!DOCTYPE html>
<html>
<head>
<title>Shree Malhar Brochure Pages</title>
<style>
  body { background: #111; color: #fff; font-family: sans-serif; padding: 40px; margin: 0; }
  .page { margin-bottom: 50px; border-bottom: 2px solid #444; padding-bottom: 30px; }
  h2 { color: #e5a959; margin-bottom: 15px; }
  img { max-width: 900px; width: 100%; border: 1px solid #333; box-shadow: 0 4px 20px rgba(0,0,0,0.8); }
</style>
</head>
<body>
<h1>Shree Malhar Brochure Pages Inspection</h1>
'''

for i in range(1, 8):
    html += f'<div class="page"><h2>Page {i}</h2><img src="page_{i}.png" alt="Page {i}" /></div>\n'

html += '</body></html>'

with open(os.path.join(dst, 'index.html'), 'w', encoding='utf-8') as f:
    f.write(html)

print('Created index.html')
