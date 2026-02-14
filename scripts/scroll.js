(function () {
  const container = document.querySelector(".auto-scroll-x");
  if (!container) return;

  let speed = 0.3; // atur kecepatan (0.1 – 0.5)
  let rafId;

  function loop() {
    container.scrollLeft += speed;

    // loop halus
    if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
      container.scrollLeft = 0;
    }

    rafId = requestAnimationFrame(loop);
  }

  rafId = requestAnimationFrame(loop);

  // optional: pause saat hover
  container.addEventListener("mouseenter", () => cancelAnimationFrame(rafId));
  container.addEventListener("mouseleave", () => rafId = requestAnimationFrame(loop));
})();
