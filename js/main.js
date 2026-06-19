/**
 * =========================================
 * CROWN BARBER STUDIO – MAIN JAVASCRIPT
 * Premium Luxury Barbershop Landing Page
 * =========================================
 *
 * ── HOW TO EDIT WHATSAPP NUMBER ──────────
 *    Change the value of WA_CONFIG.phone below.
 *    ALL WhatsApp buttons on the page will
 *    update automatically.
 *
 * ── HOW TO EDIT OPENING MESSAGE ──────────
 *    Change the value of WA_CONFIG.message below.
 * =========================================
 */

/* ─── MASTER WHATSAPP CONFIGURATION ─────── */
/* ✏️ EDIT HERE: Change once, updates everywhere */
const WA_CONFIG = {
  phone:   '6281234567890',           // Format: country code + number, no spaces or dashes
  message: 'Halo Crown Barber Studio! Saya ingin booking appointment. Bisa bantu saya? 😊'
};

/* ─── DOM READY ──────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initWhatsApp();
  initNavbar();
  initScrollAnimations();
  initCounters();
  initGallery();
  initLightbox();
  initBackToTop();
  initFooterYear();
  initHeroKenBurns();
  initNavLinks();
});

/* ═══════════════════════════════════════════
   1. WHATSAPP INTEGRATION
   ═══════════════════════════════════════════ */
function initWhatsApp() {
  const waUrl = buildWaUrl(WA_CONFIG.phone, WA_CONFIG.message);

  // Update ALL elements with class .btn-wa-global
  document.querySelectorAll('.btn-wa-global').forEach(el => {
    el.setAttribute('href', waUrl);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  // Also update floating WA button
  const floatingWa = document.getElementById('floating-wa');
  if (floatingWa) {
    floatingWa.setAttribute('href', waUrl);
    floatingWa.setAttribute('target', '_blank');
    floatingWa.setAttribute('rel', 'noopener noreferrer');
  }
}

function buildWaUrl(phone, message) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/* ═══════════════════════════════════════════
   2. STICKY NAVBAR
   ═══════════════════════════════════════════ */
function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const toggle  = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-links');

  // Scroll handler
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load

  // Mobile toggle
  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    // Close on nav link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  function closeMobileMenu() {
    navMenu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

/* ═══════════════════════════════════════════
   3. ACTIVE NAV LINK ON SCROLL
   ═══════════════════════════════════════════ */
function initNavLinks() {
  const sections  = document.querySelectorAll('section[id], header[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    const scrollY = window.scrollY + 100;

    let currentSection = '';
    sections.forEach(section => {
      if (scrollY >= section.offsetTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

/* ═══════════════════════════════════════════
   4. SCROLL ANIMATIONS (Intersection Observer)
   ═══════════════════════════════════════════ */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════
   5. ANIMATED COUNTERS
   ═══════════════════════════════════════════ */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  let started    = false;

  function startCounters() {
    if (started) return;
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      started = true;
      counters.forEach(counter => animateCounter(counter));
    }
  }

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target);
    const decimal  = parseInt(el.dataset.decimal) || 0;
    const duration = 1800;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease     = easeOutQuart(progress);
      const current  = target * ease;
      el.textContent = decimal > 0
        ? current.toFixed(decimal)
        : Math.round(current).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  window.addEventListener('scroll', startCounters, { passive: true });
  startCounters();
}

/* ═══════════════════════════════════════════
   6. GALLERY FILTER
   ═══════════════════════════════════════════ */
function initGallery() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter items with animation
      galleryItems.forEach(item => {
        const category = item.dataset.category;
        if (filter === 'all' || category === filter) {
          item.style.display = '';
          item.classList.remove('hidden');
          // Re-trigger animation
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.classList.add('hidden');
          item.style.display = 'none';
          item.style.opacity = '';
          item.style.transform = '';
          item.style.transition = '';
        }
      });
    });
  });
}

