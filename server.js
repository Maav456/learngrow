
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
const port = process.env.PORT || 5000;

// ✅ Connect to MongoDB with recommended options
mongoose.connect(process.env.MONGODB_URI, {
});

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // Added for form handling
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);


app.listen(port, () => {
  console.log(`✅ Server listening on port ${port}`);
});
