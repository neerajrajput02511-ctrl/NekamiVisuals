/* ================================================================
   NekamiVisuals — Custom Cursor + Magnetic Effect
================================================================ */

export function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  const cursor   = document.querySelector('.cursor');
  const ring     = document.querySelector('.cursor__ring');
  const dot      = document.querySelector('.cursor__dot');
  if (!cursor) return;

  let mouse  = { x: -200, y: -200 };
  let pos    = { x: -200, y: -200 };
  let active = false;

  // ── Track mouse ──
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (!active) {
      pos.x = e.clientX;
      pos.y = e.clientY;
      active = true;
      cursor.classList.add('visible');
    }
  });
  document.addEventListener('mouseleave', () => cursor.classList.remove('visible'));
  document.addEventListener('mouseenter', () => cursor.classList.add('visible'));

  // ── Click state ──
  document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('clicking'));

  // ── LERP render loop ──
  function render() {
    pos.x += (mouse.x - pos.x) * 0.11;
    pos.y += (mouse.y - pos.y) * 0.11;
    cursor.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    requestAnimationFrame(render);
  }
  render();

  // ── Bind interactive elements ──
  function bindStates() {
    // Hover state
    document.querySelectorAll(
      'a, button, .work-card, .filter-btn, .social-link, .contact-item, .about-stat, .achievement-card, .service-item'
    ).forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });

    // Text cursor state
    document.querySelectorAll('input, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('on-text'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('on-text'));
    });
  }
  bindStates();

  // ── Magnetic buttons ──
  function bindMagnetic() {
    document.querySelectorAll('.btn-primary, .btn-ghost, .btn-hire, .btn-submit').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = (e.clientX - cx) * 0.32;
        const dy = (e.clientY - cy) * 0.32;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }
  bindMagnetic();

  // Re-bind on dynamic content (e.g. after filter)
  window.addEventListener('filter:updated', () => {
    bindStates();
    bindMagnetic();
  });
}
