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

async function generateStory(studentname,studentnumber,studentdegree,studentgpa,studentsports) {
    try {
      const prompt = "i want to write a letter about the a student nameed"+studentname+" with the student number "+studentnumber+" who studied "+studentdegree+" with a gpa of "+studentgpa+" and did  "+studentsports+" in our university  as a dean of the faculty as a recomdation for a masters degree and add recipent as Dear Sir/Madam sender is Dean Faculty of computing please dont add recipeints senders desgisnation would be engough please dont use [] in the spaces";
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
      const { studentname,studentnumber,studentdegree,studentgpa,studentsports} = req.body;
      if (!studentname || !studentnumber || !studentdegree || !studentgpa || !studentsports) {
        return res.status(400).json({ error: "Please provide name, index, and degree" });
      }
      const story = await generateStory(studentname,studentnumber,studentdegree,studentgpa,studentsports);
      res.json({ story });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  app.listen(3000, () => {
    console.log("API listening on port 3000");
  });