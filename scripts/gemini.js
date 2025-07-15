function kirim(prompt='') {
    prompt = prompt == '' ? document.getElementById('prompt').value : prompt;
    prompt = prompt.length > 0 ? prompt += `\n\nJawab secara singkat dalam bahasa Indonesia.` : prompt;
    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": "AIzaSyBg_91lvkrv2bxAYwxMbG5TDd5i72aWuos"
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    })
        .then(res => res.json())
        .then(data => {
            const jawab = data.candidates?.[0]?.content?.parts?.[0]?.text || "Tidak ada jawaban.";
            const html = marked.parse(jawab);
            document.getElementById("output").innerHTML = html;
            read();
        })
        .catch(err => {
            console.error(err);
            document.getElementById("output").innerText = "Terjadi kesalahan.";
        });
}