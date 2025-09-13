document.addEventListener('click', function (e) {
    if (form) {
        const button = form.querySelector(`[type="submit"]`);
        const span = button.querySelector(`span`);
        const comment = form.querySelector(`#comment`);
        const name = form.querySelector(`#name`);
    }
    if (e.target && e.target.innerText == 'Kirim') {
        const form = document.querySelector(`form`);
        if (comment) {
            span.textContent = 'Batal';
        }
    }
    else if (e.target && e.target.innerText == 'Batal') {
        if (comment) {
            form.reset();
            span.textContent = 'Kirim';
        }
    }
})
