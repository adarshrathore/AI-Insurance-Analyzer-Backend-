import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());                 // Allow frontend requests from different origins
app.use(express.json());        // Parse JSON bodies

// Routes
import summarizerRoutes from "./routes/summarizerRoutes.js";
import comparatorRoutes from "./routes/comparatorRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// API route mounting
app.use("/api/summarize", summarizerRoutes);
app.use("/api/compare", comparatorRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes); // ✅ Only once

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
