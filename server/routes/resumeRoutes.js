const express = require("express");
const router = express.Router();
const authMiddleware=require('../middlewares/authMiddlewares');

const upload = require("../middlewares/uploadMiddleware");
const { analyzeResume } = require("../controllers/resumeController");
const ResumeAnalysis = require("../models/ResumeAnalysis");

router.post("/analyze", authMiddleware , upload.single("resume"), analyzeResume);
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const history = await ResumeAnalysis.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    console.error("HISTORY ERROR:", error);
    res.status(500).json({ message: "Error fetching history" });
  }
});

module.exports = router;