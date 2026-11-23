/**
 * Shree Pandurang Digital Brochure Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation ScrollSpy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar-nav-link, .mobile-drawer .sidebar-nav-link');

  const onScroll = () => {
    const scrollPos = window.scrollY + 180;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 2. Floor Plan Tabs
  const planTabBtns = document.querySelectorAll('.plan-tab-btn');
  const planTabPanels = document.querySelectorAll('.plan-tab-panel');

  planTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      planTabBtns.forEach(b => b.classList.remove('active'));
      planTabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // 3. Unit Plan Tabs (2 BHK vs 3 BHK)
  const unitTabBtns = document.querySelectorAll('.unit-tab-btn');
  const unitTabPanels = document.querySelectorAll('.unit-tab-panel');

  unitTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-unit-tab');

      unitTabBtns.forEach(b => b.classList.remove('active'));
      unitTabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // 4. Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  const zoomTriggers = document.querySelectorAll('[data-zoom-src]');
  zoomTriggers.forEach(el => {
    el.addEventListener('click', () => {
      const src = el.getAttribute('data-zoom-src');
      if (src && lightboxImg && lightboxModal) {
        lightboxImg.src = src;
        lightboxModal.classList.add('active');
      }
    });
  });

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  // 5. Enquiry Modal
  const enquiryModal = document.getElementById('enquiryModal');
  const enquiryClose = document.getElementById('enquiryClose');
  const enquiryOpenBtns = document.querySelectorAll('.open-enquiry-modal');

  enquiryOpenBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (enquiryModal) {
        enquiryModal.classList.add('active');
      }
    });
  });

  if (enquiryClose && enquiryModal) {
    enquiryClose.addEventListener('click', () => {
      enquiryModal.classList.remove('active');
    });

    enquiryModal.addEventListener('click', (e) => {
      if (e.target === enquiryModal) {
        enquiryModal.classList.remove('active');
      }
    });
  }

  const enquiryForm = document.getElementById('enquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your interest in Shree Pandurang. Our sales advisor will connect with you shortly.');
      enquiryModal.classList.remove('active');
      enquiryForm.reset();
    });
  }

  // 6. Mobile Drawer Toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileMenuToggle && mobileDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
    });

    const mobileDrawerLinks = mobileDrawer.querySelectorAll('.sidebar-nav-link');
    mobileDrawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
      });
    });
  }

  // 7. Global Escape Key Listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxModal) lightboxModal.classList.remove('active');
      if (enquiryModal) enquiryModal.classList.remove('active');
      if (mobileDrawer) mobileDrawer.classList.remove('active');
    }
  });
});
