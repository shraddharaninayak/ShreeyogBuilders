import os

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects"

for proj in ["shree-samruddhi-park", "shree-venkatesh-park", "shree-safalya", "shree-nandan"]:
    for f in os.listdir(os.path.join(base_dir, proj, "brochure")):
        if f.endswith('.css'):
            css_path = os.path.join(base_dir, proj, "brochure", f)
            with open(css_path, 'r', encoding='utf-8') as fp:
                css = fp.read()
            print(f"=== {proj} ===")
            lines = css.splitlines()
            capture = False
            for line in lines:
                if '.overview-image-card' in line:
                    capture = True
                if capture:
                    print(line)
                    if line.startswith('}'):
                        capture = False
            # Also find overview-building-img
            for line in lines:
                if '.overview-building-img' in line:
                    capture = True
                if capture:
                    print(line)
                    if line.startswith('}'):
                        capture = False
