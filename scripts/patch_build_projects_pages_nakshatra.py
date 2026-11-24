with open('scripts/updates/build_projects_pages.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update completedSlugs to add shree-nakshatra
old_slugs = """const completedSlugs = [
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

new_slugs = """const completedSlugs = [
  'shree-vishwa',
  'shree-samruddhi-park',
  'shree-neelkanth',
  'shree-padma',
  'shree-anant',
  'shree-niwas',
  'shree-nath-enclave',
  'shree-navshakti',
  'shree-kala',
  'shree-nakshatra',
  'shree-swarup'
];"""

code = code.replace(old_slugs, new_slugs)
code = code.replace('// Completed (10 projects)', '// Completed (11 projects)')
code = code.replace('Ten delivered residential landmarks', 'Eleven delivered residential landmarks')
code = code.replace('15+</span>\n            <span class="hero-stat-label">Landmark Developments', '17+</span>\n            <span class="hero-stat-label">Landmark Developments')

# 2. Add logo to satellite cards in buildHighlightedProjectsHtml, buildOngoingProjectsHtml, buildCompletedProjectsHtml
old_ongoing_sat = '''  const satelliteHtml = satellites.map((p, idx) => `
    <a href="javascript:void(0)" data-project-href="/projects/${p.slug}" class="satellite-card sat-${idx + 1}" data-index="${idx + 1}" title="${p.name}">
      <img src="${p.mainImage}" alt="${p.name} - ${p.location}" loading="lazy">'''

new_ongoing_sat = '''  const satelliteHtml = satellites.map((p, idx) => `
    <a href="${p.brochure || p.brochureUrl || `/projects/${p.slug}`}" data-project-href="${p.brochure || p.brochureUrl || `/projects/${p.slug}`}" class="satellite-card sat-${idx + 1}" data-index="${idx + 1}" title="${p.name}">
      ${p.logo ? `<div class="sat-card-logo"><img src="${p.logo}" alt="${p.name} Logo"></div>` : ''}
      <img src="${p.mainImage}" alt="${p.name} - ${p.location}" loading="lazy">'''

code = code.replace(old_ongoing_sat, new_ongoing_sat)

# Update Highlighted Satellites
old_hl_sat = '''  const satelliteHtml = satellites.map((p, idx) => `
    <a href="javascript:void(0)" data-project-href="/projects/${p.slug}" class="satellite-card sat-${idx + 1}" data-index="${idx + 1}" title="${p.name}">
      <img src="${p.mainImage}" alt="${p.name} - ${p.location}" loading="lazy">'''

# Note: if old_ongoing_sat was replaced, let's also make sure highlighted sat is replaced if distinct
code = code.replace(old_hl_sat, new_ongoing_sat)

# Update Completed Satellites to include sat-card-logo
old_comp_sat = '''  const satelliteHtml = satellites.map((p, idx) => `
    <a href="${p.brochure || p.brochureUrl || `/projects/${p.slug}`}" data-project-href="${p.brochure || p.brochureUrl || `/projects/${p.slug}`}" class="satellite-card sat-${idx + 1}" data-index="${idx + 1}" title="${p.name}">
      <img src="${p.mainImage}" alt="${p.name} - ${p.location}" loading="lazy">'''

new_comp_sat = '''  const satelliteHtml = satellites.map((p, idx) => `
    <a href="${p.brochure || p.brochureUrl || `/projects/${p.slug}`}" data-project-href="${p.brochure || p.brochureUrl || `/projects/${p.slug}`}" class="satellite-card sat-${idx + 1}" data-index="${idx + 1}" title="${p.name}">
      ${p.logo ? `<div class="sat-card-logo"><img src="${p.logo}" alt="${p.name} Logo"></div>` : ''}
      <img src="${p.mainImage}" alt="${p.name} - ${p.location}" loading="lazy">'''

code = code.replace(old_comp_sat, new_comp_sat)

# Also ensure ongoing showcase initial link uses destUrl
code = code.replace(
    '''<a href="javascript:void(0)" data-project-href="/projects/${first.slug}" class="featured-detail-btn" id="featLinkOngoing" aria-disabled="true">''',
    '''<a href="${first.brochure || first.brochureUrl || `/projects/${first.slug}`}" data-project-href="${first.brochure || first.brochureUrl || `/projects/${first.slug}`}" class="featured-detail-btn" id="featLinkOngoing">'''
)

code = code.replace(
    '''<a href="javascript:void(0)" data-project-href="/projects/${first.slug}" class="featured-detail-btn" id="featLink" aria-disabled="true">''',
    '''<a href="${first.brochure || first.brochureUrl || `/projects/${first.slug}`}" data-project-href="${first.brochure || first.brochureUrl || `/projects/${first.slug}`}" class="featured-detail-btn" id="featLink">'''
)

with open('scripts/updates/build_projects_pages.js', 'w', encoding='utf-8') as f:
    f.write(code)

print('build_projects_pages.js patched for Shree Nakshatra and all logos!')
