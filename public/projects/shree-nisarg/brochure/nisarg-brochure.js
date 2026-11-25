// Digital Brochure Interactions & Zoom Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // 1. Mobile Drawer Toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileMenuToggle && mobileDrawer) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileMenuToggle.innerHTML = isOpen ? '<span>Close</span> &times;' : '<span>Menu</span> &#9776;';
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuToggle.innerHTML = '<span>Menu</span> &#9776;';
      });
    });
  }

  // 2. Floor Plan Tabs (Support both .floorplan-tab-btn / data-tab AND .plan-tab-btn / data-target)
  const tabBtns = document.querySelectorAll('.floorplan-tab-btn, .plan-tab-btn');
  const tabContents = document.querySelectorAll('.floorplan-tab-content, .plan-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetId = this.getAttribute('data-tab') || this.getAttribute('data-target');
      if (!targetId) return;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      this.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // 3. Lightbox Modal (Click to zoom floor plans, elevations & gallery pages)
  const lightboxModal = document.getElementById('lightboxModal') || document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');

  // Trigger on data-lightbox or data-zoom-src
  const zoomTriggers = document.querySelectorAll('[data-lightbox], [data-zoom-src]');
  zoomTriggers.forEach(el => {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      const imgSrc = this.getAttribute('data-lightbox') || this.getAttribute('data-zoom-src');
      const captionText = this.getAttribute('data-caption') || this.getAttribute('title') || '';

      if (lightboxModal && lightboxImg && imgSrc) {
        lightboxImg.src = imgSrc;
        if (lightboxCaption) {
          lightboxCaption.textContent = captionText;
          lightboxCaption.style.display = captionText ? 'block' : 'none';
        }
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightboxModal() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
      if (lightboxImg) lightboxImg.src = '';
    }
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightboxModal);
  }
  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', closeLightboxModal);
  }
  if (lightboxModal) {
    lightboxModal.addEventListener('click', function(e) {
      if (e.target === lightboxModal) {
        closeLightboxModal();
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      closeLightboxModal();
    }
  });

  // 4. ScrollSpy for Sidebar Navigation
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar-nav-link');

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', function() {
      let currentId = '';
      const scrollPos = window.pageYOffset + 140;

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
          if (link.getAttribute('href') === '#' + currentId) {
            link.classList.add('active');
          }
        });
      }
    }, { passive: true });
  }
});
