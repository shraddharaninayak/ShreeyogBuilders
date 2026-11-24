import os

with open('scripts/updates/build_projects_pages.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update completedSlugs to include shree-kala
old_completed_slugs = """const completedSlugs = [
  'shree-vishwa',
  'shree-samruddhi-park',
  'shree-neelkanth',
  'shree-padma',
  'shree-anant',
  'shree-niwas',
  'shree-nath-enclave',
  'shree-navshakti',
  'shree-swarup'
];"""

new_completed_slugs = """const completedSlugs = [
  'shree-vishwa',
  'shree-samruddhi-park',
  'shree-neelkanth',
  'shree-padma',
  'shree-anant',
  'shree-niwas',
  'shree-nath-enclave',
  'shree-navshakti',
  'shree-kala',
  'shree-swarup'
];"""

content = content.replace(old_completed_slugs, new_completed_slugs)
content = content.replace('// Completed (9 projects)', '// Completed (10 projects)')
content = content.replace('Nine delivered residential landmarks', 'Ten delivered residential landmarks')

# 2. Update satellite card href in buildCompletedProjectsHtml
content = content.replace(
    '''  const satelliteHtml = satellites.map((p, idx) => `
    <a href="javascript:void(0)" data-project-href="/projects/${p.slug}" class="satellite-card sat-${idx + 1}" data-index="${idx + 1}" title="${p.name}">''',
    '''  const satelliteHtml = satellites.map((p, idx) => `
    <a href="${p.brochure || p.brochureUrl || `/projects/${p.slug}`}" data-project-href="${p.brochure || p.brochureUrl || `/projects/${p.slug}`}" class="satellite-card sat-${idx + 1}" data-index="${idx + 1}" title="${p.name}">'''
)

# 3. Update featured-detail-btn for completed projects
content = content.replace(
    '''<a href="javascript:void(0)" data-project-href="/projects/${first.slug}" class="featured-detail-btn" id="featLinkCompleted" aria-disabled="true">''',
    '''<a href="${first.brochure || first.brochureUrl || `/projects/${first.slug}`}" data-project-href="${first.brochure || first.brochureUrl || `/projects/${first.slug}`}" class="featured-detail-btn" id="featLinkCompleted">'''
)

# 4. In setupShowcaseSlider: update featLink destination
content = content.replace(
    '''          if (featLink) {
            featLink.href = 'javascript:void(0)';
            featLink.setAttribute('data-project-href', '/projects/' + p.slug);
          }''',
    '''          if (featLink) {
            const destUrl = p.brochure || p.brochureUrl || ('/projects/' + p.slug);
            featLink.href = destUrl;
            featLink.setAttribute('data-project-href', destUrl);
            featLink.removeAttribute('aria-disabled');
          }'''
)

# 5. In setupShowcaseSlider: items mapping to include brochure
content = content.replace(
    '''        items: ${JSON.stringify(completedProjects.map(p => ({
          name: p.name,
          slug: p.slug,
          location: p.location,
          status: p.status,
          mainImage: p.mainImage,
          description: p.description,
          logo: p.logo || ''
        })))},''',
    '''        items: ${JSON.stringify(completedProjects.map(p => ({
          name: p.name,
          slug: p.slug,
          location: p.location,
          status: p.status,
          mainImage: p.mainImage,
          description: p.description,
          logo: p.logo || '',
          brochure: p.brochure || p.brochureUrl || ''
        })))},'''
)

# 6. In setupShowcaseSlider: active satellite click & image wrapper click to navigate
old_sat_listener = '''        section.querySelectorAll('.satellite-card').forEach((sat) => {
          sat.addEventListener('click', (e) => {
            e.preventDefault();
            const targetIdx = parseInt(sat.getAttribute('data-index'), 10);
            if (!isNaN(targetIdx)) {
              renderSlide(targetIdx);
            }
          });
        });'''

new_sat_listener = '''        section.querySelectorAll('.satellite-card').forEach((sat) => {
          sat.addEventListener('click', (e) => {
            const targetIdx = parseInt(sat.getAttribute('data-index'), 10);
            if (targetIdx === currentIdx) {
              const p = items[currentIdx];
              const destUrl = p.brochure || p.brochureUrl || ('/projects/' + p.slug);
              window.location.href = destUrl;
              return;
            }
            e.preventDefault();
            if (!isNaN(targetIdx)) {
              renderSlide(targetIdx);
            }
          });
        });

        const featWrapper = section.querySelector('.featured-image-wrapper');
        if (featWrapper) {
          featWrapper.style.cursor = 'pointer';
          featWrapper.addEventListener('click', () => {
            const p = items[currentIdx];
            const destUrl = p.brochure || p.brochureUrl || ('/projects/' + p.slug);
            window.location.href = destUrl;
          });
        }'''

content = content.replace(old_sat_listener, new_sat_listener)

# 7. In buildDetailPageHtml: add digital brochure buttons in hero header
old_detail_hero = '''        <p class="detail-hero-typology">${project.typology}</p>
      </div>'''

new_detail_hero = '''        <p class="detail-hero-typology">${project.typology}</p>
        ${project.brochure || project.brochureUrl ? `
        <div style="margin-top: 1.25rem; display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="${project.brochure || project.brochureUrl}" class="detail-contact-btn" style="background: linear-gradient(135deg, #c6a76a 0%, #a88448 100%); color: #151415; font-weight: 600;">
            <span>Explore Digital Brochure</span> ↗
          </a>
          ${project.brochurePdf ? `
          <a href="${project.brochurePdf}" download="${project.name.replace(/\\s+/g, '-')}-Brochure.pdf" class="detail-contact-btn" style="background: rgba(255, 255, 255, 0.08); border-color: rgba(255, 255, 255, 0.25);">
            <span>Download PDF Brochure</span> ↓
          </a>
          ` : ''}
        </div>
        ` : ''}
      </div>'''

content = content.replace(old_detail_hero, new_detail_hero)

with open('scripts/updates/build_projects_pages.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('build_projects_pages.js updated successfully!')
