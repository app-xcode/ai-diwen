const mouth = document.getElementById('mouth');

// Mapping vokal ke ukuran mulut (rx, ry)
const mouthShapes = {
    'A': { rx: 14, ry: 10, more: ['H', 'K'] },
    'I': { rx: 12, ry: 5, more: ['Q'] },
    'U': { rx: 7, ry: 7 },
    'E': {
        rx: 13, ry: 7, more: [
            'B', 'C', 'D', 'F', 'G', 'J', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'
        ]
    },
    'O': { rx: 7, ry: 8 }
};

// Default mulut tertutup
const defaultMouth = { rx: 8, ry: 1 };
// Default mulut terbuka untuk huruf lain
const openMouth = { rx: 10, ry: 6 };

function setMouthShape(rx, ry) {
    mouth.setAttribute('rx', rx);
    mouth.setAttribute('ry', ry);
}

function resetMouth() {
    setMouthShape(defaultMouth.rx, defaultMouth.ry);
}

// String panjang yang ingin dianimasikan
var textToSpeak = "Halo, saya asisten virtual Anda. Bagaimana saya bisa membantu hari ini?";

// Fungsi animasi mulut sesuai string
let mouthAnimationTimeout = null;
let isPaused = false;
let utter = null;
let animIndex = 0; // posisi animasi terakhir

function animateMouthFromString(str, delay = 200, startIndex = 0) {
    let i = startIndex;
    function nextChar() {
        if (i >= str.length || isPaused) {
            animIndex = i; // simpan posisi terakhir
            return;
        }
        const key = str[i].toUpperCase();
        let found = false;
        let currentDelay = delay;

        if (str[i] === '.' || str[i] === ',') {
            resetMouth();
            currentDelay = 500;
        } else if (mouthShapes[key]) {
            const { rx, ry } = mouthShapes[key];
            setMouthShape(rx, ry);
            found = true;
        } else {
            for (const shapeKey in mouthShapes) {
                const shape = mouthShapes[shapeKey];
                if (shape.more && shape.more.includes(key)) {
                    setMouthShape(shape.rx, shape.ry);
                    found = true;
                    break;
                }
            }
        }
        if (!found && /^[A-Z]$/.test(key)) {
            setMouthShape(openMouth.rx, openMouth.ry);
        }
        if (!/[A-Z]/.test(key)) {
            resetMouth();
        }
        i++;
        animIndex = i; // update posisi terakhir
        mouthAnimationTimeout = setTimeout(nextChar, currentDelay);
    }
    nextChar();
}

function stopMouthAnimation() {
    clearTimeout(mouthAnimationTimeout);
    resetMouth();
}

document.getElementById('assistant-avatar').addEventListener('click', () => {
     if (!isPaused) {
        speechSynthesis.pause();
        stopMouthAnimation();
        isPaused = true;
    } else if (isPaused) {
        speechSynthesis.resume();
        isPaused = false;
        animateMouthFromString(textToSpeak, 50, animIndex);
    } else {
        // Reset semua jika status tidak jelas
        speechSynthesis.cancel();
        stopMouthAnimation();
        isPaused = false;
        animIndex = 0;
        console.log('belum');
    }
});

const read = () => {
    textToSpeak = document.getElementById('output').innerText || textToSpeak;
    if (!textToSpeak) {
        console.log('Tidak ada teks untuk diucapkan');
        return;
    }
    textToSpeak = stripMarkdown(textToSpeak); // Hapus markdown
    if (!utter || speechSynthesis.speaking === false) {
        utter = new SpeechSynthesisUtterance(textToSpeak);
        utter.lang = 'id-ID';
        utter.pitch = .1;   // Pitch tinggi (maksimal 2)
        const voices = window.speechSynthesis.getVoices();
        // Coba cari suara Google
        const indoVoice = voices.find(v => v.lang === 'id-ID' && v.name.includes('Google'));
        if (indoVoice) utter.voice = indoVoice;

        utter.onstart = () => {
            isPaused = false;
            animIndex = 0;
            animateMouthFromString(textToSpeak, 50, animIndex);
        };
        utter.onend = () => {
            stopMouthAnimation();
            isPaused = false;
            animIndex = 0;
        };

        window.speechSynthesis.speak(utter);
    }else{
        speechSynthesis.cancel();
        stopMouthAnimation();
        isPaused = false;
        animIndex = 0;
        read(); // Panggil ulang untuk membaca teks baru
    }
}

// window.addEventListener('click', read);

resetMouth();

function stripMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')           // **bold**
    .replace(/\*(.*?)\*/g, '$1')               // *italic* or bullet *
    .replace(/_(.*?)_/g, '$1')                 // _italic_
    .replace(/~~(.*?)~~/g, '$1')               // ~~strikethrough~~
    .replace(/`([^`]*)`/g, '$1')               // `inline code`
    .replace(/^> ?(.*)/gm, '$1')               // > blockquote
    .replace(/^#+\s?(.*)/gm, '$1')             // # headings
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1') // [text](link)
    .replace(/!\[.*?\]\(.*?\)/g, '')           // ![alt](image)
    .replace(/^-{3,}$/gm, '')                  // --- horizontal rule
    .replace(/^\s*[\*\-+]\s+/gm, '')           // list bullets
    .replace(/\n{2,}/g, '\n')                  // extra newlines
    .trim();
}

