const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory before saving to MongoDB
const upload = multer({ storage });

module.exports = upload;
