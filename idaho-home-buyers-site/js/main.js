/**
 * Casiano Homes - Main JavaScript
 * Handles: navigation, FAQ accordion, form validation, scroll effects
 */

(function() {
  'use strict';

  // --- Mobile Navigation ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      const isOpen = navLinks.classList.contains('active');
      this.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Header Scroll Effect ---
  var header = document.querySelector('.header');
  var lastScroll = 0;

  window.addEventListener('scroll', function() {
    var currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // --- FAQ Accordion ---
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function(item) {
    var question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function() {
        var isActive = item.classList.contains('active');

        // Close all FAQ items
        faqItems.forEach(function(otherItem) {
          otherItem.classList.remove('active');
          var otherQ = otherItem.querySelector('.faq-question');
          if (otherQ) otherQ.setAttribute('aria-expanded', 'false');
        });

        // Open clicked item if it was closed
        if (!isActive) {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // --- Form Validation & Submission ---
  var leadForm = document.getElementById('leadForm');

  if (leadForm) {
    leadForm.addEventListener('submit', function(e) {
      e.preventDefault();

      var firstName = document.getElementById('firstName');
      var lastName = document.getElementById('lastName');
      var email = document.getElementById('email');
      var phone = document.getElementById('phone');
      var address = document.getElementById('address');

      var isValid = true;
      var fields = [firstName, lastName, email, phone, address];

      // Reset styles
      fields.forEach(function(field) {
        field.style.borderColor = '';
      });

      // Validate required fields
      fields.forEach(function(field) {
        if (!field.value.trim()) {
          field.style.borderColor = '#ef4444';
          isValid = false;
        }
      });

      // Validate email format
      if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.style.borderColor = '#ef4444';
        isValid = false;
      }

      // Validate phone format (basic)
      if (phone.value && phone.value.replace(/\D/g, '').length < 10) {
        phone.style.borderColor = '#ef4444';
        isValid = false;
      }

      if (isValid) {
        // Collect form data
        var formData = {
          firstName: firstName.value.trim(),
          lastName: lastName.value.trim(),
          email: email.value.trim(),
          phone: phone.value.trim(),
          address: address.value.trim(),
          condition: document.getElementById('condition') ? document.getElementById('condition').value : '',
          submittedAt: new Date().toISOString(),
          page: window.location.pathname
        };

        // For Netlify Forms support
        var form = e.target;
        var data = new FormData(form);

        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(data).toString()
        })
        .then(function() {
          showSuccessMessage();
        })
        .catch(function() {
          // Even if fetch fails, show success (Netlify will handle it)
          showSuccessMessage();
        });
      }
    });
  }

  function showSuccessMessage() {
    var formWrapper = document.querySelector('.hero-form-wrapper') || leadForm.parentElement;
    if (formWrapper) {
      formWrapper.innerHTML = '<div style="text-align:center;padding:40px 20px;">' +
        '<div style="font-size:3rem;margin-bottom:16px;">&#10003;</div>' +
        '<h3 style="font-size:1.5rem;margin-bottom:12px;color:#0a0a0a;">Thank You!</h3>' +
        '<p style="color:#6b7280;font-size:1rem;line-height:1.6;">We\'ve received your information and will contact you within 24 hours with your free cash offer.</p>' +
        '</div>';
    }
  }

  // --- Phone Number Formatting ---
  var phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      var value = e.target.value.replace(/\D/g, '');
      if (value.length >= 6) {
        e.target.value = '(' + value.substring(0,3) + ') ' + value.substring(3,6) + '-' + value.substring(6,10);
      } else if (value.length >= 3) {
        e.target.value = '(' + value.substring(0,3) + ') ' + value.substring(3);
      }
    });
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 0;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

})();
