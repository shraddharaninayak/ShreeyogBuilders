with open('public/places/index.html', 'r', encoding='utf-8') as f:
    txt = f.read()

old_card = '''<a href="javascript:void(0)" data-project-href="/projects/shree-niwas" class="arch-card arch-card-standard" aria-disabled="true">
      <div class="arch-card-media">
        <div class="arch-card-meta">
          <span class="arch-badge badge-completed"><span class="status-dot"></span>Completed</span>
          <span class="arch-num">06 / 09</span>
        </div>
        <img src="/images/shreeyog/buildings/tanvi-residency.webp" alt="Shree Niwas - College Road, Nashik" loading="lazy">
      </div>
      <div class="arch-card-content">
        <span class="arch-location">College Road, Nashik</span>
        <h3 class="arch-title">Shree Niwas</h3>
        <span class="arch-typology">Premium City Residences</span>
        <p class="arch-narrative">Located within walking distance of Nashik\'s premier colleges, cafes, and shopping districts, Shree Niwas represents prime city center living at its finest.</p>
        <div class="arch-footer">
          <span class="arch-link">Explore Landmark ↗</span>
        </div>
      </div>
    </a>'''

new_card = '''<a href="/projects/shree-niwas/brochure/" data-project-href="/projects/shree-niwas/brochure/" class="arch-card arch-card-standard">
      <div class="arch-card-media">
        <div class="arch-card-meta">
          <span class="arch-badge badge-completed"><span class="status-dot"></span>Completed</span>
          <span class="arch-num">06 / 09</span>
        </div>
        <img src="/images/shreeyog/slider/shree-niwas.webp" alt="Shree Niwas - Indira Nagar, Nashik" loading="lazy">
      </div>
      <div class="arch-card-content">
        <span class="arch-location">Indira Nagar, Nashik</span>
        <h3 class="arch-title">Shree Niwas</h3>
        <span class="arch-typology">2 &amp; 3 BHK Luxurious Flats</span>
        <p class="arch-narrative">Situated in prime Indira Nagar opposite LIC Colony, Shree Niwas offers 12 exclusive 2 &amp; 3 BHK luxurious flats built with natural red soil bricks, rooftop solar net-metering, campus play garden, and a private celebration terrace.</p>
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
