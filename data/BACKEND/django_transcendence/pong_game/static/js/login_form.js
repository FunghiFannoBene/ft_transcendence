console.log("🔑 login_form.js loaded");

async function loginRequest(username, password) {
    // URL dell'API
    const apiUrl = "http://localhost:8000/api/token/";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            // Se la risposta non è ok, lancia un errore
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        console.log("🔑 Token:", data);
    } catch (error) {
        console.error("Errore durante la richiesta di login:", error);
        return { success: false, error: error.message || "Errore di connessione" };
        
    }
}

async function handleLogin(event) {
    event.preventDefault(); // Previeni il comportamento predefinito del bottone
    console.log("📩 Submit login clicked");

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validazione degli input
    if (!username || !password) {
        console.error("Both username and password are required.");
        alert("Per favore, inserisci username e password.");
        return;
    }

    // Mostra un messaggio di caricamento mentre la richiesta è in corso
    const loadingMessage = document.getElementById("loading-message");
    if (loadingMessage) loadingMessage.style.display = "block"; // Mostra messaggio di caricamento

    try {
        // Chiamata alla funzione loginRequest
        const result = await loginRequest(username, password);

        if (result.success) {
            // Azioni dopo un login riuscito
            console.log("Login riuscito!");
            // Qui puoi fare una redirezione, per esempio:
            // navigateTo("/profile");
        } else {
            // Gestione dell'errore di login
            alert(result.error || "Errore sconosciuto durante il login.");
        }
    } catch (error) {
        // Gestisci eventuali errori in caso di fallimento nel loginRequest
        alert("Si è verificato un errore durante la connessione al server.");
    } finally {
        // Nascondi il messaggio di caricamento una volta completata la richiesta
        if (loadingMessage) loadingMessage.style.display = "none";
    }
}

function setupLoginForm() {
    const loginButton = document.getElementById("submit-login");

    if (loginButton) {
        loginButton.addEventListener("click", (event) => {
            event.preventDefault();  // Prevenire l'azione predefinita (invio del form)
            handleLogin(event);      // Gestire il login
        });
    } else {
        console.log("submit-login non trovato nel DOM");
    }   
}

function setupLoginForm7() {
    const loginButton = document.getElementById("submit-login");

    if (loginButton) {
        loginButton.addEventListener("click", (event) => {
            event.preventDefault();  // Prevenire l'azione predefinita (invio del form)
            handleLogin(event);      // Gestire il login
        });
    } else {
        console.log("submit-login non trovato nel DOM");
    }   
}

function setupLoginForm9() {
    const loginButton = document.getElementById("submit-login");

    if (loginButton) {
        loginButton.addEventListener("click", (event) => {
            event.preventDefault();  // Prevenire l'azione predefinita (invio del form)
            handleLogin(event);      // Gestire il login
        });
    } else {
        console.log("submit-login non trovato nel DOM");
    }   
}

setupLoginForm();
