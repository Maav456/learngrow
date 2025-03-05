# LearnGrow - Educational Platform

## Overview
**LearnGrow** is a web application designed to help students access and manage educational resources efficiently. It provides a centralized platform for storing and displaying notes in PDF and image formats for Class 10 subjects. The platform includes an admin panel for easy content management.

## Features
- **User-Friendly Navigation Panel** for subjects:
  - Compulsory Math
  - English
  - Optional Math
  - Nepali
  - Science
- **Admin Panel** to upload and manage PDFs
- **Secure Authentication System**
- **Responsive UI with Dark Mode Support**
- **Fast Search & Filtering for Notes**
- **Optimized for SEO to Rank on Google**

## Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **File Storage:** Cloudinary / Local Storage

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (>=16.x)
- MongoDB
- Git

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/learngrow.git
   cd learngrow
   ```
2. Install dependencies for both frontend and backend:
   ```sh
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. Set up environment variables (`.env` files for both frontend and backend):
   - Backend `.env` file:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
   - Frontend `.env` file:
     ```
     REACT_APP_BACKEND_URL=http://localhost:5000
     ```
4. Run the application:
   - Start backend:
     ```sh
     cd backend
     npm run dev
     ```
   - Start frontend:
     ```sh
     cd frontend
     npm start
     ```

## Usage
1. **Students** can browse and download notes.
2. **Admin** can upload and manage resources.
3. **Users** can search for specific topics easily.

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-branch`
3. Commit changes: `git commit -m "Add new feature"`
4. Push to branch: `git push origin feature-branch`
5. Open a Pull Request.

## License
This project is licensed under the MIT License.

## Contact
For inquiries or support, email: **support@learngrow.com**

