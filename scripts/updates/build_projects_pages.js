const fs = require('fs');
const path = require('path');
const projects = require('../../data/projects.js');

console.log('--- Building Compact & Balanced Shreeyog Projects Page & 15 Detail Pages ---');

// Highlighted
const highlightedProjects = projects.filter(p => p.featured).sort((a, b) => (a.highlightOrder || 99) - (b.highlightOrder || 99));

// Completed (9 projects)
const completedSlugs = [
  'shree-vishwa',
  'shree-samruddhi-park',
  'shree-neelkanth',
  'shree-padma',
  'shree-anant',
  'shree-niwas',
  'shree-nath-enclave',
  'shree-navshakti',
  'shree-swarup'
];
const completedProjects = completedSlugs.map(slug => projects.find(p => p.slug === slug)).filter(Boolean);

// Ongoing (6 projects)
const ongoingSlugs = [
  'shree-bramhand',
  'shree-safalya',
  'shree-venkatesh',
  'shree-pandurang',
  'shree-nandan',
  'shree-malhar'
];
const ongoingProjects = ongoingSlugs.map(slug => projects.find(p => p.slug === slug)).filter(Boolean);

// Working Shreeyog Footer HTML (exact reference from public/index.html)
function buildWorkingFooterHtml() {
  return `
<footer class="page-footer -home" string="progress" string-self-disable string-id="main-footer-index" string-enter-vp="bottom" string-exit-vp="bottom" data-v-a76684eb data-v-a41b36d1>
  <span class="underlay" data-v-a41b36d1></span>
  <div class="-w block" data-v-a41b36d1 data-v-e764b164>
    <span class="-mm no-so-me" data-v-a41b36d1>No Social Medias</span>
    <span class="-hp independent" data-v-a41b36d1>Building spaces that inspire better living, across generations.</span>
    <span class="-h4 -m-h6 operating" data-v-a41b36d1>
      <span data-v-a41b36d1>Rooted in Trust.</span>
      <span data-v-a41b36d1>Built for Generations.</span>
    </span>
    <nav data-v-a41b36d1>
      <a href="/" class="-h0 -mid-h1 -m-h2 -nl places" string="split" string-split="char" data-v-a41b36d1>Home</a>
      <a href="/about" class="-h0 -mid-h1 -m-h2 -nl objects" string="split" string-split="char" data-v-a41b36d1>About</a>
      <a href="/projects" class="-h0 -mid-h1 -m-h2 -nl about" string="split" string-split="char" data-v-a41b36d1>Projects</a>
      <a href="/contact" class="-h0 -mid-h1 -m-h2 -nl people" string="split" string-split="char" data-v-a41b36d1>Contact</a>
    </nav>
    <span class="-m copy" data-v-a41b36d1>© <span data-v-a41b36d1>2026</span> Shreeyog. All Rights Reserved.</span>
    <span class="-m expression" data-v-a41b36d1>Shreeyog Builders &amp; Land Developers. Creating spaces with purpose since 1992.</span>
  </div>
  <div class="-w after" data-v-a41b36d1 data-v-e764b164>
    <a href="/" class="-nl" string-copy-from="main-footer-index" data-v-a41b36d1>
      <img src="/images/shreeyog/logo-hero.png" alt="Shreeyog Builders &amp; Land Developers" class="footer-shreeyog-brand-logo" data-v-a41b36d1>
    </a>
    <div class="ip-1 footer-centre-col" string-copy-from="main-footer-index" data-v-a41b36d1>
      <span class="footer-shreeyog-title" data-v-a41b36d1>Shreeyog</span>
      <span class="footer-shreeyog-sub" data-v-a41b36d1>Builders &amp; Land Developers</span>
      <p class="footer-shreeyog-desc" data-v-a41b36d1>Building with trust, creating spaces for generations.</p>
    </div>
    <p class="-m ip-2" string-copy-from="main-footer-index" data-v-a41b36d1>Since 1992, Shreeyog has been shaping residential spaces with a commitment to thoughtful planning, quality construction and lasting relationships. Every project reflects our belief in building homes that stand the test of time.</p>
  </div>
  <figure class="stone-3" string-copy-from="main-footer-index" data-v-a41b36d1 data-v-ec47b9e2>
    <img string="lazy" string-lazy="/images/home/stone-3.webp" alt="Shreeyog Builders &amp; Land Developers" data-v-ec47b9e2>
  </figure>
</footer>
  `.trim();
}

