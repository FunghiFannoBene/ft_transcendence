import { logout } from "./logout.js";

export async function checkAuth() {
    try {
        let response = await fetch("http://localhost:8000/check-auth/", {
            credentials: "include"
        });

        let data = await response.json();
        updateAuthButton(data.authenticated);
        // updateGameButton(data.authenticated);
        return data.authenticated;

    } catch (error) {
        console.error("Errore nel controllo autenticazione:", error);
    }
}

export function updateAuthButton(isAuthenticated) {
    let authContainer = document.getElementById("auth-btn-container");

    if (!authContainer) {
        console.error("Elemento con id 'auth-btn-container' non trovato.");
        return;
    }

    // Rimuovi eventuali event listener esistenti
    const existingButton = authContainer.querySelector("#logout-btn");
    if (existingButton) {
        existingButton.removeEventListener("click", logout);
    }

    if (isAuthenticated) {
        console.log("Utente loggato!");
        authContainer.innerHTML = `<button id="logout-btn" class="btn btn-primary btn-press">Logout</button>`;
        document.getElementById("logout-btn").addEventListener("click", logout);
    } else {
        console.log("Utente non loggato!");
        authContainer.innerHTML = ""; // Nessun pulsante di login
    }
}

// function updateGameButton(isAuthenticated) {
//     let btnGroup = document.getElementById("btn-access-group");

//     if (!btnGroup) {
//        // console.error("Elemento con id 'btn-access-group' non trovato.");
//         return;
//     }
//     if (!isAuthenticated) {
//         console.log("Utente non loggato, mostro pulsante di login.");
//         btnGroup.innerHTML = `<button class="btn btn-primary btn-press" id="btn-oauth" type="button">LOG IN WITH 42</button>`;
//         const btnLogin = document.getElementById("btn-oauth");
//         document.getElementById("btn-oauth").addEventListener("click", login(btnLogin));
//     } else {
//         btnGroup.innerHTML = `<button class="btn btn-success" id="btn-play" type="button">VAI AL PONG</button>`;
//         document.getElementById("btn-play").addEventListener("click", function () {
//             window.location.href = "/pong_game/";
//         });
//     }
// }
