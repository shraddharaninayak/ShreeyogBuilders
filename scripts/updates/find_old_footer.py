# -*- coding: utf-8 -*-
import os

for root, dirs, files in os.walk('.'):
    if any(ignore in root for ignore in ['.git', 'node_modules', '.user_uploaded', 'brain']):
        continue
    for f in files:
        if f.endswith('.html'):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                c = fp.read()
                if 'main-footer-index' in c or ('page-footer' in c and '-shreeyog-premium' not in c):
                    print('Matches old footer:', p)
