# 🤖 AI Assistant - All-in-One

A unified AI Assistant with multiple features powered by Gemini API. Combines Fun Facts, Journal Prompter, Jokes, Motivation, and Daily Tips in a single application.

## Features

1. **🧠 Fun Facts** - Get random interesting facts
2. **📔 Journal Prompter** - Get personalized journal prompts based on your mood
3. **😂 Jokes** - Lighten your mood with AI-generated humor
4. **💪 Motivation** - Get inspiring motivational quotes
5. **💡 Daily Tips** - Receive helpful productivity and life tips

## Backend Setup

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add your Gemini API key to `.env`:
   ```
   GEMINI_API_KEY=your-actual-api-key-here
   PORT=5000
   ```

4. Run the server:
   ```bash
   npm start
   ```

Backend runs on `http://localhost:5000`

## Frontend Setup

Simply open `frontend/index.html` in your browser:

**Option 1: Direct Open**
```bash
xdg-open frontend/index.html
```

**Option 2: VS Code Live Server**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

## API Endpoints

- `GET /fun-fact` - Returns a random fun fact
- `POST /journal-prompt` - Returns journal prompt (requires `mood` in body)
- `GET /joke` - Returns a funny joke
- `GET /motivation` - Returns motivational quote
- `GET /tip-of-the-day` - Returns helpful tip

## Testing with cURL

```bash
# Fun Fact
curl http://localhost:5000/fun-fact

# Journal Prompt
curl -X POST http://localhost:5000/journal-prompt \
  -H "Content-Type: application/json" \
  -d '{"mood": "happy"}'

# Joke
curl http://localhost:5000/joke

# Motivation
curl http://localhost:5000/motivation

# Tip
curl http://localhost:5000/tip-of-the-day
```

## Project Structure

```
ai-assistant/
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── .env
│   └── .env.example
└─�� frontend/
    └── index.html
```
