const { initGridFS, getBucket } = require('../middleware/gridfsMiddleware');

// ✅ Upload File Controller
const uploadNote = async (req, res) => {
    try {
        initGridFS(); // Ensure GridFS is initialized
        const bucket = getBucket(); // Get the GridFSBucket instance

        if (!bucket) {
            return res.status(500).json({ error: "Storage service unavailable" });
        }

        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const { description } = req.body;
        if (!description) return res.status(400).json({ error: "Description is required" });

        // ✅ Upload file to GridFS
        const uploadStream = bucket.openUploadStream(req.file.originalname, {
            contentType: req.file.mimetype || "application/octet-stream",
            metadata: { description }
        });

        uploadStream.end(req.file.buffer);

        uploadStream.on("finish", () => {
            console.log(`✅ File uploaded: ${req.file.originalname}`);
            res.status(201).json({
                message: "File uploaded successfully",
                filename: req.file.originalname
            });
        });

        uploadStream.on("error", (err) => {
            console.error("❌ Upload error:", err);
            res.status(500).json({ error: "File upload failed" });
        });
    } catch (error) {
        console.error("❌ Upload error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Get All Files Controller
const getFiles = async (req, res) => {
    try {
        initGridFS();
        const bucket = getBucket();

        if (!bucket) {
            console.error("❌ GridFS Bucket is not initialized.");
            return res.status(500).json({ error: "Storage service unavailable" });
        }

        console.log("✅ GridFS Bucket initialized successfully.");

        // Query all files stored in GridFS
        const files = await bucket.find().toArray();

        if (!files || files.length === 0) {
            return res.status(404).json({ message: "No files found" });
        }

        // Format file details before sending response
        const fileDetails = files.map(file => ({
            filename: file.filename,
            uploadDate: file.uploadDate,
            metadata: file.metadata,
        }));

        res.status(200).json(fileDetails);
    } catch (error) {
        console.error("❌ Error fetching files:", error);
        res.status(500).json({ error: "Failed to fetch files" });
    }
};

// ✅ View File Controller (Stream File in Browser)
const viewFile = async (req, res) => {
    try {
        initGridFS();
        const bucket = getBucket();
        if (!bucket) {
            return res.status(500).json({ error: "Storage service unavailable" });
        }

        // Decode filename (handles spaces and special characters)
        const filename = decodeURIComponent(req.params.filename);

        const file = await bucket.find({ filename }).toArray();
        if (!file || file.length === 0) {
            return res.status(404).json({ error: "File not found" });
        }

        res.setHeader("Content-Type", file[0].contentType);
        bucket.openDownloadStream(file[0]._id).pipe(res);
    } catch (error) {
        console.error("❌ Error streaming file:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Download File Controller
const downloadFile = async (req, res) => {
    try {
        initGridFS();
        const bucket = getBucket();
        if (!bucket) {
            return res.status(500).json({ error: "Storage service unavailable" });
        }

        // Decode filename (fixes %20 issue)
        const filename = decodeURIComponent(req.params.filename);

        const file = await bucket.find({ filename }).toArray();
        if (!file || file.length === 0) {
            return res.status(404).json({ error: "File not found" });
        }

        res.setHeader("Content-Disposition", `attachment; filename="${file[0].filename}"`);
        res.setHeader("Content-Type", file[0].contentType);
        bucket.openDownloadStream(file[0]._id).pipe(res);
    } catch (error) {
        console.error("❌ Error downloading file:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};




// ✅ Delete File Controller
const deleteFile = async (req, res) => {
    try {
        const { filename } = req.params;

        initGridFS();
        const bucket = getBucket();

        if (!bucket) {
            console.error("❌ GridFS Bucket is not initialized.");
            return res.status(500).json({ error: "Storage service unavailable" });
        }

        // Find file by filename
        const file = await bucket.find({ filename }).toArray();

        if (!file || file.length === 0) {
            return res.status(404).json({ error: "File not found" });
        }

        // Delete the file from GridFS
        await bucket.delete(file[0]._id);

        console.log(`✅ File deleted: ${filename}`);
        res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
        console.error("❌ Delete error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { uploadNote, getFiles, viewFile, downloadFile, deleteFile };
