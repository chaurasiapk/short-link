import express from "express";
import path from "path";
import cors from "cors";

import urlRoutes from "./routes/url.routes";

// Initialize Express application
const app = express();

// ─────────────────────────────────────
// Middleware Configuration
// ─────────────────────────────────────

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse URL-encoded form data (e.g., from HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse incoming JSON requests
app.use(express.json());

// ─────────────────────────────────────
// View Engine Setup
// ─────────────────────────────────────

// Set EJS as the templating/view engine
app.set("view engine", "ejs");

// Set the directory where view templates are located
app.set("views", path.join(__dirname, "views"));

// ─────────────────────────────────────
// Route Handling
// ─────────────────────────────────────

// Mount all URL-related routes under root path
app.use("/", urlRoutes);

// Export the configured app
export { app };
