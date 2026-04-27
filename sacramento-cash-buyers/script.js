// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Lightweight client-side validation. Netlify handles the actual submission
// via the form's action="/thanks.html" redirect.
(function () {
  const form = document.getElementById('lead-form');
  if (!form) return;

  const required = form.querySelectorAll('[required]');

  form.addEventListener('submit', function (e) {
    let valid = true;
    required.forEach((field) => {
      const v = (field.value || '').trim();
      if (!v) {
        field.classList.add('invalid');
        valid = false;
      } else {
        field.classList.remove('invalid');
      }
    });

    const email = form.querySelector('input[name="email"]');
    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.classList.add('invalid');
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Disable button to prevent double-submit before Netlify redirects
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Sending…';
    }
  });

  required.forEach((field) => {
    field.addEventListener('input', () => field.classList.remove('invalid'));
    field.addEventListener('change', () => field.classList.remove('invalid'));
  });
})();
