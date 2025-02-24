// Funzione per cambiare la lingua
async function changeLanguage(langCode) {
  try {
    const response = await fetch(`/set_language/${langCode}/`);
    const data = await response.json();
    
    if (data.status === 'success') {
      // Carica le traduzioni per la nuova lingua
      await loadTranslations(langCode);
      updateDropdownText(langCode);
    }
  } catch (error) {
    console.error('Errore nel cambio lingua:', error);
  }
}

// Funzione per caricare le traduzioni
async function loadTranslations(langCode) {
  const response = await fetch(`/translations/?lang=${langCode}`);
  const translations = await response.json();
  
  // Applica le traduzioni ai contenuti
  applyTranslations(translations);
}

// Funzione per applicare le traduzioni
function applyTranslations(translations) {
  Object.keys(translations).forEach((key) => {
    const elem = document.getElementById(key);
    if (elem) {
      elem.textContent = translations[key];
    }
  });
}

// Funzione per aggiornare il testo del dropdown
function updateDropdownText(langCode) {
  const dropdownText = langCode === 'it' ? 'Italiano' : langCode === 'kr' ? '한국어' : 'English';
  document.getElementById('selected-lang').textContent = dropdownText;

  // Evidenzia la lingua selezionata nel menu
  document.querySelectorAll('.dropdown-item').forEach((item) => {
    item.classList.toggle('active', item.textContent.trim() === dropdownText);
  });
}

// Gestione del cambio lingua tramite il menu
document.querySelectorAll('.dropdown-item').forEach((item) => {
  if (item) {
  item.addEventListener('click', async () => {
    const selectedLang = item.textContent.trim();
    const langCode = selectedLang === 'Italiano' ? 'it' : selectedLang === '한국어' ? 'kr' : 'en';
    await changeLanguage(langCode);
  });
}
});





