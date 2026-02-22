const axios = require("axios");

exports.analyzeWithAI = async (resumeText, jobDescription) => {
  try {
const prompt = `
You are a strict JSON generator.

Return ONLY valid JSON.
Do NOT include explanations.
Do NOT include markdown.
Do NOT include text before or after JSON.
The output must start with { and end with }.

ALL fields are mandatory.
If information is missing, still generate meaningful text.

Return format EXACTLY:

{
  "matchScore": number,
  "matchedSkills": "string",
  "missingSkills": "string",
  "improvementSuggestions": "string"
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "deepseek-v3.1:671b-cloud",
      prompt: prompt,
      stream: false
    });

    let aiText = response.data.response;

    // 🔍 Debug raw output (very important during development)
    console.log("RAW AI RESPONSE:");
    console.log(aiText);

    // 🔥 Remove markdown formatting if model adds it
    aiText = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // 🔥 Extract JSON block safely
    const start = aiText.indexOf("{");
    const end = aiText.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("No valid JSON found in AI response");
    }

    const cleanedJSON = aiText.substring(start, end + 1);

    console.log("CLEANED JSON:");
    console.log(cleanedJSON);

    // 🔥 Safely parse JSON
    try {
      return JSON.parse(cleanedJSON);
    } catch (parseError) {
      console.error("JSON PARSE FAILED:", cleanedJSON);
      throw new Error("AI returned invalid JSON format");
    }

  } catch (error) {
    console.error("OLLAMA ERROR:", error.message);
    throw error;
  }
};