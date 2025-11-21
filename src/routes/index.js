const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// API info endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Notes Copilot API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      // Add your endpoints here as you create them
      // notes: '/api/notes',
      // audio: '/api/audio',
    },
  });
});

// Import and use route modules here
// router.use('/notes', require('./notes'));
// router.use('/audio', require('./audio'));

module.exports = router;

