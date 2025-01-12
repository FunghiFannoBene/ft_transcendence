export function initializeSPA() {
  window.addEventListener("popstate", handleRoute);
  // set initial language from localStorage if available
  const currentLang = localStorage.getItem("currentLang") || "en";
  document.documentElement.lang = currentLang;
  loadTranslations(currentLang).then(() => {
    handleRoute(); // load initial content
  });
}

export function setupNavigation(buttonSelector) {
  const buttons = document.querySelectorAll(buttonSelector);
  buttons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const url = this.getAttribute("data-route");
      console.log(`Navigating to: ${url}`);
      navigateTo(url);
    });
  });
}

function navigateTo(url) {
  const currentLang = localStorage.getItem("currentLang") || "en";
  const fullUrl = `/${currentLang}${url}`;
  console.log(`navigateTo called with URL: ${fullUrl}`);
  history.pushState(null, null, fullUrl);
  handleRoute();
}

export function handleRoute() {
  const path = window.location.pathname;
  console.log(`handleRoute called with path: ${path}`);
  
  // Target divs for injecting content
  const contentDiv = document.getElementById("dynamic-content");
  const footerDiv = document.getElementById("dynamic-footer");
  const openingDiv = document.getElementById("dynamic-opening");

  fetch(path, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // inject each block's content separately
      contentDiv.innerHTML = data.content || "";
      footerDiv.innerHTML = data.footer || "";
      openingDiv.innerHTML = data.opening || "";

      // apply translations to new content
      const translations = JSON.parse(localStorage.getItem("translations") || "{}");
      applyTranslations(translations);

      // re-attach event listeners for newly injected content if needed
      setupNavigation("[data-route]");
    })
    .catch((error) => console.error("Error loading content:", error));
}

// note: functions also for lang.js
export function loadTranslations(lang) {
  return fetch(`/static/translations/${lang}.json`)
    .then(response => response.json())
    .then(translations => {
      localStorage.setItem("translations", JSON.stringify(translations));
      applyTranslations(translations);
    })
    .catch(error => console.error("Error loading translations:", error));
}

export function applyTranslations(translations) {
  document.querySelectorAll("[data-translate-key]").forEach((element) => {
    const key = element.getAttribute("data-translate-key");
    if (translations[key]) {
      element.innerHTML = translations[key];
    }
  });
}
