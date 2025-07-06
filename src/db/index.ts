import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

/**
 * Establishes a connection to the MongoDB database.
 */
const connectDB = async () => {
  // Check if MONGO_URI is defined in environment variables
  if (!MONGO_URI) {
    console.error("❌ FATAL ERROR: MONGO_URI is not defined.");
    process.exit(1); // Stop the application if no URI is provided
  }

  try {
    // Connect to MongoDB
    const connectionInstance = await mongoose.connect(`${MONGO_URI}`);

    // Log success message with host info
    console.log(
      `✅ MongoDB connected successfully at: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    // Handle and log connection error
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1); // Stop the application if connection fails
  }
};

export { connectDB };
