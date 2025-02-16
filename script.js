<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Text to Image Generator</title>
    <style>
        /* Page styling */
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #0d1117;
            color: white;
            margin: 0;
            padding: 20px;
        }
        h1 {
            color: #58a6ff;
        }
        input {
            width: 80%;
            padding: 10px;
            font-size: 16px;
            margin: 10px 0;
        }
        button {
            padding: 10px 20px;
            font-size: 18px;
            background-color: #58a6ff;
            border: none;
            color: white;
            cursor: pointer;
        }
        button:hover {
            background-color: #1f6feb;
        }
        img {
            margin-top: 20px;
            max-width: 90%;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
        }
    </style>
</head>
<body>

    <h1>AI Text to Image Generator</h1>
    <p>Enter your text prompt below to generate an AI-powered image.</p>
    
    <input type="text" id="prompt" placeholder="Type your prompt here..." />
    <br>
    <button onclick="generateImage()">Generate Image</button>
    
    <p id="status"></p>
    <img id="generatedImage" src="" alt="Generated Image will appear here" />

    <script>
        async function generateImage() {
            const prompt = document.getElementById("prompt").value;

            if (prompt.trim() === "") {
                alert("Please enter a prompt!");
                return;
            }

            // Show loading text
            document.getElementById("status").innerText = "Generating image, please wait...";

            const apiUrl = "https://stablehorde.net/api/v2/generate/async";
            const apiKey = "vifQFXwFMZG1oIsX0UTfKw"; // Your API Key

            const requestData = {
                prompt: prompt,
                params: {
                    sampler_name: "k_euler_ancestral",
                    width: 512,
                    height: 512,
                    cfg_scale: 7,
                    steps: 30
                },
                nsfw: false,
                trusted_workers: true
            };

            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "apikey": apiKey
                    },
                    body: JSON.stringify(requestData)
                });

                const data = await response.json();

                if (data.id) {
                    setTimeout(() => fetchGeneratedImage(data.id), 5000);
                } else {
                    document.getElementById("status").innerText = "Failed to generate image. Try again!";
                }
            } catch (error) {
                console.error("Error:", error);
                document.getElementById("status").innerText = "Error in generating image!";
            }
        }

        async function fetchGeneratedImage(id) {
            const apiUrl = https://stablehorde.net/api/v2/generate/status/${id};
            const apiKey = "vifQFXwFMZG1oIsX0UTfKw";

            try {
                const response = await fetch(apiUrl, {
                    method: "GET",
                    headers: {
                        "apikey": apiKey
                    }
                });

                const data = await response.json();

                if (data.done) {
                    document.getElementById("generatedImage").src = data.generations[0].img;
                    document.getElementById("status").innerText = "Image generated successfully!";
                } else {
                    setTimeout(() => fetchGeneratedImage(id), 5000);
                }
            } catch (error) {
                console.error("Error:", error);
                document.getElementById("status").innerText = "Failed to fetch image!";
            }
        }
    </script>

</body>
</html>
