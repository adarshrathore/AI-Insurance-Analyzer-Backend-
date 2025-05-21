import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const askChatbot = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt required." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(
      `You are an expert in the Indian insurance sector. Be precise and professional.

User: ${prompt}`
    );

    const response = result.response.text();
    res.json({ response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chatbot error." });
  }
};

export const handleChatbot = async (req, res) => {
  res.status(200).json({ message: "Chatbot response placeholder" });
};
