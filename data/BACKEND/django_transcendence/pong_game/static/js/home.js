import { initializeSPA, setupNavigation } from './spa.js';

document.addEventListener('DOMContentLoaded', function() {
    setupNavigation('#btn-login');
    setupNavigation('#btn-signup');

    const loginButton = document.getElementById("submit-login");
    const loginForm = document.getElementById("login-form");

  // Set up event listener for the login button click
  if (loginButton) {
    loginButton.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent any default behavior of the button

      // Get user input (username and password)
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Validate input (optional)
      if (!username || !password) {
        console.error("Both username and password are required.");
        return;
      }

      // Send POST request to the login API endpoint
      fetch("/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]")
            .value, // CSRF token for security
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Login successful") {
            // Use the SPA's navigateTo function to load the profile page instead of reloading
            // navigateTo("/profile");
          } else {
            // Handle login failure (display error message)
            console.error("Login failed:", data.error);
            alert("Invalid username or password.");
          }
        })
        .catch((error) => {
          // Handle any errors during the request
          console.error("Error during login request:", error);
        });
    });
  }

    initializeSPA();
});
