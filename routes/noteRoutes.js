// routes/fileRoutes.js
const express = require('express');
const multer = require('multer');
const { uploadNote, getFiles, viewFile, downloadFile, deleteFile } = require('../controllers/noteController');

const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory before uploading

const router = express.Router();

// POST request to upload file
router.post('https://learngrow.onrender.com/upload', upload.single('note'), uploadNote);

// GET request to view all uploaded files
router.get('https://learngrow.onrender.com/files', getFiles);
router.get("https://learngrow.onrender.com/view/:filename", viewFile);


// GET request to download a specific file by filename
router.get('https://learngrow.onrender.com/download/:filename', downloadFile);

// DELETE request to delete a file by filename
router.delete('https://learngrow.onrender.com/delete/:filename', deleteFile);

module.exports = router;
