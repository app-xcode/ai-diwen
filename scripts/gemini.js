function kirim(prompt='') {
    prompt = prompt == '' ? document.getElementById('prompt').value : prompt;
    prompt = prompt.length > 0 ? prompt += `\n\nJawab secara singkat dalam bahasa Indonesia.` : prompt;
    fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7
    })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
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

