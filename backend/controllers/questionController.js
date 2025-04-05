import axios from 'axios';
import dotenv from 'dotenv';
import { model } from 'mongoose';

dotenv.config();

const apiKey = process.env.OPENROUTER_API_KEY;

export const generateQuestion = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                // model: 'deepseek/deepseek-chat-v3-0324:free',  // lag issues
                model: 'meta-llama/llama-3.2-11b-vision-instruct:free',
                messages: [
                    {
                        role: "system",
                        content: "You are an AI tutor that helps generate exam questions from student notes.",
                    },
                    {
                        role: "user",
                        content: `You are a question generation AI. 
                      Your job is to ONLY generate 5 simple and clear questions from the following notes. 
                      The format should strictly be:
                      1. ...
                      2. ...
                      3. ...
                      4. ...
                      5. ...
                      Do not include the original text. Do not summarize anything. 
                      ONLY output 5 numbered questions based on the content below:\n\n${text}`
                      }
                      
                ],
                max_tokens: 300
            },
            {
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const aiResponse = response.data.choices[0].message.content;
        const questions = aiResponse.match(/\d+\.\s+.*?\?/g) || [];             
        return res.status(200).json({ questions });
        
    } catch (error) {
        console.error("Generation Error:", error);

        if (error.response) {
            console.error("OpenRouter Error Response:", error.response.data);
            return res.status(500).json({ error: "AI API error", details: error.response.data });
        } else {
            return res.status(500).json({ error: "Failed to generate questions" });
        }
    }
};
