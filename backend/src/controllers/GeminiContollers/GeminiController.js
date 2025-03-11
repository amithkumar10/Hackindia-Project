import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const enhanceProposal = async (req, res) => {
  const { proposal } = req.body;
  if (!proposal) return res.status(400).json({ error: "No proposal provided" });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    const result = await model.generateContent(
      `Enhance and structure this freelancer proposal:\n\n${proposal}`
    );
    const response = result.response.candidates[0].content.parts[0].text;

    res.json({ enhancedProposal: response });
    return res.status(200).json({ enhancedProposal: response });
  } catch (error) {
    res
      .status(500)
      .json({ error: "AI enhancement failed", details: error.message });
  }
};
