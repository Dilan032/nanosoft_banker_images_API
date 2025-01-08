const express = require('express');
require('dotenv').config();

const app = express();

// Middleware to handle JSON and URL-encoded requests
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Log if .env file isn't loaded
if (!process.env.PORT) {
  console.warn('⚠️  PORT not defined. Defaulting to 3000.');
}

const PORT = process.env.PORT || 3000;

// Routes
app.use('/', require('./route'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
