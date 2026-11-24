for path in ['pages/projects.html', 'public/projects.html', 'public/projects/index.html']:
    with open(path, 'r', encoding='utf-8') as f:
        txt = f.read()
    print(f"{path}: len={len(txt)}, contains shree-anant? {'shree-anant' in txt}")
