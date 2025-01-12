import { initializeSPA, setupNavigation } from './spa.js';

document.addEventListener('DOMContentLoaded', function() {
    setupNavigation('.access-btn');
    initializeSPA();
});

// document.addEventListener("DOMContentLoaded", function () {
//   const loginButton = document.getElementById("login-btn");
//   const signupButton = document.getElementById("signup-btn");
//   // const csrftoken = getCookie("csrftoken");

//   loginButton.addEventListener("click", function (event) {
//     event.preventDefault();
//     const url = loginButton.getAttribute("data-url");
//     window.location.href = url;
//   });

//   signupButton.addEventListener("click", function (event) {
//     event.preventDefault();
//     const url = signupButton.getAttribute("data-url");
//     window.location.href = url;
//   });

  // document
  //   .getElementById("loginForm")
  //   .addEventListener("submit", function (event) {
  //     event.preventDefault();
  //     handleFormSubmit(event, "/api/login", csrftoken, "Login successful");
  //   });

  // document
  //   .getElementById("registerForm")
  //   .addEventListener("submit", function (event) {
  //     event.preventDefault();
  //     handleFormSubmit(event, "/api/register", csrftoken, "Signup successful");
  //   });
// });

// function getCookie(name) {
//   let cookieValue = null;
//   if (document.cookie && document.cookie !== "") {
//     const cookies = document.cookie.split(";");
//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i].trim();
//       if (cookie.substring(0, name.length + 1) === name + "=") {
//         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//         break;
//       }
//     }
//   }
//   return cookieValue;
// }

// async function handleFormSubmit(event, url, csrftoken, successMessage) {
//   const form = event.target;
//   const formData = new FormData(form);
//   const data = Object.fromEntries(formData.entries());

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-CSRFToken": csrftoken,
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error);
//     }

//     alert(successMessage + ": " + data.username);
//     if (url === "/api/login") {
//       localStorage.setItem("username", data.username);
//       displayGameModes();
//       new Chat(data.username);
//       renderGameProfile(data.username);
//     } else {
//       window.location.replace("//localhost:1024");
//     }
//   } catch (error) {
//     alert("Error: " + error.message);
//     form.reset();
//   }
// }

// // fix-me: used in transitionsInOut.js, not sure for what
// export async function LogoutNow() {
//   const csrftokenply = getCookie("csrftoken");
//   try {
//     const response = await fetch("/api/logout", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-CSRFToken": csrftokenply,
//       },
//       credentials: "include", // Include cookies, including CSRF cookies
//     });

//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }

//     if (response.status === 200) window.location.replace("//localhost:1024");
//   } catch (error) {
//     console.error("There has been a problem with your fetch operation:", error);
//   }
// }

// document.addEventListener("DOMContentLoaded", function () {
//   // Retrieve CSRF token from cookies
//   const csrftoken = getCookie("csrftoken");

//   // Log In
//   document
//     .getElementById("loginForm")
//     .addEventListener("submit", function (event) {
//       event.preventDefault(); // Prevent default form submission

//       const form = event.target;
//       const formData = new FormData(form);

//       // Extract data from form
//       const username = formData.get("username");
//       const password = formData.get("password");

//       localStorage.setItem("username", username);
//       // Perform AJAX request
//       fetch("/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRFToken": csrftoken, // Include CSRF token in headers
//         },
//         body: JSON.stringify({
//           username: username,
//           password: password,
//         }),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             return response.json().then((errorData) => {
//               throw new Error(errorData.error);
//             });
//           } else {
//             console.log("Login successful");
//             const username = formData.get("username");
//             displayGameModes();
//             new Chat(username);
//             renderGameProfile(username);
//           }
//         })
//         .catch((error) => {
//           setTimeout(function () {
//             alert("Error: wrong credentials, try again..");
//           }, 650);

//           event.target.reset();
//         });
//     });

//   // Sign Up
//   document
//     .getElementById("registerForm")
//     .addEventListener("submit", function (event) {
//       event.preventDefault(); // Prevent default form submission

//       const form = event.target;
//       const formData = new FormData(form);

//       const username = formData.get("username");
//       const password = formData.get("password");
//       const email = formData.get("email");

//       // Perform AJAX request
//       fetch("/api/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRFToken": csrftoken, // Include CSRF token in headers
//         },
//         body: JSON.stringify({
//           username: username,
//           email: email,
//           password: password,
//         }),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             return response.json().then((errorData) => {
//               throw new Error(errorData.error);
//             });
//           }
//           alert("Registration successful: " + username);
//           window.location.replace("//localhost:1024");
//         })
//         .catch((error) => {
//           alert("Error: " + error.message);
//         });
//     });
// });
