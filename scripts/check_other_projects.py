with open('data/projects.js', 'r', encoding='utf-8') as f:
    txt = f.read()

for slug in ['shree-nandan', 'shree-malhar', 'shree-pandurang']:
    idx = txt.find(f'"slug": "{slug}"')
    if idx != -1:
        start = txt.rfind('{', 0, idx)
        end = txt.find('},', idx) + 1
        print(f"=== {slug} ===")
        print(txt[start:end])