/* ═══════════════════════════════════════════
   7. LIGHTBOX
   ═══════════════════════════════════════════ */
function initLightbox() {
  const lightbox     = document.getElementById('lightbox');
  const lightboxImg  = document.getElementById('lightbox-img');
  const lightboxCap  = document.getElementById('lightbox-caption');
  const closeBtn     = document.getElementById('lightbox-close');
  const prevBtn      = document.getElementById('lightbox-prev');
  const nextBtn      = document.getElementById('lightbox-next');
  const galleryItems = [...document.querySelectorAll('.gallery-item')];

  let currentIndex = 0;

  function getVisibleItems() {
    return galleryItems.filter(item => !item.classList.contains('hidden') && item.style.display !== 'none');
  }

  function openLightbox(index) {
    const visibleItems = getVisibleItems();
    currentIndex = index;
    const item = visibleItems[currentIndex];
    const img  = item.querySelector('img');
    const tag  = item.querySelector('.gallery-tag');

    lightboxImg.src         = img.src;
    lightboxImg.alt         = img.alt;
    lightboxCap.textContent = tag ? tag.textContent : '';

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 300);
  }

  function showPrev() {
    const visible = getVisibleItems();
    currentIndex = (currentIndex - 1 + visible.length) % visible.length;
    const item = visible[currentIndex];
    const img  = item.querySelector('img');
    const tag  = item.querySelector('.gallery-tag');
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src         = img.src;
      lightboxImg.alt         = img.alt;
      lightboxCap.textContent = tag ? tag.textContent : '';
      lightboxImg.style.opacity = '1';
    }, 150);
  }

  function showNext() {
    const visible = getVisibleItems();
    currentIndex = (currentIndex + 1) % visible.length;
    const item = visible[currentIndex];
    const img  = item.querySelector('img');
    const tag  = item.querySelector('.gallery-tag');
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src         = img.src;
      lightboxImg.alt         = img.alt;
      lightboxCap.textContent = tag ? tag.textContent : '';
      lightboxImg.style.opacity = '1';
    }, 150);
  }

  // Add transition to lightbox image
  if (lightboxImg) {
    lightboxImg.style.transition = 'opacity 0.15s ease';
  }

  // Bind zoom buttons
  document.querySelectorAll('.gallery-zoom').forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const visible = getVisibleItems();
      const item    = btn.closest('.gallery-item');
      const idx     = visible.indexOf(item);
      if (idx !== -1) openLightbox(idx);
    });
  });

  // Click on gallery item image
  galleryItems.forEach((item) => {
    item.querySelector('img')?.addEventListener('click', () => {
      const visible = getVisibleItems();
      const idx     = visible.indexOf(item);
      if (idx !== -1) openLightbox(idx);
    });
  });

  // Controls
  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', showPrev);
  nextBtn?.addEventListener('click', showNext);

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')       closeLightbox();
    if (e.key === 'ArrowLeft')    showPrev();
    if (e.key === 'ArrowRight')   showNext();
  });

  // Click outside
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

/* ═══════════════════════════════════════════
   8. BACK TO TOP BUTTON
   ═══════════════════════════════════════════ */
