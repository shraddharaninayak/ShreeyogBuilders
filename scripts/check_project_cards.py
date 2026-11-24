with open('public/projects/index.html', 'r', encoding='utf-8') as f:
    txt = f.read()

for slug in ['shree-anant', 'shree-nandan', 'shree-malhar']:
    idx = txt.find(slug)
    if idx != -1:
        # find enclosing project card / section
        start = max(0, txt.rfind('<article', 0, idx))
        if start == 0:
            start = max(0, txt.rfind('<div class="project-card', 0, idx))
        end = min(len(txt), txt.find('</article>', idx) + 10)
        print(f"=== {slug} Card in public/projects/index.html ===")
        print(txt[start:end])
    else:
        print(f"{slug} not found in public/projects/index.html")
