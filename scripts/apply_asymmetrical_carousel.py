import re

replacement_sections = '''    <section class="c-completed-section" id="completed-projects">
      <div class="section-header">
        <span class="section-tag">PORTFOLIO ARCHIVE</span>
        <h2 class="section-title">Completed Projects</h2>
        <p class="section-subtitle">Nine delivered residential landmarks standing as a testament to our enduring commitment to quality construction, structural integrity, and lifelong relationships.</p>
      </div>

      <div class="highlighted-stage completed-stage">
        <div class="satellite-cards" id="completedSatellites">
          <a href="/projects/shree-samruddhi-park/brochure" data-project-href="/projects/shree-samruddhi-park/brochure" class="satellite-card sat-1" data-index="1" title="Shree Samruddhi Park">
            <img src="/images/shreeyog/slider/shree-samruddhi-park.webp" alt="Shree Samruddhi Park - Karmyogi Nagar, Nashik" loading="lazy">
            <div class="sat-overlay">
              <span class="sat-num">02</span>
              <span class="sat-name">Shree Samruddhi Park</span>
            </div>
          </a>
          <a href="javascript:void(0)" data-project-href="/projects/shree-anant" class="satellite-card sat-2" data-index="4" title="Shree Anant">
            <img src="/images/shreeyog/buildings/modern-luxury.webp" alt="Shree Anant - Govind Nagar, Nashik" loading="lazy">
            <div class="sat-overlay">
              <span class="sat-num">05</span>
              <span class="sat-name">Shree Anant</span>
            </div>
          </a>
          <a href="javascript:void(0)" data-project-href="/projects/shree-niwas" class="satellite-card sat-3" data-index="5" title="Shree Niwas">
            <img src="/images/shreeyog/buildings/tanvi-residency.webp" alt="Shree Niwas - College Road, Nashik" loading="lazy">
            <div class="sat-overlay">
              <span class="sat-num">06</span>
              <span class="sat-name">Shree Niwas</span>
            </div>
          </a>
          <a href="javascript:void(0)" data-project-href="/projects/shree-swarup" class="satellite-card sat-4" data-index="8" title="Shree Swarup">
            <img src="/images/shreeyog/projects/residential-complex.webp" alt="Shree Swarup - Dwarka, Nashik" loading="lazy">
            <div class="sat-overlay">
              <span class="sat-num">09</span>
              <span class="sat-name">Shree Swarup</span>
            </div>
          </a>
          <a href="javascript:void(0)" data-project-href="/projects/shree-padma" class="satellite-card sat-5" data-index="3" title="Shree Padma">
            <img src="/images/shreeyog/projects/nisarg.webp" alt="Shree Padma - Gangapur Road, Nashik" loading="lazy">
            <div class="sat-overlay">
              <span class="sat-num">04</span>
              <span class="sat-name">Shree Padma</span>
            </div>
          </a>
          <a href="javascript:void(0)" data-project-href="/projects/shree-navshakti" class="satellite-card sat-6" data-index="7" title="Shree Navshakti">
            <img src="/images/shreeyog/projects/safalya-angle.webp" alt="Shree Navshakti - Panchavati, Nashik" loading="lazy">
            <div class="sat-overlay">
              <span class="sat-num">08</span>
              <span class="sat-name">Shree Navshakti</span>
            </div>
          </a>
          <a href="javascript:void(0)" data-project-href="/projects/shree-neelkanth" class="satellite-card sat-7" data-index="2" title="Shree Neelkanth">
            <img src="/images/shreeyog/slider/shree-neelkanth.webp" alt="Shree Neelkanth - Indira Nagar, Nashik" loading="lazy">
            <div class="sat-overlay">
              <span class="sat-num">03</span>
              <span class="sat-name">Shree Neelkanth</span>
            </div>
          </a>
          <a href="/projects/shree-nath-enclave/brochure" data-project-href="/projects/shree-nath-enclave/brochure" class="satellite-card sat-8" data-index="6" title="Shree Nath Enclave">
            <img src="/images/shreeyog/buildings/contemporary-avenue.webp" alt="Shree Nath Enclave - Mumbai Naka, Nashik" loading="lazy">
            <div class="sat-overlay">
              <span class="sat-num">07</span>
              <span class="sat-name">Shree Nath Enclave</span>
            </div>
          </a>
        </div>

        <div class="featured-showcase" id="completedShowcase">
          <div class="featured-image-wrapper">
            <span class="featured-status-badge status-completed" id="completedStatus">
              <span class="status-dot"></span>Completed
            </span>
            <div class="featured-card-logo" id="completedCardLogo">
              <img src="/images/shreeyog/logos/shree-vishwa-logo.png" alt="Shree Vishwa" />
            </div>
            <img id="completedImg" src="/images/shreeyog/slider/shree-viswa.webp" alt="Shree Vishwa" />
            <div class="featured-image-overlay"></div>
          </div>

          <div class="featured-info">
            <div class="featured-top-row">
              <span class="featured-location" id="completedLoc">Pathardi Phata, Nashik</span>
              <span class="featured-counter" id="completedCounter"><span>01</span> / 09</span>
            </div>
            <h3 class="featured-name" id="completedName">Shree Vishwa</h3>
            <p class="featured-desc" id="completedDesc">Located at the coveted southern junction of Pathardi Phata, Shree Vishwa is a benchmark residential community providing effortless transit to Mumbai and Pune while offering secluded, tranquil family residences surrounded by landscaped gardens.</p>
            <div class="featured-action-row">
              <a href="/projects/shree-vishwa/brochure" data-project-href="/projects/shree-vishwa/brochure" class="featured-detail-btn" id="completedLink">
                <span>Explore Project</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
              <div class="featured-nav-controls">
                <button type="button" class="feat-nav-btn prev" id="completedPrev" aria-label="Previous project">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button type="button" class="feat-nav-btn next" id="completedNext" aria-label="Next project">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    
    <section class="c-ongoing-section" id="ongoing-projects">
      <div class="section-header">
        <span class="section-tag">ACTIVE DEVELOPMENTS</span>
        <h2 class="section-title">Ongoing Projects</h2>
        <p class="section-subtitle">Six visionary residential developments currently shaping the next generation of modern living across Nashik\'s prime growth corridors.</p>
      </div>

      <div class="highlighted-stage ongoing-stage">
        <div class="satellite-cards" id="ongoingSatellites">
          <a href="/projects/shree-safalya/brochure" data-project-href="/projects/shree-safalya/brochure" class="satellite-card sat-1" data-index="1" title="Shree Safalya">
            <img src="/images/shreeyog/slider/shree-safalya.webp" alt="Shree Safalya - Karmyogi Nagar, Nashik" loading="lazy">
            <div class="sat-overlay">
              <span class="sat-num">02</span>
              <span class="sat-name">Shree Safalya</span>
            </div>
          </a>
          <a href="/projects/shree-venkatesh-park/brochure" data-project-href="/projects/shree-venkatesh-park/brochure" class="satellite-card sat-2" data-index="2" title="Shree Venkatesh Park">
            <img src="/images/shreeyog/slider/shree-venkatesh.webp" alt="Shree Venkatesh Park - Karmyogi Nagar, Nashik" loading="lazy">
            <div class="sat-overlay">
              <span class="sat-num">03</span>
              <span class="sat-name">Shree Venkatesh Park</span>
            </div>
          </a>
          <a href="javascript:void(0)" data-project-href="/projects/shree-pandurang" class="satellite-card sat-3" data-index="3" title="Shree Pandurang">
            <img src="/images/shreeyog/buildings/aerial-view.webp" alt="Shree Pandurang - Adgaon / Highway Corridor, Nashik" loading="lazy">
            <div class="sat-overlay">
              <span class="sat-num">04</span>
              <span class="sat-name">Shree Pandurang</span>
            </div>
          </a>
          <a href="javascript:void(0)" data-project-href="/projects/shree-nandan" class="satellite-card sat-4" data-index="4" title="Shree Nandan">
            <img src="/images/shreeyog/projects/shakuntal.webp" alt="Shree Nandan - Indira Nagar, Nashik" loading="lazy">
            <div class="sat-overlay">
              <span class="sat-num">05</span>
              <span class="sat-name">Shree Nandan</span>
            </div>
          </a>
          <a href="javascript:void(0)" data-project-href="/projects/shree-malhar" class="satellite-card sat-5" data-index="5" title="Shree Malhar">
            <img src="/images/shreeyog/projects/chintan.webp" alt="Shree Malhar - Gangapur Road Extension, Nashik" loading="lazy">
            <div class="sat-overlay">
              <span class="sat-num">06</span>
              <span class="sat-name">Shree Malhar</span>
            </div>
          </a>
        </div>

        <div class="featured-showcase" id="ongoingShowcase">
          <div class="featured-image-wrapper">
            <span class="featured-status-badge status-ongoing" id="ongoingStatus">
              <span class="status-dot"></span>Ongoing
            </span>
            <div class="featured-card-logo" id="ongoingCardLogo">
              <img src="/images/shreeyog/logos/shree-bramhand-logo-transparent.png" alt="Shree Bramhand" />
            </div>
            <img id="ongoingImg" src="/images/shreeyog/slider/shree-bramhand.webp" alt="Shree Bramhand" />
            <div class="featured-image-overlay"></div>
          </div>

          <div class="featured-info">
            <div class="featured-top-row">
              <span class="featured-location" id="ongoingLoc">Bodhle Nagar, Nashik</span>
              <span class="featured-counter" id="ongoingCounter"><span>01</span> / 06</span>
            </div>
            <h3 class="featured-name" id="ongoingName">Shree Bramhand</h3>
            <p class="featured-desc" id="ongoingDesc">Shree Bramhand stands as a premier residential landmark in Bodhle Nagar, Nashik. Featuring expansive 2 and 3 BHK luxury residences, the project blends architectural sophistication with generous natural ventilation, premium terrace leisure decks, and state-of-the-art security.</p>
            <div class="featured-action-row">
              <a href="/projects/shree-bramhand/brochure" data-project-href="/projects/shree-bramhand/brochure" class="featured-detail-btn" id="ongoingLink">
                <span>Explore Project</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
              <div class="featured-nav-controls">
                <button type="button" class="feat-nav-btn prev" id="ongoingPrev" aria-label="Previous project">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button type="button" class="feat-nav-btn next" id="ongoingNext" aria-label="Next project">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>'''

