import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import urlRoutes from './routes/url.routes';

// Load environment variables from .env file
dotenv.config();

const app = express();

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


app.use(express.json());
app.use("/", urlRoutes);

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return;
  await mongoose.connect(MONGO_URI);
  isConnected = true;
}

app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

export default app;