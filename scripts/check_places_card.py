with open('public/places/index.html', 'r', encoding='utf-8') as f:
    txt = f.read()

idx = txt.find('shree-anant')
if idx != -1:
    start = txt.rfind('<a ', 0, idx)
    end = txt.find('</a>', idx) + 4
    print(txt[start:end])
