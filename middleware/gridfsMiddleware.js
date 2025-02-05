const mongoose = require('mongoose');

let bucket = null; // Ensure bucket is explicitly set to null at the start

const initGridFS = () => {
    const db = mongoose.connection;

    if (!bucket) {
        console.log("✅ Initializing GridFSBucket...");
        bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'uploads' });
    }
};

// ✅ Function to always return the latest GridFS bucket instance
const getBucket = () => {
    if (!bucket) {
        console.error("❌ GridFS Bucket is not initialized. Call initGridFS() first.");
    }
    return bucket;
};

module.exports = { initGridFS, getBucket };
