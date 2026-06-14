// =========================================================
// Gian Federspiel — Portfolio interactions
// =========================================================
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------------------------------------------------
// Staggered reveal-on-scroll
// Group reveal items per section so each section cascades in.
// ---------------------------------------------------------
document.querySelectorAll('section, .hero').forEach(section => {
  section.querySelectorAll('[data-reveal]').forEach((el, i) => {
    el.style.setProperty('--reveal-i', i);
  });
});

const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  revealEls.forEach(el => revealObs.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// ---------------------------------------------------------
// Header: elevate on scroll
// ---------------------------------------------------------
const header = document.querySelector('.site-header');
const onScroll = () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 8);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ---------------------------------------------------------
// Mobile menu toggle
// ---------------------------------------------------------
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-menu');
if (toggle && menu) {
  const closeMenu = () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  };
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}

// ---------------------------------------------------------
// Scrollspy: highlight active nav link
// ---------------------------------------------------------
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const spyTargets = navLinks
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && spyTargets.length) {
  const spyObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a =>
          a.classList.toggle('active', a.getAttribute('href') === '#' + id)
        );
      }
    });
  }, { threshold: 0.2, rootMargin: '-45% 0px -45% 0px' });
  spyTargets.forEach(t => spyObs.observe(t));
}

// ---------------------------------------------------------
// Count-up stats (numeric only)
// ---------------------------------------------------------
const countEls = document.querySelectorAll('.stat-num[data-count]');
if ('IntersectionObserver' in window && !reduceMotion && countEls.length) {
  const countObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 900;
      const start = performance.now();
      const step = now => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.6 });
  countEls.forEach(el => countObs.observe(el));
}

// ---------------------------------------------------------
// Footer year
// ---------------------------------------------------------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
