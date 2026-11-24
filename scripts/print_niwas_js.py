with open('data/projects.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if '"slug": "shree-niwas"' in line:
        start = max(0, i-2)
        end = min(len(lines), i+45)
        for j in range(start, end):
            print(f"{j+1}: {lines[j]}", end='')
