/**
 * MR.FIXERS INDIA PVT LTD - Main JavaScript
 * Handles Theme Toggling (Light/Dark), Navigation, Search, Drawer, and Interactive UI
 */

(function () {
  'use strict';

  // ==========================================
  // 1. THEME SWITCHER (LIGHT / DARK MODE)
  // ==========================================
  const THEME_STORAGE_KEY = 'mrfixers_theme_preference';

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    applyTheme(initialTheme);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Update toggle icons on all buttons
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'fa-solid fa-sun';
          btn.setAttribute('title', 'Switch to Light Mode');
          btn.setAttribute('aria-label', 'Switch to Light Mode');
        } else {
          icon.className = 'fa-solid fa-moon';
          btn.setAttribute('title', 'Switch to Dark Mode');
          btn.setAttribute('aria-label', 'Switch to Dark Mode');
        }
      }
    });
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  }

  // Initialize immediately to prevent flash
  initTheme();

  // ==========================================
  // 2. DOM EVENT LISTENERS
  // ==========================================
  document.addEventListener('DOMContentLoaded', () => {
    // Re-verify theme button icons
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(currentTheme);

    // Attach theme toggle click handlers
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    // ------------------------------------------
    // Mobile Drawer Navigation
    // ------------------------------------------
    const mobileMenuBtn = document.querySelector('.mobile-toggle-btn');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const drawerCloseBtn = document.querySelector('.drawer-close-btn');

    if (mobileMenuBtn && mobileDrawer) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileDrawer.classList.add('open');
        document.body.style.overflow = 'hidden';
      });

      const closeDrawer = () => {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      };

      if (drawerCloseBtn) {
        drawerCloseBtn.addEventListener('click', closeDrawer);
      }

      // Close on clicking outside the drawer content
      mobileDrawer.addEventListener('click', (e) => {
        if (e.target === mobileDrawer) {
          closeDrawer();
        }
      });

      // Close on clicking any drawer link
      mobileDrawer.querySelectorAll('.drawer-nav a').forEach(link => {
        link.addEventListener('click', closeDrawer);
      });
    }

    // ------------------------------------------
    // Sticky Header Scroll Effect
    // ------------------------------------------
    const header = document.querySelector('.site-header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }, { passive: true });
    }

    // ------------------------------------------
    // Services Category Filtering
    // ------------------------------------------
    const filterTabs = document.querySelectorAll('.filter-tab-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    if (filterTabs.length > 0 && serviceCards.length > 0) {
      filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          filterTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');

          const category = tab.getAttribute('data-category');

          serviceCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category') || '';
            if (category === 'all' || cardCategory.includes(category)) {
              card.style.display = 'flex';
              setTimeout(() => { card.style.opacity = '1'; }, 10);
            } else {
              card.style.display = 'none';
              card.style.opacity = '0';
            }
          });
        });
      });
    }

    // ------------------------------------------
    // Hero Search Input Filter
    // ------------------------------------------
    const searchInput = document.querySelector('.service-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.service-card');

        cards.forEach(card => {
          const title = (card.querySelector('.service-card-title')?.textContent || '').toLowerCase();
          const desc = (card.querySelector('.service-card-desc')?.textContent || '').toLowerCase();
          const features = (card.querySelector('.service-features-list')?.textContent || '').toLowerCase();

          if (title.includes(query) || desc.includes(query) || features.includes(query)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });

      // Allow Enter to scroll to services section
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const servicesSection = document.getElementById('services') || document.querySelector('.services-section');
          if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    }

    // ------------------------------------------
    // FAQ Accordion
    // ------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', () => {
          const isOpen = item.classList.contains('active');
          faqItems.forEach(i => i.classList.remove('active'));
          if (!isOpen) {
            item.classList.add('active');
          }
        });
      }
    });

    // ------------------------------------------
    // Close Modal by clicking backdrop or close button
    // ------------------------------------------
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.closest('.modal-close-btn')) {
          overlay.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });
  });

  // Global helper for opening booking modal with pre-selected service
  window.openBookingForService = function (serviceName) {
    if (window.location.pathname.includes('enquiry.html')) {
      const select = document.getElementById('service_select');
      if (select) {
        select.value = serviceName;
        select.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      window.location.href = `enquiry.html?service=${encodeURIComponent(serviceName)}`;
    }
  };

})();
