import glob

files = glob.glob('public/projects/*.html') + glob.glob('public/projects/*/index.html')
updated = 0
for f in files:
    if 'brochure' in f:
        continue
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    if 'BaseImage.db5c7078.css' not in content and 'MainFooter.8675ce94.css' in content:
        content = content.replace(
            '<link rel="stylesheet" href="/_nuxt/MainFooter.8675ce94.css">',
            '<link rel="stylesheet" href="/_nuxt/BaseImage.db5c7078.css">\n  <link rel="stylesheet" href="/_nuxt/MainFooter.8675ce94.css">'
        )
        with open(f, 'w', encoding='utf-8') as fp:
            fp.write(content)
        updated += 1
print(f'Updated {updated} files.')
