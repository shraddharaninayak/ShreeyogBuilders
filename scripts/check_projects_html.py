with open('public/projects.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'nandan' in l.lower():
        print(f'Line {i+1}: {l.strip()[:100]}')
        for j in range(max(0, i-5), min(len(lines), i+25)):
            print(f'  {j+1}: {lines[j].rstrip()}')
        print('='*50)
