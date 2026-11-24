with open('public/projects/index.html', 'r', encoding='utf-8') as f:
    txt = f.read()

idx = txt.find('shree-nandan')
if idx != -1:
    print("Around shree-nandan:")
    print(txt[idx-300:idx+600])

idx_anant = txt.find('shree-anant')
if idx_anant != -1:
    print("Around shree-anant:")
    print(txt[idx_anant-300:idx_anant+600])
