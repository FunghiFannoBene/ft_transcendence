document.addEventListener("DOMContentLoaded", function () {
  function curtain() {
    const numberOfStrips = 5; // numer of strips to generate
    const curtainContainer = document.getElementById("curtain");
    if (!curtainContainer) {
      console.error("Element with ID 'curtain' not found");
      return;
    }

    console.log("Curtain container found, starting animation");
    // clear any existing content in the curtain container
    curtainContainer.innerHTML = '';

    for (let i = 0; i < numberOfStrips; i++) {
      const strip = document.createElement("div");
      strip.style.position = "fixed";
      strip.style.width = "0.2%"; // Width of the strip
      strip.style.height = "0"; // Start with the strip not visible
      strip.style.backgroundColor = "#fff"; // Color of the strip
      strip.style.top = "0";
      strip.style.left = `${10 * i}%`; // Horizontal positioning of each strip
      strip.style.transition = "height 2s ease-out"; // Animation
      curtainContainer.appendChild(strip);

      setTimeout(function () {
        strip.style.height = "100%"; // Expand the strip downward
      }, 800 + 100 * i); // Different delays can create a cascading effect
    }

    // Create strips on the other side of the screen
    for (let i = 0; i < numberOfStrips; i++) {
      const strip = document.createElement("div");
      strip.style.position = "fixed";
      strip.style.width = "0.2%"; // Width of the strip
      strip.style.height = "0"; // Start with the strip not visible
      strip.style.backgroundColor = "white"; // Color of the strip
      strip.style.top = "0";
      strip.style.right = `${10 * i}%`; // Horizontal positioning of each strip (right side)
      strip.style.transition = "height 2s ease-out"; // Animation
      curtainContainer.appendChild(strip);

      setTimeout(function () {
        strip.style.height = "100%"; // Expand the strip downward
      }, 800 + 100 * i); // Different delays can create a cascading effect
    }

    // Reduce strips from the top
    for (let i = 0; i < numberOfStrips; i++) {
      setTimeout(function () {
        curtainContainer.children[i].style.height = "0"; // Reduce the strip upward
      }, 2300 + 100 * i); // Different delays can create a cascading effect
    }

    // Reduce strips from the other side
    for (let i = 0; i < numberOfStrips; i++) {
      setTimeout(function () {
        curtainContainer.children[i + numberOfStrips].style.height = "0"; // Reduce the strip upward
      }, 2300 + 100 * i); // Different delays can create a cascading effect
    }
  }

  console.log("DOMContentLoaded event fired, calling curtain function");
  curtain();
});

// document.addEventListener("DOMContentLoaded", curtain);
