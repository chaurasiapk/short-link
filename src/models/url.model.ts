import mongoose from "mongoose";

// Define the schema for the URL model
const urlSchema = new mongoose.Schema(
  {
    // Original long URL provided by the user
    originalUrl: {
      type: String,
      required: true, // Must be provided
      trim: true, // Trim whitespaces
    },

    // Short unique code representing the shortened URL
    shortCode: {
      type: String,
      required: true,
      unique: true, // Ensure it's unique across all documents
      index: true, // Index to speed up searches
      trim: true,
    },

    // Counter for how many times the short URL has been used
    clicks: {
      type: Number,
      default: 0, // Default to 0
      min: 0, // No negative clicks allowed
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create a model from the schema
const Url = mongoose.model("Url", urlSchema);

// Export the model for use in routes and controllers
export default Url;
