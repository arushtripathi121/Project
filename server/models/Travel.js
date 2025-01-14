const mongoose = require('mongoose');

const TravelSchema = new mongoose.Schema({
    destination: { type: String, required: true },
    budget: { type: Number, required: true },
    time: { type: String, required: true },
    interests: [String]
});

module.exports = mongoose.model('Travel', TravelSchema);
