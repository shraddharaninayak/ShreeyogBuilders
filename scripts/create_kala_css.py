import re

with open('public/projects/shree-niwas/brochure/niwas-brochure.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace theme comments and variables
css = css.replace('SHREE NIWAS DIGITAL BROCHURE — LUXURY WARM ESPRESSO & BRONZE GOLD THEME', 'SHREE KALA APARTMENT DIGITAL BROCHURE — ROYAL GOLD & WARM AMBER LUXURY THEME')
css = css.replace('"A Classic Style of Life" • Indira Nagar, Nashik', '"A Gracious Lifestyle of Vastu, Luxury & Neighborhood" • Rane Nagar, Nashik')
css = css.replace('--sn-', '--sk-')
css = css.replace('shree-niwas', 'shree-kala')

# Fine-tune primary gold and darks for Shree Kala
css = re.sub(r'--sk-bronze-500:\s*#[0-9a-fA-F]+;', '--sk-bronze-500: #d4af37;', css)
css = re.sub(r'--sk-bronze-400:\s*#[0-9a-fA-F]+;', '--sk-bronze-400: #e5b94c;', css)
css = re.sub(r'--sk-bronze-300:\s*#[0-9a-fA-F]+;', '--sk-bronze-300: #f3cf7a;', css)

with open('public/projects/shree-kala/brochure/kala-brochure.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('Generated public/projects/shree-kala/brochure/kala-brochure.css successfully!')
