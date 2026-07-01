// lang.js — shared GR/EN toggle
(function () {
  const STORAGE_KEY = "unhu-lang";

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || "en";
  }

  function applyLang(lang) {
    document.documentElement.setAttribute("lang", lang === "gr" ? "el" : "en");
    document.querySelectorAll("[data-en]").forEach((el) => {
      el.innerHTML = lang === "gr" ? el.dataset.gr : el.dataset.en;
    });
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const isGr = lang === "gr";
      btn.querySelector(".lang-gr").classList.toggle("lang-active", isGr);
      btn.querySelector(".lang-en").classList.toggle("lang-active", !isGr);
    });
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function toggleLang() {
    applyLang(getLang() === "en" ? "gr" : "en");
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyLang(getLang());
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", toggleLang);
    });
  });
})();
