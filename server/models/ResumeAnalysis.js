const mongoose=require('mongoose');

const resumeAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  resumeText: String,
  jobDescription: String,
  analysis: {
    matchScore: Number,
    matchedSkills: String,
    missingSkills: String,
    improvementSuggestions: String
  }
}, { timestamps: true });


module.exports = mongoose.model("ResumeAnalysis", resumeAnalysisSchema);