with open('data/projects.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if '"id": 14' in l or '"id":14' in l:
        for j in range(max(0, i-2), min(len(lines), i+35)):
            print(f'{j+1}: {lines[j].rstrip()}')
