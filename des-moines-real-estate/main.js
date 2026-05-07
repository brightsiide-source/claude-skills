document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile Nav Toggle ----
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Sticky Header Shadow ----
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 10 ? '0 4px 24px rgba(0,0,0,0.3)' : 'none';
    });
  }

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(function (el) {
        el.classList.remove('active');
        el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---- Form Submission with Loading State ----
  function handleFormSubmit(form) {
    form.addEventListener('submit', function () {
      var btn = form.querySelector('button[type="submit"]');
      btn.innerHTML = '<span class="spinner"></span> Submitting...';
      btn.disabled = true;
      btn.style.opacity = '0.7';
    });
  }

  var heroForm = document.getElementById('hero-form');
  var contactForm = document.getElementById('contact-form');
  if (heroForm) handleFormSubmit(heroForm);
  if (contactForm) handleFormSubmit(contactForm);

  // ---- Inline Validation ----
  function addValidation(form) {
    var phoneInputs = form.querySelectorAll('input[type="tel"]');
    var emailInputs = form.querySelectorAll('input[type="email"]');

    phoneInputs.forEach(function (input) {
      input.addEventListener('blur', function () {
        var digits = this.value.replace(/\D/g, '');
        if (this.value && digits.length < 10) {
          this.style.borderColor = '#ef4444';
          showError(this, 'Please enter a 10-digit phone number');
        } else {
          this.style.borderColor = '';
          clearError(this);
          if (digits.length >= 10) {
            this.style.borderColor = '#3A7550';
          }
        }
      });
    });

    emailInputs.forEach(function (input) {
      input.addEventListener('blur', function () {
        if (this.value && !this.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          this.style.borderColor = '#ef4444';
          showError(this, 'Please enter a valid email address');
        } else {
          this.style.borderColor = '';
          clearError(this);
          if (this.value) this.style.borderColor = '#3A7550';
        }
      });
    });
  }

  function showError(input, msg) {
    clearError(input);
    var err = document.createElement('span');
    err.className = 'field-error';
    err.textContent = msg;
    err.style.cssText = 'color:#ef4444;font-size:0.8rem;display:block;margin-top:4px;';
    input.parentNode.appendChild(err);
  }

  function clearError(input) {
    var existing = input.parentNode.querySelector('.field-error');
    if (existing) existing.remove();
  }

  if (heroForm) addValidation(heroForm);
  if (contactForm) addValidation(contactForm);

  // ---- Phone Number Formatting ----
  document.querySelectorAll('input[type="tel"]').forEach(function (input) {
    input.addEventListener('input', function () {
      var digits = this.value.replace(/\D/g, '').slice(0, 10);
      if (digits.length >= 6) {
        this.value = '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
      } else if (digits.length >= 3) {
        this.value = '(' + digits.slice(0, 3) + ') ' + digits.slice(3);
      }
    });
  });

  // ---- Google Maps Embed ----
  var mapContainer = document.getElementById('google-map');
  if (mapContainer) {
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

  // ---- Smooth Scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Scroll Animations ----
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

});
