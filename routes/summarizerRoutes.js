// routes/summarizerRoutes.js
import express from "express";
import { summarizeTextPolicy } from "../controllers/summarizerController.js";

const router = express.Router();

router.post("/summarize", summarizeTextPolicy); // POST /api/summarize

export default router;
