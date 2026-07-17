/* ================================================================
   NekamiVisuals — Main Entry Point
   Initializes: Lenis · Cursor · Navbar · Hero · Animations
================================================================ */

import { initCursor }                          from './cursor.js';
import { initNavbar }                          from './navbar.js';
import { initHero }                            from './hero.js';
import { initAnimations, initPageTransitions, initWorkFilter } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initCursor();
  initNavbar();
  initHero();
  initAnimations();
  initPageTransitions();
  initWorkFilter();
  initContactForm();
});

/* ── Lenis smooth scroll ─────────────────────────────────── */
function initLenis() {
  if (typeof Lenis === 'undefined') return;

  const lenis = new Lenis({
    duration:    1.35,
    easing:      (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
  });

  // Sync Lenis with GSAP ticker for ScrollTrigger compatibility
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  } else {
    // Fallback RAF loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  window.__lenis = lenis;

  // Anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) lenis.scrollTo(target, { offset: -80, duration: 1.4 });
    });
  });
}

/* ── Contact form ────────────────────────────────────────── */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn  = form.querySelector('.btn-submit');
    const orig = btn.innerHTML;

    btn.innerHTML = '✓ Message sent!';
    btn.style.background = 'rgba(74,222,128,0.15)';
    btn.style.color      = 'rgb(134,239,172)';
    btn.style.border     = '1px solid rgba(74,222,128,0.3)';

    setTimeout(() => {
      btn.innerHTML        = orig;
      btn.style.background = '';
      btn.style.color      = '';
      btn.style.border     = '';
      form.reset();
    }, 3500);
  });
}
