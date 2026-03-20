/**
 * Cannabis Education Consulting Website
 * Premium interactive JavaScript module
 */

document.addEventListener('DOMContentLoaded', () => {
  // ─────────────────────────────────────────────
  // 1. Lucide Icons Initialization
  // ─────────────────────────────────────────────
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ─────────────────────────────────────────────
  // 2. Navbar Scroll Effect
  // ─────────────────────────────────────────────
  const navbar = document.getElementById('navbar');

  // ─────────────────────────────────────────────
  // 3. Mobile Nav Toggle
  // ─────────────────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }

  // ─────────────────────────────────────────────
  // 4. Smooth Scroll with Navbar Offset
  // ─────────────────────────────────────────────
  const NAVBAR_OFFSET = 80;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ─────────────────────────────────────────────
  // 5. Scroll Animations (Intersection Observer)
  // ─────────────────────────────────────────────
  const animateObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    // Staggered delays for grid children
    const parent = el.parentElement;
    if (parent && (parent.style.display === 'grid' || getComputedStyle(parent).display === 'grid')) {
      const siblings = Array.from(parent.querySelectorAll('.animate-on-scroll'));
      const index = siblings.indexOf(el);
      if (index > 0) {
        el.style.transitionDelay = `${index * 0.1}s`;
      }
    }
    animateObserver.observe(el);
  });

  // ─────────────────────────────────────────────
  // 6. Animated Counters
  // ─────────────────────────────────────────────
  function formatNumber(n) {
    return Math.floor(n).toLocaleString('en-US');
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;

    const duration = 2000;
    const startTime = performance.now();

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = eased * target;

      // Preserve any suffix text (like + or %)
      const suffix = el.dataset.suffix || '';
      el.textContent = formatNumber(current) + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = formatNumber(target) + suffix;
      }
    }

    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.stat-number, .impact-number').forEach((el) => {
    counterObserver.observe(el);
  });

  // ─────────────────────────────────────────────
  // 7 & 8. Particle System (Hero + CTA)
  // ─────────────────────────────────────────────
  const PARTICLE_COLORS = ['#2ecc71', '#c9a84c'];

  function createParticles(containerId, count) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const frag = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      const size = Math.random() * 3 + 2; // 2-5px
      const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      const opacity = Math.random() * 0.3 + 0.1; // 0.1-0.4
      const duration = Math.random() * 25 + 15; // 15-40s
      const delay = Math.random() * -40; // negative for immediate stagger
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const driftX = (Math.random() - 0.5) * 120; // px drift
      const driftY = (Math.random() - 0.5) * 120;

      Object.assign(dot.style, {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: color,
        opacity: opacity,
        left: `${startX}%`,
        top: `${startY}%`,
        pointerEvents: 'none',
        animation: `particleFloat${i} ${duration}s ease-in-out ${delay}s infinite alternate`,
        willChange: 'transform',
      });

      // Create unique keyframes per particle
      const keyframes = `
        @keyframes particleFloat${i} {
          0% { transform: translate(0, 0); }
          50% { transform: translate(${driftX * 0.6}px, ${driftY}px); }
          100% { transform: translate(${driftX}px, ${driftY * 0.4}px); }
        }
      `;
      const style = document.createElement('style');
      style.textContent = keyframes;
      document.head.appendChild(style);

      frag.appendChild(dot);
    }

    container.appendChild(frag);
  }

  createParticles('heroParticles', 50);
  createParticles('ctaParticles', 30);

  // ─────────────────────────────────────────────
  // 9. Card Tilt / Hover Effect
  // ─────────────────────────────────────────────
  document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateY = (mouseX / (rect.width / 2)) * 3; // max 3deg
      const rotateX = -(mouseY / (rect.height / 2)) * 3;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
      card.style.transition = 'transform 0.4s ease';
    });
  });

  // ─────────────────────────────────────────────
  // 10. Active Nav Link Highlighting + 2. Navbar scroll
  // Combined in a single rAF-driven scroll handler
  // ─────────────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');
  const heroContent = document.querySelector('.hero-content');
  const heroBg = document.querySelector('.hero-bg');

  let ticking = false;

  function onScroll() {
    const scrollY = window.scrollY;
    const viewHeight = window.innerHeight;

    // 2. Navbar scroll class
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // 10. Active nav link
    let currentSectionId = '';
    sections.forEach((section) => {
      const top = section.offsetTop - NAVBAR_OFFSET - 20;
      if (scrollY >= top) {
        currentSectionId = section.id;
      }
    });

    navLinkEls.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });

    // 12. Parallax on Hero
    if (scrollY < viewHeight) {
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
      if (heroBg) {
        // Move background layers at different speeds
        heroBg.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
    }

    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );

  // Fire once on load
  onScroll();

  // ─────────────────────────────────────────────
  // 11. Form Handling
  // ─────────────────────────────────────────────
  const contactForm = document.getElementById('contactForm');

  // Focus/blur classes on form groups
  document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach((input) => {
    input.addEventListener('focus', () => {
      input.closest('.form-group')?.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      input.closest('.form-group')?.classList.remove('focused');
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      // If Netlify handles the form, let it through
      if (contactForm.hasAttribute('data-netlify') || contactForm.hasAttribute('netlify')) {
        return;
      }

      e.preventDefault();

      // Success animation
      const btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:6px;">Sent <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg></span>';
        btn.disabled = true;
        btn.style.opacity = '0.85';

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
          btn.style.opacity = '';
          contactForm.reset();
        }, 3000);
      }
    });
  }

  // ─────────────────────────────────────────────
  // 13. Marquee Pause on Hover
  // ─────────────────────────────────────────────
  document.querySelectorAll('.marquee-content').forEach((marquee) => {
    const parent = marquee.closest('.marquee') || marquee.parentElement;
    if (parent) {
      parent.addEventListener('mouseenter', () => {
        marquee.classList.add('paused');
      });
      parent.addEventListener('mouseleave', () => {
        marquee.classList.remove('paused');
      });
    }
  });
});
