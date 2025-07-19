// add pino logger
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const logger = require('./utils/logger'); 

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => logger.info('✅ MongoDB connected'))
  .catch(err => logger.error('❌ MongoDB error:', err.message));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

module.exports = app;
