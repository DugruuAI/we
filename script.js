const API_KEY = 'vifQFXwFMZG1oIsX0UTfKw';
let isGenerating = false;

async function generateImage() {
    if (isGenerating) return;
    
    const prompt = document.getElementById('prompt').value.trim();
    const imageElement = document.getElementById('generatedImage');
    const button = document.querySelector('button');
    
    if (!prompt) {
        alert("कृपया कोई टेक्स्ट डालें!");
        return;
    }

    try {
        // Loading state शुरू करें
        isGenerating = true;
        button.disabled = true;
        button.innerText = "Generating...";
        imageElement.src = "";
        
        // API Request भेजें
        const generationResponse = await fetch('https://stablehorde.net/api/v2/generate/async', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': API_KEY
            },
            body: JSON.stringify({
                prompt: prompt,
                params: {
                    width: 512,
                    height: 512,
                    steps: 30,
                    sampler_name: "k_euler",
                    cfg_scale: 7.5,
                    n: 1
                }
            })
        });

        const generationData = await generationResponse.json();
        const requestId = generationData.id;
        
        // Image status check करें
        const imageData = await checkStatus(requestId);
        imageElement.src = data:image/png;base64,${imageData};
        
    } catch (error) {
        console.error("Generation Error:", error);
        alert(Error: ${error.message});
    } finally {
        // Loading state बंद करें
        isGenerating = false;
        button.disabled = false;
        button.innerText = "Generate Image";
    }
}

async function checkStatus(requestId) {
    while (true) {
        const statusResponse = await fetch(https://stablehorde.net/api/v2/generate/check/${requestId});
        const statusData = await statusResponse.json();
        
        if (statusData.done) {
            const resultResponse = await fetch(https://stablehorde.net/api/v2/generate/status/${requestId});
            const resultData = await resultResponse.json();
            return resultData.generations[0].img;
        }
        
        // हर 5 सेकंड में status check करें
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}

// Enter key support
document.getElementById('prompt').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        generateImage();
    }
});
