import urllib.request

urls = [
    'http://localhost:3000/brochures/shree-nath-enclave-brochure.pdf',
    'http://localhost:3000/brochures/shree-nath-enclave.pdf',
    'http://localhost:3000/projects/shree-nath-enclave/Shree-Nath-Enclave.pdf',
    'http://localhost:3000/projects/shree-nath-enclave/Shree-Nath-Enclave-Brochure.pdf',
    'http://localhost:3000/projects/shree-nath-enclave/brochure/Shree-Nath-Enclave-Brochure.pdf',
    'http://localhost:3000/projects/shree-nath-enclave/brochure/brochure.pdf',
    'http://localhost:3000/projects/shree-nath-enclave/brochure/',
    'http://localhost:3000/images/shreeyog/logos/shree-nath-enclave-logo.png'
]

for u in urls:
    req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
    res = urllib.request.urlopen(req)
    cl = res.headers.get('Content-Length')
    sz = f"{int(cl)/1024/1024:.2f} MB" if cl and cl.isdigit() else str(cl)
    print(f"[{res.status}] {u} ({res.headers.get('Content-Type')}, {sz})")
