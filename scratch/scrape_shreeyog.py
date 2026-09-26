import urllib.request
import re
import os
import json
from bs4 import BeautifulSoup

BASE_URL = "https://shreeyogbuilders.com/"

def fetch_url(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req) as response:
            return response.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return ""

def main():
    home_html = fetch_url(BASE_URL)
    soup = BeautifulSoup(home_html, 'html.parser')
    
    links = set()
    for a in soup.find_all('a', href=True):
        href = a['href']
        if href.startswith(BASE_URL) or href.startswith('/'):
            if href.startswith('/'):
                href = BASE_URL.rstrip('/') + href
            links.add(href)
            
    print(f"Discovered {len(links)} internal links.")
    for l in sorted(links):
        print("LINK:", l)
        
    page_data = {}
    
    all_pages = [BASE_URL] + list(links)
    visited = set()
    
    for url in all_pages:
        if url in visited or '#' in url or 'wp-admin' in url or 'feed' in url:
            continue
        visited.add(url)
        print(f"\n--- Scraping {url} ---")
        html = fetch_url(url)
        if not html:
            continue
        page_soup = BeautifulSoup(html, 'html.parser')
        
        imgs = []
        for img in page_soup.find_all(['img', 'source']):
            src = img.get('src') or img.get('srcset') or img.get('data-src')
            alt = img.get('alt', '')
            parent_text = img.parent.get_text(strip=True)[:100] if img.parent else ""
            if src:
                # Handle srcset multiple urls
                src_urls = [s.strip().split(' ')[0] for s in src.split(',')]
                for s_url in src_urls:
                    if s_url and not s_url.startswith('data:'):
                        imgs.append({
                            'src': s_url,
                            'alt': alt,
                            'parent_text': parent_text
                        })
        
        page_data[url] = imgs
        print(f"Found {len(imgs)} images on {url}")
        
    with open('scratch/shreeyog_scraped.json', 'w', encoding='utf-8') as f:
        json.dump(page_data, f, indent=2)
        
    print("\nSaved to scratch/shreeyog_scraped.json")

if __name__ == '__main__':
    main()
