const User = require('../models/User'); // Import the User model
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For authentication
require('dotenv').config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key'; // ✅ Set secret key

exports.login = async (req, res) => {
    try {
      console.log("Login request received:", req.body);
  
      const { username, password } = req.body;
  
      if (!username || !password) {
        console.log("Missing username or password");
        return res.status(400).json({ success: false, message: 'Username and password are required' });
      }
  
      const user = await User.findOne({ username });
      if (!user) {
        console.log("User not found:", username);
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Incorrect password for user:", username);
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
  
      // ✅ Use JWT_SECRET to sign the token
      const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  
      console.log("User logged in successfully:", username);
      res.json({ success: true, token, message: 'Login successful' });
  
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };