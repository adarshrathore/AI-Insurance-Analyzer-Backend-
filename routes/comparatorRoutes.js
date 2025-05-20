import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/compare", async (req, res) => {
  const { policy1, policy2 } = req.body;
  if (!policy1 || !policy2) {
    return res.status(400).json({ error: "Both policies required." });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Compare the following two insurance policies and output the result as an HTML table:\n\nPolicy 1:\n${policy1}\n\nPolicy 2:\n${policy2}`;
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({ result: response });
  } catch (err) {
    console.error("Error comparing policies:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
