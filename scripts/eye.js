const eyeLeft = document.getElementById('eyelid-left');
const eyeRight = document.getElementById('eyelid-right');
const avatar = document.getElementById('assistant-avatar');
const eyelidLeft = document.getElementById('eyelid-left');
const eyelidRight = document.getElementById('eyelid-right');

document.addEventListener('mousemove', (e) => {
    const avatarRect = avatar.getBoundingClientRect();
    // Pusat SVG
    const center = {
        x: avatarRect.left + avatarRect.width / 2,
        y: avatarRect.top + avatarRect.height / 2
    };

    // Mata
    const leftOrigin = { x: avatarRect.left + 30, y: avatarRect.top + 35 };
    const rightOrigin = { x: avatarRect.left + 50, y: avatarRect.top + 35 };
    const maxMove = 2.5;

    function calcOffset(origin) {
        const dx = e.clientX - origin.x;
        const dy = e.clientY - origin.y;
        const angle = Math.atan2(dy, dx);
        return {
            x: Math.cos(angle) * maxMove,
            y: Math.sin(angle) * maxMove
        };
    }

    const leftOffset = calcOffset(leftOrigin);
    const rightOffset = calcOffset(rightOrigin);

    eyeLeft.setAttribute('cx', 30 + leftOffset.x);
    eyeLeft.setAttribute('cy', 35 + leftOffset.y);
    eyeRight.setAttribute('cx', 50 + rightOffset.x);
    eyeRight.setAttribute('cy', 35 + rightOffset.y);

    // Badan bergerak (sedikit translate & rotate)
    const dx = e.clientX - center.x;
    const dy = e.clientY - center.y;
    const maxTranslate = 6; // px
    const maxRotate = 8; // deg

    // Normalisasi
    const tx = Math.max(-maxTranslate, Math.min(maxTranslate, dx / 30));
    const ty = Math.max(-maxTranslate, Math.min(maxTranslate, dy / 30));
    const rot = Math.max(-maxRotate, Math.min(maxRotate, dx / 20));

    avatar.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
});

function blink() {
    // Tutup kelopak (kedip)
    eyelidLeft.setAttribute('ry', .3);
    eyelidRight.setAttribute('ry', .3);
    setTimeout(() => {
        // Buka kelopak
        eyelidLeft.setAttribute('ry', 5);
        eyelidRight.setAttribute('ry', 5);
    }, 120); // durasi kedip
}

// Mulai dengan kelopak terbuka
eyelidLeft.setAttribute('ry', 5);
eyelidRight.setAttribute('ry', 5);

// Animasi kedip tiap 2-5 detik (acak)
setInterval(() => {
    blink();
}, Math.random() * 3000 + 2000);