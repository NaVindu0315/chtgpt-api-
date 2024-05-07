const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyDClytG49R3ci29q5SnTnkWZom45cVRQ0Q');

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

async function generateStory(name, index, degree) {
    try {
      const prompt = `Write a letter about this student: ${name} with index ${index} and degree ${degree}.`;
      const model = await genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
  
      return text;
    } catch (error) {
      handleErrors(error);
    }
  }
  
  app.post("/generate-story", async (req, res) => {
    try {
      const { name, index, degree } = req.body;
      if (!name ||!index ||!degree) {
        return res.status(400).json({ error: "Please provide name, index, and degree" });
      }
      const story = await generateStory(name, index, degree);
      res.json({ story });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  app.listen(3000, () => {
    console.log("API listening on port 3000");
  });