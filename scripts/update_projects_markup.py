import re

completed_ongoing_html = '''    <section class="c-completed-section" id="completed-projects">
      <div class="section-header">
        <span class="section-tag">PORTFOLIO ARCHIVE</span>
        <h2 class="section-title">Completed Projects</h2>
        <p class="section-subtitle">Nine delivered residential landmarks standing as a testament to our enduring commitment to quality construction, structural integrity, and lifelong relationships.</p>
      </div>
      <div class="projects-grid-container">
        <div class="projects-grid">
          
          <!-- 01: Shree Vishwa -->
          <a href="/projects/shree-vishwa/brochure" data-project-href="/projects/shree-vishwa/brochure" class="featured-showcase project-grid-card">
            <div class="featured-image-wrapper">
              <div class="featured-status-badge status-completed">
                <span class="status-dot"></span>Completed
              </div>
              <div class="featured-card-logo">
                <img src="/images/shreeyog/logos/shree-vishwa-logo.png" alt="Shree Vishwa Logo" loading="lazy">
              </div>
              <img src="/images/shreeyog/slider/shree-viswa.webp" alt="Shree Vishwa - Pathardi Phata, Nashik" loading="lazy">
              <div class="featured-image-overlay"></div>
            </div>
            <div class="featured-info">
              <div class="featured-top-row">
                <span class="featured-location">Pathardi Phata, Nashik</span>
                <span class="featured-counter"><span>01</span> / 09</span>
              </div>
              <h3 class="featured-name">Shree Vishwa</h3>
              <p class="featured-desc">Located at the coveted southern junction of Pathardi Phata, Shree Vishwa is a benchmark residential community providing effortless transit to Mumbai and Pune while offering secluded, tranquil family residences surrounded by landscaped gardens.</p>
              <div class="featured-action-row">
                <span class="featured-detail-btn">
                  <span>Explore Project</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </a>

          <!-- 02: Shree Samruddhi Park -->
          <a href="/projects/shree-samruddhi-park/brochure" data-project-href="/projects/shree-samruddhi-park/brochure" class="featured-showcase project-grid-card">
            <div class="featured-image-wrapper">
              <div class="featured-status-badge status-completed">
                <span class="status-dot"></span>Completed
              </div>
              <div class="featured-card-logo">
                <img src="/images/shreeyog/logos/shree-samruddhi-park-logo.png" alt="Shree Samruddhi Park Logo" loading="lazy">
              </div>
              <img src="/images/shreeyog/slider/shree-samruddhi-park.webp" alt="Shree Samruddhi Park - Karmyogi Nagar, Nashik" loading="lazy">
              <div class="featured-image-overlay"></div>
            </div>
            <div class="featured-info">
              <div class="featured-top-row">
                <span class="featured-location">Karmyogi Nagar, Nashik</span>
                <span class="featured-counter"><span>02</span> / 09</span>
              </div>
              <h3 class="featured-name">Shree Samruddhi Park</h3>
              <p class="featured-desc">A crest of comfort and an abode of pleasure. Shree Samruddhi Park offers superior red soil brick construction, spacious 10\'0"x6\'0" sit-out balconies, and an exclusive rooftop leisure terrace with yoga space, green gym, and gazebo.</p>
              <div class="featured-action-row">
                <span class="featured-detail-btn">
                  <span>Explore Project</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </a>

          <!-- 03: Shree Neelkanth -->
          <a href="javascript:void(0)" data-project-href="/projects/shree-neelkanth" class="featured-showcase project-grid-card" aria-disabled="true">
            <div class="featured-image-wrapper">
              <div class="featured-status-badge status-completed">
                <span class="status-dot"></span>Completed
              </div>
              <div class="featured-card-logo">
                <img src="/images/shreeyog/logos/shree-neelkanth-logo.png" alt="Shree Neelkanth Logo" loading="lazy">
              </div>
              <img src="/images/shreeyog/slider/shree-neelkanth.webp" alt="Shree Neelkanth - Indira Nagar, Nashik" loading="lazy">
              <div class="featured-image-overlay"></div>
            </div>
            <div class="featured-info">
              <div class="featured-top-row">
                <span class="featured-location">Indira Nagar, Nashik</span>
                <span class="featured-counter"><span>03</span> / 09</span>
              </div>
              <h3 class="featured-name">Shree Neelkanth</h3>
              <p class="featured-desc">Shree Neelkanth provides well-appointed 2 BHK apartments in the established core of Indira Nagar. Known for its functional floor plans, high structural build standards, and reliable daily utilities.</p>
              <div class="featured-action-row">
                <span class="featured-detail-btn">
                  <span>Explore Project</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </a>

          <!-- 04: Shree Padma -->
          <a href="javascript:void(0)" data-project-href="/projects/shree-padma" class="featured-showcase project-grid-card" aria-disabled="true">
            <div class="featured-image-wrapper">
              <div class="featured-status-badge status-completed">
                <span class="status-dot"></span>Completed
              </div>
              <img src="/images/shreeyog/projects/nisarg.webp" alt="Shree Padma - Gangapur Road, Nashik" loading="lazy">
              <div class="featured-image-overlay"></div>
            </div>
            <div class="featured-info">
              <div class="featured-top-row">
                <span class="featured-location">Gangapur Road, Nashik</span>
                <span class="featured-counter"><span>04</span> / 09</span>
              </div>
              <h3 class="featured-name">Shree Padma</h3>
              <p class="featured-desc">A private boutique residential enclave designed for discerning homeowners who prioritize quiet community living in an upscale residential quarter of Gangapur Road.</p>
              <div class="featured-action-row">
                <span class="featured-detail-btn">
                  <span>Explore Project</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </a>

          <!-- 05: Shree Anant -->
          <a href="javascript:void(0)" data-project-href="/projects/shree-anant" class="featured-showcase project-grid-card" aria-disabled="true">
            <div class="featured-image-wrapper">
              <div class="featured-status-badge status-completed">
                <span class="status-dot"></span>Completed
              </div>
              <img src="/images/shreeyog/buildings/modern-luxury.webp" alt="Shree Anant - Govind Nagar, Nashik" loading="lazy">
              <div class="featured-image-overlay"></div>
            </div>
            <div class="featured-info">
              <div class="featured-top-row">
                <span class="featured-location">Govind Nagar, Nashik</span>
                <span class="featured-counter"><span>05</span> / 09</span>
              </div>
              <h3 class="featured-name">Shree Anant</h3>
              <p class="featured-desc">Shree Anant in Govind Nagar reflects Shreeyog\'s core philosophy: building homes that stand the test of time with genuine construction quality and thoughtful layouts.</p>
              <div class="featured-action-row">
                <span class="featured-detail-btn">
                  <span>Explore Project</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </a>

          <!-- 06: Shree Niwas -->
          <a href="javascript:void(0)" data-project-href="/projects/shree-niwas" class="featured-showcase project-grid-card" aria-disabled="true">
            <div class="featured-image-wrapper">
              <div class="featured-status-badge status-completed">
                <span class="status-dot"></span>Completed
              </div>
              <img src="/images/shreeyog/buildings/tanvi-residency.webp" alt="Shree Niwas - College Road, Nashik" loading="lazy">
              <div class="featured-image-overlay"></div>
            </div>
            <div class="featured-info">
              <div class="featured-top-row">
                <span class="featured-location">College Road, Nashik</span>
                <span class="featured-counter"><span>06</span> / 09</span>
              </div>
              <h3 class="featured-name">Shree Niwas</h3>
              <p class="featured-desc">Located within walking distance of Nashik\'s premier colleges, cafes, and shopping districts, Shree Niwas represents prime city center living at its finest.</p>
              <div class="featured-action-row">
                <span class="featured-detail-btn">
                  <span>Explore Project</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </a>

          <!-- 07: Shree Nath Enclave -->
          <a href="/projects/shree-nath-enclave/brochure" data-project-href="/projects/shree-nath-enclave/brochure" class="featured-showcase project-grid-card">
            <div class="featured-image-wrapper">
              <div class="featured-status-badge status-completed">
                <span class="status-dot"></span>Completed
              </div>
              <div class="featured-card-logo">
                <img src="/images/shreeyog/logos/shree-nath-enclave-logo.png" alt="Shree Nath Enclave Logo" loading="lazy">
              </div>
              <img src="/images/shreeyog/buildings/contemporary-avenue.webp" alt="Shree Nath Enclave - Mumbai Naka, Nashik" loading="lazy">
              <div class="featured-image-overlay"></div>
            </div>
            <div class="featured-info">
              <div class="featured-top-row">
                <span class="featured-location">Mumbai Naka, Nashik</span>
                <span class="featured-counter"><span>07</span> / 09</span>
              </div>
              <h3 class="featured-name">Shree Nath Enclave</h3>
              <p class="featured-desc">A prominent urban development located along Shreehari Kute Marg at Mumbai Naka. Shree Nath Enclave houses the corporate headquarters of Shreeyog Builders & Land Developers alongside premium city-center suites.</p>
              <div class="featured-action-row">
                <span class="featured-detail-btn">
                  <span>Explore Project</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </a>

          <!-- 08: Shree Navshakti -->
          <a href="javascript:void(0)" data-project-href="/projects/shree-navshakti" class="featured-showcase project-grid-card" aria-disabled="true">
            <div class="featured-image-wrapper">
              <div class="featured-status-badge status-completed">
                <span class="status-dot"></span>Completed
              </div>
              <img src="/images/shreeyog/projects/safalya-angle.webp" alt="Shree Navshakti - Panchavati, Nashik" loading="lazy">
              <div class="featured-image-overlay"></div>
            </div>
            <div class="featured-info">
              <div class="featured-top-row">
                <span class="featured-location">Panchavati, Nashik</span>
                <span class="featured-counter"><span>08</span> / 09</span>
              </div>
              <h3 class="featured-name">Shree Navshakti</h3>
              <p class="featured-desc">Shree Navshakti blends the timeless spiritual calmness of Panchavati with modern structural resilience, functional layouts, and reliable daily amenities.</p>
              <div class="featured-action-row">
                <span class="featured-detail-btn">
                  <span>Explore Project</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </a>

          <!-- 09: Shree Swarup -->
          <a href="javascript:void(0)" data-project-href="/projects/shree-swarup" class="featured-showcase project-grid-card" aria-disabled="true">
            <div class="featured-image-wrapper">
              <div class="featured-status-badge status-completed">
                <span class="status-dot"></span>Completed
              </div>
              <img src="/images/shreeyog/projects/residential-complex.webp" alt="Shree Swarup - Dwarka, Nashik" loading="lazy">
              <div class="featured-image-overlay"></div>
            </div>
            <div class="featured-info">
              <div class="featured-top-row">
                <span class="featured-location">Dwarka, Nashik</span>
                <span class="featured-counter"><span>09</span> / 09</span>
              </div>
              <h3 class="featured-name">Shree Swarup</h3>
              <p class="featured-desc">Designed for families on the go, Shree Swarup offers rapid connectivity to the Pune and Mumbai highway corridors, industrial zones, and the central city.</p>
              <div class="featured-action-row">
                <span class="featured-detail-btn">
                  <span>Explore Project</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </a>

        </div>
      </div>
    </section>
  
    
    <section class="c-ongoing-section" id="ongoing-projects">
      <div class="section-header">
        <span class="section-tag">ACTIVE DEVELOPMENTS</span>
        <h2 class="section-title">Ongoing Projects</h2>
        <p class="section-subtitle">Six visionary residential developments currently shaping the next generation of modern living across Nashik\'s prime growth corridors.</p>
      </div>
      <div class="projects-grid-container">
        <div class="projects-grid">
          
          <!-- 01: Shree Bramhand -->
          <a href="/projects/shree-bramhand/brochure" data-project-href="/projects/shree-bramhand/brochure" class="featured-showcase project-grid-card">
            <div class="featured-image-wrapper">
              <div class="featured-status-badge status-ongoing">
                <span class="status-dot"></span>Ongoing
              </div>
              <div class="featured-card-logo">
                <img src="/images/shreeyog/logos/shree-bramhand-logo-transparent.png" alt="Shree Bramhand Logo" loading="lazy">
              </div>
              <img src="/images/shreeyog/slider/shree-bramhand.webp" alt="Shree Bramhand - Bodhle Nagar, Nashik" loading="lazy">
              <div class="featured-image-overlay"></div>
            </div>
            <div class="featured-info">
              <div class="featured-top-row">
                <span class="featured-location">Bodhle Nagar, Nashik</span>
                <span class="featured-counter"><span>01</span> / 06</span>
              </div>
              <h3 class="featured-name">Shree Bramhand</h3>
              <p class="featured-desc">Shree Bramhand stands as a premier residential landmark in Bodhle Nagar, Nashik. Featuring expansive 2 and 3 BHK luxury residences, the project blends architectural sophistication with generous natural ventilation, premium terrace leisure decks, and state-of-the-art security.</p>
              <div class="featured-action-row">
                <span class="featured-detail-btn">
                  <span>Explore Project</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </a>

          <!-- 02: Shree Safalya -->
          <a href="/projects/shree-safalya/brochure" data-project-href="/projects/shree-safalya/brochure" class="featured-showcase project-grid-card">
            <div class="featured-image-wrapper">
              <div class="featured-status-badge status-ongoing">
                <span class="status-dot"></span>Ongoing
              </div>
              <div class="featured-card-logo">
                <img src="/images/shreeyog/logos/shree-safalya-logo.png" alt="Shree Safalya Logo" loading="lazy">
              </div>
              <img src="/images/shreeyog/slider/shree-safalya.webp" alt="Shree Safalya - Karmyogi Nagar, Nashik" loading="lazy">
              <div class="featured-image-overlay"></div>
            </div>
            <div class="featured-info">
              <div class="featured-top-row">
                <span class="featured-location">Karmyogi Nagar, Nashik</span>
                <span class="featured-counter"><span>02</span> / 06</span>
              </div>
              <h3 class="featured-name">Shree Safalya</h3>
              <p class="featured-desc">Live Ultra, Live Opulent. Shree Safalya stands as a premier G+14 level tower of prestige in Karmyogi Nagar, offering lofty 11-foot clear ceilings, an 8,500 sq. ft. dedicated recreational floor, and curated rooftop terrace leisure amenities.</p>
              <div class="featured-action-row">
                <span class="featured-detail-btn">
                  <span>Explore Project</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </a>

          <!-- 03: Shree Venkatesh Park -->
          <a href="/projects/shree-venkatesh-park/brochure" data-project-href="/projects/shree-venkatesh-park/brochure" class="featured-showcase project-grid-card">
            <div class="featured-image-wrapper">
              <div class="featured-status-badge status-ongoing">
                <span class="status-dot"></span>Ongoing
              </div>
              <div class="featured-card-logo">
                <img src="/images/shreeyog/logos/shree-venkatesh-park-logo.png" alt="Shree Venkatesh Park Logo" loading="lazy">
              </div>
              <img src="/images/shreeyog/slider/shree-venkatesh.webp" alt="Shree Venkatesh Park - Karmyogi Nagar, Nashik" loading="lazy">
              <div class="featured-image-overlay"></div>
            </div>
            <div class="featured-info">
              <div class="featured-top-row">
                <span class="featured-location">Karmyogi Nagar, Nashik</span>
                <span class="featured-counter"><span>03</span> / 06</span>
              </div>
              <h3 class="featured-name">Shree Venkatesh Park</h3>
              <p class="featured-desc">सर्वोत्तम जीवनशैलीचा सुखद अनुभव. Fronting an 18.00-meter wide road, Shree Venkatesh Park features two high-speed elevators, 10\'0"x6\'0" sit-out balconies, master suites with private balconies, and an active rooftop terrace with yoga lawn and green gym.</p>
              <div class="featured-action-row">
                <span class="featured-detail-btn">
                  <span>Explore Project</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </a>

          <!-- 04: Shree Pandurang -->
          <a href="javascript:void(0)" data-project-href="/projects/shree-pandurang" class="featured-showcase project-grid-card" aria-disabled="true">
            <div class="featured-image-wrapper">
              <div class="featured-status-badge status-ongoing">
                <span class="status-dot"></span>Ongoing
              </div>
              <img src="/images/shreeyog/buildings/aerial-view.webp" alt="Shree Pandurang - Adgaon / Highway Corridor, Nashik" loading="lazy">
              <div class="featured-image-overlay"></div>
            </div>
            <div class="featured-info">
              <div class="featured-top-row">
                <span class="featured-location">Adgaon / Highway Corridor, Nashik</span>
                <span class="featured-counter"><span>04</span> / 06</span>
              </div>
              <h3 class="featured-name">Shree Pandurang</h3>
              <p class="featured-desc">Currently under development in the high-growth Adgaon corridor, Shree Pandurang is engineered with modern smart-home provisions and expansive open spaces.</p>
              <div class="featured-action-row">
                <span class="featured-detail-btn">
                  <span>Explore Project</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </a>

          <!-- 05: Shree Nandan -->
          <a href="javascript:void(0)" data-project-href="/projects/shree-nandan" class="featured-showcase project-grid-card" aria-disabled="true">
            <div class="featured-image-wrapper">
              <div class="featured-status-badge status-ongoing">
                <span class="status-dot"></span>Ongoing
              </div>
              <img src="/images/shreeyog/projects/shakuntal.webp" alt="Shree Nandan - Indira Nagar, Nashik" loading="lazy">
              <div class="featured-image-overlay"></div>
            </div>
            <div class="featured-info">
              <div class="featured-top-row">
                <span class="featured-location">Indira Nagar, Nashik</span>
                <span class="featured-counter"><span>05</span> / 06</span>
              </div>
              <h3 class="featured-name">Shree Nandan</h3>
              <p class="featured-desc">An ongoing development crafted with clean geometric facades, spacious living rooms, and private balconies overlooking verdant streetscapes in Indira Nagar.</p>
              <div class="featured-action-row">
                <span class="featured-detail-btn">
                  <span>Explore Project</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </a>

          <!-- 06: Shree Malhar -->
          <a href="javascript:void(0)" data-project-href="/projects/shree-malhar" class="featured-showcase project-grid-card" aria-disabled="true">
            <div class="featured-image-wrapper">
              <div class="featured-status-badge status-ongoing">
                <span class="status-dot"></span>Ongoing
              </div>
              <img src="/images/shreeyog/projects/chintan.webp" alt="Shree Malhar - Gangapur Road Extension, Nashik" loading="lazy">
              <div class="featured-image-overlay"></div>
            </div>
            <div class="featured-info">
              <div class="featured-top-row">
                <span class="featured-location">Gangapur Road Extension, Nashik</span>
                <span class="featured-counter"><span>06</span> / 06</span>
              </div>
              <h3 class="featured-name">Shree Malhar</h3>
              <p class="featured-desc">Nestled near the scenic Gangapur Road extension, Shree Malhar offers tranquil living framed by open skies, gentle breezes, and lush surroundings.</p>
              <div class="featured-action-row">
                <span class="featured-detail-btn">
                  <span>Explore Project</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </a>

        </div>
      </div>
    </section>'''

files = [
    r'd:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects\index.html',
    r'd:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects.html',
    r'd:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\pages\projects.html'
]

pattern = re.compile(
    r'<section class="c-completed-section" id="completed-projects">.*?</section>\s*<section class="c-ongoing-section" id="ongoing-projects">.*?</section>',
    re.DOTALL
)

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if pattern.search(content):
        new_content = pattern.sub(completed_ongoing_html, content, count=1)
        # also ensure global click interceptor captures .project-grid-card
        new_content = new_content.replace(
            "closest('.arch-card, .featured-detail-btn, .arch-link')",
            "closest('.arch-card, .featured-detail-btn, .arch-link, .project-grid-card')"
        )
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Successfully updated: {file_path}")
    else:
        print(f"Pattern NOT found in: {file_path}")
