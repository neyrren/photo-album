const express = require('express');
const cors = require('cors');
require('dotenv').config();

const albumRoutes = require('./routes/albumRoutes');
const photoRoutes = require('./routes/photoRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// Routes
app.use('/api/albums', albumRoutes);
app.use('/api/photos', photoRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Server error' 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});