const fs = require('fs');

console.log('--- Applying Project Card Explore Disable Fix ---');

// 1. Update scripts/updates/build_projects_pages.js
let buildScript = fs.readFileSync('scripts/updates/build_projects_pages.js', 'utf8');

// In renderGalleryCard:
// replace: <a href="/projects/${p.slug}" class="${cardClass}">
// with: <a href="javascript:void(0)" data-project-href="/projects/${p.slug}" class="${cardClass}" aria-disabled="true">
buildScript = buildScript.replace(
  '<a href="/projects/${p.slug}" class="${cardClass}">',
  '<a href="javascript:void(0)" data-project-href="/projects/${p.slug}" class="${cardClass}" aria-disabled="true">'
);

// In buildHighlightedProjectsHtml satellites:
// replace: <a href="/projects/${p.slug}" class="satellite-card sat-${idx + 1}" data-index="${idx + 1}" title="${p.name}">
// with: <a href="javascript:void(0)" data-project-href="/projects/${p.slug}" class="satellite-card sat-${idx + 1}" data-index="${idx + 1}" title="${p.name}">
buildScript = buildScript.replace(
  '<a href="/projects/${p.slug}" class="satellite-card sat-${idx + 1}" data-index="${idx + 1}" title="${p.name}">',
  '<a href="javascript:void(0)" data-project-href="/projects/${p.slug}" class="satellite-card sat-${idx + 1}" data-index="${idx + 1}" title="${p.name}">'
);

// In buildHighlightedProjectsHtml featLink:
// replace: <a href="/projects/${first.slug}" class="featured-detail-btn" id="featLink">
// with: <a href="javascript:void(0)" data-project-href="/projects/${first.slug}" class="featured-detail-btn" id="featLink" aria-disabled="true">
buildScript = buildScript.replace(
  '<a href="/projects/${first.slug}" class="featured-detail-btn" id="featLink">',
  '<a href="javascript:void(0)" data-project-href="/projects/${first.slug}" class="featured-detail-btn" id="featLink" aria-disabled="true">'
);

// In slider script:
// replace: if (featLink) featLink.href = '/projects/' + p.slug;
// with: if (featLink) { featLink.href = 'javascript:void(0)'; featLink.setAttribute('data-project-href', '/projects/' + p.slug); }
buildScript = buildScript.replace(
  "if (featLink) featLink.href = '/projects/' + p.slug;",
  "if (featLink) { featLink.href = 'javascript:void(0)'; featLink.setAttribute('data-project-href', '/projects/' + p.slug); }"
);

// In slider script, add satellite click to switch slide without navigation:
const satListener = `
      // Satellite click to switch featured showcase without navigation
      document.querySelectorAll('.satellite-card').forEach((sat, i) => {
        sat.addEventListener('click', (e) => {
          e.preventDefault();
          renderSlide(i + 1);
        });
      });

      // Global click interceptor for all project explore links/cards
      document.addEventListener('click', function(e) {
        var card = e.target.closest('.arch-card, .featured-detail-btn, .arch-link');
        if (card) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }, true);
`;

if (!buildScript.includes('Global click interceptor for all project explore links/cards')) {
  buildScript = buildScript.replace(
    "if (e.key === 'ArrowRight') renderSlide(currentIdx + 1);\n      });",
    "if (e.key === 'ArrowRight') renderSlide(currentIdx + 1);\n      });\n" + satListener
  );
}

fs.writeFileSync('scripts/updates/build_projects_pages.js', buildScript, 'utf8');
console.log('Updated scripts/updates/build_projects_pages.js');

// Run build_projects_pages.js to generate updated public/projects/index.html and pages/projects.html
require('./build_projects_pages.js');
console.log('Rebuilt public/projects/index.html and pages/projects.html');