// Working Header HTML
function buildWorkingHeaderHtml() {
  return `
<header class="" data-v-81ce8483>
  <div class="-w" data-v-81ce8483 data-v-e764b164>
    <a href="/" class="-nl" data-v-81ce8483>
      <img src="/images/shreeyog/logo-hero.png" alt="Shreeyog Builders &amp; Land Developers" class="shreeyog-brand-logo" data-v-81ce8483>
    </a>
    <a href="/projects" class="button -p -m-m -reverse places" aria-label title data-v-f52f19c3>
      <span class="text -mm -up" string="split" string-split="char[center]" data-v-f52f19c3>Projects</span>
    </a>
    <span class="sep" data-v-81ce8483></span>
    <a href="/about" class="button -p -m-m -reverse objects about" aria-label title data-v-f52f19c3>
      <span class="text -mm -up" string="split" string-split="char[center]" data-v-f52f19c3>About</span>
    </a>
    <div class="menu-wrap" data-v-81ce8483><button aria-label="Open Navigation Menu" title="Menu" class="menu button -p -m-m" id="menuToggleBtn" data-v-f52f19c3><span class="text -mm -up" string="split" string-split="char[center]" data-v-f52f19c3>Menu</span><span class="menu-icon" data-v-81ce8483 data-v-f52f19c3-s></span></button></div>
  </div>
</header>
  `.trim();
}

// Compact, Balanced Gallery Card Builder
function renderGalleryCard(p, indexNum, totalCount, isWide = false) {
  const badgeClass = p.status === 'Completed' ? 'badge-completed' : 'badge-ongoing';
  const cardClass = isWide ? 'arch-card arch-card-wide-feature' : 'arch-card arch-card-standard';
  const descText = p.description || p.overview || '';
  const typologyText = p.typology || '';

  return `
    <a href="/projects/${p.slug}" class="${cardClass}">
      <div class="arch-card-media">
        <div class="arch-card-meta">
          <span class="arch-badge ${badgeClass}"><span class="status-dot"></span>${p.status}</span>
          <span class="arch-num">${indexNum} / ${totalCount}</span>
        </div>
        <img src="${p.mainImage}" alt="${p.name} - ${p.location}" loading="lazy">
      </div>
      <div class="arch-card-content">
        <span class="arch-location">${p.location}</span>
        <h3 class="arch-title">${p.name}</h3>
        ${typologyText ? `<span class="arch-typology">${typologyText}</span>` : ''}
        ${descText ? `<p class="arch-narrative">${descText}</p>` : ''}
        <div class="arch-footer">
          <span class="arch-link">Explore Landmark ↗</span>
        </div>
      </div>
    </a>
  `;
}

