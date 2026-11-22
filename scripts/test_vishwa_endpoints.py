import urllib.request

urls = [
    'http://localhost:3000/projects',
    'http://localhost:3000/projects/shree-vishwa/brochure',
    'http://localhost:3000/projects/shree-vishwa/brochure/',
    'http://localhost:3000/projects/shree-vishwa/brochure/Shree-Vishwa-Brochure.pdf',
    'http://localhost:3000/projects/shree-vishwa/brochure/assets/logo.png',
    'http://localhost:3000/projects/shree-vishwa/brochure/assets/elevation-hero.jpg',
    'http://localhost:3000/projects/shree-vishwa/brochure/assets/plan-typical.png'
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req)
        print(f'{url} -> {res.status} ({res.headers.get("Content-Type")}, len={res.headers.get("Content-Length")})')
    except Exception as e:
        print(f'{url} -> ERROR: {e}')
