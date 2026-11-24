import re

# 1. Update public/_nuxt/shreeyog-projects.css
css_path = 'public/_nuxt/shreeyog-projects.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

old_css_pattern = re.compile(
    r'/\* Completed Stage 11-Satellite Balanced Framing \(6 Left, 5 Right\) \*/.*?'
    r'\.completed-stage \.sat-18\s*\{\s*display:\s*none\s*!important;\s*\}',
    re.DOTALL
)

new_css_block = """/* Completed Stage 13-Satellite Balanced Framing (7 Left, 6 Right) */
  .completed-stage { min-height: 1040px !important; }

  /* Left Side: 7 cards neatly stacked from top to bottom */
  .completed-stage .sat-1  { top: 1.5% !important; left: 2% !important; width: 210px !important; height: 130px !important; transform: none !important; }
  .completed-stage .sat-7  { top: 15.5% !important; left: 1.2% !important; width: 195px !important; height: 125px !important; transform: none !important; }
  .completed-stage .sat-5  { top: 29.5% !important; left: 1.2% !important; width: 195px !important; height: 125px !important; transform: none !important; }
  .completed-stage .sat-9  { top: 43.5% !important; left: 1.2% !important; width: 195px !important; height: 125px !important; transform: none !important; }
  .completed-stage .sat-11 { top: 57.5% !important; left: 1.2% !important; width: 195px !important; height: 125px !important; transform: none !important; }
  .completed-stage .sat-13 { top: 71.5% !important; left: 1.2% !important; width: 195px !important; height: 125px !important; transform: none !important; }
  .completed-stage .sat-2  { bottom: 1.5% !important; left: 2% !important; width: 210px !important; height: 130px !important; transform: none !important; }

  /* Right Side: 6 cards neatly spaced */
  .completed-stage .sat-3  { top: 1.5% !important; right: 2% !important; width: 210px !important; height: 130px !important; transform: none !important; }
  .completed-stage .sat-8  { top: 17% !important; right: 1.2% !important; width: 195px !important; height: 125px !important; transform: none !important; }
  .completed-stage .sat-6  { top: 32.5% !important; right: 1.2% !important; width: 195px !important; height: 125px !important; transform: none !important; }
  .completed-stage .sat-10 { top: 48% !important; right: 1.2% !important; width: 195px !important; height: 125px !important; transform: none !important; }
  .completed-stage .sat-12 { top: 63.5% !important; right: 1.2% !important; width: 195px !important; height: 125px !important; transform: none !important; }
  .completed-stage .sat-4  { bottom: 1.5% !important; right: 2% !important; width: 210px !important; height: 130px !important; transform: none !important; }

  /* Safety rule for any potential extras beyond 13 */
  .completed-stage .sat-14,
  .completed-stage .sat-15,
  .completed-stage .sat-16,
  .completed-stage .sat-17,
  .completed-stage .sat-18 {
    display: none !important;
  }"""

if old_css_pattern.search(css):
    css = old_css_pattern.sub(new_css_block, css)
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(css)
    print('Updated completed-stage CSS positioning in public/_nuxt/shreeyog-projects.css')
else:
    print('Could not find exact old completed-stage CSS block pattern in shreeyog-projects.css')

# 2. Update scripts/updates/build_projects_pages.js
js_path = 'scripts/updates/build_projects_pages.js'
with open(js_path, 'r', encoding='utf-8') as f:
    js = f.read()

# Add 'shree-shakuntal' to completedSlugs
if "'shree-shakuntal'" not in js:
    js = js.replace(
        "'shree-vithal-park',\n  'shree-swarup'",
        "'shree-vithal-park',\n  'shree-shakuntal',\n  'shree-swarup'"
    )
    print("Added 'shree-shakuntal' to completedSlugs")

# Fix sat-num format so it uses 2 digits properly (e.g. 02..09, 10, 11, etc.)
js = js.replace(
    '<span class="sat-num">0${idx + 2}</span>',
    '<span class="sat-num">${(idx + 2) < 10 ? "0" + (idx + 2) : (idx + 2)}</span>'
)

# Update subtitle to fourteen
js = js.replace(
    'Thirteen delivered residential landmarks',
    'Fourteen delivered residential landmarks'
)

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(js)
print('Updated scripts/updates/build_projects_pages.js successfully.')
