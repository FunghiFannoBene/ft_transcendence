async function checkAuth() {
    try {
        let response = await fetch("http://localhost:8000/check-auth/", {
            credentials: "include"
        });

        let data = await response.json();
        let authContainer = document.getElementById("auth-btn-container");

        if (data.authenticated) {
            console.log("Utente loggato!");
            authContainer.innerHTML = `
                <button id="logout-btn" class="btn btn-danger">Logout</button>
            `;

            document.getElementById("logout-btn").addEventListener("click", logout);
        } else {
            console.log("Utente non loggato!");
            authContainer.innerHTML = ""; // Nessun pulsante di login!
        }
    } catch (error) {
        console.error("Errore nel controllo autenticazione:", error);
    }
}

async function logout() {
    let response = await fetch("http://localhost:8000/logout/", {
        method: "POST",
        credentials: "include",
    });

    if (response.ok) {
        console.log("Logout riuscito!");
        checkAuth(); // 🔄 Aggiorna la barra senza ricaricare la pagina
        window.location.href = "/";
    } else {
        console.error("Errore nel logout:", response.status);
    }
}

// Esegui il controllo autenticazione quando la pagina viene caricata
document.addEventListener("DOMContentLoaded", checkAuth);
