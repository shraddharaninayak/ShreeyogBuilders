/**
 * SHREE NANDAN DIGITAL BROCHURE INTERACTIVE SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Sidebar Toggle
  const sidebar = document.getElementById('brochureSidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarClose = document.getElementById('sidebarClose');
  const backdrop = document.getElementById('sidebarBackdrop');

  function openSidebar() {
    sidebar.classList.add('open');
    if (backdrop) backdrop.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('visible');
    document.body.style.overflow = '';
  }

  if (sidebarToggle) sidebarToggle.addEventListener('click', openSidebar);
  if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
  if (backdrop) backdrop.addEventListener('click', closeSidebar);

  // 2. Sidebar Navigation Scrollspy & Smooth Scroll
  const navLinks = document.querySelectorAll('.sidebar-nav__link');
  const sections = document.querySelectorAll('.brochure-section, .overview-hero');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetSec = document.querySelector(targetId);
        if (targetSec) {
          e.preventDefault();
          targetSec.scrollIntoView({ behavior: 'smooth' });

          // Auto close mobile drawer on navigation click
          if (window.innerWidth <= 860) {
            closeSidebar();
          }

          // Update active state
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  });

  // Scrollspy via IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (id) {
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));

  // 3. Floor Plan Tabs
  const tabButtons = document.querySelectorAll('.plan-tab-btn');
  const tabContents = document.querySelectorAll('.plan-tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const activeContent = document.getElementById(tabTarget);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });

  // 4. Fullscreen Image Modal Lightbox
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxOverlay = document.getElementById('lightboxOverlay');

  function openLightbox(src) {
    if (!src || !lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    if (lightboxImg) lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  // Bind zoom triggers
  document.querySelectorAll('[data-zoom-src]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const zoomSrc = el.getAttribute('data-zoom-src');
      if (zoomSrc) {
        openLightbox(zoomSrc);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

  // 5. Enquiry Modal
  const enquiryModal = document.getElementById('enquiryModal');
  const enquiryClose = document.getElementById('enquiryClose');
  const enquiryBackdrop = document.getElementById('enquiryBackdrop');
  const enquiryTriggers = document.querySelectorAll('[data-open-enquiry]');

  function openEnquiry() {
    if (!enquiryModal) return;
    enquiryModal.classList.add('open');
    enquiryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeEnquiry() {
    if (!enquiryModal) return;
    enquiryModal.classList.remove('open');
    enquiryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  enquiryTriggers.forEach(btn => btn.addEventListener('click', openEnquiry));
  if (enquiryClose) enquiryClose.addEventListener('click', closeEnquiry);
  if (enquiryBackdrop) enquiryBackdrop.addEventListener('click', closeEnquiry);

  // Global ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeEnquiry();
      closeSidebar();
    }
  });
});
