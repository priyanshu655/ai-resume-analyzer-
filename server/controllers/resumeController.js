const pdfParseModule = require("pdf-parse");
const pdfParse = pdfParseModule.default || pdfParseModule;

const { analyzeWithAI } = require("../services/aiService");
const ResumeAnalysis = require("../models/ResumeAnalysis");

exports.analyzeResume = async (req, res) => {
  const jobDescription = req.body.jobDescription;
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 🔹 Extract PDF text
    const data = await pdfParse(req.file.buffer);
    const resumeText = data.text;

    // 🔹 Send to AI
    const aiResult = await analyzeWithAI(resumeText, jobDescription);

    // 🔹 Save in MongoDB with logged-in user ID
  const savedAnalysis = await ResumeAnalysis.create({
  userId: req.user.id,
  resumeText,
  jobDescription,
  analysis: {
    matchScore: aiResult.matchScore || 0,
    matchedSkills: aiResult.matchedSkills || "",
    missingSkills: aiResult.missingSkills || "",
    improvementSuggestions: aiResult.improvementSuggestions || ""
  }
});

   res.json({
  message: "Resume analyzed and saved successfully",
  result: savedAnalysis
});

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ message: "Error analyzing resume" });
  }
};