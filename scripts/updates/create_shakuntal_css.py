with open('public/projects/shree-vrundavan/brochure/vrundavan-brochure.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('--sv-', '--ss-')

old_palette = """  /* Brand Palette */
  --ss-dark-950: #061009;
  --ss-dark-900: #0b1a10;
  --ss-dark-850: #102517;
  --ss-dark-800: #173320;
  --ss-dark-750: #1f422b;

  /* Botanical Green Accents */
  --ss-green-100: #e8f5e9;
  --ss-green-200: #c8e6c9;
  --ss-green-300: #81c784;
  --ss-green-400: #4caf50;
  --ss-green-500: #2e7d32;
  --ss-green-600: #1b5e20;

  /* Champagne / Gold Accents */
  --ss-gold-100: #fbf8eb;
  --ss-gold-200: #f4ecc6;
  --ss-gold-300: #edd88c;
  --ss-gold-400: #e2c456;
  --ss-gold-500: #d4af37;
  --ss-gold-600: #a88725;

  /* Backgrounds & Surfaces */
  --ss-bg-dark: #08140c;
  --ss-bg-card-dark: #0f2416;
  --ss-bg-white: #ffffff;
  --ss-bg-offwhite: #f6f9f7;
  --ss-bg-subtle: #edf3ef;
  --ss-border-subtle: rgba(46, 125, 50, 0.2);
  --ss-border-gold: rgba(212, 175, 55, 0.32);
  --ss-border-dark: rgba(255, 255, 255, 0.08);

  /* Typography Colors */
  --ss-text-dark: #0a180e;
  --ss-text-body: #2d3e33;
  --ss-text-muted: #5e7366;
  --ss-text-white: #ffffff;
  --ss-text-cream: #f6f9f7;
  --ss-text-dim: #9fb3a6;"""

new_palette = """  /* Brand Palette: Imperial Gold & Deep Obsidian */
  --ss-dark-950: #0a0c0e;
  --ss-dark-900: #111418;
  --ss-dark-850: #181d23;
  --ss-dark-800: #21272f;
  --ss-dark-750: #2b323c;

  /* Pure Gold & Champagne Accents */
  --ss-gold-100: #fdfaf0;
  --ss-gold-200: #f9f0ce;
  --ss-gold-300: #f2e29e;
  --ss-gold-400: #e8d06c;
  --ss-gold-500: #d4af37;
  --ss-gold-600: #b59226;

  /* Warm Accent */
  --ss-green-100: #fff8e1;
  --ss-green-200: #ffecb3;
  --ss-green-300: #ffd54f;
  --ss-green-400: #ffca28;
  --ss-green-500: #d4af37;
  --ss-green-600: #b59226;

  /* Backgrounds & Surfaces */
  --ss-bg-dark: #0d1014;
  --ss-bg-card-dark: #151a21;
  --ss-bg-white: #ffffff;
  --ss-bg-offwhite: #fbfbfa;
  --ss-bg-subtle: #f0f2f5;
  --ss-border-subtle: rgba(212, 175, 55, 0.25);
  --ss-border-gold: rgba(212, 175, 55, 0.4);
  --ss-border-dark: rgba(255, 255, 255, 0.08);

  /* Typography Colors */
  --ss-text-dark: #0d1014;
  --ss-text-body: #2e343d;
  --ss-text-muted: #657182;
  --ss-text-white: #ffffff;
  --ss-text-cream: #fbfbfa;
  --ss-text-dim: #9da8b7;"""

css = css.replace(old_palette, new_palette)
css = css.replace('VRUNDAVAN', 'SHAKUNTAL').replace('Vrundavan', 'Shakuntal')

with open('public/projects/shree-shakuntal/brochure/shakuntal-brochure.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('Generated public/projects/shree-shakuntal/brochure/shakuntal-brochure.css')
