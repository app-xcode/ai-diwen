const container = document.querySelector('div[data-hide-scrollbars="true"]');
const images = container.querySelectorAll('img');

const delay = 1500;     // jeda antar slide (ms)
const step = 20;        // kecepatan animasi (px)
const interval = 10;    // interval animasi (ms)

let index = 0;
let animating = false;

function scrollToSlide(i) {
  animating = true;
  const target = images[i].offsetTop;

  const timer = setInterval(() => {
    const current = container.scrollTop;
    const distance = target - current;

    if (Math.abs(distance) <= step) {
      container.scrollTop = target;
      clearInterval(timer);
      animating = false;
    } else {
      container.scrollTop += distance > 0 ? step : -step;
    }
  }, interval);
}

function startAutoScroll() {
  setTimeout(function next() {
    if (!animating) {
      index++;
      if (index >= images.length) {
        index = 0;
        container.scrollTop = 0;
      }
      scrollToSlide(index);
    }
    setTimeout(next, delay);
  }, delay);
}

// pause saat hover
container.addEventListener("mouseover", () => animating = true);
container.addEventListener("mouseleave", () => animating = false);

startAutoScroll();
