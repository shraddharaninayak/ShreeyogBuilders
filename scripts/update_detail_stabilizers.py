import os
import re

STABILIZER_SCRIPT = '''<script>
    document.documentElement.classList.add('-loaded', '-ready');
    document.documentElement.style.overflowY = 'auto';

    document.addEventListener('click', function(e) {
      var a = e.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('tel:') || href.startsWith('mailto:')) return;
      if (a.target && a.target !== '_self') return;

      try {
        var targetUrl = new URL(href, window.location.origin);
        if (targetUrl.origin === window.location.origin) {
          if (targetUrl.pathname !== window.location.pathname || targetUrl.search !== window.location.search) {
            e.stopImmediatePropagation();
            e.preventDefault();
            window.location.href = targetUrl.href;
          }
        }
      } catch (err) {}
    }, true);

    window.addEventListener('DOMContentLoaded', function() {
      document.documentElement.classList.add('-loaded', '-ready');
      document.documentElement.style.overflowY = 'auto';
      if (document.body) document.body.style.overflowY = 'auto';
      var hdr = document.querySelector('header');
      if (hdr) {
        hdr.style.opacity = '1';
        hdr.style.visibility = 'visible';
        hdr.style.pointerEvents = 'all';
      }
    });
  </script>'''

BASE_DIR = r"d:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects"

files_updated = 0

for root, dirs, files in os.walk(BASE_DIR):
    # Skip brochure directories
    if "brochure" in root:
        continue
    for f in files:
        if not f.endswith(".html"):
            continue
        # Skip main projects portfolio page as it's already updated
        if f == "projects.html":
            continue
        filepath = os.path.join(root, f)
        if os.path.normpath(filepath) == os.path.normpath(os.path.join(BASE_DIR, "index.html")):
            continue

        with open(filepath, "r", encoding="utf-8") as file:
            content = file.read()

        orig_content = content

        # 1. Ensure <html class="-loaded -ready" lang="en">
        content = re.sub(r'<html(?:\s+[^>]*?)?>', '<html class="-loaded -ready" lang="en">', content, count=1)

        # 2. Update head script
        # Check if an existing <script> inside <head> contains classList.add('-loaded'
        if "classList.add('-loaded'" in content:
            content = re.sub(
                r'<script>\s*document\.documentElement\.classList\.add\(\'-loaded\'.*?</script>',
                STABILIZER_SCRIPT,
                content,
                flags=re.DOTALL
            )
        else:
            # Insert right before </head>
            content = content.replace("</head>", f"{STABILIZER_SCRIPT}\n</head>", 1)

        # 3. Ensure shreeyog-navbar.js is loaded
        if "shreeyog-navbar.js" not in content:
            content = content.replace("</body>", '<script defer="" src="/_nuxt/shreeyog-navbar.js"></script>\n</body>')

        if content != orig_content:
            with open(filepath, "w", encoding="utf-8") as file:
                file.write(content)
            files_updated += 1
            print(f"Updated: {os.path.relpath(filepath, BASE_DIR)}")

print(f"Total files updated: {files_updated}")
