const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function callGemini(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

function sendJson(res, statusCode, data) {
  res.status(statusCode).json(data);
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    const pathname = new URL(req.url, "http://localhost").pathname;
    const route = pathname.replace(/^\/api/, "");

    if (req.method === "GET" && route === "/fun-fact") {
      const fact = await callGemini("Generate a single random, interesting, and fun fact. Just the fact, no explanation.");
      return sendJson(res, 200, { fact });
    }

    if (req.method === "POST" && route === "/journal-prompt") {
      const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
      const { mood } = body;

      if (!mood) {
        return sendJson(res, 400, { error: "Mood is required" });
      }

      const prompt = `Write a short, encouraging journal prompt for someone feeling ${mood}. Keep it to 2-3 sentences.`;
      const promptText = await callGemini(prompt);
      return sendJson(res, 200, { prompt: promptText });
    }

    if (req.method === "GET" && route === "/joke") {
      const joke = await callGemini("Tell me a funny, short joke in 1-2 sentences.");
      return sendJson(res, 200, { joke });
    }

    if (req.method === "GET" && route === "/motivation") {
      const quote = await callGemini("Give me a short, inspiring motivational quote (under 20 words).");
      return sendJson(res, 200, { quote });
    }

    if (req.method === "GET" && route === "/tip-of-the-day") {
      const tip = await callGemini("Give me a helpful productivity or life tip in 2-3 sentences.");
      return sendJson(res, 200, { tip });
    }

    return sendJson(res, 404, { error: "Route not found" });
  } catch (error) {
    console.error(error);
    return sendJson(res, 500, { error: "Internal server error" });
  }
};
