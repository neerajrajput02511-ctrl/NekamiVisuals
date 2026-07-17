/* ================================================================
   NekamiVisuals — Work Gallery
   Filter · Search · Sort · Skeleton · Render · Video Hover
================================================================ */

import { projects, categoryLabels } from './work-data.js';

/* ── State ──────────────────────────────────────────────── */
let state = {
  filter:  'all',
  search:  '',
  sort:    'featured',
};

const CARD_SPANS = [8, 4, 4, 4, 4, 12, 6, 6, 4, 8, 5, 7];
const ASPECT_MAP = {
  8: '16/9', 4: '4/3', 12: '21/9',
  6: '16/10', 5: '4/3', 7: '16/10',
};

/* ── Init ───────────────────────────────────────────────── */
export function initWorkGallery() {
  const grid    = document.getElementById('gallery-grid');
  const search  = document.getElementById('gallery-search');
  const sortSel = document.getElementById('gallery-sort');
  const filters = document.querySelectorAll('.wf-btn');
  const countEl = document.getElementById('project-count');
  if (!grid) return;

  // Show skeletons
  renderSkeletons(grid, 6);

  // After brief delay, render real cards
  setTimeout(() => {
    renderGallery(grid, countEl);
    bindVideoHover();
    initFilterAnimations();
  }, 600);

  // Filter
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.filter = btn.dataset.filter;
      renderGallery(grid, countEl);
      bindVideoHover();
    });
  });

  // Search
  if (search) {
    let debounce;
    search.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        state.search = search.value.trim().toLowerCase();
        renderGallery(grid, countEl);
        bindVideoHover();
      }, 220);
    });
  }

  // Sort
  if (sortSel) {
    sortSel.addEventListener('change', () => {
      state.sort = sortSel.value;
      renderGallery(grid, countEl);
      bindVideoHover();
    });
  }
}

/* ── Filter + Sort logic ────────────────────────────────── */
function getFiltered() {
  let list = [...projects];

  // Filter
  if (state.filter !== 'all') {
    list = list.filter(p => {
      if (state.filter === 'video')      return p.category === 'video';
      if (state.filter === 'short-form') return p.subcategory === 'short-form';
      if (state.filter === 'long-form')  return p.subcategory === 'long-form';
      if (state.filter === 'voice')      return p.category === 'voice';
      if (state.filter === 'design')     return p.category === 'design';
      return true;
    });
  }

  // Search
  if (state.search) {
    const q = state.search;
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.client.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q)) ||
      (p.platform || '').toLowerCase().includes(q)
    );
  }

  // Sort
  list.sort((a, b) => {
    if (state.sort === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.order - b.order;
    if (state.sort === 'popular')  return (b.popular  ? 1 : 0) - (a.popular  ? 1 : 0) || a.order - b.order;
    if (state.sort === 'newest')   return b.year - a.year || a.order - b.order;
    if (state.sort === 'oldest')   return a.year - b.year || a.order - b.order;
    return a.order - b.order;
  });

  return list;
}

/* ── Render gallery ─────────────────────────────────────── */
function renderGallery(grid, countEl) {
  const list = getFiltered();

  if (countEl) {
    countEl.textContent = list.length + ' Project' + (list.length !== 1 ? 's' : '');
  }

  if (!list.length) {
    grid.innerHTML = `
      <div class="gallery-empty">
        <div class="gallery-empty__icon">✦</div>
        <h3>New projects are being crafted.</h3>
        <p>Nothing matches your current filters. Try a different category or search term.</p>
        <button class="wf-btn active" onclick="document.querySelector('.wf-btn[data-filter=all]').click()">
          Clear filters
        </button>
      </div>`;
    return;
  }

  grid.innerHTML = list.map((p, i) => buildCard(p, i)).join('');

  // GSAP stagger entrance
  if (typeof gsap !== 'undefined') {
    gsap.from(grid.querySelectorAll('.gallery-card'), {
      opacity: 0,
      y: 50,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.07,
      clearProps: 'all',
    });
  }
}

