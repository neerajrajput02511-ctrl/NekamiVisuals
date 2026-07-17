/* ================================================================
   NekamiVisuals — Project Detail Renderer
   Reads ?id= from URL, renders full project page
================================================================ */

import { getProjectById, getRelatedProjects, getNextProject, softwareMap, categoryLabels } from './work-data.js';

export function initProjectPage() {
  const params  = new URLSearchParams(window.location.search);
  const id      = params.get('id');
  const project = id ? getProjectById(id) : null;

  if (!project) {
    // No project found — redirect
    setTimeout(() => { window.location.href = 'work.html'; }, 1200);
    const msg = document.getElementById('project-root');
    if (msg) msg.innerHTML = `<div style="padding:40vh 0;text-align:center;color:var(--text-3)">Redirecting…</div>`;
    return;
  }

  renderProjectPage(project);
}

/* ── Master render ──────────────────────────────────────── */
function renderProjectPage(project) {
  // Update document title and meta
  document.title = `${project.title} — NekamiVisuals`;

  const root = document.getElementById('project-root');
  if (!root) return;

  const related = getRelatedProjects(project);
  const next    = getNextProject(project.id);
  const catLabel = getCatLabel(project);

  root.innerHTML = `

    <!-- ── Hero ──────────────────────────────────────────── -->
    <section class="proj-hero" aria-labelledby="proj-title">
      <div class="proj-hero__media">
        <img src="${project.thumbnail}" alt="${project.title}" />
        <div class="proj-hero__overlay"></div>
      </div>
      <div class="proj-hero__content container">
        <div class="proj-hero__badges">
          <span class="proj-badge">${catLabel}</span>
          ${project.subcategory ? `<span class="proj-badge">${categoryLabels[project.subcategory] || project.subcategory}</span>` : ''}
          <span class="proj-badge">${project.year}</span>
          ${project.client !== 'Personal Project' ? `<span class="proj-badge">${project.client}</span>` : ''}
        </div>
        <h1 id="proj-title" class="proj-hero__title">${project.title}</h1>
        <p class="proj-hero__intro">${project.description}</p>
        <div class="proj-hero__tags">
          ${project.tags.map(t => `<span class="proj-tag">#${t}</span>`).join('')}
        </div>
      </div>
    </section>

    <!-- ── Overview ──────────────────────────────────────── -->
    <section class="proj-section proj-overview" aria-labelledby="proj-overview-h">
      <div class="container">
        <div class="proj-two-col">
          <div class="proj-two-col__left">
            <span class="section-label">Overview</span>
            <h2 id="proj-overview-h">The Project</h2>
          </div>
          <div class="proj-two-col__right">
            <p>${project.overview}</p>
            <div class="proj-meta-row">
              <div class="proj-meta-item">
                <span class="proj-meta-label">Client</span>
                <span class="proj-meta-value">${project.client}</span>
              </div>
              ${project.platform ? `
              <div class="proj-meta-item">
                <span class="proj-meta-label">Platform</span>
                <span class="proj-meta-value">${project.platform}</span>
              </div>` : ''}
              ${project.duration ? `
              <div class="proj-meta-item">
                <span class="proj-meta-label">Duration</span>
                <span class="proj-meta-value">${project.duration}</span>
              </div>` : ''}
              <div class="proj-meta-item">
                <span class="proj-meta-label">Year</span>
                <span class="proj-meta-value">${project.year}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Challenge ─────────────────────────────────────── -->
    <section class="proj-section proj-challenge" aria-labelledby="proj-challenge-h">
      <div class="container">
        <span class="section-label">The Challenge</span>
        <div class="proj-challenge__card">
          <h2 id="proj-challenge-h">The Problem<br>to Solve.</h2>
          <p>${project.challenge}</p>
        </div>
      </div>
    </section>

    <!-- ── Creative Process ───────────────────────────────── -->
    <section class="proj-section proj-process" aria-labelledby="proj-process-h">
      <div class="container">
        <div class="proj-process__header">
          <span class="section-label">Creative Process</span>
          <h2 id="proj-process-h">How It<br>Was Made.</h2>
        </div>
        <div class="proj-process__grid">
          ${renderProcessSteps(project.process)}
        </div>
      </div>
    </section>

    <!-- ── Tools Used ─────────────────────────────────────── -->
    ${project.software && project.software.length ? `
    <section class="proj-section proj-tools" aria-labelledby="proj-tools-h">
      <div class="container">
        <div class="proj-two-col">
          <div class="proj-two-col__left">
            <span class="section-label">Tools</span>
            <h2 id="proj-tools-h">Built With</h2>
          </div>
          <div class="proj-two-col__right">
            <div class="proj-tools__grid">
              ${project.software.map(s => renderTool(s)).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>` : ''}

    <!-- ── Final Result / Video ───────────────────────────── -->
    <section class="proj-section proj-result" aria-labelledby="proj-result-h">
      <div class="container">
        <span class="section-label">Final Result</span>
        <h2 id="proj-result-h" style="font-size:var(--text-3xl);margin:1.25rem 0 2.5rem">The Finished Work.</h2>
        <div class="proj-video-wrap">
          <div class="proj-video-placeholder">
            <img src="${project.thumbnail}" alt="${project.title} preview" />
            <div class="proj-video-play">
              <svg viewBox="0 0 60 60" width="60" height="60" aria-hidden="true">
                <circle cx="30" cy="30" r="29" stroke="rgba(255,255,255,0.2)" stroke-width="1" fill="none"/>
                <polygon points="24,18 48,30 24,42" fill="white"/>
              </svg>
              <span>Watch on ${project.platform || 'Platform'}</span>
            </div>
          </div>
          <p style="margin-top:1rem;font-size:0.8125rem;color:var(--text-3);text-align:center">
            Video hosted externally. Click to open.
          </p>
        </div>
      </div>
    </section>

    <!-- ── Gallery ────────────────────────────────────────── -->
    ${project.gallery && project.gallery.length ? `
    <section class="proj-section proj-gallery-section" aria-labelledby="proj-gallery-h">
      <div class="container">
        <span class="section-label">Gallery</span>
        <h2 id="proj-gallery-h" style="font-size:var(--text-3xl);margin:1.25rem 0 2.5rem">Behind the Work.</h2>
        <div class="proj-gallery">
          ${project.gallery.map((src, i) => `
            <div class="proj-gallery__item">
              <img src="${src}" alt="${project.title} — image ${i+1}" data-lightbox loading="lazy" decoding="async" />
            </div>`).join('')}
        </div>
      </div>
    </section>` : ''}

    <!-- ── Related Projects ───────────────────────────────── -->
    ${related.length ? `
    <section class="proj-section proj-related" aria-labelledby="proj-related-h">
      <div class="container">
        <div class="proj-related__header">
          <span class="section-label">Related</span>
          <h2 id="proj-related-h">More Like This</h2>
        </div>
        <div class="proj-related__grid">
          ${related.map(p => renderRelatedCard(p)).join('')}
        </div>
      </div>
    </section>` : ''}

    <!-- ── Next Project ───────────────────────────────────── -->
    <a href="project.html?id=${next.id}" class="proj-next" aria-label="Next project: ${next.title}">
      <div class="container">
        <div class="proj-next__inner">
          <div class="proj-next__left">
            <span class="section-label">Next Project</span>
            <h2>${next.title}</h2>
            <span class="proj-next__cat">${getCatLabel(next)}</span>
          </div>
          <div class="proj-next__arrow">→</div>
        </div>
      </div>
      <div class="proj-next__bg">
        <img src="${next.thumbnail}" alt="${next.title}" />
      </div>
    </a>

  `;

  // Bind lightbox after render
  if (window.__lightboxBindImages) window.__lightboxBindImages();

  // Bind project links
  root.querySelectorAll('[data-project-link]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.projectLink;
      if (typeof gsap !== 'undefined') {
        const overlay = document.querySelector('.page-overlay');
        if (overlay) {
          gsap.to(overlay, {
            scaleY: 1, duration: 0.65,
            ease: 'power4.inOut', transformOrigin: 'bottom',
            onComplete: () => { window.location.href = `project.html?id=${id}`; },
          });
          return;
        }
      }
      window.location.href = `project.html?id=${id}`;
    });
  });

  // Bind video placeholder
  const vPlay = root.querySelector('.proj-video-placeholder');
  if (vPlay) {
    vPlay.style.cursor = 'pointer';
    vPlay.addEventListener('click', () => {
      if (project.link && project.link !== '#') window.open(project.link, '_blank');
    });
  }

  // GSAP entrance
  animateProjectEntrance();
}

/* ── Process steps ──────────────────────────────────────── */
const processLabels = {
  planning:     { icon: '📋', label: 'Planning' },
  editing:      { icon: '✂️',  label: 'Editing' },
  sound:        { icon: '🎵', label: 'Sound' },
  motion:       { icon: '⚡', label: 'Motion Graphics' },
  color:        { icon: '🎨', label: 'Colour Grading' },
  optimization: { icon: '⚙️',  label: 'Optimization' },
};

function renderProcessSteps(process) {
  return Object.entries(process)
    .filter(([, v]) => v && v !== 'N/A')
    .map(([key, val], i) => {
      const meta = processLabels[key] || { icon: '●', label: key };
      return `
      <div class="proj-step">
        <div class="proj-step__num">0${i + 1}</div>
        <div class="proj-step__icon">${meta.icon}</div>
        <h3 class="proj-step__label">${meta.label}</h3>
        <p class="proj-step__text">${val}</p>
      </div>`;
    }).join('');
}

/* ── Tool chip ──────────────────────────────────────────── */
function renderTool(key) {
  const soft = softwareMap[key] || { name: key, icon: key.slice(0,2).toUpperCase(), color: '#888' };
  return `
  <div class="proj-tool">
    <span class="proj-tool__icon" style="background:${soft.color}15;color:${soft.color};border-color:${soft.color}25">
      ${soft.icon}
    </span>
    <span class="proj-tool__name">${soft.name}</span>
  </div>`;
}

/* ── Related card ───────────────────────────────────────── */
function renderRelatedCard(p) {
  return `
  <article class="proj-rel-card" data-project-link="${p.id}" tabindex="0" role="button"
    aria-label="View ${p.title}">
    <div class="proj-rel-card__media">
      <img src="${p.thumbnail}" alt="${p.title}" loading="lazy" />
      <div class="proj-rel-card__overlay" aria-hidden="true"></div>
    </div>
    <div class="proj-rel-card__body">
      <span class="proj-rel-card__cat">${getCatLabel(p)}</span>
      <h3 class="proj-rel-card__title">${p.title}</h3>
      <span class="proj-rel-card__year">${p.year}</span>
    </div>
  </article>`;
}

/* ── GSAP entrance ──────────────────────────────────────── */
function animateProjectEntrance() {
  if (typeof gsap === 'undefined') return;

  const heroContent = document.querySelector('.proj-hero__content');
  if (heroContent) {
    gsap.from(heroContent.children, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.1,
      delay: 0.3,
    });
  }

  // Sections scroll reveal
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.utils.toArray('.proj-section').forEach(sec => {
      gsap.from(sec.querySelectorAll('h2, p, .proj-step, .proj-tool, .proj-rel-card, .proj-meta-item'), {
        scrollTrigger: { trigger: sec, start: 'top 85%' },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.06,
      });
    });
  }
}

/* ── Helpers ────────────────────────────────────────────── */
function getCatLabel(project) {
  if (project.subcategory) return categoryLabels[project.subcategory] || project.subcategory;
  return categoryLabels[project.category] || project.category;
}
