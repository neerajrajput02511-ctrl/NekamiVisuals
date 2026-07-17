/* ================================================================
   NekamiVisuals — Hero (Canvas Particles + Entrance)
================================================================ */

export function initHero() {
  initParticles();
}

/* ── Particle Canvas ─────────────────────────────────────── */
function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [], raf;
  let mouse = { x: null, y: null, radius: 110 };

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  // Mouse interaction
  canvas.addEventListener('mousemove', (e) => {
    const r  = canvas.getBoundingClientRect();
    mouse.x  = e.clientX - r.left;
    mouse.y  = e.clientY - r.top;
  }, { passive: true });
  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  /* ── Particle class ── */
  class Particle {
    constructor() { this.init(true); }

    init(random = false) {
      this.x  = Math.random() * W;
      this.y  = random ? Math.random() * H : (Math.random() < 0.5 ? -5 : H + 5);
      this.vx = (Math.random() - 0.5) * 0.22;
      this.vy = (Math.random() - 0.5) * 0.22;
      this.r  = Math.random() * 1.1 + 0.25;
      this.baseAlpha = Math.random() * 0.35 + 0.04;
      this.alpha = this.baseAlpha;
      this.life = 0;
      this.maxLife = Math.random() * 280 + 140;
    }

    update() {
      // Mouse repulsion
      if (mouse.x !== null) {
        const dx   = this.x - mouse.x;
        const dy   = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force  = (mouse.radius - dist) / mouse.radius;
          const angle  = Math.atan2(dy, dx);
          this.vx += Math.cos(angle) * force * 0.6;
          this.vy += Math.sin(angle) * force * 0.6;
        }
      }

      this.vx *= 0.97;
      this.vy *= 0.97;
      this.x  += this.vx;
      this.y  += this.vy;
      this.life++;

      // Fade in/out
      const fadeLen = 40;
      if (this.life < fadeLen) {
        this.alpha = (this.life / fadeLen) * this.baseAlpha;
      } else if (this.life > this.maxLife - fadeLen) {
        this.alpha = ((this.maxLife - this.life) / fadeLen) * this.baseAlpha;
      } else {
        this.alpha = this.baseAlpha;
      }

      if (this.life >= this.maxLife || this.x < -20 || this.x > W + 20 || this.y < -20 || this.y > H + 20) {
        this.init();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
      ctx.fill();
    }
  }

  // Create initial particles
  const COUNT = Math.min(110, Math.floor((W * H) / 7500));
  for (let i = 0; i < COUNT; i++) {
    const p = new Particle();
    p.life = Math.floor(Math.random() * p.maxLife); // stagger
    particles.push(p);
  }

  /* ── Draw connections ── */
  function drawConnections() {
    const MAX_DIST = 130;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < MAX_DIST) {
          const a = (1 - dist / MAX_DIST) * 0.07;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255,255,255,${a})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  /* ── Animation loop ── */
  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    raf = requestAnimationFrame(animate);
  }
  animate();
}
