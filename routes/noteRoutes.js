// routes/fileRoutes.js
const express = require('express');
const multer = require('multer');
const { uploadNote, getFiles, viewFile, downloadFile, deleteFile } = require('../controllers/noteController');

const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory before uploading

const router = express.Router();

// POST request to upload file
router.post('/upload', upload.single('note'), uploadNote);

// GET request to view all uploaded files
router.get('/files', getFiles);
router.get("/view/:filename", viewFile);


// GET request to download a specific file by filename
router.get('/download/:filename', downloadFile);

// DELETE request to delete a file by filename
router.delete('/delete/:filename', deleteFile);

module.exports = router;
