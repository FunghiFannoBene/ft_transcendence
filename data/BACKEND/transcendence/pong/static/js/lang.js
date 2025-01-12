import { loadTranslations, applyTranslations, handleRoute } from './spa.js';

document.addEventListener("DOMContentLoaded", function () {
  const changeLangButton = document.getElementById("btn-lang");
  if (!changeLangButton) {
    console.error("Required elements not found");
    return;
  }

  // note: animation
  const svg = changeLangButton.querySelector("svg");
  if (!svg) {
    console.error("SVG element not found inside 'btn-lang'");
    return;
  }
  function triggerAnimation() {
    svg.classList.remove("spin-animation");
    setTimeout(() => {
      svg.classList.add("spin-animation");
    }, 50);
  }

  const supportedLanguages = ["en", "it", "ja"];
  let currentLang = localStorage.getItem("currentLang") || "en";

  changeLangButton.addEventListener("click", function () {
    currentLang = getNextLanguage(currentLang);
    localStorage.setItem("currentLang", currentLang);
    changeLanguage(currentLang); // update language without submitting to the server
    triggerAnimation();
  });

  function getNextLanguage(currentLang) {
    const currentIndex = supportedLanguages.indexOf(currentLang);
    return supportedLanguages[(currentIndex + 1) % supportedLanguages.length];
  }

  // change language function to load JSON and update DOM
  function changeLanguage(newLang) {
    document.documentElement.lang = newLang;
    loadTranslations(newLang).then(() => {
      handleRoute(); // reload content with new translations
      updateLangDisplay(newLang);
    });
  }

  function updateLangDisplay(lang) {
    const langDisplay = document.getElementById("lang-display");
    const languageNames = {
      en: "English",
      it: "Italiano",
      ja: "日本語"
    };
    if (langDisplay) {
      langDisplay.textContent = languageNames[lang] || "Unknown Language";
    }
  }

  changeLanguage(currentLang); // initialize language on load
});
