with open('public/projects/shree-malhar/brochure/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
match = re.search(r'<div class="hero-media-wrapper">.*?</div>\s*</div>', html, re.DOTALL)
if match:
    print(match.group(0))