function initBackToTop() {
  const btn        = document.getElementById('back-to-top');
  const floatingWa = document.getElementById('floating-wa');

  if (!btn) return;

  window.addEventListener('scroll', () => {
    const show = window.scrollY > 500;
    btn.classList.toggle('visible', show);
    if (floatingWa) floatingWa.classList.toggle('visible', show);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ═══════════════════════════════════════════
   9. FOOTER YEAR
   ═══════════════════════════════════════════ */
function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ═══════════════════════════════════════════
   10. HERO KEN BURNS EFFECT
   ═══════════════════════════════════════════ */
function initHeroKenBurns() {
  const hero = document.querySelector('.hero');
  if (hero) {
    // Add loaded class after brief delay to trigger zoom-out
    setTimeout(() => hero.classList.add('loaded'), 100);
  }
}

/* ═══════════════════════════════════════════
   11. SMOOTH SCROLL FOR ANCHOR LINKS
   ═══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = this.getAttribute('href');
    // Skip WhatsApp links and empty anchors
    if (!target || target === '#' || this.classList.contains('btn-wa-global')) return;

    const el = document.querySelector(target);
    if (el) {
      e.preventDefault();
      const navHeight = document.getElementById('navbar')?.offsetHeight || 0;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 10;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ═══════════════════════════════════════════
   12. PARALLAX HERO (subtle)
   ═══════════════════════════════════════════ */
(function initParallax() {
  const heroBg = document.querySelector('.hero-bg-image');
  if (!heroBg) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY  = window.scrollY;
        const parallax = scrollY * 0.3;
        heroBg.style.transform = `scale(1) translateY(${parallax}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ═══════════════════════════════════════════
   13. NAVBAR OVERLAY (mobile backdrop)
   ═══════════════════════════════════════════ */
(function initMobileOverlay() {
  const overlay = document.createElement('div');
  overlay.id    = 'nav-overlay';
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 998;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(2px);
    opacity: 0; pointer-events: none;
    transition: opacity 0.35s ease;
  `;
  document.body.appendChild(overlay);

  const toggle  = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-links');

  function syncOverlay() {
    const isOpen = navMenu?.classList.contains('open');
    overlay.style.opacity        = isOpen ? '1' : '0';
    overlay.style.pointerEvents  = isOpen ? 'all' : 'none';
  }

  toggle?.addEventListener('click', syncOverlay);

  overlay.addEventListener('click', () => {
    navMenu?.classList.remove('open');
    toggle?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    syncOverlay();
  });

  // Watch navlinks state via MutationObserver
  const mo = new MutationObserver(syncOverlay);
  if (navMenu) mo.observe(navMenu, { attributes: true, attributeFilter: ['class'] });
})();

/* ═══════════════════════════════════════════
   14. SERVICE CARD HOVER TILT (desktop only)
   ═══════════════════════════════════════════ */
(function initTiltEffect() {
  if (window.innerWidth < 1024) return;

  document.querySelectorAll('.service-card, .why-card, .testimonial-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const xPct   = (x / rect.width  - 0.5) * 8;  // max ±4deg
      const yPct   = (y / rect.height - 0.5) * -8;
      card.style.transform = `translateY(-6px) rotateX(${yPct}deg) rotateY(${xPct}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });
})();

/* ═══════════════════════════════════════════
   15. GOLD SHIMMER TEXT EFFECT (logo)
   ═══════════════════════════════════════════ */
(function initGoldShimmer() {
  const goldEls = document.querySelectorAll('.text-gold');
  goldEls.forEach(el => {
    el.style.backgroundImage = 'linear-gradient(90deg, #B8960E, #D4AF37, #E5C96A, #D4AF37, #B8960E)';
    el.style.backgroundSize  = '200% auto';
    el.style.backgroundClip = 'text';
    el.style.webkitBackgroundClip = 'text';
    el.style.webkitTextFillColor  = 'transparent';
    el.style.animation = 'goldShimmer 4s linear infinite';
  });

  // Inject keyframes if not already injected
  if (!document.getElementById('shimmer-style')) {
    const style = document.createElement('style');
    style.id    = 'shimmer-style';
    style.textContent = `
      @keyframes goldShimmer {
        0%   { background-position: 200% center; }
        100% { background-position: -200% center; }
      }
    `;
    document.head.appendChild(style);
  }
})();

/* ═══════════════════════════════════════════
   16. LAZY IMAGE LOADING FEEDBACK
   ═══════════════════════════════════════════ */
(function initLazyImages() {
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';

    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
      img.addEventListener('error', () => {
        // Graceful fallback: show a dark placeholder
        img.style.opacity = '1';
        img.style.background = '#1C1C1C';
      });
    }
  });
})();