// Build 9 Completed Projects in Asymmetrical Balanced Rows
function buildCompletedProjectsHtml() {
  const p = completedProjects;

  // Row 1: Asymmetric 60/40 (01 Feature Wide + 02 Companion)
  const row1 = `
    <div class="arch-row arch-row-wide-feature-left">
      ${renderGalleryCard(p[0], '01', '09', true)}
      ${renderGalleryCard(p[1], '02', '09', false)}
    </div>
  `;

  // Row 2: Balanced Trio (03, 04, 05)
  const row2 = `
    <div class="arch-row arch-row-3-equal">
      ${renderGalleryCard(p[2], '03', '09', false)}
      ${renderGalleryCard(p[3], '04', '09', false)}
      ${renderGalleryCard(p[4], '05', '09', false)}
    </div>
  `;

  // Row 3: Asymmetric 40/60 (06 Companion + 07 Feature Wide)
  const row3 = `
    <div class="arch-row arch-row-wide-feature-right">
      ${renderGalleryCard(p[5], '06', '09', false)}
      ${renderGalleryCard(p[6], '07', '09', true)}
    </div>
  `;

  // Row 4: Balanced Duo (08, 09)
  const row4 = `
    <div class="arch-row arch-row-2-equal">
      ${renderGalleryCard(p[7], '08', '09', false)}
      ${renderGalleryCard(p[8], '09', '09', false)}
    </div>
  `;

  return `
    <section class="c-completed-section" id="completed-projects">
      <div class="section-header">
        <span class="section-tag">PORTFOLIO ARCHIVE</span>
        <h2 class="section-title">Completed Projects</h2>
        <p class="section-subtitle">Nine delivered residential landmarks standing as a testament to our enduring commitment to quality construction, structural integrity, and lifelong relationships.</p>
      </div>
      <div class="arch-gallery-container">
        ${row1}
        ${row2}
        ${row3}
        ${row4}
      </div>
    </section>
  `;
}

// Build 6 Ongoing Projects in Asymmetrical Balanced Rows
function buildOngoingProjectsHtml() {
  const p = ongoingProjects;

  // Row 1: Asymmetric 60/40 (01 Flagship Feature + 02 Companion)
  const row1 = `
    <div class="arch-row arch-row-wide-feature-left">
      ${renderGalleryCard(p[0], '01', '06', true)}
      ${renderGalleryCard(p[1], '02', '06', false)}
    </div>
  `;

  // Row 2: Asymmetric 40/60 (03 Companion + 04 Feature Wide)
  const row2 = `
    <div class="arch-row arch-row-wide-feature-right">
      ${renderGalleryCard(p[2], '03', '06', false)}
      ${renderGalleryCard(p[3], '04', '06', true)}
    </div>
  `;

  // Row 3: Balanced Duo (05, 06)
  const row3 = `
    <div class="arch-row arch-row-2-equal">
      ${renderGalleryCard(p[4], '05', '06', false)}
      ${renderGalleryCard(p[5], '06', '06', false)}
    </div>
  `;

  return `
    <section class="c-ongoing-section" id="ongoing-projects">
      <div class="section-header">
        <span class="section-tag">ACTIVE DEVELOPMENTS</span>
        <h2 class="section-title">Ongoing Projects</h2>
        <p class="section-subtitle">Six visionary residential developments currently shaping the next generation of modern living across Nashik's prime growth corridors.</p>
      </div>
      <div class="arch-gallery-container">
        ${row1}
        ${row2}
        ${row3}
      </div>
    </section>
  `;
}

