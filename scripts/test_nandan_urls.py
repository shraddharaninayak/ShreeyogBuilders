import urllib.request

urls = [
    'http://localhost:3000/projects/shree-nandan/brochure/',
    'http://localhost:3000/projects/shree-nandan/brochure/nandan-brochure.css',
    'http://localhost:3000/projects/shree-nandan/brochure/nandan-brochure.js',
    'http://localhost:3000/projects/shree-nandan/brochure/assets/logo.png',
    'http://localhost:3000/projects/shree-nandan/brochure/assets/elevation.webp',
    'http://localhost:3000/projects/shree-nandan/brochure/assets/page-1.webp',
    'http://localhost:3000/brochures/shree-nandan-brochure.pdf',
    'http://localhost:3000/projects',
    'http://localhost:3000/projects/shree-nandan'
]

for u in urls:
    try:
        req = urllib.request.urlopen(u)
        print(f'{u}: {req.getcode()} (content-type: {req.headers.get("Content-Type")}, length: {req.headers.get("Content-Length")})')
    except Exception as e:
        print(f'{u}: FAILED -> {e}')
