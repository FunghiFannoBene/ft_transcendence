document.addEventListener("DOMContentLoaded", function () {
  function ball() {
    const ball = document.getElementById("pong-ball");
    let x = 0;
    let y = 0;
    let dx = 5;
    let dy = 5;
    const speed = 0.5;

    function animateBall() {
      x += dx;
      y += dy;

      if (x + ball.offsetWidth > window.innerWidth || x < 0) {
        dx = -dx;
      }
      if (y + ball.offsetHeight > window.innerHeight || y < 0) {
        dy = -dy;
      }

      ball.style.left = x + "px";
      ball.style.top = y + "px";

      requestAnimationFrame(animateBall);
    }
    animateBall();
  }
});

// document.addEventListener("DOMContentLoaded", ball);