// Build Highlighted Slider Section (Compact, Balanced Central Showcase)
function buildHighlightedProjectsHtml() {
  const first = highlightedProjects[0];
  const satellites = highlightedProjects.slice(1);

  const satelliteHtml = satellites.map((p, idx) => `
    <a href="/projects/${p.slug}" class="satellite-card sat-${idx + 1}" data-index="${idx + 1}" title="${p.name}">
      <img src="${p.mainImage}" alt="${p.name} - ${p.location}" loading="lazy">
      <div class="sat-overlay">
        <span class="sat-num">0${idx + 2}</span>
        <span class="sat-name">${p.name}</span>
      </div>
    </a>
  `).join('\n');

  return `
    <section class="c-highlighted-section" id="highlighted-projects">
      <div class="section-header">
        <span class="section-tag">CURATED COLLECTION</span>
        <h2 class="section-title">Highlighted Projects</h2>
      </div>

      <div class="highlighted-stage">
        <div class="satellite-cards">
          ${satelliteHtml}
        </div>

        <div class="featured-showcase" id="featuredShowcase">
          <div class="featured-image-wrapper">
            <span class="featured-status-badge status-ongoing" id="featStatus">
              <span class="status-dot"></span>${first.status}
            </span>
            <img id="featImg" src="${first.mainImage}" alt="${first.name}" />
            <div class="featured-image-overlay"></div>
          </div>

          <div class="featured-info">
            <div class="featured-top-row">
              <span class="featured-location" id="featLoc">${first.location}</span>
              <span class="featured-counter" id="featCounter"><span>01</span> / 0${highlightedProjects.length}</span>
            </div>
            <h3 class="featured-name" id="featName">${first.name}</h3>
            <p class="featured-desc" id="featDesc">${first.description}</p>
            <div class="featured-action-row">
              <a href="/projects/${first.slug}" class="featured-detail-btn" id="featLink">
                <span>Explore Project</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
              <div class="featured-nav-controls">
                <button type="button" class="feat-nav-btn prev" id="featPrev" aria-label="Previous project">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button type="button" class="feat-nav-btn next" id="featNext" aria-label="Next project">
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
  `;
}

