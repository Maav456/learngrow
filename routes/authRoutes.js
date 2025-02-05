const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Import only once

// Login route
router.post('/login', authController.login);

module.exports = router;
