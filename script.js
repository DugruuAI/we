function generateImage() {
    let prompt = document.getElementById("prompt").value;
    
    if (prompt.trim() === "") {
        alert("Please enter a prompt!");
        return;
    }

    // Free API Ka Use Karke Image Generate Karna
    let apiUrl = https://api.deepai.org/api/text2img;

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Api-Key": "your-free-api-key-here"
        },
        body: new URLSearchParams({
            "text": prompt
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("generatedImage").src = data.output_url;
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to generate image. Try again later!");
    });
}
