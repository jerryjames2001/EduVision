import axios from 'axios';
import dotenv from 'dotenv';
import { model } from 'mongoose';
dotenv.config();

const apiKey = process.env.OPENROUTER_API_KEY;  // Replace with your actual API key

export const testApiKey = async () => {
    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                // model: 'deepseek/deepseek-v3-base:free',
                model: 'deepseek/deepseek-chat-v3-0324:free',
                messages: [
                    { role: "system", content: "You are an AI that generates questions based on study material." },
                    { role: "user", content: "Generate a simple test response to check if my API key is working." }
                ],
                max_tokens: 50 // Reduced to a small value for quick testing
            },
            {
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("✅ API Key is working correctly!");
        console.log("Response:", JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error("❌ API Key Test Failed!");
        if (error.response) {
            console.error("Error Response:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error("Error Message:", error.message);
        }
    }
};

// Run the function to test API key
testApiKey();