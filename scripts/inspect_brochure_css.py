import os

base_dir = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects"

for proj in ["shree-safalya", "shree-nandan", "shree-samruddhi-park", "shree-venkatesh-park"]:
    css_path = os.path.join(base_dir, proj, "brochure", f"{proj.split('-')[1]}-brochure.css")
    if not os.path.exists(css_path):
        # find any css in brochure
        brochure_dir = os.path.join(base_dir, proj, "brochure")
        for f in os.listdir(brochure_dir):
            if f.endswith('.css'):
                css_path = os.path.join(brochure_dir, f)
                break
    with open(css_path, 'r', encoding='utf-8') as f:
        css = f.read()
    print(f"================ {proj} ({os.path.basename(css_path)}) ================")
    # Extract overview-image-card, overview-building-img, overview-image-overlay, overview-visual
    lines = css.splitlines()
    for i, line in enumerate(lines):
        if any(k in line for k in ['overview-image', 'overview-building', 'overview-visual', 'overview-grid']):
            for j in range(max(0, i-1), min(len(lines), i+20)):
                print(lines[j])
            print("---")
            break
