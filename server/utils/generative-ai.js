// utils/generative-ai.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

let chatHistory = [];

exports.getResponse = async (userPrompt) => {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_API_KEY); // Initialize Google Generative AI with API key
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Use the specific AI model (gemini-1.5-flash)

    chatHistory.push({ role: 'user', content: userPrompt }); // Add user prompt to the chat history
    const context = chatHistory.map(entry => `${entry.role}: ${entry.content}`).join('\n'); // Build the context for the model

    try {
        // Generate response from the AI model
        const result = await model.generateContent(context);
        const aiResponse = result.response.text(); // Extract the text of the response

        chatHistory.push({ role: 'assistant', content: aiResponse }); // Add AI response to the chat history

        return aiResponse; // Return the generated response
    } catch (error) {
        console.error('Error in Generative AI response:', error.message);
        throw new Error('Error generating AI response.');
    }
};
