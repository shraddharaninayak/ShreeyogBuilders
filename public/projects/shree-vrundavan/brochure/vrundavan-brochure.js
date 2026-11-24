/**
 * Shree Vrundavan Digital Brochure Interactive Engine
 * Handles Navigation ScrollSpy, Floor Plan Tabs, Lightbox Inspector, and Mobile Drawer
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

  // 3. Lightbox Modal
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

  // 4. Mobile Menu Drawer Toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileMenuToggle && mobileDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
    });

    mobileDrawer.querySelectorAll('.sidebar-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
      });
    });
  }

  // 5. ESC Key to close lightbox
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      lightboxModal.classList.remove('active');
    }
  });
});
