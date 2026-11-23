from bs4 import BeautifulSoup
import glob
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from update_footer import NEW_FOOTER_HTML

def place_footer_in_body(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser')
    
    # Remove any existing footer elements
    footers = soup.find_all('footer')
    for ft in footers:
        ft.decompose()
        
    body = soup.find('body')
    if not body:
        return False, "No body tag found"
        
    new_footer_soup = BeautifulSoup(NEW_FOOTER_HTML, 'html.parser')
    body.append(new_footer_soup)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(str(soup))
        
    return True, "Updated successfully"

if __name__ == "__main__":
    target_files = [
        'public/index.html',
        'pages/index.html',
        'public/about/index.html',
        'pages/about.html',
        'public/contact/index.html',
        'pages/contact.html',
        'public/projects.html',
        'pages/projects.html',
        'public/projects/index.html'
    ]

    for p in glob.glob('public/projects/*.html'):
        if p not in target_files:
            target_files.append(p)

    for p in glob.glob('public/projects/*/index.html'):
        if 'brochure' in p: continue
        if p not in target_files:
            target_files.append(p)

    for p in glob.glob('pages/projects/*.html'):
        if p not in target_files:
            target_files.append(p)

    print(f'Total target files: {len(target_files)}')
    success = 0
    for f in target_files:
        ok, msg = place_footer_in_body(f)
        if ok:
            success += 1
        else:
            print(f'{f}: {msg}')
    print(f'Successfully placed footer in body across {success} of {len(target_files)} files.')
