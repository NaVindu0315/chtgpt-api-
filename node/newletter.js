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

async function generateStory(studentname,studentnumber,studentdegree,studentgpa,studentsports,studentclass,extracurry,faculty,Discipline,Finalproject) {
    try {
      const prompt = `I want to write a letter of recommendation for a student named ${studentname} 
      with the student ID ${studentnumber}. The student has completed a ${studentdegree} degree with a GPA of 
      ${studentgpa} and mention about class ${studentclass}. They have also participated in ${studentsports} and
      ${extracurry} and are part of the ${faculty} faculty. And also mention discipline record ${Discipline}. 
      And reccomend for things with related ${Finalproject} and explain about project. Write like actual university 
      recommendation letter letter bellow metion your roll who is generated letter.
      Please generate the letter in the following format:
  
      Dear Sir/Madam,
  
      I am writing to recommend ${studentname} for any opportunity that requires a dedicated, hardworking, and 
      talented individual. I have had the pleasure of teaching ${studentname} in my ${studentdegree} course, and 
      I can confidently say that they are one of the most exceptional students I have ever had.
      [Write the recommendation here with the student's name, student ID, faculty, degree, GPA, sports, and Discipline.
      Make sure to write at least 3-4 paragraphs about the student's achievements, skills, and character and also have bad
      things that should mention and explain like deciplene.
  
      Best regards,
      NSBM Green University, Faculty of ${faculty}
      `
      ;
      const model = await genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
  
      return text;
    } catch (error) {
      handleErrors(error);
    }
  }
  
  app.post("/generate-letter", async (req, res) => {
    try {
      const { studentname,studentnumber,studentdegree,studentgpa,studentsports,studentclass,extracurry,faculty,Discipline,Finalproject} = req.body;
      if (!studentname || !studentnumber || !studentdegree || !studentgpa || !studentsports|| !studentclass|| !extracurry|| !faculty|| !Discipline|| !Finalproject) {
        return res.status(400).json({ error: "Please provide name, index, and degree" });
      }
      const story = await generateStory(studentname,studentnumber,studentdegree,studentgpa,studentsports,studentclass,extracurry,faculty,Discipline,Finalproject);
      res.json({ story });
    } catch (error) {
      let errorMessage = "Internal Server Error";
      if (error.name === 'ValidationError') {
        errorMessage = "Validation Error: " + error.message;
      } else {
        console.error(error); // Log the complete error for debugging
      }
      res.status(500).json({ error: errorMessage });
    }
  });
  
  app.listen(3000, () => {
    console.log("API listening on port 3000");
  });