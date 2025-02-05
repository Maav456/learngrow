document.addEventListener("DOMContentLoaded", () => {
    setupUploadForm();
    displayUploadedFiles(); // ✅ Load files on page load
});

// ✅ Function to handle file uploads
function setupUploadForm() {
    const uploadForm = document.getElementById("uploadForm");
    const uploadStatus = document.getElementById("uploadStatus");

    if (!uploadForm) {
        console.error("❌ Upload form not found.");
        return;
    }

    if (!uploadStatus) {
        console.error("❌ Upload status element not found.");
        return;
    }

    uploadForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        // ✅ Get form elements
        const description = document.getElementById("description").value.trim();
        const fileInput = document.getElementById("note");

        // ✅ Validation: Ensure required fields are filled
        if (!description || !fileInput.files.length) {
            alert("❌ Please fill in all fields and select a file.");
            return;
        }

        const file = fileInput.files[0];

        // ✅ Check file size (max 50MB)
        const maxSize = 50 * 1024 * 1024; // 50 MB
        if (file.size > maxSize) {
            alert("❌ File is too large. Max size is 50 MB.");
            return;
        }

        // ✅ Prepare FormData object
        const formData = new FormData();
        formData.append("description", description); // User input description
        formData.append("note", file); // File selected for upload

        try {
            // ✅ Send request to backend
            const response = await fetch("/api/notes/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Upload failed");
            }

            // ✅ Display success message & uploaded file
            alert("✅ Upload successful!");
            uploadStatus.innerHTML = `<p>✅ File Uploaded: <strong>${result.filename}</strong></p>`;

            uploadForm.reset(); // ✅ Clear form only on success
            displayUploadedFiles(); // ✅ Refresh file list after upload
        } catch (error) {
            console.error("❌ Upload error:", error);
            alert("❌ Upload failed: " + error.message);
        }
    });
}

// ✅ Function to fetch and display uploaded files
async function displayUploadedFiles() {
    const uploadStatus = document.getElementById("uploadStatus"); // Assuming you have a div for status
    if (!uploadStatus) {
        console.error("❌ Upload status element not found.");
        return;
    }

    try {
        // Send GET request to fetch the list of files
        const response = await fetch("/api/notes/files");

        // Check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to fetch files");
        }

        // Parse the JSON response
        const files = await response.json();

        // If there are no files, display a message
        if (files.length === 0) {
            uploadStatus.innerHTML = "<p>No files uploaded yet.</p>";
            return;
        }

        // Create a list of files to display with options to view, download, and delete
        const fileList = files.map(file => {
            return `
                <div>
                    <strong>${file.filename}</strong> <br />
                    Uploaded on: ${new Date(file.uploadDate).toLocaleString()} <br />
                    Description: ${file.metadata.description || 'No description'} <br />
                    <button onclick="viewFile('${file.filename}')">👀 View</button>
                    <button onclick="downloadFile('${file.filename}')">⬇️ Download</button>
                    <button onclick="deleteFile('${file.filename}')">❌ Delete</button>
                </div>
                <hr />
            `;
        }).join("");

        // Insert the file list into the uploadStatus element
        uploadStatus.innerHTML = fileList;
    } catch (error) {
        console.error("❌ Error fetching files:", error);
        uploadStatus.innerHTML = `<p>❌ Error: ${error.message}</p>`;
    }
}

// ✅ Function to view a file in the browser
// ✅ Function to view a file in the browser
function viewFile(filename) {
    window.open(`/api/notes/view/${encodeURIComponent(filename)}`, "_blank");
}

// ✅ Function to download a file
function downloadFile(filename) {
    window.location.href = `/api/notes/download/${encodeURIComponent(filename)}`;
}

// ✅ Function to delete a file
async function deleteFile(filename) {
    if (!confirm(`Are you sure you want to delete "${filename}"?`)) return;

    try {
        const response = await fetch(`/api/notes/delete/${filename}`, {
            method: "DELETE",
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Failed to delete file");
        }

        alert("✅ File deleted successfully!");
        displayUploadedFiles(); // ✅ Refresh file list after delete
    } catch (error) {
        console.error("❌ Delete error:", error);
        alert("❌ Failed to delete file: " + error.message);
    }
}
