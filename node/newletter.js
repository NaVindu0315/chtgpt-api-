const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('');

function validateInput(input) {
  if (!input || typeof input !== "string") {
    return false;
  }

  return true;
}

function handleErrors(error) {
  console.error(error);
}

async function generateStory(prompt) {
  try {
    if (!validateInput(prompt)) {
      throw new Error("Invalid input. Please provide a valid prompt.");
    }

    const model = await genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    handleErrors(error);
  }
}

const express = require("express");
const app = express();
app.use(express.json());

app.post("/generate-story", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const story = await generateStory(prompt);
    res.json({ story });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("API listening on port 3000");
});