export function initializeSPA() {
  window.addEventListener("load", handleRoute);
  window.addEventListener("popstate", handleRoute);
  console.log("🚀 SPA initialized!");
  // handleRoute(); // Chiamata iniziale per il primo caricamento
}

export function setupNavigation(buttonSelector) {
  console.log("🚀 Setup navigation!");
  const buttons = document.querySelectorAll(buttonSelector);
  buttons.forEach((button) => {
    button.addEventListener("click", async function (event) {
      event.preventDefault();
      const url = this.getAttribute("data-route");
      console.log(`Navigating to: ${url}`);
      await navigateTo(url);
    });
  });
}

export async function navigateTo(url) {
  console.log(`Navigating to: ${url}`);
  history.pushState(null, null, url);
   await handleRoute();
}

async function fetchContent(path) {
  try {
      const response = await fetch(path, {
          headers: {
              "X-Requested-With": "XMLHttpRequest",
          },
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
  } catch (error) {
      console.error("Error fetching content:", error);
      return null;  // Ritorna `null` in caso di errore per evitare crash
  }
  console.log("Content fetched");
}

export async function handleRoute() {
  const path = window.location.pathname;
  console.log(`handleRoute called with path: ${path}`);
  const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;  

  // Target divs for injecting content
  const contentDiv = document.getElementById("dynamic-content");

  const data = await fetchContent(path);

  if (data) {
    contentDiv.innerHTML = data.content || "";
    // document.dispatchEvent(new Event("spaContentLoaded"));
  } else {
    console.error("❌ Errore nel caricamento del contenuto, impossibile aggiornare il DOM.");
    return;
  }
  // Estrazione del nome della pagina (l'ultimo segmento del percorso)
  let page = cleanPath.split('/').filter(Boolean).pop(); // Estrai l'ultimo segmento

  // Se il percorso è vuoto (root "/"), assegna 'home' come nome della pagina
  if (!page) {
    page = 'home';
  }

  // re-attach event listeners for newly injected content if needed
  setupNavigation("[data-route]");

  // Verifica se lo script è già caricato
  const scriptSrc = `/static/js/${page}.js`;

  await loadJS("/static/js/login_form.js");

}

export function isScriptLoaded(scriptSrc) {
  return document.querySelector(`script[src="${scriptSrc}"]`) !== null;
}

export function loadJS(scriptSrc) {
  if (!scriptSrc) {
    console.error("Error: scriptSrc is empty or undefined.");
    return Promise.reject(new Error("scriptSrc is empty or undefined."));
  }
  console.log(`Loading script: ${scriptSrc}`);

  return new Promise((resolve, reject) => {
    console.log(`Promise script: ${scriptSrc}`);
    if (!scriptSrc) {
      reject(new Error("❌ scriptSrc is empty or undefined."));
      return; // Interrompe la Promise subito
    }
  
    if (!document.head) {
      reject(new Error("❌ document.head is not available."));
      return; // Evita di eseguire codice inutile
    }
  
    const script = document.createElement("script");
    script.src = scriptSrc;
  
    script.onload = () => {
      console.log(`✅ Script loaded successfully: ${scriptSrc}`);
      resolve();  // La Promise è completata con successo
    };
  
    script.onerror = (error) => {
      console.error(`❌ Error loading script: ${scriptSrc}`, error);
      reject(new Error(`Failed to load script: ${scriptSrc}`));
    };
  
    document.head.appendChild(script);  // Aggiungiamo lo script solo se tutto è OK
  });
}

// note: functions also for lang.js
// export function loadTranslations(lang) {
//   return fetch(`/static/translations/${lang}.json`)
//     .then(response => response.json())
//     .then(translations => {
//       localStorage.setItem("translations", JSON.stringify(translations));
//       applyTranslations(translations);
//     })
//     .catch(error => console.error("Error loading translations:", error));
// }

// export function applyTranslations(translations) {
//   document.querySelectorAll("[data-translate-key]").forEach((element) => {
//     const key = element.getAttribute("data-translate-key");
//     if (translations[key]) {
//       element.innerHTML = translations[key];
//     }
//   });
// }
