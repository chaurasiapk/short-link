import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import urlRoutes from './routes/url.routes';

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Define port and MongoDB URI from environment variables
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || '';

// Ensure MONGO_URI is provided
if (!MONGO_URI) {
  console.error('❌ FATAL ERROR: MONGO_URI is not defined.');
  process.exit(1); // Exit process if DB URI is missing
}

// Middleware to parse incoming requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (for form submissions)
app.use(express.json()); // Parse JSON payloads

// Set EJS as the view engine
app.set('view engine', 'ejs');
// Set the views directory path
app.set('views', path.join(__dirname, 'views'));

// Register application routes
app.use('/', urlRoutes);

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err);
    process.exit(1); // Exit process on DB connection failure
  });
