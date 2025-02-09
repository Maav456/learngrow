
const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const { gfs, bucket } = require("./middleware/gridfsMiddleware");

require('dotenv').config();

const app = express();



// ✅ Connect to MongoDB with recommended options


const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
})
.then(() => {
  console.log('Connected to MongoDB');
  // ... your application logic
})
.catch((err) => {
  console.error('MongoDB connection error:', err); // Log the full error object
});

// ✅ Middleware
app.use(cors({
  origin: "https://learngrow.onrender.com",  // Update with actual frontend URL
  credentials: true, // Allow cookies if needed
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // Added for form handling
app.use(express.static('public'));

// ✅ API Routes
app.use('https://learngrow.onrender.com/api/auth', authRoutes);
app.use('https://learngrow.onrender.com/api/notes', noteRoutes);


app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${port}`);
});

