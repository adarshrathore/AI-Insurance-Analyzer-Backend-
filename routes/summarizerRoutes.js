import express from "express";
import { summarizePDF } from "../controllers/summarizerController.js";

const router = express.Router();

router.post("/summarize", summarizePDF);

export default router;
