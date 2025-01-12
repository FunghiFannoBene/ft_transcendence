document.addEventListener("DOMContentLoaded", function () {
  fadeInElement("content-container", 500, 1);
  fadeInElementWithClass("pong-sign", 700, "active");
  fadeInElementWithClass("prompt-sign", 1300, "active");
  fadeInElement("btn-start", 1700, 1);
  fadeInElement("background-video", 1700, 0.3);
  fadeInElementWithClass("content-container", 2300, "active");
  fadeInElement("change-lang", 2300, 1);
});

// fade in an element by changing its opacity
function fadeInElement(elementId, delay, targetOpacity) {
  const element = document.getElementById(elementId);
  if (element) {
    setTimeout(function () {
      element.style.opacity = targetOpacity;
    }, delay);
  }
}

// fade in an element by adding a class
function fadeInElementWithClass(elementId, delay, className) {
  const element = document.getElementById(elementId);
  if (element) {
    setTimeout(function () {
      element.classList.add(className);
    }, delay);
  }
}

// FIXME: longer in the og file! go check what's missing when you're good
