# -*- coding: utf-8 -*-
"""
Applies the exact Homepage luxury dark footer to the Projects page.
Replaces the old white wavy footer with the exact -shreeyog-premium footer from public/index.html.
Ensures /_nuxt/shreeyog-footer.css is linked in all HTML files and in the Nuxt places component.
"""
import os
import re
import subprocess

def main():
    # 1. Read homepage footer from public/index.html
    with open('public/index.html', 'r', encoding='utf-8') as f:
        home_html = f.read()

    f_start = home_html.find('<footer class="page-footer -shreeyog-premium"')
    if f_start == -1:
        f_start = home_html.find('-shreeyog-premium')
        f_start = home_html.rfind('<footer', 0, f_start)

    f_end = home_html.find('</footer>', f_start) + len('</footer>')
    homepage_footer = home_html[f_start:f_end].strip()

    print(f"Extracted Homepage Footer (length: {len(homepage_footer)} chars)")
    print(homepage_footer[:250])
    print("...")
    print(homepage_footer[-150:])

    # CSS link to insert in <head>
    css_link = '<link rel="stylesheet" href="/_nuxt/shreeyog-footer.css" id="shreeyog-footer-css">'

    # 2. Update Projects Page files
    project_files = [
        'public/projects/index.html',
        'public/projects.html',
        'public/places/index.html',
        'pages/projects.html'
    ]

    for p in project_files:
        if not os.path.exists(p):
            print(f"File not found: {p}")
            continue

        with open(p, 'r', encoding='utf-8') as f:
            content = f.read()

        # A. Replace footer
        footer_pattern = re.compile(r'<footer class="page-footer[^>]*>.*?</footer>', re.DOTALL)
        if footer_pattern.search(content):
            content = footer_pattern.sub(homepage_footer, content)
            print(f"Replaced footer in {p}")
        else:
            print(f"Warning: Could not find footer in {p}")

        # B. Ensure shreeyog-footer.css is in <head>
        if 'shreeyog-footer.css' not in content:
            if 'shreeyog-projects.css' in content:
                content = content.replace(
                    'href="/_nuxt/shreeyog-projects.css">',
                    'href="/_nuxt/shreeyog-projects.css">\n  ' + css_link
                )
                print(f"Added shreeyog-footer.css link in {p}")
            elif '</head>' in content:
                content = content.replace('</head>', f'  {css_link}\n</head>')
                print(f"Added shreeyog-footer.css link before </head> in {p}")

        with open(p, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Successfully saved {p}")

    # 3. Update build_places_component.js to ensure shreeyog-footer-css is loaded
    bpc_path = 'scripts/updates/build_places_component.js'
    with open(bpc_path, 'r', encoding='utf-8') as f:
        bpc_code = f.read()

    css_inject = '''      if (!document.getElementById("shreeyog-footer-css")) {
        const flink = document.createElement("link");
        flink.id = "shreeyog-footer-css";
        flink.rel = "stylesheet";
        flink.href = "/_nuxt/shreeyog-footer.css";
        document.head.appendChild(flink);
      }'''

    if 'shreeyog-footer-css' not in bpc_code:
        marker = 'document.head.appendChild(link);\n      }'
        if marker in bpc_code:
            bpc_code = bpc_code.replace(marker, marker + '\n\n' + css_inject)
            with open(bpc_path, 'w', encoding='utf-8') as f:
                f.write(bpc_code)
            print("Updated build_places_component.js with shreeyog-footer-css injection")

    # 4. Rebuild places Nuxt component
    subprocess.run(['node', 'scripts/updates/build_places_component.js'], check=True)
    print("Rebuilt places component successfully!")

if __name__ == '__main__':
    main()
