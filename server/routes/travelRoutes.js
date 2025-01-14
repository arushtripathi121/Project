const express = require('express');
const router = express.Router();
const Travel = require('../models/Travel');

// Endpoint to add user preferences
router.post('/preferences', async (req, res) => {/*
    const { destination, budget, time, interests } = req.body;

    const travelData = new Travel({ destination, budget, time, interests });
    await travelData.save();*/
    res.status(200).json({ message: 'Preferences saved!' });
});

// Endpoint to get recommendations (dummy response for now)
router.get('/recommendations', async (req, res) => {
    res.status(200).json({
        message: 'Here are some recommendations!',
        recommendations: [
            { name: 'Beach Trip', cost: 500 },
            { name: 'Mountain Hike', cost: 300 }
        ]
    });
});

module.exports = router;
