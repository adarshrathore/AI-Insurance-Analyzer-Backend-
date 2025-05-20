const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.comparePolicies = async (req, res) => {
  try {
    const { policy1, policy2 } = req.body;

    if (!policy1 || !policy2) {
      return res.status(400).json({ error: "Both policy texts are required." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
Compare the following two insurance policy descriptions and generate a clear table that outlines key differences (like Coverage, Conditions, Use Restrictions, Exclusions, Premium terms, etc.).

Policy A:
${policy1}

Policy B:
${policy2}

Output format: Markdown table with columns - "Feature", "Policy A", "Policy B".
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({ comparison: response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Comparison failed." });
  }
};
