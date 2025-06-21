require('dotenv').config();

const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(express.json());

// Route registration
app.use('/auth', authRoutes);

// Health-check endpoint
app.get('/health', (_, res) => {
    res.status(200).json({ status: 'ok' });
});

connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));

module.exports = app;