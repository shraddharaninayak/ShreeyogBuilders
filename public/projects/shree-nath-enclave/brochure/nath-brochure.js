/**
 * SHREE NATH ENCLAVE DIGITAL BROCHURE INTERACTIVE SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Mobile Sidebar Toggle
  const sidebar = document.getElementById('brochureSidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarClose = document.getElementById('sidebarClose');
  const backdrop = document.getElementById('sidebarBackdrop');

  function openSidebar() {
    if (sidebar) sidebar.classList.add('open');
    if (backdrop) backdrop.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
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
          if (window.innerWidth <= 860) {
            closeSidebar();
          }
        }
      }
    });
  });

  function updateActiveNav() {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // 3. Tab Switcher
  const tabBtns = document.querySelectorAll('#floor-plans .tab-btn');
  const tabPanels = document.querySelectorAll('#floor-plans .tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(targetId);
      if (activePanel) activePanel.classList.add('active');
    });
  });

  // 4. Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src) {
    if (lightboxModal && lightboxImg) {
      lightboxImg.src = src;
      lightboxModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Zoomable elements (overview frame, plan frames, location map)
  const zoomTriggers = document.querySelectorAll('[data-zoomable], .plan-frame');
  zoomTriggers.forEach(el => {
    el.addEventListener('click', () => {
      const img = el.querySelector('img');
      if (img) {
        openLightbox(img.src);
      }
    });
  });

  // 5. Enquiry Modal
  const enquiryModal = document.getElementById('enquiryModal');
  const enquiryClose = document.getElementById('enquiryClose');
  const enquiryForm = document.getElementById('enquiryForm');
  const enquirySuccess = document.getElementById('enquirySuccess');
  const openEnquiryBtns = document.querySelectorAll('[data-open-enquiry]');

  function openEnquiry() {
    if (enquiryModal) {
      enquiryModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeEnquiry() {
    if (enquiryModal) {
      enquiryModal.classList.remove('open');
      document.body.style.overflow = '';
      if (enquiryForm) enquiryForm.reset();
      if (enquirySuccess) enquirySuccess.style.display = 'none';
      if (enquiryForm) enquiryForm.style.display = 'flex';
    }
  }

  openEnquiryBtns.forEach(btn => btn.addEventListener('click', openEnquiry));
  if (enquiryClose) enquiryClose.addEventListener('click', closeEnquiry);
  if (enquiryModal) {
    enquiryModal.addEventListener('click', (e) => {
      if (e.target === enquiryModal) closeEnquiry();
    });
  }

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      enquiryForm.style.display = 'none';
      if (enquirySuccess) enquirySuccess.style.display = 'block';
      setTimeout(() => {
        closeEnquiry();
      }, 3500);
    });
  }

  // Escape key listener for modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeEnquiry();
      closeSidebar();
    }
  });
});
