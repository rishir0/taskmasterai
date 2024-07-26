// api.js

async function generateSummary(text) {
    const apiKey = "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";
    const modelEndpoint = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

    const response = await fetch(modelEndpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: text })
    });

    if (response.ok) {
        const result = await response.json();
        return result[0].summary_text; // Adjust based on actual API response structure
    } else {
        throw new Error('Error generating summary');
    }
}

// Example usage
generateSummary("Your long text here.")
    .then(summary => console.log(summary))
    .catch(error => console.error(error));
