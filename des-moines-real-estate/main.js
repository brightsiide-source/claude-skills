/* ===================================================
   Des Moines Cash Home Buyers — JavaScript
   =================================================== */

document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile Nav Toggle ----
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Close nav on link click
    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Sticky Header Shadow ----
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(function (el) {
        el.classList.remove('active');
        el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---- Form Submission (Netlify handles POST, this adds UX) ----
  function handleFormSubmit(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var formData = new FormData(form);
      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      .then(function (response) {
        if (response.ok) {
          form.closest('.hero-form-card').innerHTML =
            '<div class="form-success">' +
            '<h3>Thank You!</h3>' +
            '<p>We received your information and will contact you within 24 hours with your no-obligation cash offer.</p>' +
            '<p style="margin-top:12px;"><a href="tel:+15155550123">Call us now: (515) 555-0123</a></p>' +
            '</div>';
        } else {
          btn.textContent = originalText;
          btn.disabled = false;
          alert('Something went wrong. Please call us at (515) 555-0123.');
        }
      })
      .catch(function () {
        btn.textContent = originalText;
        btn.disabled = false;
        alert('Network error. Please call us at (515) 555-0123.');
      });
    });
  }

  var heroForm = document.getElementById('hero-form');
  var contactForm = document.getElementById('contact-form');
  if (heroForm) handleFormSubmit(heroForm);
  if (contactForm) handleFormSubmit(contactForm);

  // ---- Google Maps Embed ----
  var mapContainer = document.getElementById('google-map');
  if (mapContainer) {
    // Embed Google Maps centered on Des Moines metro area
    // Uses a free embed (no API key required for basic embed)
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d189898.27473792258!2d-93.7685167!3d41.5723667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87ee99a4c452b3e7%3A0x5ccc0deed8591203!2sDes%20Moines%2C%20IA!5e0!3m2!1sen!2sus!4v1!5m2!1sen!2sus';
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.border = '0';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.setAttribute('title', 'Des Moines Metro Area Map - Service Area');
    mapContainer.appendChild(iframe);
  }

  // ---- Smooth Scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Scroll Animations (Intersection Observer) ----
  var animateEls = document.querySelectorAll('.step, .situation-card, .testimonial-card, .compare-card');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animateEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // ---- Phone Number Formatting ----
  document.querySelectorAll('input[type="tel"]').forEach(function (input) {
    input.addEventListener('input', function () {
      var digits = this.value.replace(/\D/g, '');
      if (digits.length >= 10) {
        this.value = '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6, 10);
      }
    });
  });

});
