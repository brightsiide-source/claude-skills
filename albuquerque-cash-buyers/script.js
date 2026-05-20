(function () {
  'use strict';

  // Year in footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Lead form — Netlify Forms via AJAX so we can show in-page success
  var form = document.getElementById('lead-form');
  if (!form) return;

  var success = document.querySelector('.form-success');

  function encode(data) {
    return Object.keys(data)
      .map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]); })
      .join('&');
  }

  function validate() {
    var ok = true;
    var required = form.querySelectorAll('[required]');
    required.forEach(function (el) {
      el.classList.remove('error');
      var val = (el.value || '').trim();
      if (!val) { el.classList.add('error'); ok = false; return; }
      if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        el.classList.add('error'); ok = false;
      }
      if (el.type === 'tel') {
        var digits = val.replace(/\D/g, '');
        if (digits.length < 10) { el.classList.add('error'); ok = false; }
      }
    });
    return ok;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) {
      var firstErr = form.querySelector('.error');
      if (firstErr) firstErr.focus();
      return;
    }

    var btn = form.querySelector('button[type="submit"]');
    var btnLabel = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = v; });

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(data)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Network error');
        form.hidden = true;
        if (success) success.hidden = false;
        // Optional: ping a thank-you analytics event here
        if (window.dataLayer) window.dataLayer.push({ event: 'lead_submit' });
      })
      .catch(function () {
        if (btn) { btn.disabled = false; btn.textContent = btnLabel; }
        alert("Sorry — something went wrong sending that. Please call us at (505) 555-0100 and we'll take it down by phone.");
      });
  });

  // Clear error styling as the user types
  form.addEventListener('input', function (e) {
    if (e.target.classList && e.target.classList.contains('error')) {
      e.target.classList.remove('error');
    }
  });

  // Show success state if Netlify redirected back with ?submitted=true (no-JS fallback path)
  if (/[?&]submitted=true\b/.test(window.location.search)) {
    form.hidden = true;
    if (success) success.hidden = false;
    history.replaceState(null, '', window.location.pathname + '#offer');
  }
})();
