const Bytez = require("bytez.js");

const key = process.env.BYTEZ_API_KEY; // Better to store in .env
const sdk = new Bytez(key);

// Choose GPT-4o model
const model = sdk.model("openai/gpt-4o");

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

    // 🔥 Send prompt to GPT-4o
    const { error, output } = await model.run([
      {
        role: "user",
        content: prompt
      }
    ]);

    if (error) {
      throw new Error(error.message || "Bytez API Error");
    }

    let aiText = output?.text || output?.content || "";

    console.log("RAW AI RESPONSE:");
    console.log(aiText);

    // 🔥 Remove markdown if model adds it
    aiText = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // 🔥 Extract JSON safely
    const start = aiText.indexOf("{");
    const end = aiText.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("No valid JSON found in AI response");
    }

    const cleanedJSON = aiText.substring(start, end + 1);

    console.log("CLEANED JSON:");
    console.log(cleanedJSON);

    return JSON.parse(cleanedJSON);

  } catch (error) {
    console.error("BYTEZ ERROR:", error.message);
    throw error;
  }
};