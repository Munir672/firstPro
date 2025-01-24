import express from "express";
import path from "node:path"; // For resolving file paths
import { fileURLToPath } from "url";

// Get the current directory for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

// Start the server and listen on the specified port.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Serve the "home.html" file at /pages/home
app.get("/pages/home", (req, res) => {
    res.sendFile(path.join(__dirname, "files", "home.html"));
});

// Serve the "mom.html" page at /pages/mom
app.get("/pages/mom", (req, res) => {
    res.sendFile(path.join(__dirname, "files", "mom.html"));
});

// Add a default route for home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "files", "home.html"));
});

// Serve static files (images, CSS, JS, etc.) from the "files" folder
app.use(express.static(path.join(__dirname, "files")));  // Serve static files from 'files'

// Handle 404 errors for any page not found
app.get('/*', (req, res) => {
    res.status(404).send(`Page not found`);
});
