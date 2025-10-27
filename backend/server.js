const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/church_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// Basic root route to avoid "Cannot GET /"
app.get('/', (req, res) => {
  res.json({ 
    message: 'Every Nation Church Nairobi API Server',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      members: '/api/members',
      leaders: '/api/leaders',
      events: '/api/events',
      mission: '/api/mission',
      contact: '/api/contact'
    }
  });
});

// Import routes
const authRoutes = require('./routes/auth');
const memberRoutes = require('./routes/members');
const leaderRoutes = require('./routes/leaders');
const eventRoutes = require('./routes/events');
const missionRoutes = require('./routes/mission');
const contactRoutes = require('./routes/contact');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/leaders', leaderRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/mission', missionRoutes);
app.use('/api/contact', contactRoutes);

// Handle undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Server: http://localhost:${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/`);
});