script_replacement = '''  <!-- Interactive Slider Script -->
  <script>
    (function() {
      // 1. Highlighted Projects Data (6 Projects)
      const highlightedItems = [
        {"name":"Shree Bramhand","slug":"shree-bramhand","location":"Bodhle Nagar, Nashik","status":"Ongoing","logo":"/images/shreeyog/logos/shree-bramhand-logo-transparent.png","mainImage":"/images/shreeyog/slider/shree-bramhand.webp","description":"Shree Bramhand stands as a premier residential landmark in Bodhle Nagar, Nashik. Featuring expansive 2 and 3 BHK luxury residences, the project blends architectural sophistication with generous natural ventilation, premium terrace leisure decks, and state-of-the-art security.","brochure":"/projects/shree-bramhand/brochure"},
        {"name":"Shree Vishwa","slug":"shree-vishwa","location":"Pathardi Phata, Nashik","status":"Completed","logo":"/images/shreeyog/logos/shree-vishwa-logo.png","mainImage":"/images/shreeyog/slider/shree-viswa.webp","description":"Located at the coveted southern junction of Pathardi Phata, Shree Vishwa is a benchmark residential community providing effortless transit to Mumbai and Pune while offering secluded, tranquil family residences surrounded by landscaped gardens.","brochure":"/projects/shree-vishwa/brochure"},
        {"name":"Shree Safalya","slug":"shree-safalya","location":"Karmyogi Nagar, Nashik","status":"Ongoing","logo":"/images/shreeyog/logos/shree-safalya-logo.png","mainImage":"/images/shreeyog/slider/shree-safalya.webp","description":"Live Ultra, Live Opulent. Shree Safalya stands as a premier G+14 level residential tower of prestige in Karmyogi Nagar, Nashik. Featuring expansive 3 & 4 BHK Opulent Homes, 2 & 3 BHK XL Homes, 5 & 6 BHK Duplex Penthouses, lofty 11-foot clear ceilings, and 20,000+ sq. ft. of dedicated amenities.","brochure":"/projects/shree-safalya/brochure"},
        {"name":"Shree Nath Enclave","slug":"shree-nath-enclave","location":"Mumbai Naka, Nashik","status":"Completed","logo":"/images/shreeyog/logos/shree-nath-enclave-logo.png","mainImage":"/images/shreeyog/buildings/contemporary-avenue.webp","description":"A prominent urban development located along Shreehari Kute Marg at Mumbai Naka. Shree Nath Enclave houses the corporate headquarters of Shreeyog Builders & Land Developers alongside premium city-center residential suites.","brochure":"/projects/shree-nath-enclave/brochure"},
        {"name":"Shree Samruddhi Park","slug":"shree-samruddhi-park","location":"Karmyogi Nagar, Nashik","status":"Completed","logo":"/images/shreeyog/logos/shree-samruddhi-park-logo.png","mainImage":"/images/shreeyog/slider/shree-samruddhi-park.webp","description":"A crest of comfort and an abode of pleasure. Shree Samruddhi Park in Karmyogi Nagar features 2 & 3 BHK premium homes with superior red soil brick masonry, spacious sit-out balconies, and a dedicated rooftop leisure terrace with yoga space, green gym, and gazebo.","brochure":"/projects/shree-samruddhi-park/brochure"},
        {"name":"Shree Venkatesh Park","slug":"shree-venkatesh","location":"Karmyogi Nagar, Nashik","status":"Ongoing","logo":"/images/shreeyog/logos/shree-venkatesh-park-logo.png","mainImage":"/images/shreeyog/slider/shree-venkatesh.webp","description":"सर्वोत्तम जीवनशैलीचा सुखद अनुभव. Shree Venkatesh Park fronts an 18.00-meter wide road in Karmyogi Nagar, offering 2 & 3 BHK luxurious flats, two high-speed elevators, 10\'0\\"x6\'0\\" sit-out balconies, and an active rooftop terrace with yoga lawn and green gym.","brochure":"/projects/shree-venkatesh-park/brochure"}
      ];

      // 2. Completed Projects Data (9 Projects)
      const completedItems = [
        {"name":"Shree Vishwa","slug":"shree-vishwa","location":"Pathardi Phata, Nashik","status":"Completed","logo":"/images/shreeyog/logos/shree-vishwa-logo.png","mainImage":"/images/shreeyog/slider/shree-viswa.webp","description":"Located at the coveted southern junction of Pathardi Phata, Shree Vishwa is a benchmark residential community providing effortless transit to Mumbai and Pune while offering secluded, tranquil family residences surrounded by landscaped gardens.","brochure":"/projects/shree-vishwa/brochure"},
        {"name":"Shree Samruddhi Park","slug":"shree-samruddhi-park","location":"Karmyogi Nagar, Nashik","status":"Completed","logo":"/images/shreeyog/logos/shree-samruddhi-park-logo.png","mainImage":"/images/shreeyog/slider/shree-samruddhi-park.webp","description":"A crest of comfort and an abode of pleasure. Shree Samruddhi Park in Karmyogi Nagar features 2 & 3 BHK premium homes with superior red soil brick masonry, spacious sit-out balconies, and a dedicated rooftop leisure terrace with yoga space, green gym, and gazebo.","brochure":"/projects/shree-samruddhi-park/brochure"},
        {"name":"Shree Neelkanth","slug":"shree-neelkanth","location":"Indira Nagar, Nashik","status":"Completed","logo":"/images/shreeyog/logos/shree-neelkanth-logo.png","mainImage":"/images/shreeyog/slider/shree-neelkanth.webp","description":"Shree Neelkanth provides well-appointed 2 BHK apartments in the established core of Indira Nagar. Known for its functional floor plans, high structural build standards, and reliable daily utilities.","brochure":null},
        {"name":"Shree Padma","slug":"shree-padma","location":"Gangapur Road, Nashik","status":"Completed","logo":null,"mainImage":"/images/shreeyog/projects/nisarg.webp","description":"A private boutique residential enclave designed for discerning homeowners who prioritize quiet community living in an upscale residential quarter of Gangapur Road.","brochure":null},
        {"name":"Shree Anant","slug":"shree-anant","location":"Govind Nagar, Nashik","status":"Completed","logo":null,"mainImage":"/images/shreeyog/buildings/modern-luxury.webp","description":"Shree Anant in Govind Nagar reflects Shreeyog\'s core philosophy: building homes that stand the test of time with genuine construction quality and thoughtful layouts.","brochure":null},
        {"name":"Shree Niwas","slug":"shree-niwas","location":"College Road, Nashik","status":"Completed","logo":null,"mainImage":"/images/shreeyog/buildings/tanvi-residency.webp","description":"Located within walking distance of Nashik\'s premier colleges, cafes, and shopping districts, Shree Niwas represents prime city center living at its finest.","brochure":null},
        {"name":"Shree Nath Enclave","slug":"shree-nath-enclave","location":"Mumbai Naka, Nashik","status":"Completed","logo":"/images/shreeyog/logos/shree-nath-enclave-logo.png","mainImage":"/images/shreeyog/buildings/contemporary-avenue.webp","description":"A prominent urban development located along Shreehari Kute Marg at Mumbai Naka. Shree Nath Enclave houses the corporate headquarters of Shreeyog Builders & Land Developers alongside premium city-center suites.","brochure":"/projects/shree-nath-enclave/brochure"},
        {"name":"Shree Navshakti","slug":"shree-navshakti","location":"Panchavati, Nashik","status":"Completed","logo":null,"mainImage":"/images/shreeyog/projects/safalya-angle.webp","description":"Shree Navshakti blends the timeless spiritual calmness of Panchavati with modern structural resilience, functional layouts, and reliable daily amenities.","brochure":null},
        {"name":"Shree Swarup","slug":"shree-swarup","location":"Dwarka, Nashik","status":"Completed","logo":null,"mainImage":"/images/shreeyog/projects/residential-complex.webp","description":"Designed for families on the go, Shree Swarup offers rapid connectivity to the Pune and Mumbai highway corridors, industrial zones, and the central city.","brochure":null}
      ];

      // 3. Ongoing Projects Data (6 Projects)
      const ongoingItems = [
        {"name":"Shree Bramhand","slug":"shree-bramhand","location":"Bodhle Nagar, Nashik","status":"Ongoing","logo":"/images/shreeyog/logos/shree-bramhand-logo-transparent.png","mainImage":"/images/shreeyog/slider/shree-bramhand.webp","description":"Shree Bramhand stands as a premier residential landmark in Bodhle Nagar, Nashik. Featuring expansive 2 and 3 BHK luxury residences, the project blends architectural sophistication with generous natural ventilation, premium terrace leisure decks, and state-of-the-art security.","brochure":"/projects/shree-bramhand/brochure"},
        {"name":"Shree Safalya","slug":"shree-safalya","location":"Karmyogi Nagar, Nashik","status":"Ongoing","logo":"/images/shreeyog/logos/shree-safalya-logo.png","mainImage":"/images/shreeyog/slider/shree-safalya.webp","description":"Live Ultra, Live Opulent. Shree Safalya stands as a premier G+14 level residential tower of prestige in Karmyogi Nagar, Nashik. Featuring expansive 3 & 4 BHK Opulent Homes, 2 & 3 BHK XL Homes, 5 & 6 BHK Duplex Penthouses, lofty 11-foot clear ceilings, and 20,000+ sq. ft. of dedicated amenities.","brochure":"/projects/shree-safalya/brochure"},
        {"name":"Shree Venkatesh Park","slug":"shree-venkatesh","location":"Karmyogi Nagar, Nashik","status":"Ongoing","logo":"/images/shreeyog/logos/shree-venkatesh-park-logo.png","mainImage":"/images/shreeyog/slider/shree-venkatesh.webp","description":"सर्वोत्तम जीवनशैलीचा सुखद अनुभव. Shree Venkatesh Park fronts an 18.00-meter wide road in Karmyogi Nagar, offering 2 & 3 BHK luxurious flats, two high-speed elevators, 10\'0\\"x6\'0\\" sit-out balconies, and an active rooftop terrace with yoga lawn and green gym.","brochure":"/projects/shree-venkatesh-park/brochure"},
        {"name":"Shree Pandurang","slug":"shree-pandurang","location":"Adgaon / Highway Corridor, Nashik","status":"Ongoing","logo":null,"mainImage":"/images/shreeyog/buildings/aerial-view.webp","description":"Currently under development in the high-growth Adgaon corridor, Shree Pandurang is engineered with modern smart-home provisions and expansive open spaces.","brochure":null},
        {"name":"Shree Nandan","slug":"shree-nandan","location":"Indira Nagar, Nashik","status":"Ongoing","logo":null,"mainImage":"/images/shreeyog/projects/shakuntal.webp","description":"An ongoing development crafted with clean geometric facades, spacious living rooms, and private balconies overlooking verdant streetscapes in Indira Nagar.","brochure":null},
        {"name":"Shree Malhar","slug":"shree-malhar","location":"Gangapur Road Extension, Nashik","status":"Ongoing","logo":null,"mainImage":"/images/shreeyog/projects/chintan.webp","description":"Nestled near the scenic Gangapur Road extension, Shree Malhar offers tranquil living framed by open skies, gentle breezes, and lush surroundings.","brochure":null}
      ];

      function setupShowcase(config) {
        const {
          items,
          satContainerId,
          imgId,
          statusId,
          cardLogoId,
          locId,
          counterId,
          nameId,
          descId,
          linkId,
          prevId,
          nextId
        } = config;

        let currentIdx = 0;
        const satContainer = document.getElementById(satContainerId);
        const featImg = document.getElementById(imgId);
        const featStatus = document.getElementById(statusId);
        const featCardLogo = document.getElementById(cardLogoId);
        const featLoc = document.getElementById(locId);
        const featCounter = document.getElementById(counterId);
        const featName = document.getElementById(nameId);
        const featDesc = document.getElementById(descId);
        const featLink = document.getElementById(linkId);
        const btnPrev = document.getElementById(prevId);
        const btnNext = document.getElementById(nextId);

        if (!featImg) return;

        function updateSatellites() {
          if (!satContainer) return;
          const otherItems = items.filter((_, idx) => idx !== currentIdx);
          satContainer.innerHTML = '';
          otherItems.forEach((p, satIdx) => {
            const realIdx = items.indexOf(p);
            const satA = document.createElement('a');
            satA.className = 'satellite-card sat-' + (satIdx + 1);
            satA.setAttribute('data-index', realIdx);
            satA.setAttribute('title', p.name);
            if (p.brochure) {
              satA.href = p.brochure;
              satA.setAttribute('data-project-href', p.brochure);
            } else {
              satA.href = 'javascript:void(0)';
              satA.setAttribute('data-project-href', '/projects/' + p.slug);
            }

            const numStr = (realIdx + 1 < 10 ? '0' : '') + (realIdx + 1);
            satA.innerHTML = `
              <img src="${p.mainImage}" alt="${p.name} - ${p.location}" loading="lazy">
              <div class="sat-overlay">
                <span class="sat-num">${numStr}</span>
                <span class="sat-name">${p.name}</span>
              </div>
            `;

            satA.addEventListener('click', function(e) {
              e.preventDefault();
              e.stopPropagation();
              renderSlide(realIdx);
            });

            satContainer.appendChild(satA);
          });
        }

        function renderSlide(idx) {
          currentIdx = (idx + items.length) % items.length;
          const p = items[currentIdx];

          featImg.style.opacity = '0.3';
          setTimeout(() => {
            featImg.src = p.mainImage;
            featImg.alt = p.name;
            featImg.style.opacity = '1';
          }, 150);

          if (featCardLogo) {
            const logoImg = featCardLogo.querySelector('img');
            if (p.logo) {
              if (logoImg) {
                logoImg.src = p.logo;
                logoImg.alt = p.name;
              }
              featCardLogo.style.display = 'flex';
            } else {
              featCardLogo.style.display = 'none';
            }
          }

          if (featStatus) {
            featStatus.className = 'featured-status-badge status-' + p.status.toLowerCase();
            featStatus.innerHTML = '<span class="status-dot"></span>' + p.status;
          }

          if (featLoc) featLoc.textContent = p.location;
          const pad = (n) => (n < 10 ? '0' + n : n);
          if (featCounter) featCounter.innerHTML = `<span>${pad(currentIdx + 1)}</span> / ${pad(items.length)}`;
          if (featName) featName.textContent = p.name;
          if (featDesc) featDesc.textContent = p.description;

          if (featLink) {
            if (p.brochure) {
              featLink.href = p.brochure;
              featLink.setAttribute('data-project-href', p.brochure);
              featLink.removeAttribute('aria-disabled');
            } else {
              featLink.href = 'javascript:void(0)';
              featLink.setAttribute('data-project-href', '/projects/' + p.slug);
              featLink.setAttribute('aria-disabled', 'true');
            }
          }

          updateSatellites();
        }

        if (btnPrev && btnNext) {
          btnPrev.addEventListener('click', () => renderSlide(currentIdx - 1));
          btnNext.addEventListener('click', () => renderSlide(currentIdx + 1));
        }

        updateSatellites();
      }

      // Initialize all 3 showcase carousels
      setupShowcase({
        items: highlightedItems,
        satContainerId: 'highlightedSatellites',
        imgId: 'featImg',
        statusId: 'featStatus',
        cardLogoId: 'featCardLogo',
        locId: 'featLoc',
        counterId: 'featCounter',
        nameId: 'featName',
        descId: 'featDesc',
        linkId: 'featLink',
        prevId: 'featPrev',
        nextId: 'featNext'
      });

      setupShowcase({
        items: completedItems,
        satContainerId: 'completedSatellites',
        imgId: 'completedImg',
        statusId: 'completedStatus',
        cardLogoId: 'completedCardLogo',
        locId: 'completedLoc',
        counterId: 'completedCounter',
        nameId: 'completedName',
        descId: 'completedDesc',
        linkId: 'completedLink',
        prevId: 'completedPrev',
        nextId: 'completedNext'
      });

      setupShowcase({
        items: ongoingItems,
        satContainerId: 'ongoingSatellites',
        imgId: 'ongoingImg',
        statusId: 'ongoingStatus',
        cardLogoId: 'ongoingCardLogo',
        locId: 'ongoingLoc',
        counterId: 'ongoingCounter',
        nameId: 'ongoingName',
        descId: 'ongoingDesc',
        linkId: 'ongoingLink',
        prevId: 'ongoingPrev',
        nextId: 'ongoingNext'
      });

      // Global click interceptor for all project explore links
      document.addEventListener('click', function(e) {
        if (e.target.closest('.satellite-card')) return;

        var brochureLink = e.target.closest('#featLink, #completedLink, #ongoingLink, a[href*="/brochure"], a[data-project-href*="/brochure"]');
        if (brochureLink) {
          var targetUrl = brochureLink.getAttribute('href') || brochureLink.getAttribute('data-project-href');
          if (targetUrl && targetUrl !== 'javascript:void(0)') {
            window.location.href = targetUrl;
            e.preventDefault();
            return;
          }
        }
      }, true);

    })();
  </script>'''

files = [
    r'd:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects\index.html',
    r'd:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\public\projects.html',
    r'd:\INTERNSHIPS\SOCIAL MEDIA MANANGMENT[SKILLNEX]\WEBSITES\Shreeyogweb\pages\projects.html'
]

pattern_sections = re.compile(
    r'<section class="c-completed-section" id="completed-projects">.*?</section>\s*<section class="c-ongoing-section" id="ongoing-projects">.*?</section>',
    re.DOTALL
)

pattern_script = re.compile(
    r'<!-- Interactive Slider Script -->\s*<script>.*?</script>',
    re.DOTALL
)

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Ensure highlighted-projects .satellite-cards has id="highlightedSatellites"
    content = content.replace('<div class="satellite-cards">', '<div class="satellite-cards" id="highlightedSatellites">', 1)

    if pattern_sections.search(content):
        content = pattern_sections.sub(replacement_sections, content, count=1)
    else:
        print(f"Warning: sections pattern not found in {file_path}")

    if pattern_script.search(content):
        content = pattern_script.sub(script_replacement, content, count=1)
    else:
        print(f"Warning: script pattern not found in {file_path}")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Successfully updated: {file_path}")
