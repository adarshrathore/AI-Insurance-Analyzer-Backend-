import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS setup for frontend
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

// Middleware
app.use(express.json());

// Routes
import summarizerRoutes from "./routes/summarizerRoutes.js";
import comparatorRoutes from "./routes/comparatorRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Mount API routes
app.use("/api", summarizerRoutes);

app.use("/api/compare", comparatorRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
