async function checkAuth() {
    try {
        let response = await fetch("http://localhost:8000/check-auth/", {
            credentials: "include"
        });

        let data = await response.json();
        updateAuthButton(data.authenticated);
        updateGameButton(data.authenticated);

    } catch (error) {
        console.error("Errore nel controllo autenticazione:", error);
    }
}

function updateAuthButton(isAuthenticated) {
    let authContainer = document.getElementById("auth-btn-container");

    if (isAuthenticated) {
        console.log("Utente loggato!");
        authContainer.innerHTML = `<button id="logout-btn" class="btn btn-danger">Logout</button>`;
        document.getElementById("logout-btn").addEventListener("click", logout);
    } else {
        console.log("Utente non loggato!");
        authContainer.innerHTML = ""; // Nessun pulsante di login
    }
}

function updateGameButton(isAuthenticated) {
    let btnGroup = document.getElementById("btn-access-group");

    if (!btnGroup) {
       // console.error("Elemento con id 'btn-access-group' non trovato.");
        return;
    }
    if (!isAuthenticated) {
        console.log("Utente non loggato, mostro pulsante di login.");
        btnGroup.innerHTML = `<button class="btn btn-primary" id="btn-oauth" type="button">LOG IN WITH 42</button>`;
        const btnLogin = document.getElementById("btn-oauth");
        document.getElementById("btn-oauth").addEventListener("click", login(btnLogin));
    } else {
        btnGroup.innerHTML = `<button class="btn btn-success" id="btn-play" type="button">VAI AL PONG</button>`;
        document.getElementById("btn-play").addEventListener("click", function () {
            window.location.href = "/pong_game/";
        });
    }
}
