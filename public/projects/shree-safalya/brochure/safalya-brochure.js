/**
 * SHREE SAFALYA DIGITAL BROCHURE INTERACTIVE SCRIPT
 * Handles Navigation Scrollspy, Tab Switchers, Lightbox, and Modal Form
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
          closeSidebar();
          targetSec.scrollIntoView({ behavior: 'smooth' });
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

  // 3. Tab Switchers (Scoped for Floor Plans & Unit Layouts)
  function initTabGroup(containerSelector) {
    const containers = document.querySelectorAll(containerSelector);
    containers.forEach(container => {
      const tabBtns = container.querySelectorAll('.tab-btn');
      const tabPanels = container.querySelectorAll('.tab-panel');

      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('data-tab');
          tabBtns.forEach(b => b.classList.remove('active'));
          tabPanels.forEach(p => p.classList.remove('active'));

          btn.classList.add('active');
          const activePanel = container.querySelector(`#${targetId}`);
          if (activePanel) {
            activePanel.classList.add('active');
          }
        });
      });
    });
  }

  initTabGroup('#floor-plans');
  initTabGroup('#unit-plans');

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

  document.querySelectorAll('[data-zoom-src]').forEach(el => {
    el.addEventListener('click', () => {
      const src = el.getAttribute('data-zoom-src') || el.getAttribute('src');
      if (src) openLightbox(src);
    });
  });

  // 5. Site Visit / Enquiry Modal
  const enquiryModal = document.getElementById('enquiryModal');
  const enquiryClose = document.getElementById('enquiryClose');
  const enquiryForm = document.getElementById('enquiryForm');
  const enquiryTypeInput = document.getElementById('enquiryType');

  function openEnquiry(type = 'visit') {
    if (enquiryModal) {
      if (enquiryTypeInput) enquiryTypeInput.value = type;
      enquiryModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeEnquiry() {
    if (enquiryModal) {
      enquiryModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('[data-open-enquiry]').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-enquiry-type') || 'visit';
      openEnquiry(type);
    });
  });

  if (enquiryClose) enquiryClose.addEventListener('click', closeEnquiry);
  if (enquiryModal) {
    enquiryModal.addEventListener('click', (e) => {
      if (e.target === enquiryModal) closeEnquiry();
    });
  }

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = enquiryForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Booking Confirmed!';
        setTimeout(() => {
          closeEnquiry();
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Submit Request';
          enquiryForm.reset();
        }, 1500);
      }
    });
  }

  // Keyboard Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeEnquiry();
      closeSidebar();
    }
  });
});
