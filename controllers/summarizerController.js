// controllers/summarizerController.js
import { generateGeminiResponse } from "../utils/gemini.js";
// utility to call Gemini API

export const summarizeTextPolicy = async (req, res) => {
  try {
    const { policyText } = req.body;

    if (!policyText || policyText.trim() === "") {
      return res.status(400).json({ error: "Policy text is required" });
    }

    const prompt = `Please summarize the following insurance policy:\n\n${policyText}`;

    const summary = await generateGeminiResponse(prompt);

    res.status(200).json({ summary });
  } catch (error) {
    console.error("Summarization error:", error);
    res.status(500).json({ error: "Failed to summarize policy" });
  }
};
