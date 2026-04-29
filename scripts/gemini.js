function kirim(prompt='') {
    prompt = prompt == '' ? document.getElementById('prompt').value : prompt;
    prompt = prompt.length > 0 ? prompt += `\n\nJawab secara singkat dalam bahasa Indonesia.` : prompt;
    fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": atob('Z3NrX0tUdUZZcmowWWhuMW9tbTdsSFhWV0dkeWIzRlk5dU9FY2RpR1VtYzJ1SEdaZ3lQSUM3WVo=')
        },
        body: JSON.stringify({
      model: "llama3-70b-8192",
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

