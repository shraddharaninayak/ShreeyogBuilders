with open('public/projects/shree-vrundavan/brochure/vrundavan-brochure.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace prefix --sv- with --vp-
css = css.replace('--sv-', '--vp-')

# Adjust palette for Shree Vithal Park (Saffron Orange & Sacred Green & Warm Charcoal Obsidian)
old_palette = """  /* Brand Palette */
  --vp-dark-950: #061009;
  --vp-dark-900: #0b1a10;
  --vp-dark-850: #102517;
  --vp-dark-800: #173320;
  --vp-dark-750: #1f422b;

  /* Botanical Green Accents */
  --vp-green-100: #e8f5e9;
  --vp-green-200: #c8e6c9;
  --vp-green-300: #81c784;
  --vp-green-400: #4caf50;
  --vp-green-500: #2e7d32;
  --vp-green-600: #1b5e20;

  /* Champagne / Gold Accents */
  --vp-gold-100: #fbf8eb;
  --vp-gold-200: #f4ecc6;
  --vp-gold-300: #edd88c;
  --vp-gold-400: #e2c456;
  --vp-gold-500: #d4af37;
  --vp-gold-600: #a88725;

  /* Backgrounds & Surfaces */
  --vp-bg-dark: #08140c;
  --vp-bg-card-dark: #0f2416;
  --vp-bg-white: #ffffff;
  --vp-bg-offwhite: #f6f9f7;
  --vp-bg-subtle: #edf3ef;
  --vp-border-subtle: rgba(46, 125, 50, 0.2);
  --vp-border-gold: rgba(212, 175, 55, 0.32);
  --vp-border-dark: rgba(255, 255, 255, 0.08);

  /* Typography Colors */
  --vp-text-dark: #0a180e;
  --vp-text-body: #2d3e33;
  --vp-text-muted: #5e7366;
  --vp-text-white: #ffffff;
  --vp-text-cream: #f6f9f7;
  --vp-text-dim: #9fb3a6;"""

new_palette = """  /* Brand Palette: Warm Obsidian & Saffron/Sacred Green */
  --vp-dark-950: #0f0d0b;
  --vp-dark-900: #181410;
  --vp-dark-850: #221c17;
  --vp-dark-800: #2c241d;
  --vp-dark-750: #382e25;

  /* Saffron Orange & Gold Accents */
  --vp-orange-100: #fff3e0;
  --vp-orange-200: #ffe0b2;
  --vp-orange-300: #ffb74d;
  --vp-orange-400: #ffa726;
  --vp-orange-500: #f57c00;
  --vp-orange-600: #e65100;

  /* Sacred Green Accents */
  --vp-green-100: #e8f5e9;
  --vp-green-200: #c8e6c9;
  --vp-green-300: #81c784;
  --vp-green-400: #4caf50;
  --vp-green-500: #2e7d32;
  --vp-green-600: #1b5e20;

  /* Champagne Gold Accents */
  --vp-gold-100: #fdfaf0;
  --vp-gold-200: #f7edcc;
  --vp-gold-300: #efdc98;
  --vp-gold-400: #e5c963;
  --vp-gold-500: #d4af37;
  --vp-gold-600: #aa8924;

  /* Backgrounds & Surfaces */
  --vp-bg-dark: #120f0c;
  --vp-bg-card-dark: #1e1813;
  --vp-bg-white: #ffffff;
  --vp-bg-offwhite: #fdfbf7;
  --vp-bg-subtle: #f4eee4;
  --vp-border-subtle: rgba(230, 81, 0, 0.22);
  --vp-border-gold: rgba(212, 175, 55, 0.35);
  --vp-border-dark: rgba(255, 255, 255, 0.08);

  /* Typography Colors */
  --vp-text-dark: #14100c;
  --vp-text-body: #3c3229;
  --vp-text-muted: #726253;
  --vp-text-white: #ffffff;
  --vp-text-cream: #fdfbf7;
  --vp-text-dim: #b8a896;"""

css = css.replace(old_palette, new_palette)
css = css.replace('VRUNDAVAN', 'VITHAL PARK').replace('Vrundavan', 'Vithal Park')

with open('public/projects/shree-vithal-park/brochure/vithal-brochure.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('Generated public/projects/shree-vithal-park/brochure/vithal-brochure.css')
