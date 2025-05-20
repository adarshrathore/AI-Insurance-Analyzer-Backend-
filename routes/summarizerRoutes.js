import express from "express";
import multer from "multer";
import { summarizePolicy } from "../controllers/summarizerController.js";

const router = express.Router();
const upload = multer();

router.post("/", upload.single("file"), summarizePolicy);

export default router;
