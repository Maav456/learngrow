// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const bodyParser = require('body-parser');
// const cors = require('cors');



// const app = express();

// // Set up storage for uploaded files
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     },
// });

// const upload = multer({ storage: storage });

// // Endpoint to handle file uploads
// app.post('/upload', upload.single('note'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }

//     // Generate a URL for the uploaded file
//     const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
//     // Respond with the file URL
//     res.json({ fileUrl });
// });

// // Serve static files
// app.use(express.static('public'));
// app.use(express.static('public/admin'));
// // Serve static files from the uploads directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// // Optional: Define a route to serve the adminlogin.html file directly
// // app.get('/adminlogin', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'G:/Projects/webNotes/public/admin/adminlogin.html'));
// // });

// // Endpoint to upload notes
// app.post('/upload', upload.single('note'), (req, res) => {
//     const { subject } = req.body;
//     if (!subject) {
//         return res.status(400).send('Subject is required');
//     }
//     res.send('File uploaded successfully');
// });

// // Endpoint to get notes
// app.get('/notes/:subject', (req, res) => {
//     const subject = req.params.subject;
//     fs.readdir('uploads/', (err, files) => {
//         if (err) return res.status(500).send('Error reading files');
//         const notes = files.filter(file => file.includes(subject));
//         res.json(notes);
//     });
// });

// // Serve uploaded files
// app.get('/uploads/:filename', (req, res) => {
//     const filename = req.params.filename;
//     res.sendFile(path.join(__dirname, 'uploads', filename));
// });




// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static('public')); // Serve static files from the 'public' directory

// // Sample user data (in a real application, this would come from a database)
// const adminUser  = {
//     username: 'admin',
//     password: 'password123' // In a real application, passwords should be hashed
// };

// // Login endpoint
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     if (username === adminUser .username && password === adminUser .password) {
//         res.json({ success: true, message: 'Login successful!' });
//     } else {
//         res.json({ success: false, message: 'Invalid username or password.' });
//     }
// });

// mongoose.connect(process.env.MONGODB_URI, { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true 
//   })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

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
  useNewUrlParser: true,
  useUnifiedTopology: true
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
