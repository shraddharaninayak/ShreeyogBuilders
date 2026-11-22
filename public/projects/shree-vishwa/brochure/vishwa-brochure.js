/**
 * Shree Bramhand — Interactive Digital Project Brochure Script
 */

(function () {
  'use strict';

  // 1. Mobile Sidebar Navigation Toggle
  const sidebar = document.getElementById('brochureSidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarClose = document.getElementById('sidebarClose');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');

  function openSidebar() {
    if (sidebar) sidebar.classList.add('open');
    if (sidebarBackdrop) sidebarBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (sidebarToggle) sidebarToggle.addEventListener('click', openSidebar);
  if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);

  // 2. Smooth Scrolling & Auto Close Mobile Sidebar on Link Click
  const navLinks = document.querySelectorAll('.sidebar-nav__link');
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
          if (window.innerWidth <= 1080) {
            closeSidebar();
          }
        }
      }
    });
  });

  // 3. Scrollspy — Highlight Active Section in Sidebar
  const sections = document.querySelectorAll('main > section[id]');
  function updateScrollspy() {
    const scrollPos = window.scrollY + 200;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateScrollspy, { passive: true });
  updateScrollspy();

  // 4. Tab Switchers (Scoped per Section / Tab Nav)
  const tabContainers = document.querySelectorAll('.plan-tabs-nav');
  tabContainers.forEach((container) => {
    const tabs = container.querySelectorAll('.plan-tab-btn');
    const parentSection = container.closest('section');
    const panels = parentSection ? parentSection.querySelectorAll('.plan-panel') : [];

    tabs.forEach((tab) => {
      tab.addEventListener('click', function () {
        const targetId = this.getAttribute('data-tab');

        tabs.forEach((t) => t.classList.remove('active'));
        panels.forEach((p) => p.classList.remove('active'));

        this.classList.add('active');
        const activePanel = document.getElementById(targetId);
        if (activePanel) {
          activePanel.classList.add('active');
        }
      });
    });
  });

  // 5. Lightbox Image Zoom
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  const zoomables = document.querySelectorAll('[data-zoomable]');
  zoomables.forEach((item) => {
    item.addEventListener('click', function () {
      const img = this.querySelector('img');
      if (img && lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Enlarged Architectural Drawing';
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', function (e) {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // 6. Enquiry / Private Visit Modal
  const enquiryModal = document.getElementById('enquiryModal');
  const enquiryClose = document.getElementById('enquiryClose');
  const enquiryForm = document.getElementById('enquiryForm');
  const enquirySuccess = document.getElementById('enquirySuccess');
  const enquiryTypeInput = document.getElementById('enquiryTypeInput');
  const enquiryModalTitle = document.getElementById('enquiryModalTitle');

  const openEnquiryButtons = document.querySelectorAll('[data-open-enquiry]');
  openEnquiryButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      const type = this.getAttribute('data-enquiry-type') || 'visit';
      if (enquiryModalTitle) {
        enquiryModalTitle.textContent =
          type === 'visit' ? 'Schedule a Private Site Visit' : 'Request Digital Brochure & Enquiry';
      }
      if (enquiryTypeInput) {
        enquiryTypeInput.value = type === 'visit' ? 'Site Visit' : 'General Enquiry';
      }
      if (enquiryModal) {
        enquiryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeEnquiryModal() {
    if (enquiryModal) {
      enquiryModal.classList.remove('active');
      document.body.style.overflow = '';
      if (enquiryForm) enquiryForm.reset();
      if (enquirySuccess) enquirySuccess.style.display = 'none';
      if (enquiryForm) enquiryForm.style.display = 'flex';
    }
  }

  if (enquiryClose) enquiryClose.addEventListener('click', closeEnquiryModal);
  if (enquiryModal) {
    enquiryModal.addEventListener('click', function (e) {
      if (e.target === enquiryModal) closeEnquiryModal();
    });
  }

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      enquiryForm.style.display = 'none';
      if (enquirySuccess) enquirySuccess.style.display = 'block';
      setTimeout(() => {
        closeEnquiryModal();
      }, 3500);
    });
  }

  // 7. Keyboard escape to close modals
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeLightbox();
      closeEnquiryModal();
      closeSidebar();
    }
  });
})();
