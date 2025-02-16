// API Configuration
const API_KEY = 'vifQFXwFMZG1oIsX0UTfKw';
let isGenerating = false;

// Main Generation Function
async function generateImage() {
    if (isGenerating) return;
    
    const promptInput = document.getElementById('prompt');
    const imageElement = document.getElementById('generatedImage');
    const button = document.querySelector('button');
    
    if (!promptInput.value.trim()) {
        alert("Please enter a prompt!");
        return;
    }

    try {
        // Set loading state
        isGenerating = true;
        button.disabled = true;
        button.textContent = "Generating...";
        imageElement.src = "";

        // Initiate generation request
        const generationResponse = await fetch('https://stablehorde.net/api/v2/generate/async', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': API_KEY
            },
            body: JSON.stringify({
                prompt: promptInput.value,
                params: {
                    width: 512,
                    height: 512,
                    steps: 30,
                    sampler_name: "k_euler",
                    cfg_scale: 7.5
                }
            })
        });

        if (!generationResponse.ok) throw new Error(API Error: ${generationResponse.status});
        
        const { id: requestId } = await generationResponse.json();
        const imageBase64 = await checkGenerationStatus(requestId);
        
        imageElement.src = data:image/png;base64,${imageBase64};
        
    } catch (error) {
        console.error("Generation Failed:", error);
        alert(Generation Failed: ${error.message});
    } finally {
        // Reset state
        isGenerating = false;
        button.disabled = false;
        button.textContent = "Generate Image";
    }
}

// Status Checking Function
async function checkGenerationStatus(requestId) {
    while (true) {
        const statusResponse = await fetch(https://stablehorde.net/api/v2/generate/check/${requestId});
        const statusData = await statusResponse.json();
        
        if (statusData.done) {
            const resultResponse = await fetch(https://stablehorde.net/api/v2/generate/status/${requestId});
            const { generations } = await resultResponse.json();
            return generations[0].img;
        }
        
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}

// Enter Key Support
document.getElementById('prompt').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') generateImage();
});
