// animate.js — scroll-triggered fade + slide up
(function () {
  const DURATION = "0.65s";
  const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
  const DELAY_STEP = 80; // ms between staggered children

  // Elements to animate on scroll
  const SELECTORS = [
    ".hero .eyebrow",
    ".hero h1",
    ".hero p",
    ".hero-actions",
    ".philosophy .word-mark",
    ".philosophy .tag",
    ".philosophy h2",
    ".philosophy p",
    ".philosophy .signature-line",
    ".menu-head",
    ".menu-item",
    ".visit-copy .tag",
    ".visit-copy h2",
    ".visit-copy p",
    ".visit-card",
    ".gallery-hero .eyebrow",
    ".gallery-hero h1",
    ".gallery-hero p",
    ".photo-cell",
    ".contact-hero .eyebrow",
    ".contact-hero h1",
    ".contact-hero p",
    ".contact-info .info-block",
    ".map-wrap",
    ".menu-section",
  ];

  function setInitial(el, delay) {
    el.style.opacity = "0";
    el.style.transform = "translateY(22px)";
    el.style.transition = `opacity ${DURATION} ${EASING} ${delay}ms, transform ${DURATION} ${EASING} ${delay}ms`;
  }

  function reveal(el) {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Hero elements animate immediately on load (no scroll needed)
    const heroEls = document.querySelectorAll(
      ".hero .eyebrow, .hero h1, .hero p, .hero-actions",
    );
    heroEls.forEach(function (el, i) {
      setInitial(el, i * DELAY_STEP);
      setTimeout(
        function () {
          reveal(el);
        },
        100 + i * DELAY_STEP,
      );
    });

    // All other elements use IntersectionObserver
    const scrollEls = document.querySelectorAll(SELECTORS.slice(4).join(","));

    // Stagger siblings within same parent
    const seen = new WeakSet();
    scrollEls.forEach(function (el) {
      if (seen.has(el)) return;
      seen.add(el);
      // find siblings of same type for stagger
      const siblings = el.parentElement
        ? Array.from(el.parentElement.children).filter(
            (c) =>
              c.matches &&
              scrollEls.length &&
              Array.from(scrollEls).includes(c),
          )
        : [];
      const idx = siblings.indexOf(el);
      setInitial(el, idx > 0 ? idx * DELAY_STEP : 0);
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    scrollEls.forEach(function (el) {
      observer.observe(el);
    });
  });
})();
