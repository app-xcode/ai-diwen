const container = document.querySelector('div[data-hide-scrollbars="true"]');
const slides = container.querySelectorAll('img');

const delay = 1200;    // jeda antar slide
const step = 25;       // kecepatan scroll
const interval = 10;

let index = 0;
let timer;

function scrollTo(target) {
  clearInterval(timer);

  timer = setInterval(() => {
    const current = container.scrollTop;
    const distance = target - current;

    if (Math.abs(distance) <= step) {
      container.scrollTop = target;
      clearInterval(timer);
    } else {
      container.scrollTop += distance > 0 ? step : -step;
    }
  }, interval);
}

function start() {
  setInterval(() => {
    index++;
    if (index >= slides.length) {
      index = 0;
      container.scrollTop = 0;
    }

    const slideHeight = slides[0].getBoundingClientRect().height;
    const targetScroll = slideHeight * index;

    scrollTo(targetScroll);
  }, delay);
}

// pause saat hover
container.addEventListener("mouseenter", () => clearInterval(timer));
container.addEventListener("mouseleave", start);

start();
