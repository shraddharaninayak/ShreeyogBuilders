import os

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects"

for proj in ["shree-samruddhi-park", "shree-venkatesh-park"]:
    css_path = os.path.join(base_dir, proj, "brochure", f"{proj.split('-')[1]}-brochure.css")
    with open(css_path, 'r', encoding='utf-8') as fp:
        css = fp.read()
    print(f"=== {proj} ===")
    lines = css.splitlines()
    for i, line in enumerate(lines):
        if 'overview-image-overlay' in line:
            for j in range(max(0, i-1), min(len(lines), i+15)):
                print(lines[j])
            print("---")
