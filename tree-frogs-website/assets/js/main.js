/* Tree Frogs - main.js
   Modern interaction layer: header morph, mobile nav, scroll reveals,
   3D card tilt, mouse-parallax hero, magnetic CTAs, count-up stats,
   scroll progress bar, FAB. No deps. */

(function () {
  "use strict";

  const reduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onReady = (fn) =>
    document.readyState !== "loading"
      ? fn()
      : document.addEventListener("DOMContentLoaded", fn);

  onReady(() => {
    // ---- Header shadow on scroll ----
    const header = document.querySelector(".site-header");
    const onScroll = () => {
      if (header) header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // ---- Scroll progress bar ----
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

    // ---- Mobile nav toggle ----
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

    // ---- Reveal on scroll ----
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

    // ---- Card spotlight + 3D tilt ----
    document.querySelectorAll(".card, .area-chip").forEach((card) => {
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mx", x + "%");
        card.style.setProperty("--my", y + "%");
        if (!reduced && card.classList.contains("tilt")) {
          const tx = (e.clientX - rect.left) / rect.width - 0.5;
          const ty = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.setProperty("--tx", tx.toFixed(3));
          card.style.setProperty("--ty", ty.toFixed(3));
        }
      };
      const onLeave = () => {
        card.style.setProperty("--tx", 0);
        card.style.setProperty("--ty", 0);
      };
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
    });

    // ---- Mouse-parallax hero ----
    const stage = document.querySelector(".hero-stage");
    const hero = document.querySelector(".hero");
    if (stage && hero && !reduced) {
      let raf = 0;
      let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
      const apply = () => {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
        stage.style.setProperty("--px", currentX.toFixed(3));
        stage.style.setProperty("--py", currentY.toFixed(3));
        stage.style.setProperty("--rx", (currentX * 6).toFixed(2) + "deg");
        stage.style.setProperty("--ry", (-currentY * 6).toFixed(2) + "deg");
        if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
          raf = requestAnimationFrame(apply);
        } else {
          raf = 0;
        }
      };
      hero.addEventListener("pointermove", (e) => {
        const r = hero.getBoundingClientRect();
        targetX = (e.clientX - r.left) / r.width - 0.5;
        targetY = (e.clientY - r.top) / r.height - 0.5;
        if (!raf) raf = requestAnimationFrame(apply);
      });
      hero.addEventListener("pointerleave", () => {
        targetX = 0; targetY = 0;
        if (!raf) raf = requestAnimationFrame(apply);
      });
    }

    // ---- Magnetic buttons ----
    if (!reduced) {
      document.querySelectorAll(".btn-magnetic").forEach((btn) => {
        const strength = 18;
        btn.addEventListener("pointermove", (e) => {
          const r = btn.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width - 0.5) * strength;
          const y = ((e.clientY - r.top) / r.height - 0.5) * strength;
          btn.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
        });
        btn.addEventListener("pointerleave", () => {
          btn.style.transform = "";
        });
      });
    }

    // ---- Count-up stats ----
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
        requestAnimationFrame(tick);
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

    // ---- Floating Call FAB after scroll ----
    const fab = document.querySelector(".fab");
    if (fab) {
      const showFab = () => {
        fab.classList.toggle("in", window.scrollY > 400);
      };
      showFab();
      window.addEventListener("scroll", showFab, { passive: true });
    }

    // ---- Contact form status ----
    const form = document.querySelector("form[data-tf-form]");
    if (form) {
      form.addEventListener("submit", (e) => {
        const status = form.querySelector(".form-status");
        if (status) {
          status.textContent = "Sending… we'll be in touch within one business day.";
          status.style.color = "var(--green-700)";
        }
      });
    }

    // ---- Year stamp ----
    document.querySelectorAll("[data-year]").forEach(
      (el) => (el.textContent = String(new Date().getFullYear()))
    );

    // ---- Custom cursor (desktop, fine-pointer only) ----
    const finePointer = window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1025px)").matches;
    if (finePointer && !reduced) {
      const dot = document.createElement("div");
      const ring = document.createElement("div");
      dot.className = "cursor-dot";
      ring.className = "cursor-ring";
      document.body.appendChild(dot);
      document.body.appendChild(ring);
      document.body.classList.add("has-cursor");

      let dx = 0, dy = 0, rx = 0, ry = 0, mx = 0, my = 0;
      let raf = 0;
      const tick = () => {
        dx += (mx - dx) * 0.6;
        dy += (my - dy) * 0.6;
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
        if (Math.abs(mx - rx) > 0.1 || Math.abs(my - ry) > 0.1) {
          raf = requestAnimationFrame(tick);
        } else {
          raf = 0;
        }
      };
      window.addEventListener("pointermove", (e) => {
        mx = e.clientX; my = e.clientY;
        if (!raf) raf = requestAnimationFrame(tick);
      });
      const hoverSel = "a, button, [role='button'], input, textarea, select, summary, .card, .area-chip, .step, .hero-chip";
      document.querySelectorAll(hoverSel).forEach((el) => {
        el.addEventListener("pointerenter", () => {
          dot.classList.add("is-hover"); ring.classList.add("is-hover");
        });
        el.addEventListener("pointerleave", () => {
          dot.classList.remove("is-hover"); ring.classList.remove("is-hover");
        });
      });
      window.addEventListener("blur", () => { dot.style.opacity = 0; ring.style.opacity = 0; });
      window.addEventListener("focus", () => { dot.style.opacity = ""; ring.style.opacity = ""; });
    }
  });
})();
