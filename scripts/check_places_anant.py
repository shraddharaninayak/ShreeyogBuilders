with open('public/places/index.html', 'r', encoding='utf-8') as f:
    txt = f.read()

idx = txt.find('shree-anant')
if idx != -1:
    print(txt[idx-300:idx+400])
