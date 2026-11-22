import os

src_path = 'references/brochures/bramhand.html'
dst_path = 'public/projects/shree-bramhand/brochure/index.html'

with open(src_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Update Return to Projects link to /projects
content = content.replace('../projects.html', '/projects')

# Update PDF download links to Shree-Bramhand-Brochure.pdf
content = content.replace('href="brochure.pdf"', 'href="Shree-Bramhand-Brochure.pdf"')

# Update overview media frame image to preview-cover.jpg
content = content.replace('src="assets/images/elevation-full.jpg"', 'src="assets/images/preview-cover.jpg"')
content = content.replace('<div class="overview-frame">', '<div class="overview-frame" data-zoomable style="cursor:pointer;" title="Click to preview full brochure cover">')

with open(dst_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f'Written {dst_path} successfully. Total size: {len(content)} bytes.')
