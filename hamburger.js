// hamburger.js — mobile nav toggle
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.querySelector(".hamburger");
    const drawer = document.querySelector(".mobile-drawer");
    if (!btn || !drawer) return;

    btn.addEventListener("click", function () {
      const isOpen = drawer.classList.toggle("open");
      btn.classList.toggle("open", isOpen);
      btn.setAttribute("aria-expanded", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // close on link click
    drawer.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        drawer.classList.remove("open");
        btn.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    // close on outside click
    document.addEventListener("click", function (e) {
      if (!btn.contains(e.target) && !drawer.contains(e.target)) {
        drawer.classList.remove("open");
        btn.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  });
})();
