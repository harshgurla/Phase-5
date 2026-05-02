require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Helper function to call Gemini
async function callGemini(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    throw error;
  }
}

// Route 1: GET /fun-fact
app.get("/fun-fact", async (_, res) => {
  try {
    const fact = await callGemini("Generate a single random, interesting, and fun fact. Just the fact, no explanation.");
    res.json({ fact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate fun fact" });
  }
});

// Route 2: POST /journal-prompt
app.post("/journal-prompt", async (req, res) => {
  try {
    const { mood } = req.body;
    if (!mood) {
      return res.status(400).json({ error: "Mood is required" });
    }

    const prompt = `Write a short, encouraging journal prompt for someone feeling ${mood}. Keep it to 2-3 sentences.`;
    const journalPrompt = await callGemini(prompt);
    res.json({ prompt: journalPrompt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate journal prompt" });
  }
});

// Route 3: GET /joke
app.get("/joke", async (_, res) => {
  try {
    const joke = await callGemini("Tell me a funny, short joke in 1-2 sentences.");
    res.json({ joke });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch joke" });
  }
});

// Route 4: GET /motivation
app.get("/motivation", async (_, res) => {
  try {
    const quote = await callGemini("Give me a short, inspiring motivational quote (under 20 words).");
    res.json({ quote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch motivation" });
  }
});

// Route 5: GET /tip-of-the-day
app.get("/tip-of-the-day", async (_, res) => {
  try {
    const tip = await callGemini("Give me a helpful productivity or life tip in 2-3 sentences.");
    res.json({ tip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tip" });
  }
});

app.listen(PORT, () => {
  console.log(`🤖 AI Assistant running on http://localhost:${PORT}`);
});
