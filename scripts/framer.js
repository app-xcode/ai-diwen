document.addEventListener('click', function (e) {
    const form = document.querySelector(`form`);
    if (form) {
        const button = form.querySelector(`[type="submit"]`);
        const span = button.querySelector(`span`);
        const comment = form.querySelector(`#comment`);
        if (e.target && e.target.innerText == 'Kirim') {
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
    }
})
