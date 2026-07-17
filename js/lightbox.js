/* ================================================================
   NekamiVisuals — Lightbox
   Fullscreen image viewer with keyboard + touch nav
================================================================ */

export function initLightbox() {
  const lb       = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightbox-img');
  const lbClose  = document.getElementById('lightbox-close');
  const lbPrev   = document.getElementById('lightbox-prev');
  const lbNext   = document.getElementById('lightbox-next');
  const lbCount  = document.getElementById('lightbox-count');
  if (!lb || !lbImg) return;

  let images = [];
  let index  = 0;
  let touchStartX = 0;

  /* ── Open ── */
  function open(imgs, i = 0) {
    images = imgs;
    index  = i;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    update();
    requestAnimationFrame(() => {
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(lbImg,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }
        );
      }
    });
  }

  /* ── Close ── */
  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── Update image ── */
  function update() {
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = images[index];
      lbImg.onload = () => { lbImg.style.opacity = '1'; };
    }, 150);
    if (lbCount) lbCount.textContent = `${index + 1} / ${images.length}`;
    if (lbPrev) lbPrev.style.display = images.length > 1 ? '' : 'none';
    if (lbNext) lbNext.style.display = images.length > 1 ? '' : 'none';
  }

  /* ── Navigate ── */
  function prev() { index = (index - 1 + images.length) % images.length; update(); }
  function next() { index = (index + 1) % images.length; update(); }

  /* ── Bind gallery images ── */
  function bindGalleryImages() {
    document.querySelectorAll('[data-lightbox]').forEach((img, i, all) => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        const srcs = Array.from(all).map(el => el.src || el.dataset.src || el.getAttribute('src'));
        open(srcs, i);
      });
    });
  }

  /* ── Events ── */
  lbClose && lbClose.addEventListener('click', close);
  lbPrev  && lbPrev.addEventListener('click', prev);
  lbNext  && lbNext.addEventListener('click', next);

  lb.addEventListener('click', e => { if (e.target === lb) close(); });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });

  // Touch swipe
  lb.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
  }, { passive: true });

  bindGalleryImages();
  window.__lightboxOpen = open;
  window.__lightboxBindImages = bindGalleryImages;
}
