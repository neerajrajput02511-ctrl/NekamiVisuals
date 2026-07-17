/* ================================================================
   NekamiVisuals — GSAP Scroll Animations + Page Transitions
================================================================ */

export function initAnimations() {
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  heroEntrance();
  scrollReveal();
  counters();
  scrollProgress();
}

/* ── Hero entrance timeline ──────────────────────────────── */
function heroEntrance() {
  const tl = gsap.timeline({ delay: 0.15 });

  // Eyebrow
  const eyebrow = document.querySelector('.hero__eyebrow');
  if (eyebrow) {
    tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' });
  }

  // Title lines
  const lines = document.querySelectorAll('.hero__title .line span');
  if (lines.length) {
    tl.to(lines, {
      y: '0%',
      duration: 1.3,
      ease: 'power4.out',
      stagger: 0.13,
    }, '-=0.5');
  }

  // Description
  const desc = document.querySelector('.hero__desc');
  if (desc) {
    tl.to(desc, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.7');
  }

  // Actions
  const actions = document.querySelector('.hero__actions');
  if (actions) {
    tl.to(actions, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');
  }

  // Corner labels
  const corners = document.querySelectorAll('.hero__corner');
  if (corners.length) {
    tl.to(corners, { opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.3');
  }

  // Scroll indicator
  const scroll = document.querySelector('.hero__scroll');
  if (scroll) {
    tl.to(scroll, { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.2');
  }
}

/* ── Scroll-triggered reveals ────────────────────────────── */
function scrollReveal() {
  if (typeof ScrollTrigger === 'undefined') return;

  // Section labels
  gsap.utils.toArray('.section-label').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%' },
      opacity: 0,
      x: -18,
      duration: 0.7,
      ease: 'power3.out',
    });
  });

  // Headings — word reveal
  gsap.utils.toArray(
    '.section-work__header h2, .section-cta h2, .about-left h2, .page-hero h1, .contact-info h2, .services-section h2'
  ).forEach(el => {
    splitAndReveal(el);
  });

  // Paragraph fade-up
  gsap.utils.toArray(
    '.section-work__header-right p, .about-left p, .hero__desc, .page-hero__desc, .contact-info > p'
  ).forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      opacity: 0,
      y: 28,
      duration: 0.85,
      ease: 'power3.out',
      delay: i * 0.05,
    });
  });

  // Work cards
  gsap.utils.toArray('.work-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 92%' },
      opacity: 0,
      y: 55,
      duration: 1.05,
      ease: 'power4.out',
      delay: (i % 3) * 0.07,
    });
  });

  // Service items
  gsap.utils.toArray('.service-item').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      opacity: 0,
      y: 30,
      duration: 0.85,
      ease: 'power3.out',
      delay: i * 0.09,
    });
  });

  // About stats / achievement cards
  gsap.utils.toArray('.about-stat, .achievement-card, .service-detail-card').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%' },
      opacity: 0,
      y: 24,
      duration: 0.75,
      ease: 'power3.out',
      delay: (i % 4) * 0.07,
    });
  });

  // CTA section
  const ctaInner = document.querySelector('.section-cta__inner');
  if (ctaInner) {
    gsap.from(ctaInner.children, {
      scrollTrigger: { trigger: ctaInner, start: 'top 82%' },
      opacity: 0,
      y: 30,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
    });
  }

  // Quote block
  const quote = document.querySelector('.quote-block');
  if (quote) {
    gsap.from(quote, {
      scrollTrigger: { trigger: quote, start: 'top 85%' },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
    });
  }

  // Contact form
  gsap.utils.toArray('.form-group, .form-row, .btn-submit, .form-note').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%' },
      opacity: 0,
      y: 20,
      duration: 0.65,
      ease: 'power3.out',
      delay: i * 0.05,
    });
  });

  // Contact info items
  gsap.utils.toArray('.contact-item, .social-link').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%' },
      opacity: 0,
      x: -20,
      duration: 0.65,
      ease: 'power3.out',
      delay: i * 0.06,
    });
  });

  // Filter bar buttons
  const filterBar = document.querySelector('.filter-bar');
  if (filterBar) {
    gsap.from(filterBar.children, {
      scrollTrigger: { trigger: filterBar, start: 'top 90%' },
      opacity: 0,
      y: 14,
      duration: 0.55,
      ease: 'power3.out',
      stagger: 0.05,
    });
  }
}

/* ── Word-split heading reveal ───────────────────────────── */
function splitAndReveal(el) {
  if (!el) return;
  const html   = el.innerHTML;
  const parts  = html.split(/(<em>[\s\S]*?<\/em>|\s+)/g).filter(Boolean);
  let newHtml  = '';

  parts.forEach(part => {
    if (/^\s+$/.test(part)) {
      newHtml += part;
    } else {
      newHtml += `<span class="word-wrap" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="word-inner" style="display:inline-block">${part}</span></span>`;
    }
  });

  el.innerHTML = newHtml;

  gsap.from(el.querySelectorAll('.word-inner'), {
    scrollTrigger: { trigger: el, start: 'top 85%' },
    y: '110%',
    duration: 1.05,
    ease: 'power4.out',
    stagger: 0.055,
  });
}

/* ── Counter animation ───────────────────────────────────── */
function counters() {
  if (typeof ScrollTrigger === 'undefined') return;

  document.querySelectorAll('.about-stat__num, .achievement-card__num').forEach(el => {
    const raw    = el.textContent.trim();
    const num    = parseFloat(raw.replace(/[^\d.]/g, ''));
    const suffix = raw.replace(/[\d.]/g, '');
    if (isNaN(num)) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      val: num,
      duration: 2.2,
      ease: 'power2.out',
      onUpdate() {
        el.textContent = (Number.isInteger(num)
          ? Math.round(obj.val)
          : obj.val.toFixed(1)
        ) + suffix;
      },
    });
  });
}

/* ── Scroll progress bar ─────────────────────────────────── */
function scrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar || typeof ScrollTrigger === 'undefined') return;

  ScrollTrigger.create({
    start: 'top top',
    end:   'bottom bottom',
    onUpdate(self) {
      bar.style.width = `${self.progress * 100}%`;
    },
  });
}

/* ── Page transitions ────────────────────────────────────── */
export function initPageTransitions() {
  if (typeof gsap === 'undefined') return;

  const overlay = document.querySelector('.page-overlay');
  if (!overlay) return;

  // Entrance — wipe out
  gsap.to(overlay, {
    scaleY: 0,
    duration: 1.1,
    ease: 'power4.inOut',
    transformOrigin: 'top',
    delay: 0.05,
  });

  // Exit — wipe in
  document.querySelectorAll(
    'a[href]:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])'
  ).forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('//')) return;

      e.preventDefault();
      gsap.to(overlay, {
        scaleY: 1,
        duration: 0.72,
        ease: 'power4.inOut',
        transformOrigin: 'bottom',
        onComplete: () => { window.location.href = href; },
      });
    });
  });
}

/* ── Work page filter ────────────────────────────────────── */
export function initWorkFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.work-card');
  if (!btns.length || !cards.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;

      cards.forEach(card => {
        const match = cat === 'all' || card.dataset.category === cat;
        if (typeof gsap !== 'undefined') {
          gsap.to(card, {
            opacity: match ? 1 : 0.2,
            scale:   match ? 1 : 0.97,
            duration: 0.4,
            ease: 'power2.out',
          });
        } else {
          card.style.opacity = match ? '1' : '0.2';
        }
        card.style.pointerEvents = match ? '' : 'none';
      });

      window.dispatchEvent(new Event('filter:updated'));
    });
  });
}
