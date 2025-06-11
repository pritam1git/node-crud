const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const path = require('path');
require('dotenv').config();
require('./config/db');

app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

