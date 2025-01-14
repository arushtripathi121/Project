const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const travelRoutes = require('./routes/travelRoutes');  // This is where the preferences-related routes are defined

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());  // To parse JSON requests

// Routes
app.use('/api/travel', travelRoutes); // Travel preferences route

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
