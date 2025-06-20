require('dotenv').config(); // Load env variables
const express = require('express');
const cors = require('cors');
const path = require("path");
const connectDB = require('./config/db');

// Route Imports
const visionRoutes = require('./routes/visionRoutes');
const activityRoutes = require('./routes/activityRoutes');
const reflectionRoutes = require('./routes/reflectionRoutes');
const emotionRoutes = require('./routes/emotionRoutes');
const authRoutes = require('./routes/authRoutes');
const affirmationRoutes = require("./routes/affirmationRoutes");

// Connect DB
connectDB();

// Init app
const app = express();

// CORS config
app.use(cors({
  origin: "*", 
  credentials: true,
}));


// Middleware
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/vision', visionRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/reflections', reflectionRoutes);
app.use('/api/emotions', emotionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/affirmations', affirmationRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('MindBloom Backend is live 🌿');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
