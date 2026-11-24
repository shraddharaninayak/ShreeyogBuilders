import urllib.request
import urllib.error

urls = [
    "http://localhost:3000/projects/shree-padma/brochure/",
    "http://localhost:3000/projects/shree-padma/brochure/padma-brochure.css",
    "http://localhost:3000/projects/shree-padma/brochure/padma-brochure.js",
    "http://localhost:3000/projects/shree-padma/brochure/assets/logo.png",
    "http://localhost:3000/projects/shree-padma/brochure/assets/elevation.webp",
    "http://localhost:3000/projects/shree-padma/brochure/assets/page-1.webp",
    "http://localhost:3000/projects/shree-padma/brochure/assets/page-8.webp",
    "http://localhost:3000/brochures/shree-padma-brochure.pdf",
    "http://localhost:3000/images/shreeyog/slider/shree-padma.webp",
    "http://localhost:3000/images/shreeyog/logos/shree-padma-logo.png",
    "http://localhost:3000/projects/shree-padma.html",
    "http://localhost:3000/projects"
]

all_passed = True
for url in urls:
    try:
        req = urllib.request.Request(url, method="HEAD")
        with urllib.request.urlopen(req, timeout=5) as res:
            status = res.status
            content_type = res.headers.get("Content-Type", "")
            length = res.headers.get("Content-Length", "unknown")
            print(f"[PASS] {status} {url} ({content_type}, {length} bytes)")
    except urllib.error.HTTPError as e:
        print(f"[FAIL] {e.code} {url}")
        all_passed = False
    except Exception as e:
        print(f"[ERR] {e} {url}")
        all_passed = False

# Test redirect
class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

opener = urllib.request.build_opener(NoRedirectHandler)
redirect_tests = [
    ("http://localhost:3000/brochures/shree-padma.pdf", "/brochures/shree-padma-brochure.pdf"),
    ("http://localhost:3000/projects/shree-padma/brochure", "/projects/shree-padma/brochure/")
]

for url, expected_loc in redirect_tests:
    try:
        opener.open(url)
        print(f"[FAIL] Expected redirect for {url}")
        all_passed = False
    except urllib.error.HTTPError as e:
        if e.code in (301, 302):
            loc = e.headers.get("Location")
            if loc == expected_loc:
                print(f"[PASS] {e.code} {url} -> {loc}")
            else:
                print(f"[WARN] {e.code} {url} -> {loc} (expected {expected_loc})")
        else:
            print(f"[FAIL] {e.code} {url}")
            all_passed = False

if all_passed:
    print("ALL ENDPOINT TESTS PASSED!")
else:
    print("SOME ENDPOINT TESTS FAILED!")
