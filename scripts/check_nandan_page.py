with open('public/projects/shree-malhar.html', 'r', encoding='utf-8') as f:
    c = f.read()

idx = c.find('Open Digital Brochure')
if idx != -1:
    print(c[idx-200:idx+300])