// Build Hero Section
function buildHeroSectionHtml() {
  return `
    <section class="c-projects-hero">
      <svg class="hero-bg-curve" viewBox="0 0 1440 1080" preserveAspectRatio="none">
        <linearGradient id="hero-curve-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f1eade" stop-opacity="0.1" />
          <stop offset="50%" stop-color="#c6a76a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#7b5136" stop-opacity="0.05" />
        </linearGradient>
        <path fill="none" stroke="url(#hero-curve-grad)" stroke-width="1.5" d="M0,800 C400,200 1000,900 1440,300" vector-effect="non-scaling-stroke"></path>
      </svg>
      <div class="-w">
        <span class="section-label">SHREEYOG ARCHITECTURAL PORTFOLIO</span>
        <h1 class="hero-title">Landmarks of Living</h1>
        <p class="hero-subtitle">Since 1992, creating thoughtfully planned residential and commercial environments shaped with trust, quality construction, and lasting value across Nashik.</p>
        <div class="hero-stats">
          <div class="hero-stat-item">
            <span class="hero-stat-num">15+</span>
            <span class="hero-stat-label">Landmark Developments</span>
          </div>
          <div class="hero-stat-item">
            <span class="hero-stat-num">30+</span>
            <span class="hero-stat-label">Years of Trust</span>
          </div>
          <div class="hero-stat-item">
            <span class="hero-stat-num">1000+</span>
            <span class="hero-stat-label">Happy Families</span>
          </div>
          <div class="hero-stat-item">
            <span class="hero-stat-num">100%</span>
            <span class="hero-stat-label">Delivery Commitment</span>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Build CTA Section
function buildCtaSectionHtml() {
  return `
    <section class="c-projects-cta">
      <div class="-w">
        <span class="cta-tag">GET IN TOUCH</span>
        <h2 class="cta-title">Begin Your Living Journey With Shreeyog</h2>
        <p class="cta-desc">Whether exploring ready-possession homes or investing in ongoing developments, our advisory team is ready to provide personalized guidance and private site presentations.</p>
        <a href="/contact" class="cta-btn">Connect With Our Team ↗</a>
      </div>
    </section>
  `;
}

// Master Function: Build Full Projects Page HTML
function buildProjectsPageHtml() {
  const heroHtml = buildHeroSectionHtml();
  const highlightedHtml = buildHighlightedProjectsHtml();
  const completedHtml = buildCompletedProjectsHtml();
  const ongoingHtml = buildOngoingProjectsHtml();
  const ctaHtml = buildCtaSectionHtml();
  const footerHtml = buildWorkingFooterHtml();
  const headerHtml = buildWorkingHeaderHtml();

  return `<!DOCTYPE html>
<html lang="en" class="-loaded -ready">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Shreeyog | Projects Portfolio</title>
  <meta name="description" content="Explore residential and commercial developments by Shreeyog Builders & Land Developers in Nashik. Discover our highlighted, completed, and ongoing architectural landmarks.">
  <meta name="theme-color" content="#151415">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="stylesheet" href="/_nuxt/default.dc95e376.css">
  <link rel="stylesheet" href="/_nuxt/MainFooter.8675ce94.css">
  <link rel="stylesheet" href="/_nuxt/BaseButton.f15eb43b.css">
  <link rel="stylesheet" href="/_nuxt/shreeyog-projects.css">
  <script>
    document.documentElement.classList.add('-loaded', '-ready');
    document.documentElement.style.overflowY = 'auto';
    window.addEventListener('DOMContentLoaded', function() {
      document.documentElement.classList.add('-loaded', '-ready');
      document.documentElement.style.overflowY = 'auto';
      document.body && (document.body.style.overflowY = 'auto');
      var hdr = document.querySelector('header');
      if (hdr) {
        hdr.style.opacity = '1';
        hdr.style.visibility = 'visible';
        hdr.style.pointerEvents = 'all';
      }
    });
  </script>
  <link rel="stylesheet" href="/_nuxt/shreeyog-navbar.css">
</head>
<body class="page-projects -ready -loaded">
  ${headerHtml}

  <main class="page-main page-projects">
    ${heroHtml}
    ${highlightedHtml}
    ${completedHtml}
    ${ongoingHtml}
    ${ctaHtml}
  </main>

  ${footerHtml}

  <!-- Interactive Slider Script -->
  <script>
    (function() {
      const items = ${JSON.stringify(highlightedProjects.map(p => ({
        name: p.name,
        slug: p.slug,
        location: p.location,
        status: p.status,
        mainImage: p.mainImage,
        description: p.description
      })))};

      let currentIdx = 0;
      const featImg = document.getElementById('featImg');
      const featStatus = document.getElementById('featStatus');
      const featLoc = document.getElementById('featLoc');
      const featCounter = document.getElementById('featCounter');
      const featName = document.getElementById('featName');
      const featDesc = document.getElementById('featDesc');
      const featLink = document.getElementById('featLink');
      const btnPrev = document.getElementById('featPrev');
      const btnNext = document.getElementById('featNext');

      function renderSlide(idx) {
        currentIdx = (idx + items.length) % items.length;
        const p = items[currentIdx];
        if (!featImg) return;

        featImg.style.opacity = '0.3';
        setTimeout(() => {
          featImg.src = p.mainImage;
          featImg.alt = p.name;
          featImg.style.opacity = '1';
        }, 150);

        if (featStatus) {
          featStatus.className = 'featured-status-badge status-' + p.status.toLowerCase();
          featStatus.innerHTML = '<span class="status-dot"></span>' + p.status;
        }

        if (featLoc) featLoc.textContent = p.location;
        if (featCounter) featCounter.innerHTML = '<span>0' + (currentIdx + 1) + '</span> / 0' + items.length;
        if (featName) featName.textContent = p.name;
        if (featDesc) featDesc.textContent = p.description;
        if (featLink) featLink.href = '/projects/' + p.slug;
      }

      if (btnPrev && btnNext) {
        btnPrev.addEventListener('click', () => renderSlide(currentIdx - 1));
        btnNext.addEventListener('click', () => renderSlide(currentIdx + 1));
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') renderSlide(currentIdx - 1);
        if (e.key === 'ArrowRight') renderSlide(currentIdx + 1);
      });
    })();
  </script>

  <!-- Full-Screen Navigation Overlay -->
  <div id="projects-menu-overlay" class="full-screen-menu" style="display:none; position:fixed; inset:0; z-index:200;">
    <span class="overlay" id="projects-menu-backdrop"></span>
    <div class="oy">
      <div class="-w">
        <button class="button-close" id="projects-menu-close-btn"><span class="-h2 -m-h4">Close</span></button>
        <span class="close" id="projects-menu-cross-btn"></span>
        <div class="underlay"><div></div></div>
        <nav>
          <div class="guy">
            <figure class="-fit"><img src="/images/guys/g-1.webp" alt="Shreeyog Builders &amp; Land Developers"></figure>
            <span class="-h5 -m-hp">Navigation</span>
          </div>
          <a href="/" class="-h0 -mid-h1 -m-h2 -nl back-home">Home</a>
          <a href="/about" class="-h0 -mid-h1 -m-h2 -nl about">About</a>
          <a href="/projects" class="-h0 -mid-h1 -m-h2 -nl places">Projects</a>
          <a href="/contact" class="-h0 -mid-h1 -m-h2 -nl people">Contact</a>
        </nav>
      </div>
    </div>
  </div>

  <script>
    (function() {
      function initProjectsMenu() {
        var openBtn = document.getElementById('menuToggleBtn');
        var overlay = document.getElementById('projects-menu-overlay');
        var closeBtn = document.getElementById('projects-menu-close-btn');
        var crossBtn = document.getElementById('projects-menu-cross-btn');
        var backdrop = document.getElementById('projects-menu-backdrop');
        var header = document.querySelector('header');

        if (!openBtn || !overlay) return;

        function openMenu() {
          overlay.style.display = 'block';
          document.documentElement.classList.add('-isolate');
          if (header) header.classList.add('-hidden');
        }

        function closeMenu() {
          overlay.style.display = 'none';
          document.documentElement.classList.remove('-isolate');
          if (header) header.classList.remove('-hidden');
        }

        openBtn.addEventListener('click', openMenu);
        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
        if (crossBtn) crossBtn.addEventListener('click', closeMenu);
        if (backdrop) backdrop.addEventListener('click', closeMenu);
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProjectsMenu);
      } else {
        initProjectsMenu();
      }
    })();
  </script>
    
  <script src="/_nuxt/shreeyog-navbar.js" defer></script>
