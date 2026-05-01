const express = require("express");
const cors = require('cors');
const axios = require('axios');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/ask', async ( req, res) => {
    const  question = req.body.question;

    if (!question) {
        return res.status(400).json({ error: "Question is required"})
    }

    try {
        const apikey = process.env.GEMINI_API_KEY;

        const response = await axios.post(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
            contents: [
                {
                    parts: [
                        { text: `Explain the following clearly using markdown formatting 
                            (headings, bullent points, bold text, line breaks):
                             ${question}` }
                    ]
                }
            ]
        },
        {
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key":apikey
        }
        }
        );

        const answer = response.data.candidates[0].content.parts[0].text;

        res.json({ answer });
    } catch (err) {
        console.log(err.response?.data || err.message);
        res.status(500).json({ error: "Something went wrong "});
    }
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
