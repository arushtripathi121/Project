const mongoose = require('mongoose');

const TravelSchema = new mongoose.Schema({
    destination: String,
    budget: Number,
    time: String,
    interests: [String],
});

module.exports = mongoose.model('Travel', TravelSchema);
