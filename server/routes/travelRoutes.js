// routes/preferences.js
const express = require('express');
const { getResponse } = require('../utils/generative-ai.js'); // Import the getResponse function
const Travel = require('../models/Travel');

require('dotenv').config();

const router = express.Router();

// Add user preferences
router.post('/preferences', async (req, res) => {
    const { destination, budget, time, interests } = req.body;

    const travelData = new Travel({ destination, budget, time, interests });

    try {
        // Save user preferences to the database
        await travelData.save();
        res.status(200).json({ message: 'Preferences saved!' });
    } catch (error) {
        console.error('Error saving preferences:', error);
        res.status(500).json({ message: 'Error saving preferences.' });
    }
});

// Get recommendations based on the saved preferences
router.get('/recommendations', async (req, res) => {
    const { destination, budget, time } = req.query;

    if (!destination || !budget || !time) {
        return res.status(400).json({ message: 'Destination, budget, and time are required!' });
    }

    try {
        // Fetch user preferences from the database (if needed)
        const preferences = await Travel.find({ destination, budget, time });

        if (!preferences || preferences.length === 0) {
            return res.status(404).json({ message: 'No preferences found for the given criteria.' });
        }

        // Generate response using Google Generative AI
        const userPrompt = `I am looking for travel recommendations for ${destination} with a budget of ${budget} and travel time of ${time}.`;

        const aiResponse = await getResponse(userPrompt); // Get AI-generated recommendations

        // Process and return recommendations from the AI response
        res.status(200).json({
            message: 'Here are some recommendations!',
            recommendations: aiResponse,
        });
    } catch (error) {
        console.error('Error fetching from Google Generative AI:', error.message);
        res.status(500).json({ message: 'Error fetching recommendations from the Generative AI.' });
    }
});

module.exports = router;
