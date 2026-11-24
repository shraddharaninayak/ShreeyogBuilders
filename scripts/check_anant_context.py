with open('public/projects/index.html', 'r', encoding='utf-8') as f:
    txt = f.read()

idx = txt.find('{"name":"Shree Anant"')
if idx != -1:
    print(txt[idx-400:idx+600])
