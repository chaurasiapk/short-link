import mongoose from "mongoose";

// Define the schema for the URL model
const urlSchema = new mongoose.Schema(
  {
    // Original long URL submitted by the user
    originalUrl: {
      type: String,
      required: true, // This field is mandatory
      trim: true, // Remove leading/trailing whitespaces
    },

    // Unique shortcode representing the shortened URL
    shortCode: {
      type: String,
      required: true,
      unique: true, // Ensure shortCode is unique across all records
      index: true, // Create an index to improve lookup speed
      trim: true,
    },

    // Number of times the short URL has been accessed
    clicks: {
      type: Number,
      default: 0, // Initialize with 0 clicks
      min: 0, // Prevent negative click counts
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create the model from the schema
const Url = mongoose.model("Url", urlSchema);

// Export the model for use in other parts of the application
export default Url;
