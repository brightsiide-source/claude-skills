(function () {
  'use strict';

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var list = document.getElementById('primary-nav');
  if (toggle && list) {
    toggle.addEventListener('click', function () {
      var open = list.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    list.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        list.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Footer year
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Phone formatting (US, light-touch)
  var phone = document.getElementById('phone');
  if (phone) {
    phone.addEventListener('input', function () {
      var d = phone.value.replace(/\D/g, '').slice(0, 10);
      if (d.length > 6) {
        phone.value = '(' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6);
      } else if (d.length > 3) {
        phone.value = '(' + d.slice(0, 3) + ') ' + d.slice(3);
      } else if (d.length > 0) {
        phone.value = '(' + d;
      }
    });
  }

  // ZIP - digits only, 5 max
  var zip = document.getElementById('zip');
  if (zip) {
    zip.addEventListener('input', function () {
      zip.value = zip.value.replace(/\D/g, '').slice(0, 5);
    });
  }
})();
