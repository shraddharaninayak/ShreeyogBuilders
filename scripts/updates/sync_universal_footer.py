import os
import glob
import re

CANONICAL_FOOTER = '''<footer class="page-footer -home" string="progress" string-self-disable string-id="main-footer-index" string-enter-vp="bottom" string-exit-vp="bottom" data-v-a76684eb data-v-a41b36d1><span class="underlay" data-v-a41b36d1></span><div class="-w block" data-v-a41b36d1 data-v-e764b164><!--[--><span class="-mm no-so-me" data-v-a41b36d1>No Social Medias</span><span class="-hp independent" data-v-a41b36d1>Building spaces that inspire better living, across generations.</span><span class="-h4 -m-h6 operating" data-v-a41b36d1><span data-v-a41b36d1>Rooted in Trust.</span><span data-v-a41b36d1>Built for Generations.</span></span><nav data-v-a41b36d1><a href="/" class="-h0 -mid-h1 -m-h2 -nl places" string="split" string-split="char" data-v-a41b36d1>Home</a><a href="/about" class="-h0 -mid-h1 -m-h2 -nl objects" string="split" string-split="char" data-v-a41b36d1>About</a><a href="/projects" class="-h0 -mid-h1 -m-h2 -nl about" string="split" string-split="char" data-v-a41b36d1>Projects</a><a href="/contact" class="-h0 -mid-h1 -m-h2 -nl people" string="split" string-split="char" data-v-a41b36d1>Contact</a></nav><span class="-m copy" data-v-a41b36d1>© <span data-v-a41b36d1>2026</span> Shreeyog. All Rights Reserved.</span><span class="-m expression" data-v-a41b36d1>Shreeyog Builders &amp; Land Developers. Creating spaces with purpose since 1992.</span><!--]--></div><div class="-w after" data-v-a41b36d1 data-v-e764b164><!--[--><a href="/" class="-nl" string-copy-from="main-footer-index" data-v-a41b36d1><img src="/images/shreeyog/logo-hero.png" alt="Shreeyog Builders &amp; Land Developers" class="footer-shreeyog-brand-logo" data-v-a41b36d1></a><div class="ip-1 footer-centre-col" string-copy-from="main-footer-index" data-v-a41b36d1><span class="footer-shreeyog-title" data-v-a41b36d1>Shreeyog</span><span class="footer-shreeyog-sub" data-v-a41b36d1>Builders &amp; Land Developers</span><p class="footer-shreeyog-desc" data-v-a41b36d1>Building with trust, creating spaces for generations.</p></div><p class="-m ip-2" string-copy-from="main-footer-index" data-v-a41b36d1>Since 1992, Shreeyog has been shaping residential spaces with a commitment to thoughtful planning, quality construction and lasting relationships. Every project reflects our belief in building homes that stand the test of time.</p><!--]--></div><figure class="stone-3" string-copy-from="main-footer-index" data-v-a41b36d1 data-v-ec47b9e2><img src="/images/home/stone-3.webp" string="lazy" string-lazy="/images/home/stone-3.webp" alt="Shreeyog Builders &amp; Land Developers" data-v-ec47b9e2><!----></figure></footer>'''

CSS_LINK = '<link rel="stylesheet" href="/_nuxt/shreeyog-footer.css">'

# Target pages to sync
pages = [
    'public/index.html',
    'pages/index.html',
    'public/about/index.html',
    'pages/about.html',
    'public/projects/index.html',
    'public/projects.html',
    'pages/projects.html',
    'public/contact/index.html',
    'pages/contact.html'
]

# Add all public/projects/*.html
pages += glob.glob('public/projects/*.html')
# Add all public/projects/*/index.html except brochure
for p in glob.glob('public/projects/*/index.html'):
    if 'brochure' not in p:
        pages.append(p)

# Add all pages/projects/*.html
pages += glob.glob('pages/projects/*.html')

pages = sorted(list(set(pages)))
print(f"Total target files to sync: {len(pages)}")

updated_count = 0
for filepath in pages:
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    
    # 1. Ensure CSS link is present in <head>
    if '/_nuxt/shreeyog-footer.css' not in content:
        if '</head>' in content:
            content = content.replace('</head>', f'  {CSS_LINK}\n</head>')
            modified = True
        elif '<head>' in content:
            content = content.replace('<head>', f'<head>\n  {CSS_LINK}')
            modified = True
            
    # 2. Check for footer tag
    footer_pattern = re.compile(r'<footer[\s\S]*?<\/footer>', re.IGNORECASE)
    matches = list(footer_pattern.finditer(content))
    
    if len(matches) == 1:
        start, end = matches[0].span()
        existing_footer = content[start:end]
        if existing_footer != CANONICAL_FOOTER:
            content = content[:start] + CANONICAL_FOOTER + content[end:]
            modified = True
    elif len(matches) > 1:
        # Multiple footers! Replace first one with canonical, remove the rest
        print(f"Warning: {filepath} has {len(matches)} footers! Consolidating into 1...")
        # We replace the first one and remove remaining footers
        first_start, first_end = matches[0].span()
        # Build new content
        new_parts = [content[:first_start], CANONICAL_FOOTER]
        last_end = first_end
        for m in matches[1:]:
            new_parts.append(content[last_end:m.start()])
            last_end = m.end()
        new_parts.append(content[last_end:])
        content = ''.join(new_parts)
        modified = True
    elif len(matches) == 0:
        print(f"Note: {filepath} has no footer tag.")
        
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        updated_count += 1
        print(f"Updated: {filepath}")

print(f"\nDone! Successfully updated {updated_count} files.")
