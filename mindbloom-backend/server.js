require('dotenv').config(); // 👈 Load .env FIRST

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const visionRoutes = require('./routes/visionRoutes');
const activityRoutes = require('./routes/activityRoutes');
const reflectionRoutes = require('./routes/reflectionRoutes');
const emotionRoutes = require('./routes/emotionRoutes');
const authRoutes = require('./routes/authRoutes');

connectDB();               // ✅ Connect to MongoDB

const app = express();     // ✅ Initialize express BEFORE using it

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/vision', visionRoutes);
app.use('/api/activities', activityRoutes); 
app.use('/api/reflections', reflectionRoutes);
app.use('/api/emotions', emotionRoutes);
app.use('/api/auth', authRoutes);



// Example test route
app.get('/', (req, res) => {
  res.send('MindBloom Backend Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