</body>
</html>`;
}

// Master Function: Build Detail Page HTML for a project
function buildDetailPageHtml(project) {
  const headerHtml = buildWorkingHeaderHtml();
  const footerHtml = buildWorkingFooterHtml();

  const specsHtml = (project.specifications || []).map(s => `
    <div class="spec-card">
      <span class="spec-cat">${s.category}</span>
      <p class="spec-detail">${s.detail}</p>
    </div>
  `).join('\n');

  const amenitiesHtml = (project.amenities || []).map(a => `
    <li class="amenity-item">
      <span class="amenity-bullet">✦</span>
      <span class="amenity-text">${a}</span>
    </li>
  `).join('\n');

  const galleryHtml = (project.gallery || []).map((img, i) => `
    <div class="gallery-item ${i === 0 ? 'gallery-item-large' : ''}">
      <img src="${img}" alt="${project.name} Interior & Elevation ${i + 1}" loading="lazy">
    </div>
  `).join('\n');

  const badgeClass = project.status === 'Completed' ? 'badge-completed' : 'badge-ongoing';

  return `<!DOCTYPE html>
<html lang="en" class="-loaded -ready">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${project.name} | Shreeyog Builders &amp; Land Developers</title>
  <meta name="description" content="${project.name} by Shreeyog Builders &amp; Land Developers in ${project.location}. ${project.tagline || project.typology}.">
  <meta name="theme-color" content="#151415">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="stylesheet" href="/_nuxt/default.dc95e376.css">
  <link rel="stylesheet" href="/_nuxt/MainFooter.8675ce94.css">
  <link rel="stylesheet" href="/_nuxt/BaseButton.f15eb43b.css">
  <link rel="stylesheet" href="/_nuxt/shreeyog-projects.css">
  <script>
    document.documentElement.classList.add('-loaded', '-ready');
    document.documentElement.style.overflowY = 'auto';
    window.addEventListener('DOMContentLoaded', function() {
      document.documentElement.classList.add('-loaded', '-ready');
      document.documentElement.style.overflowY = 'auto';
      document.body && (document.body.style.overflowY = 'auto');
    });
  </script>
