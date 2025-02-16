// ✅ Image Generate करने वाला Function (Async Await का इस्तेमाल करके)
async function generateImage() {
    const prompt = document.getElementById("prompt").value;

    if (prompt.trim() === "") {
        alert("कृपया एक प्रॉम्प्ट दर्ज करें!");
        return;
    }

    const apiUrl = "https://stablehorde.net/api/v2/generate/async";
    const apiKey = "your-api-key-here"; // 🔹 अपनी API Key यहाँ डालें

    const requestData = {
        prompt: prompt,
        params: {
            sampler_name: "k_euler_ancestral",
            width: 512,
            height: 512,
            cfg_scale: 7,
            steps: 50
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
            console.log("✅ Image Generation Requested. Fetching Image...");
            setTimeout(() => fetchGeneratedImage(data.id), 5000);
        } else {
            alert("❌ इमेज जनरेट करने में समस्या हुई। कृपया पुनः प्रयास करें।");
        }
    } catch (error) {
        console.error("⚠️ त्रुटि:", error);
        alert("❌ इमेज जनरेट करने में विफल। बाद में पुनः प्रयास करें!");
    }
}

// ✅ Generated Image Fetch करने वाला Function (Corrected URL Format)
async function fetchGeneratedImage(id) {
    const apiUrl = https://stablehorde.net/api/v2/generate/status/${id};
    const apiKey = "your-api-key-here"; // 🔹 अपनी API Key यहाँ डालें

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
            console.log("✅ Image Fetched Successfully!");
        } else {
            console.log("⏳ Image अभी तैयार नहीं है, फिर से चेक कर रहे हैं...");
            setTimeout(() => fetchGeneratedImage(id), 5000);
        }
    } catch (error) {
        console.error("⚠️ त्रुटि:", error);
        alert("❌ इमेज प्राप्त करने में विफल। बाद में पुनः प्रयास करें!");
    }
}
