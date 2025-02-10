require('dotenv').config(); // ✅ Load environment variables first

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
const port = process.env.PORT || 5000; // ✅ Correct PORT handling

// ✅ MongoDB Connection
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase"; // Fallback for local dev

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ CORS Configuration
const allowedOrigins = [
  "https://learngrow.onrender.com", // Production frontend
  "http://localhost:3000" // Local frontend development
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// ✅ Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// ✅ Start Server
app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server listening on port ${port}`);
});
