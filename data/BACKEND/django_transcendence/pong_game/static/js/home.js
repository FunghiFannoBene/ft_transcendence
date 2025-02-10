console.log("home.js loaded");  // Debug

const oauthButton = document.getElementById("btn-oauth");

if (oauthButton) {
    oauthButton.addEventListener("click", async () => {
        console.log("Bottone cliccato!");  // Debug
        window.location.href = "http://localhost:8000/login/";
    });
} else {
    console.log("Il bottone con id 'btn-oauth' non è stato trovato.");
}