/* ── Build card HTML ────────────────────────────────────── */
function buildCard(project, index) {
  const span   = CARD_SPANS[index % CARD_SPANS.length];
  const aspect = ASPECT_MAP[span] || '16/10';
  const catLabel = getCatLabel(project);
  const featured = project.featured ? '<span class="gallery-card__featured">★ Featured</span>' : '';

  return `
  <article class="gallery-card"
    data-id="${project.id}"
    data-category="${project.category}"
    data-sub="${project.subcategory || ''}"
    style="--span:${span}; --aspect:${aspect}"
    role="article"
    tabindex="0"
    aria-label="${project.title} — ${catLabel}"
  >
    <div class="gallery-card__media">
      <img
        src="${project.thumbnail}"
        alt="${project.title}"
        loading="lazy"
        decoding="async"
        draggable="false"
      />
      ${project.videoPreview ? `<video class="gallery-card__video" src="${project.videoPreview}" muted loop playsinline preload="none"></video>` : ''}
      <div class="gallery-card__overlay" aria-hidden="true">
        <div class="gallery-card__play">${project.category === 'voice' ? '♪' : '▶'}</div>
      </div>
    </div>
    <div class="gallery-card__body">
      ${featured}
      <div class="gallery-card__meta">
        <span class="gallery-card__cat">${catLabel}</span>
        <span class="gallery-card__year">${project.year}</span>
      </div>
      <h3 class="gallery-card__title">${project.title}</h3>
      ${project.client !== 'Personal Project' ? `<p class="gallery-card__client">${project.client}</p>` : ''}
      ${project.duration ? `<span class="gallery-card__duration">${project.duration}</span>` : ''}
    </div>
  </article>`;
}

/* ── Skeleton cards ─────────────────────────────────────── */
function renderSkeletons(grid, count) {
  grid.innerHTML = Array.from({ length: count }, (_, i) => {
    const span = CARD_SPANS[i % CARD_SPANS.length];
    return `<div class="gallery-skeleton" style="--span:${span}; --aspect:${ASPECT_MAP[span] || '16/10'}">
      <div class="gallery-skeleton__img shimmer"></div>
      <div class="gallery-skeleton__body">
        <div class="gallery-skeleton__line shimmer" style="width:40%"></div>
        <div class="gallery-skeleton__line shimmer" style="width:70%"></div>
        <div class="gallery-skeleton__line shimmer" style="width:30%"></div>
      </div>
    </div>`;
  }).join('');
}

/* ── Card click → project page ──────────────────────────── */
function bindCardClicks() {
  document.querySelectorAll('.gallery-card').forEach(card => {
    const navigate = () => {
      const id = card.dataset.id;
      if (typeof gsap !== 'undefined') {
        const overlay = document.querySelector('.page-overlay');
        if (overlay) {
          gsap.to(overlay, {
            scaleY: 1, duration: 0.65,
            ease: 'power4.inOut',
            transformOrigin: 'bottom',
            onComplete: () => { window.location.href = `project.html?id=${id}`; },
          });
          return;
        }
      }
      window.location.href = `project.html?id=${id}`;
    };

    card.addEventListener('click', navigate);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(); } });
  });
}

/* ── Video hover preview ────────────────────────────────── */
function bindVideoHover() {
  bindCardClicks();

  document.querySelectorAll('.gallery-card').forEach(card => {
    const video = card.querySelector('.gallery-card__video');
    const img   = card.querySelector('img');

    card.addEventListener('mouseenter', () => {
      if (video) {
        video.style.opacity = '1';
        if (img) img.style.opacity = '0';
        video.play().catch(() => {});
      }
    });

    card.addEventListener('mouseleave', () => {
      if (video) {
        video.pause();
        video.currentTime = 0;
        video.style.opacity = '0';
        if (img) img.style.opacity = '1';
      }
    });
  });
}

/* ── Filter tab entrance animation ─────────────────────── */
function initFilterAnimations() {
  if (typeof gsap === 'undefined') return;
  gsap.from('.wf-btn', {
    opacity: 0,
    y: 16,
    duration: 0.55,
    ease: 'power3.out',
    stagger: 0.05,
    delay: 0.1,
  });
}

/* ── Helpers ────────────────────────────────────────────── */
function getCatLabel(project) {
  if (project.subcategory) return categoryLabels[project.subcategory] || project.subcategory;
  return categoryLabels[project.category] || project.category;
}
