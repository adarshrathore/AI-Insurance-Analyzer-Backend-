import multer from "multer";
import fs from "fs/promises";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const upload = multer({ dest: "uploads/" });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function fileToBase64(filePath) {
  const buffer = await fs.readFile(filePath);
  return buffer.toString("base64");
}

export const summarizePDF = [
  upload.single("file"),
  async (req, res) => {
    try {
      const filePath = req.file.path;
      const language = req.body.language || "en";

      const base64 = await fileToBase64(filePath);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-vision" });

      const prompt = `
You are an expert insurance analyst.
Please summarize this policy document in 3 bullet points in ${language === "hi" ? "Hindi" : "English"}.
Avoid repeating long headings and focus on the main content only.
`;

      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: "application/pdf",
                  data: base64,
                },
              },
            ],
          },
        ],
      });

      const summary = result.response.candidates[0].content.parts[0].text;

      res.json({
        summary,
        language: language === "hi" ? "Hindi" : "English",
      });

      await fs.unlink(filePath);
    } catch (error) {
      console.error("Summarization error:", error);
      res.status(500).json({ error: "Summarization failed." });
    }
  },
];
