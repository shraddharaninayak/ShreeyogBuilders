with open('data/projects.js', 'r', encoding='utf-8') as f:
    txt = f.read()

idx = txt.find('"slug": "shree-anant"')
if idx != -1:
    start = txt.rfind('{', 0, idx)
    end = txt.find('},', idx) + 1
    print(txt[start:end+5])
else:
    print("Not found")
