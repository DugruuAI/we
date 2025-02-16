

async function generateImage() {
    const prompt = document.getElementById("prompt").value;

    if (prompt.trim() === "") {
        alert("कृपया एक प्रॉम्प्ट दर्ज करें!");
        return;
    }

    const apiUrl = "https://stablehorde.net/api/v2/generate/async";
    const apiKey = "your-api-key-here"; // अपनी API Key यहाँ पेस्ट करें

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
            // इमेज जनरेशन प्रोसेसिंग है, कुछ समय बाद इमेज प्राप्त करें
            setTimeout(() => fetchGeneratedImage(data.id), 5000);
        } else {
            alert("इमेज जनरेट करने में समस्या हुई। कृपया पुनः प्रयास करें।");
        }
    } catch (error) {
        console.error("त्रुटि:", error);
        alert("इमेज जनरेट करने में विफल। बाद में पुनः प्रयास करें!");
    }
}

async function fetchGeneratedImage(id) {
    const apiUrl = https://stablehorde.net/api/v2/generate/status/${id};
    const apiKey = "vifQFXwFMZG1oIsX0UTfKw"; // अपनी API Key यहाँ पेस्ट करें

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
        } else {
            // यदि इमेज अभी तक तैयार नहीं है, कुछ समय बाद पुनः प्रयास करें
            setTimeout(() => fetchGeneratedImage(id), 5000);
        }
    } catch (error) {
        console.error("त्रुटि:", error);
        alert("इमेज प्राप्त करने में विफल। बाद में पुनः प्रयास करें!");
    }
}
