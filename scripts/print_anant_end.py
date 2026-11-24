with open('data/projects.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for j in range(434, min(len(lines), 442)):
    print(f"{j+1}: {lines[j]}", end='')