</head>
<body class="page-detail -ready -loaded">
  ${headerHtml}

  <main class="page-main page-detail-main">
    <div class="detail-nav-bar -w">
      <a href="/projects" class="back-link">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Back to All Projects</span>
      </a>
      <span class="detail-breadcrumb">Projects / ${project.name}</span>
    </div>

    <section class="detail-hero -w">
      <div class="detail-hero-header">
        <div class="detail-meta-pill-row">
          <span class="arch-badge ${badgeClass}"><span class="status-dot"></span>${project.status}</span>
          ${project.rera ? `<span class="rera-badge">${project.rera}</span>` : ''}
        </div>
        <h1 class="detail-hero-title">${project.name}</h1>
        <p class="detail-hero-location">${project.location}</p>
        <p class="detail-hero-typology">${project.typology}</p>
      </div>

      <div class="detail-main-image-frame">
        <img src="${project.mainImage}" alt="${project.name} Architectural Elevation" />
      </div>
    </section>

    <section class="detail-body -w">
      <div class="detail-two-col">
        <div class="detail-narrative-col">
          <h2 class="section-sub-title">Architectural Overview</h2>
          <p class="detail-desc-lead">${project.description}</p>
          ${project.overview ? `<p class="detail-desc-sub">${project.overview}</p>` : ''}
          
          <h2 class="section-sub-title amenities-title">Lifestyle Amenities</h2>
          <ul class="amenities-list">
            ${amenitiesHtml}
          </ul>
        </div>

        <div class="detail-specs-col">
          <div class="specs-box">
            <h3 class="specs-box-title">Key Specifications</h3>
            <div class="specs-grid">
              ${specsHtml}
            </div>

            <div class="detail-inquiry-box">
              <h4>Interested in this property?</h4>
              <p>Speak with our dedicated property advisory team in Nashik for site visits and floor plans.</p>
              <a href="/contact" class="detail-contact-btn">Schedule a Site Consultation ↗</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    ${project.gallery && project.gallery.length > 0 ? `
    <section class="detail-gallery-section -w">
      <h2 class="section-sub-title">Project Gallery</h2>
      <div class="detail-gallery-grid">
        ${galleryHtml}
      </div>
    </section>
    ` : ''}

    <div class="detail-bottom-nav -w">
      <a href="/projects" class="bottom-back-btn">← Back to All Projects Portfolio</a>
    </div>
  </main>

  ${footerHtml}
</body>
</html>`;
}

// Write the main projects page
const projectsHtmlContent = buildProjectsPageHtml();

fs.writeFileSync('public/projects/index.html', projectsHtmlContent, 'utf8');
fs.writeFileSync('public/places/index.html', projectsHtmlContent, 'utf8');
fs.writeFileSync('public/projects.html', projectsHtmlContent, 'utf8');
fs.writeFileSync('pages/projects.html', projectsHtmlContent, 'utf8');
console.log('Successfully wrote public/projects/index.html (and mirrors).');

// Write all 15 detail pages
projects.forEach(p => {
  const detailHtml = buildDetailPageHtml(p);
  const detailDir = path.join('public', 'projects', p.slug);
  if (!fs.existsSync(detailDir)) {
    fs.mkdirSync(detailDir, { recursive: true });
  }
  fs.writeFileSync(path.join(detailDir, 'index.html'), detailHtml, 'utf8');
  fs.writeFileSync(path.join('public', 'projects', `${p.slug}.html`), detailHtml, 'utf8');
});
console.log(`Successfully generated detail pages for all ${projects.length} projects.`);
