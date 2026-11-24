# Update server.js and vercel.json for shree-shakuntal
with open('server.js', 'r', encoding='utf-8') as f:
    srv = f.read()

shakuntal_server_routes = """    '/projects/shree-shakuntal/brochure': '/projects/shree-shakuntal/brochure/',
    '/brochures/shree-shakuntal.pdf': '/brochures/shree-shakuntal-brochure.pdf',
    '/projects/shree-shakuntal/Shree-Shakuntal.pdf': '/brochures/shree-shakuntal-brochure.pdf',
    '/projects/shree-shakuntal/Shree-Shakuntal-Brochure.pdf': '/brochures/shree-shakuntal-brochure.pdf',
    '/projects/shree-shakuntal/brochure/Shree-Shakuntal-Brochure.pdf': '/brochures/shree-shakuntal-brochure.pdf',
    '/projects/shree-shakuntal/brochure/brochure.pdf': '/brochures/shree-shakuntal-brochure.pdf'
  };"""

if 'shree-shakuntal' not in srv:
    target = "'/projects/shree-vithal-park/brochure/brochure.pdf': '/brochures/shree-vithal-park-brochure.pdf'\n  };"
    replacement = "'/projects/shree-vithal-park/brochure/brochure.pdf': '/brochures/shree-vithal-park-brochure.pdf',\n\n" + shakuntal_server_routes
    srv = srv.replace(target, replacement)
    with open('server.js', 'w', encoding='utf-8') as f:
        f.write(srv)
    print('Updated server.js')
else:
    print('server.js already contains shree-shakuntal')

# Update vercel.json
with open('vercel.json', 'r', encoding='utf-8') as f:
    v = f.read()

shakuntal_vercel_routes = """,
    { "source": "/projects/shree-shakuntal/brochure", "destination": "/projects/shree-shakuntal/brochure/", "permanent": true },
    { "source": "/brochures/shree-shakuntal.pdf", "destination": "/brochures/shree-shakuntal-brochure.pdf", "permanent": true },
    { "source": "/projects/shree-shakuntal/Shree-Shakuntal.pdf", "destination": "/brochures/shree-shakuntal-brochure.pdf", "permanent": true },
    { "source": "/projects/shree-shakuntal/Shree-Shakuntal-Brochure.pdf", "destination": "/brochures/shree-shakuntal-brochure.pdf", "permanent": true },
    { "source": "/projects/shree-shakuntal/brochure/Shree-Shakuntal-Brochure.pdf", "destination": "/brochures/shree-shakuntal-brochure.pdf", "permanent": true },
    { "source": "/projects/shree-shakuntal/brochure/brochure.pdf", "destination": "/brochures/shree-shakuntal-brochure.pdf", "permanent": true }"""

if 'shree-shakuntal' not in v:
    target_v = '{ "source": "/projects/shree-vithal-park/brochure/brochure.pdf", "destination": "/brochures/shree-vithal-park-brochure.pdf", "permanent": true }'
    replacement_v = target_v + shakuntal_vercel_routes
    v = v.replace(target_v, replacement_v)
    with open('vercel.json', 'w', encoding='utf-8') as f:
        f.write(v)
    print('Updated vercel.json')
else:
    print('vercel.json already contains shree-shakuntal')
