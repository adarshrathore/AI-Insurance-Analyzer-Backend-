import { getChatbotReply } from "../utils/gemini.js";

export const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required" });
    }

    const reply = await getChatbotReply(message);
    res.status(200).json({ reply });
  } catch (error) {
    console.error("Chatbot controller error:", error);
    res.status(500).json({ error: "Failed to process chatbot request" });
  }
};
