/* ============================================
   Verdant Compliance Group — Main JavaScript
   ============================================ */

(function () {
  'use strict';

  // --- Header scroll effect ---
  const header = document.getElementById('header');

  function handleScroll() {
    if (window.scrollY > 20) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // --- Mobile navigation ---
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', function () {
    navMenu.classList.toggle('nav__menu--open');
    navToggle.classList.toggle('nav__toggle--active');
    document.body.style.overflow = navMenu.classList.contains('nav__menu--open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navMenu.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('nav__menu--open');
      navToggle.classList.remove('nav__toggle--active');
      document.body.style.overflow = '';
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var headerOffset = 80;
        var elementPosition = target.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Intersection Observer for fade-in animations ---
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  var animateElements = document.querySelectorAll(
    '.about__card, .service-card, .edu-card, .topic, .process__step, .team-card, .testimonial-card'
  );

  animateElements.forEach(function (el, i) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease ' + (i % 4) * 0.1 + 's, transform 0.5s ease ' + (i % 4) * 0.1 + 's';
    observer.observe(el);
  });

  // Override fade-in to just set opacity and transform
  var style = document.createElement('style');
  style.textContent = '.fade-in { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // --- Contact form handling (Netlify Forms) ---
  var contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var submitBtn = contactForm.querySelector('button[type="submit"]');
    var originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    var formData = new FormData(contactForm);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(function (response) {
      if (response.ok) {
        submitBtn.textContent = 'Sent Successfully!';
        submitBtn.style.background = '#2a7a4e';
        setTimeout(function () {
          contactForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(function () {
      submitBtn.textContent = 'Error — Try Again';
      submitBtn.style.background = '#c53030';
      submitBtn.disabled = false;
      setTimeout(function () {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
      }, 3000);
    });
  });

  // --- Active nav link on scroll ---
  var sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    var scrollY = window.pageYOffset;

    sections.forEach(function (section) {
      var sectionHeight = section.offsetHeight;
      var sectionTop = section.offsetTop - 120;
      var sectionId = section.getAttribute('id');
      var navLink = document.querySelector('.nav__link[href="#' + sectionId + '"]');

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.style.color = '#1a5c3a';
          navLink.style.fontWeight = '600';
        } else {
          navLink.style.color = '';
          navLink.style.fontWeight = '';
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  // --- Counter animation for stats ---
  var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  var statsSection = document.querySelector('.hero__stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  function animateCounters() {
    var counters = document.querySelectorAll('.stat__number');
    counters.forEach(function (counter) {
      var text = counter.textContent;
      var match = text.match(/(\d+)/);
      if (!match) return;

      var target = parseInt(match[1], 10);
      var suffix = text.replace(match[1], '');
      var duration = 1500;
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);
        counter.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          counter.textContent = target + suffix;
        }
      }

      requestAnimationFrame(step);
    });
  }
})();
