/* Tree Frogs - main.js
   Lean interaction layer: header morph, mobile nav, scroll reveals,
   count-up stats, scroll progress, FAB. No deps. */
(function () {
  "use strict";

  const reduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onReady = (fn) =>
    document.readyState !== "loading"
      ? fn()
      : document.addEventListener("DOMContentLoaded", fn);

  onReady(() => {
    // Header state on scroll
    const header = document.querySelector(".site-header");
    const onScroll = () => {
      if (header) header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Scroll progress bar
    const progress = document.querySelector(".scroll-progress");
    if (progress) {
      const update = () => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const ratio = max > 0 ? Math.min(1, h.scrollTop / max) : 0;
        progress.style.setProperty("--scroll", ratio.toFixed(4));
      };
      update();
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
    }

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
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
      );
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("in"));
    }

    // Count-up stats
    const counters = document.querySelectorAll("[data-count]");
    if (counters.length) {
      const animate = (el) => {
        const target = parseFloat(el.dataset.count);
        const decimals = (el.dataset.count.split(".")[1] || "").length;
        const suffix = el.dataset.suffix || "";
        const prefix = el.dataset.prefix || "";
        const dur = 1400;
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          const v = (target * eased).toFixed(decimals);
          el.textContent = prefix + v + suffix;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = prefix + target.toFixed(decimals) + suffix;
        };
        if (reduced) {
          el.textContent = prefix + target.toFixed(decimals) + suffix;
        } else {
          requestAnimationFrame(tick);
        }
      };
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              animate(e.target);
              io.unobserve(e.target);
            }
          });
        }, { threshold: 0.4 });
        counters.forEach((c) => io.observe(c));
      } else {
        counters.forEach(animate);
      }
    }

    // Floating call button after scroll
    const fab = document.querySelector(".fab");
    if (fab) {
      const showFab = () => fab.classList.toggle("in", window.scrollY > 400);
      showFab();
      window.addEventListener("scroll", showFab, { passive: true });
    }

    // Contact form status hint
    const form = document.querySelector("form[data-tf-form]");
    if (form) {
      form.addEventListener("submit", () => {
        const status = form.querySelector(".form-status");
        if (status) {
          status.textContent = "Sending… we'll be in touch within one business day.";
          status.style.color = "var(--green)";
        }
      });
    }

    // Year stamp
    document.querySelectorAll("[data-year]").forEach(
      (el) => (el.textContent = String(new Date().getFullYear()))
    );
  });
})();
