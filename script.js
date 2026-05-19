/* ================================================
   SURYA PRATAP YADAV — MARRIAGE BIODATA
   script.js | Scroll Animations & Interactions
   ================================================ */

(function () {
  'use strict';

  /* ---- Intersection Observer: Animate on Scroll ---- */
  const animatedEls = document.querySelectorAll('[data-animate], .biodata-section');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay for sibling cards
          const siblings = entry.target.querySelectorAll(
            '.detail-card, .family-card, .timeline-item, .contact-card, .interest-tag'
          );
          siblings.forEach((el, idx) => {
            el.style.transitionDelay = `${idx * 60}ms`;
          });

          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  animatedEls.forEach((el) => observer.observe(el));

  /* ---- Smooth Photo Ring Pause on Hover ---- */
  const photoRing = document.querySelector('.photo-ring');
  if (photoRing) {
    photoRing.addEventListener('mouseenter', () => {
      photoRing.style.animationPlayState = 'paused';
    });
    photoRing.addEventListener('mouseleave', () => {
      photoRing.style.animationPlayState = 'running';
    });
  }

  /* ---- Timeline hover polish ---- */
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      const dot = item.querySelector('.timeline-dot');
      if (dot && !item.classList.contains('current-job')) {
        dot.style.background = 'var(--gold-pale)';
        dot.style.borderColor = 'var(--gold)';
      }
    });
    item.addEventListener('mouseleave', () => {
      const dot = item.querySelector('.timeline-dot');
      if (dot && !item.classList.contains('current-job')) {
        dot.style.background = '';
        dot.style.borderColor = '';
      }
    });
  });

  /* ---- Hero text subtle parallax on mouse move ---- */
  const hero = document.querySelector('.hero');
  const heroBg = document.querySelector('.hero-bg-pattern');
  if (hero && heroBg) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      heroBg.style.transform = `translate(${x}px, ${y}px)`;
    });
    hero.addEventListener('mouseleave', () => {
      heroBg.style.transform = 'translate(0, 0)';
    });
  }

  /* ---- Copy phone number on click ---- */
  const phoneBtns = document.querySelectorAll('a[href^="tel"]');
  phoneBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      // On desktop, show a subtle toast; on mobile, let tel: handle it
      if (window.innerWidth > 768) {
        e.preventDefault();
        const num = btn.getAttribute('href').replace('tel:', '');
        if (navigator.clipboard) {
          navigator.clipboard.writeText(num).then(() => showToast('Number copied!'));
        }
      }
    });
  });

  /* ---- Toast notification ---- */
  function showToast(msg) {
    const existing = document.querySelector('.biodata-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'biodata-toast';
    toast.textContent = msg;
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: var(--brown-dark);
      color: var(--gold-light);
      padding: 0.65rem 1.5rem;
      border-radius: 50px;
      font-family: var(--font-body);
      font-size: 0.85rem;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
      border: 1px solid rgba(201,150,42,0.3);
      opacity: 0;
      transition: all 0.3s ease;
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

})();
