import { loadTranslations, applyTranslations, handleRoute } from './spa.js';

document.addEventListener("DOMContentLoaded", function () {
  const changeLangButton = document.getElementById("btn-lang");
  const langOptions = document.querySelectorAll(".dropdown-item");

  if (!changeLangButton || langOptions.length === 0) {
    console.error("Required elements not found");
    return;
  }

  const supportedLanguages = ["en", "it", "kr"];
  let currentLang = localStorage.getItem("currentLang") || "en";

  langOptions.forEach(option => {
    option.addEventListener("click", function () {
      const selectedLang = option.getAttribute("id").split("-").pop();
      if (supportedLanguages.includes(selectedLang)) {
        currentLang = selectedLang;
        localStorage.setItem("currentLang", currentLang);
        changeLanguage(currentLang);
      }
    });
  });

  function changeLanguage(newLang) {
    document.documentElement.lang = newLang;
    loadTranslations(newLang).then(() => {
      handleRoute(); // reload content with new translations
      updateLangDisplay(newLang);
    });
  }

  function updateLangDisplay(lang) {
    const langDisplay = changeLangButton.querySelector("button");
    const languageNames = {
      en: "English",
      it: "Italiano",
      kr: "한국어"
    };
    if (langDisplay) {
      langDisplay.textContent = languageNames[lang] || "Unknown Language";
    }

    // update dropdown items
    // const dropdownIds = ["lang-option-one", "lang-option-two"];
    let index = 0;
    supportedLanguages.forEach(language => {
      if (language !== lang) {
        langOptions[index].textContent = languageNames[language];
        // langOptions[index].setAttribute("id", dropdownIds[index]);
        index++;
      }
    });
  }

  changeLanguage(currentLang); // initialize language on load
});
