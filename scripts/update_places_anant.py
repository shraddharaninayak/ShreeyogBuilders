with open('public/places/index.html', 'r', encoding='utf-8') as f:
    txt = f.read()

old_card = '''<a href="javascript:void(0)" data-project-href="/projects/shree-anant" class="arch-card arch-card-standard" aria-disabled="true">
      <div class="arch-card-media">
        <div class="arch-card-meta">
          <span class="arch-badge badge-completed"><span class="status-dot"></span>Completed</span>
          <span class="arch-num">05 / 09</span>
        </div>
        <img src="/images/shreeyog/buildings/modern-luxury.webp" alt="Shree Anant - Govind Nagar, Nashik" loading="lazy">
      </div>
      <div class="arch-card-content">
        <span class="arch-location">Govind Nagar, Nashik</span>
        <h3 class="arch-title">Shree Anant</h3>
        <span class="arch-typology">Quality Family Apartments</span>
        <p class="arch-narrative">Shree Anant in Govind Nagar reflects Shreeyog\'s core philosophy: building homes that stand the test of time with genuine construction quality and thoughtful layouts.</p>
        <div class="arch-footer">
          <span class="arch-link">Explore Landmark ↗</span>
        </div>
      </div>
    </a>'''

new_card = '''<a href="/projects/shree-anant/brochure/" data-project-href="/projects/shree-anant/brochure/" class="arch-card arch-card-standard">
      <div class="arch-card-media">
        <div class="arch-card-meta">
          <span class="arch-badge badge-completed"><span class="status-dot"></span>Completed</span>
          <span class="arch-num">05 / 09</span>
        </div>
        <img src="/images/shreeyog/slider/shree-anant.webp" alt="Shree Anant - Indira Nagar, Nashik" loading="lazy">
      </div>
      <div class="arch-card-content">
        <span class="arch-location">Indira Nagar, Nashik</span>
        <h3 class="arch-title">Shree Anant</h3>
        <span class="arch-typology">2 &amp; 3 BHK Luxurious Flats</span>
        <p class="arch-narrative">Situated in prime Indira Nagar opposite LIC Colony, Shree Anant offers 2 &amp; 3 BHK luxurious homes built with natural red soil bricks, dual 9.0M road frontage, solar net metering, and a private celebration terrace.</p>
        <div class="arch-footer">
          <span class="arch-link">Explore Landmark ↗</span>
        </div>
      </div>
    </a>'''

if old_card in txt:
    txt = txt.replace(old_card, new_card)
    with open('public/places/index.html', 'w', encoding='utf-8') as f:
        f.write(txt)
    print("Updated public/places/index.html successfully!")
else:
    # try normalized newlines
    txt_norm = txt.replace('\r\n', '\n')
    old_norm = old_card.replace('\r\n', '\n')
    new_norm = new_card.replace('\r\n', '\n')
    if old_norm in txt_norm:
        txt = txt_norm.replace(old_norm, new_norm)
        with open('public/places/index.html', 'w', encoding='utf-8') as f:
            f.write(txt)
        print("Updated public/places/index.html (normalized) successfully!")
    else:
        print("Old card not found in public/places/index.html")
