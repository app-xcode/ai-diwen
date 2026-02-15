var playng = false;
var audiox = document.querySelectorAll(`#audio`);
audiox[0].onplay = function () {
    this.muted = false;
    playng = true;

}
document.onclick = function () {
    if (!playng) {
        audiox[0].play();
    }
}
    ;
// document.onmousemove = function () {
//     if (!playng) {
//         audiox[0].play();
//     }
// }
//     ;
var klicks = false;
var al = 1;


window.onload = function () {

    const container = document.createElement("x");
    container.className = "et";
    for (let i = 1; i <= 50; i++) {
        const child = document.createElement("x");
        child.setAttribute("id", i);
        child.setAttribute("bet", "");
        const inner = document.createElement("x");
        inner.setAttribute("b", "");
        child.appendChild(inner);
        container.appendChild(child);
    }
    document.body.appendChild(container);
     if (!playng) {
        audiox[0].play();
    }
}
document.addEventListener("gesturestart", function (e) {
    e.preventDefault();
});

let idleTime = 0;
let idleLimit = 7;
let idleTimer;
var kembali = ['https://www.framer.com/', 'https://maps.app.goo.gl/UmkWcWSCSXUnrSEe6', 'https://maps.app.goo.gl/7JUbLhkWwVFKpyBNA', 'maps.app.goo.gl/nikbpob4jHevVZmA6'], hitung = 0;

function resetIdleTimer() {
    document.querySelectorAll('link[rel="icon"]').forEach(i => { if (i.href.includes('v1.png')) { i.remove() } });
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        setTimeout(resetIdleTimer, idleLimit * 1000);
    }, idleLimit * 1000);
}

// event yang dianggap user aktif
["mousemove", "keydown", "mousedown", "touchstart", "scroll", "click", "gesturestart"].forEach(evt => {
    window.addEventListener(evt, resetIdleTimer, false);
});

// mulai timer pertama kali
resetIdleTimer();
