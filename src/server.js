import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

// Import routes
import movieRouter from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";

config(); // Load environment variables from .env file
connectDB(); // Connect to the database
const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
const PORT = 5001;

// API routes
app.use("/movies", movieRouter);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1); // Exit the process with an error code
  });
});

// Handle uncaught exceptions (e.g., programming errors)
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1); // Exit the process with an error code
});

// Graceful shutdown on SIGINT (e.g., Ctrl+C)
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0); // Exit the process with a success code
  });
});

// AUTH - signin, signup
// MOVIE - Getting ALL movies
// USER - profile
// WATCHLIST - add to watchlist, remove from watchlist, get watchlist
