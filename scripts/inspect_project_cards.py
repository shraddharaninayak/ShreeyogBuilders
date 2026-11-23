from bs4 import BeautifulSoup

for page in ['public/projects/index.html']:
    print(f"\n==================== {page} ====================")
    with open(page, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    # Check satellite cards
    sat_cards = soup.select('.satellite-card')
    print(f"Satellite cards count: {len(sat_cards)}")
    for c in sat_cards:
        print(f"  Satellite: {c.get('title')} -> href='{c.get('href')}', data-project-href='{c.get('data-project-href')}'")
        
    # Check featured section
    feat_name = soup.select_one('#featName')
    feat_link = soup.select_one('#featLink')
    feat_pdf = soup.select_one('#featPdfLink')
    print(f"\nFeatured project: '{feat_name.get_text(strip=True) if feat_name else 'N/A'}'")
    print(f"  featLink -> href='{feat_link.get('href') if feat_link else None}'")
    print(f"  featPdfLink -> href='{feat_pdf.get('href') if feat_pdf else None}'")
    
    # Check arch cards
    arch_cards = soup.select('.arch-card')
    print(f"\nArch cards count: {len(arch_cards)}")
    for idx, c in enumerate(arch_cards):
        text_lines = [s.strip() for s in c.stripped_strings if s.strip()]
        name = text_lines[0] if text_lines else "Empty"
        full_text = " | ".join(text_lines[:4])
        print(f"  {idx+1:2d}. [{name}] {full_text} -> href='{c.get('href')}', data-project-href='{c.get('data-project-href')}'")
