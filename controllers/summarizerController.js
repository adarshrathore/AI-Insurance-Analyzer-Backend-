import { PDFDocument } from "pdf-lib";
import { GoogleGenerativeAI } from "@google/generative-ai";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to extract text using pdf-lib
async function extractTextFromPDF(buffer) {
  const pdfDoc = await PDFDocument.load(buffer);
  const pages = pdfDoc.getPages();
  let text = "";

  for (const page of pages) {
    const pageText = page.getText ? page.getText() : ""; // `getText` isn't in pdf-lib directly
    text += pageText + "\n";
  }

  return text.trim();
}

// Gemini prompt helper
function fixSpacing(text) {
  text = text.replace(/\*\*\*(\S)/g, '*** $1');
  text = text.replace(/\*\*(\S)/g, '** $1');
  text = text.replace(/\*(\S)/g, '* $1');
  text = text.replace(/([a-z])([A-Z])/g, '$1 $2');
  return text.trim();
}

// Main controller function
export const summarizePolicy = async (req, res) => {
  try {
    let text = req.body.text || "";
    const language = req.body.language || "en";

    if (req.file) {
      const fileBuffer = req.file.buffer;
      text = await extractTextFromPDF(fileBuffer);
    }

    if (!text) {
      return res.status(400).json({ error: "No input text or file provided" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
      Summarize the following insurance policy document into exactly 3 bullet points.
      Write the summary in ${language === 'hi' ? 'Hindi' : 'English'}.

      Content:
      ${text}
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });

    const summary = result.response.candidates[0].content.parts[0].text;
    const fixed = fixSpacing(summary);

    res.status(200).json({ summary: fixed, language });
  } catch (err) {
    console.error("❌ Error during summarization:", err.message);
    res.status(500).json({ error: "Summarization failed." });
  }
};
