import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

const huggingface_api = process.env.HUGGINGFACE_API_KEY; 

const client = new InferenceClient(huggingface_api); // Replace with your API key

export const summarizeNote = async (req, res) => {
    try {
        const { text } = req.body; // Extract text from request body
        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }

        // Call Hugging Face API for summarization
        const output = await client.summarization({
            model: "facebook/bart-large-cnn",
            inputs: text,
            provider: "hf-inference",
        });

        return res.json({ summary: output.summary_text });
        console.log("Summary:", output.summary_text); // Log the summary text
    } catch (error) {
        console.error("Summarization Error:", error);
        return res.status(500).json({ error: "Failed to summarize text" });
    }
};
