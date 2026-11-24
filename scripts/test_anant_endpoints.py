import urllib.request
import urllib.error

urls = [
    ('http://localhost:3000/projects/shree-anant/brochure/', 200),
    ('http://localhost:3000/projects/shree-anant/brochure/anant-brochure.css', 200),
    ('http://localhost:3000/projects/shree-anant/brochure/anant-brochure.js', 200),
    ('http://localhost:3000/projects/shree-anant/brochure/assets/logo.png', 200),
    ('http://localhost:3000/projects/shree-anant/brochure/assets/elevation.webp', 200),
    ('http://localhost:3000/projects/shree-anant/brochure/assets/plan-typical.webp', 200),
    ('http://localhost:3000/projects/shree-anant/brochure/assets/plan-ground.webp', 200),
    ('http://localhost:3000/projects/shree-anant/brochure/assets/location-map.webp', 200),
    ('http://localhost:3000/projects/shree-anant/brochure/assets/page-1.webp', 200),
    ('http://localhost:3000/brochures/shree-anant-brochure.pdf', 200),
    ('http://localhost:3000/brochures/shree-anant.pdf', 200), # will follow 301 to 200
    ('http://localhost:3000/projects/shree-anant.html', 200),
    ('http://localhost:3000/projects', 200)
]

print("Testing Shree Anant HTTP Endpoints:")
all_passed = True
for url, expected in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req)
        status = res.getcode()
        ct = res.headers.get('Content-Type')
        cl = res.headers.get('Content-Length')
        print(f"  [PASS] {url} -> {status} ({ct}, {cl} bytes)")
    except urllib.error.HTTPError as e:
        print(f"  [FAIL] {url} -> HTTP {e.code}")
        all_passed = False
    except Exception as e:
        print(f"  [ERROR] {url} -> {e}")
        all_passed = False

if all_passed:
    print("\nALL ENDPOINTS PASSED SUCCESSFULLY!")
else:
    print("\nSOME ENDPOINTS FAILED!")
