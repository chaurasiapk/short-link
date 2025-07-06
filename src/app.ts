import express  from "express";
import path from "path";
import cors from "cors";

import urlRoutes from './routes/url.routes';

// Initialize Express application
const app = express();

// Middleware to parse incoming requests
app.use(cors())
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (for form submissions)
app.use(express.json()); // Parse JSON payloads

// Set EJS as the view engine
app.set('view engine', 'ejs');
// Set the views directory path
app.set('views', path.join(__dirname, 'views'));

// Register application routes
app.use('/', urlRoutes);

export { app }

