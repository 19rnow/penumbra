(function () {
  "use strict";

  /* ── helpers ───────────────────────────────────── */
  var $ = function(s, r){ return (r||document).querySelector(s); };
  var $$ = function(s, r){ return Array.from((r||document).querySelectorAll(s)); };
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  /* ── splash ────────────────────────────────────── */
  function initSplash() {
    var splash = $("[data-splash]");
    if (!splash) return;
    function hideSplash() {
      splash.classList.add("is-out");
    }
    if (document.readyState === "complete") {
      setTimeout(hideSplash, 600);
    } else {
      window.addEventListener("load", function() { setTimeout(hideSplash, 400); });
    }
    // JS safety net (CSS animation is 4.5s safety)
    setTimeout(hideSplash, 3800);
  }

  /* ── cursor ────────────────────────────────────── */
  function initCursor() {
    if (!fineHover) return;
    var cursor = $(".cursor");
    var ring   = $(".cursor-ring");
    var label  = $(".cursor-label");
    if (!cursor || !ring) return;

    var rx = -100, ry = -100, mx = -100, my = -100;
    var firstMove = false;

    window.addEventListener("mousemove", function(e) {
      mx = e.clientX; my = e.clientY;
      ring.style.transform = "translate3d(" + mx + "px," + my + "px,0)";
      if (!firstMove) {
        firstMove = true;
        cursor.classList.add("is-ready");
      }
    });

    // Hover state on interactive elements
    var HOVERABLE = "a, button, [data-cursor-label], .cocktail-card, .events-card, .music-session, input, select, textarea, .rf-submit";

    document.addEventListener("mouseover", function(e) {
      var el = e.target.closest(HOVERABLE);
      if (!el) return;
      cursor.classList.add("is-hover");
      var lbl = el.dataset.cursorLabel || el.getAttribute("data-cursor-label") ||
                (el.tagName === "A" ? "ver" : "");
      label.textContent = lbl;
    });

    document.addEventListener("mouseout", function(e) {
      var el = e.target.closest(HOVERABLE);
      if (el && !el.contains(e.relatedTarget)) {
        cursor.classList.remove("is-hover");
        label.textContent = "";
      }
    });
  }

  /* ── nav ───────────────────────────────────────── */
  function initNav() {
    var nav    = $("[data-nav]");
    var burger = $(".nav-burger");
    var drawer = $("#nav-mobile");
    if (!nav) return;

    // Scroll solidify
    window.addEventListener("scroll", function() {
      nav.classList.toggle("is-scrolled", window.scrollY > 60);
    }, { passive: true });

    // Burger
    if (burger && drawer) {
      burger.addEventListener("click", function() {
        var open = burger.classList.toggle("is-open");
        drawer.classList.toggle("is-open", open);
        burger.setAttribute("aria-expanded", String(open));
        drawer.setAttribute("aria-hidden", String(!open));
        document.body.style.overflow = open ? "hidden" : "";
      });
      // Close on link click
      $$("a", drawer).forEach(function(a) {
        a.addEventListener("click", function() {
          burger.classList.remove("is-open");
          drawer.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
          drawer.setAttribute("aria-hidden", "true");
          document.body.style.overflow = "";
        });
      });
    }

    // Smooth scroll for anchor links
    document.addEventListener("click", function(e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 72),
        behavior: "smooth"
      });
    });
  }

  /* ── reveals (IntersectionObserver) ────────────── */
  function initReveals() {
    var els = $$(".reveal");
    if (!els.length) return;

    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.04, rootMargin: "0px 0px -4% 0px" });

    els.forEach(function(el) { io.observe(el); });

    // 6s safety: force-reveal anything still hidden
    setTimeout(function() {
      $$(".reveal:not(.is-visible)").forEach(function(el) {
        if (el.getBoundingClientRect().top < window.innerHeight * 1.1) {
          el.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  /* ── cocktail section ───────────────────────────── */
  function initCocktails() {
    var section    = $(".cocktails");
    var sticky     = $("[data-cocktail-sticky]");
    var track      = $("[data-cocktail-track]");
    var progressEl = $("[data-cocktail-progress]");
    if (!section || !sticky || !track) return;

    var cards = $$(".cocktail-card", track);
    var total = cards.length;

    // ─ SVG stroke-dasharray setup ─────────────────
    function setupSVG(card) {
      var outline = card.querySelector(".glass-outline");
      if (!outline) return;
      var len = outline.getTotalLength ? outline.getTotalLength() : 320;
      outline.style.strokeDasharray  = len;
      outline.style.strokeDashoffset = len;
      outline.style.transition = "stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)";
    }
    cards.forEach(setupSVG);

    function drawGlass(card) {
      var outline = card && card.querySelector(".glass-outline");
      if (outline && outline.style.strokeDashoffset !== "0") {
        outline.style.strokeDashoffset = "0";
      }
    }

    function updateProgress(idx) {
      if (!progressEl) return;
      progressEl.textContent =
        String(idx + 1).padStart(2, "0") + " / " + String(total).padStart(2, "0");
    }

    // ─ Mobile: CSS scroll-snap handles all of this ─
    if (window.innerWidth < 960) {
      // IO to draw first glass when section enters view
      var mobileIO = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) { drawGlass(cards[0]); mobileIO.disconnect(); }
        });
      }, { threshold: 0.1 });
      mobileIO.observe(section);
      track.addEventListener("scroll", function() {
        var idx = Math.round(track.scrollLeft / track.clientWidth);
        idx = Math.min(idx, total - 1);
        updateProgress(idx);
        drawGlass(cards[idx]);
        drawGlass(cards[Math.min(idx + 1, total - 1)]);
      }, { passive: true });
      return;
    }

    // ─ Desktop: CSS sticky + rAF scroll drive ────────
    // The CSS makes .cocktails tall (100vh + 9×100vw) and .cocktails-sticky { position:sticky; top:0 }
    // We just read scroll progress and move the track.

    var ticking = false;
    var lastProgress = -1;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateTrack);
        ticking = true;
      }
    }

    function updateTrack() {
      ticking = false;
      var rect       = section.getBoundingClientRect();
      var sectionH   = section.offsetHeight;   // 100vh + 9×100vw
      var travelH    = sectionH - window.innerHeight; // just the 9×100vw part
      if (travelH <= 0) return;

      // progress: 0 when section top hits viewport top, 1 when section bottom hits viewport bottom
      // rect.top is negative once we've scrolled past the section start
      var scrolled = -rect.top;  // px scrolled into the section
      var progress = Math.max(0, Math.min(1, scrolled / travelH));

      if (Math.abs(progress - lastProgress) < 0.0001) return;
      lastProgress = progress;

      // Move track
      var dist = track.scrollWidth - window.innerWidth;
      track.style.transform = "translateX(" + (-progress * dist).toFixed(2) + "px)";

      // Update counter + draw glasses
      var idx = Math.min(Math.round(progress * (total - 1)), total - 1);
      updateProgress(idx);
      drawGlass(cards[idx]);
      drawGlass(cards[Math.min(idx + 1, total - 1)]);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial paint
    requestAnimationFrame(updateTrack);
  }

  /* ── events card tilt ───────────────────────────── */
  function initTilt() {
    if (!fineHover) return;
    var cards = $$("[data-tilt]");
    cards.forEach(function(card) {
      card.addEventListener("mousemove", function(e) {
        var rect = card.getBoundingClientRect();
        var cx = rect.left + rect.width  / 2;
        var cy = rect.top  + rect.height / 2;
        var dx = (e.clientX - cx) / (rect.width  / 2);
        var dy = (e.clientY - cy) / (rect.height / 2);
        card.style.transform = "perspective(1000px) rotateY(" + (dx * 4) + "deg) rotateX(" + (-dy * 3) + "deg) scale(1.01)";
      });
      card.addEventListener("mouseleave", function() {
        card.style.transform = "";
      });
    });
  }

  /* ── reserve form → WhatsApp ────────────────────── */
  function initReserveForm() {
    var form = $("[data-reserve-form]");
    if (!form) return;

    form.addEventListener("submit", function(e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var name   = (form.querySelector('[name="name"]')   || {}).value || "";
      var phone  = (form.querySelector('[name="phone"]')  || {}).value || "";
      var date   = (form.querySelector('[name="date"]')   || {}).value || "";
      var guests = (form.querySelector('[name="guests"]') || {}).value || "";
      var note   = (form.querySelector('[name="note"]')   || {}).value || "";

      var dateStr = date ? new Date(date).toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "";

      var msg = "Hola Penumbra, quiero hacer una reserva 🍸\n\n"
              + "Nombre: " + name + "\n"
              + "Teléfono: " + phone + "\n"
              + (dateStr ? "Fecha: " + dateStr + "\n" : "")
              + (guests  ? "Personas: " + guests + "\n" : "")
              + (note    ? "Nota: " + note + "\n" : "")
              + "\nGracias 🙌";

      var wa = "https://wa.me/34910223344?text=" + encodeURIComponent(msg);
      window.open(wa, "_blank", "noopener,noreferrer");
    });
  }

  /* ── aurora mouse-reactive enhancement ─────────── */
  function initAurora() {
    if (!fineHover) return;
    var aurora = $(".aurora");
    if (!aurora) return;
    var tx = 50, ty = 50;
    window.addEventListener("mousemove", function(e) {
      tx = (e.clientX / window.innerWidth)  * 100;
      ty = (e.clientY / window.innerHeight) * 100;
    }, { passive: true });
    // Very slow follow — just set a CSS var that slightly shifts the gradient
    setInterval(function() {
      document.documentElement.style.setProperty("--mx", tx.toFixed(1) + "%");
      document.documentElement.style.setProperty("--my", ty.toFixed(1) + "%");
    }, 80);
  }

  /* ── GSAP scroll reveals ────────────────────────── */
  function initGSAPReveals() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    // Stagger reveals for music sessions
    gsap.from(".music-session", {
      opacity: 0, x: -20,
      stagger: 0.12,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".music-sessions",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Local photos stagger
    gsap.from(".local-photo", {
      opacity: 0, y: 25, rotation: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".local-photos",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Reserve form fields
    gsap.from(".rf-field, .rf-row", {
      opacity: 0, y: 16,
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".reserve-form",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    // Events card
    gsap.from(".events-card", {
      opacity: 0, y: 30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".events-card",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  }

  /* ── hero parallax ──────────────────────────────── */
  function initHeroParallax() {
    if (!window.gsap || !window.ScrollTrigger) return;
    var heroImg = $(".hero-bg img");
    if (!heroImg) return;
    gsap.to(heroImg, {
      y: "20%",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }

  /* ── gallery lanes scroll sync ──────────────────── */
  function initGallery() {
    // CSS animation handles the auto-scroll; here we just pause on hover
    $$(".gallery-lane").forEach(function(lane) {
      lane.addEventListener("mouseover", function() {
        var t = lane.querySelector(".gallery-lane-track");
        if (t) t.style.animationPlayState = "paused";
      });
      lane.addEventListener("mouseout", function() {
        var t = lane.querySelector(".gallery-lane-track");
        if (t) t.style.animationPlayState = "running";
      });
    });
  }

  /* ── boot ───────────────────────────────────────── */
  function boot() {
    safe(initSplash,       "initSplash");
    safe(initCursor,       "initCursor");
    safe(initNav,          "initNav");
    safe(initReveals,      "initReveals");
    safe(initReserveForm,  "initReserveForm");
    safe(initTilt,         "initTilt");
    safe(initAurora,       "initAurora");
    safe(initGallery,      "initGallery");

    if (window.gsap && window.ScrollTrigger) {
      safe(initHeroParallax, "initHeroParallax");
      safe(initGSAPReveals,  "initGSAPReveals");
    }

    // Cocktails last (needs GSAP + layout ready)
    safe(initCocktails, "initCocktails");

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

})();
