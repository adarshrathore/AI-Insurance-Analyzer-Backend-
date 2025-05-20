import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { handleChatbot } from '../controllers/chatbotController.js';

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/chatbot", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const systemPrompt = `You are a helpful assistant and an expert in the insurance sector. Answer queries in a concise, clear, and informative manner.`;

    const result = await model.generateContent([
      { role: "user", parts: [{ text: systemPrompt + "\n" + prompt }] },
    ]);

    const response = result.response.text();
    res.json({ result: response });
  } catch (error) {
    console.error("Gemini chatbot error:", error);
    res.status(500).json({ error: "Gemini chatbot failed." });
  }
});

export default router;
