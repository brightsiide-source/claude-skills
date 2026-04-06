// ---- Mobile Nav Toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ---- FAQ Accordion ----
function toggleFaq(btn) {
  const item = btn.parentElement;
  const wasActive = item.classList.contains('active');

  // Close all
  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('active');
  });

  // Open clicked if it wasn't already open
  if (!wasActive) {
    item.classList.add('active');
  }
}

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
  } else {
    navbar.style.boxShadow = 'none';
  }

  lastScroll = currentScroll;
});

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ---- Simple form submission feedback ----
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
  });
}
