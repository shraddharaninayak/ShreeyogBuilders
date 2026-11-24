with open('public/_nuxt/default.dc95e376.css', 'r', encoding='utf-8') as f:
    default_css = f.read()

import re
matches = re.finditer(r'(?:^|\})([^{}]*(?:footer|-w|grid)[^{}]*)\{([^}]+)\}', default_css)
for m in list(matches)[:20]:
    sel = m.group(1).strip()
    if 'footer' in sel or '-w' in sel:
        print('SEL:', sel)
        print('RULE:', m.group(2).strip()[:150])
        print('-'*30)
