var playng = false;
var audiox = document.querySelectorAll(`#audio`);
audiox[0].onplay = function() {
    playng = true;
}
;
document.onclick = function() {
    if (!playng) {
        audiox[0].play();
    }
}
;
document.onmousemove = function() {
    if (!playng) {
        audiox[0].play();
    }
}
;
var klicks = false;
var al = 1;
let interval = setInterval( () => {
    const button = document.querySelector(`[type="submit"]`);
    if (button) {
        if (al > 3) {
            clearInterval(interval);
        }
        button.addEventListener(`click`, (e) => {
            e.preventDefault();
            const form = document.querySelector(`form`);
            const Nama = document.querySelector(`[name="Nama"]`);
            const Whatsapp = document.querySelector(`[name="Whatsapp"]`);
            const Kode = document.querySelector(`[name="Kode"]`);
            form.reportValidity();
            if (Nama.checkValidity() && Whatsapp.checkValidity() && !klicks) {
                if (Kode.value.trim() * 1 !== 20) {
                    Kode.setCustomValidity(`Kode salah! Tidak bisa kirim undangan.`);
                    Kode.reportValidity();
                    return;
                }
                // fetch(`https://ovan-carla.ct.ws/send.php`, {
                //     method: `POST`,
                //     headers: {
                //         "Content-Type": "application/json"
                //     },
                //     body: JSON.stringify({
                //         Nama: Nama.value,
                //         Whatsapp: `0` + Whatsapp.value.trim().replace(/^0|^\+62|^62|\+|\-| /g, ``),
                //         Kode: Kode.value
                //     })
                // });
                const encodedNama = btoa(Nama.value.trim()).replace(/=/g, ``)
                  , undanganUrl = `https://ovan-carla.ct.ws/${encodedNama}`
                  , nomor = `62` + Whatsapp.value.trim().replace(/^0|^\+62|^62|\+|\-| /g, ``)
                  , pesan = `Dear ${Nama.value.trim()},\n\nDengan segala hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan Mikron Stefanus Mba’u & Carla Nggeolima, S.H., yang akan diselenggarakan pada Sabtu, 21 Juni 2025 di Kupang, Nusa Tenggara Timur.\n\nMerupakan sukacita bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu bagi kedua mempelai.\n\nBerikut link undangannya:\n${undanganUrl}`;
                waLink = `https://api.Whatsapp.com/send?phone=${nomor}&text=${encodeURIComponent(pesan)}`;
                const a = document.createElement(`a`);
                a.href = waLink;
                a.target = `_blank`;
                a.click();
                klicks = true;
                Kode.value = ``;
            } else {
                klicks = false;
            }
        }
        );
        console.log(`Event listener dipasang ke tombol submit`);
        al++;
    }
}
, 300);

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
