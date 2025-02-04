
// const signupForm = document.getElementById("signup-form");

// signupForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const username = document.getElementById("signup-username").value;
//     const password = document.getElementById("signup-password").value;

//     const response = await fetch("http://localhost:8000/api/users/signup/", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//     });

//     const data = await response.json();
//     if (response.ok) {
//         alert("Signup completato con successo!");
//     } else {
//         alert(`Errore: ${data.error}`);
//     }
// });