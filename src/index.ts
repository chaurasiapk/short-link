// Load environment variables from .env file
import "dotenv/config";

import { app } from "./app";
import { connectDB } from "./db";

// Define the port from environment variables or fallback to 8000
const PORT = process.env.PORT || 8000;

// Connect to MongoDB, then start the Express server
connectDB()
  .then(() => {
    // Start server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    // Log any errors during DB connection and terminate the process
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  });

// Optional: If needed for testing or future usage
// export default app;
