with open('server.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines[115:170]):
    print(f'{i+116}: {l.rstrip()}')
