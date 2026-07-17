/* ================================================================
   NekamiVisuals — Navbar (scroll hide/show, glass, mobile)
================================================================ */

export function initNavbar() {
  const navbar      = document.querySelector('.navbar');
  const toggle      = document.querySelector('.navbar__toggle');
  const mobileMenu  = document.querySelector('.navbar__mobile');
  if (!navbar) return;

  // ── Scroll handler ──
  let lastY   = 0;
  let ticking = false;
  let menuOpen = false;

  function onScroll() {
    const y = window.scrollY;

    // Glass
    if (y > 60) navbar.classList.add('scrolled');
    else         navbar.classList.remove('scrolled');

    // Hide / show
    if (y > 120) {
      if (y > lastY + 4) navbar.classList.add('hidden');
      else if (y < lastY - 4) navbar.classList.remove('hidden');
    } else {
      navbar.classList.remove('hidden');
    }

    lastY   = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  // ── Active link ──
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (
      href === page ||
      (page === '' && href === 'index.html') ||
      (page === 'index.html' && href === 'index.html')
    ) {
      a.classList.add('active');
    }
  });

  // ── Mobile toggle ──
  if (!toggle || !mobileMenu) return;

  const spans = toggle.querySelectorAll('span');

  function openMenu() {
    menuOpen = true;
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  }

  function closeMenu() {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }

  toggle.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());

  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', closeMenu)
  );

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });
}
