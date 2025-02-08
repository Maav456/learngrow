// ===============================
// ✅ Admin Login Handling
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('adminLoginForm');

  if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
          e.preventDefault();

          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;

          if (!username || !password) {
              document.getElementById('message').innerText = "Please enter both username and password.";
              return;
          }

          try {
              const response = await fetch('https://learngrow.onrender.com/api/auth/login', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ username, password }),
              });

              const result = await response.json();

              if (response.ok && result.success) {
                  localStorage.setItem('token', result.token);
                  window.location.href = '/admindashboard.html';
              } else {
                  document.getElementById('message').innerText = result.message;
              }
          } catch (error) {
              console.error('❌ Error during login:', error);
              document.getElementById('message').innerText = "An error occurred during login.";
          }
      });
  }

  // ✅ Load uploaded files on page load
  if (document.getElementById("uploadStatus")) {
      displayUploadedFiles();
  }

  // ✅ Load motivational quote on page load
  if (document.getElementById("quote")) {
      fetchQuote();
  }
});

// ===============================
// ✅ Fetch and Display Uploaded Files
// ===============================
async function displayUploadedFiles() {
  const uploadStatus = document.getElementById("uploadStatus");

  if (!uploadStatus) {
      console.error("❌ Upload status element not found.");
      return;
  }

  try {
      const response = await fetch("https://learngrow.onrender.com/api/notes/files");

      if (!response.ok) {
          throw new Error("Failed to fetch files");
      }

      const files = await response.json();

      if (files.length === 0) {
          uploadStatus.innerHTML = "<p>No files uploaded yet.</p>";
          return;
      }

      // ✅ Create a list of files to display with options to view & download
      const fileList = files.map(file => `
          <div>
              <strong>${file.filename}</strong> <br />
              Uploaded on: ${new Date(file.uploadDate).toLocaleString()} <br />
              Description: ${file.metadata.description || 'No description'} <br />
              <button onclick="viewFile('${file.filename}')">👀 View</button>
              <button onclick="downloadFile('${file.filename}')">⬇️ Download</button>
          </div>
          <hr />
      `).join("");

      uploadStatus.innerHTML = fileList;
  } catch (error) {
      console.error("❌ Error fetching files:", error);
      uploadStatus.innerHTML = `<p>❌ Error: ${error.message}</p>`;
  }
}

// ✅ Function to View a File in the Browser
function viewFile(filename) {
  window.open(`https://learngrow.onrender.com/api/notes/view/${encodeURIComponent(filename)}`, "_blank");
}

// ✅ Function to Download a File
function downloadFile(filename) {
  window.location.href = `https://learngrow.onrender.com/api/notes/download/${encodeURIComponent(filename)}`;
}

// ===============================
// ✅ Fetch Motivational Quote
// ===============================
// async function fetchQuote() {
//   try {
//       const response = await fetch("https://api.quotable.io/random");

//       if (!response.ok) {
//           throw new Error("Failed to fetch quote.");
//       }

//       const data = await response.json();
//       document.getElementById("quote").textContent = `"${data.content}"`;
//       document.getElementById("author").textContent = `- ${data.author}`;
//   } catch (error) {
//       console.error("❌ Error fetching quote:", error);
//       document.getElementById("quote").textContent = "Failed to load quote. Try again later!";
//       document.getElementById("author").textContent = "";
//   }
// }
