/* Tree Frogs - main.js
   Handles header scroll state, mobile nav toggle, scroll reveals,
   contact form submission, and a card hover spotlight. No deps. */

(function () {
  "use strict";

  const onReady = (fn) =>
    document.readyState !== "loading"
      ? fn()
      : document.addEventListener("DOMContentLoaded", fn);

  onReady(() => {
    // Header shadow on scroll
    const header = document.querySelector(".site-header");
    const onScroll = () => {
      if (!header) return;
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Mobile nav toggle
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", () => {
        const open = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      links.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => {
          links.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        })
      );
    }

    // Reveal on scroll
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("in"));
    }

    // Card spotlight (mouse follows cursor)
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mx", x + "%");
        card.style.setProperty("--my", y + "%");
      });
    });

    // Floating Call FAB after scroll
    const fab = document.querySelector(".fab");
    if (fab) {
      const showFab = () => {
        fab.classList.toggle("in", window.scrollY > 400);
      };
      showFab();
      window.addEventListener("scroll", showFab, { passive: true });
    }

    // Contact form (Netlify forms compatible)
    const form = document.querySelector("form[data-tf-form]");
    if (form) {
      form.addEventListener("submit", (e) => {
        const status = form.querySelector(".form-status");
        // If Netlify forms is enabled, the page reloads to /thanks via the form's action.
        // Provide a graceful UX hint regardless.
        if (status) {
          status.textContent = "Sending… we'll be in touch within one business day.";
          status.style.color = "var(--green-700)";
        }
      });
    }

    // Year stamp
    const y = document.querySelectorAll("[data-year]");
    y.forEach((el) => (el.textContent = String(new Date().getFullYear())));
  });
})();
