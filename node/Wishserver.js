
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3005;
const openai = new OpenAI({
  apiKey: "sk-proj-NwJF5CNaVp9ZQtWsOxfXT3BlbkFJxHaeIG1ywuQ8CBwqrLME"
});

app.use(cors({ // Apply CORS middleware
  origin: 'http://localhost:3000' // Allow requests from this origin
}));

app.use(express.json());

app.post('/api/fetch-student', async (req, res) => {
  const studentId = req.body.studentId;

  try {
    const data = JSON.stringify({
      collection: "students",
      database: "studentrecords",
      dataSource: "Cluster0",
      filter: {
        studentid: studentId
      }
    });

    const config = {
      method: 'post',
      url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-zwwqd/endpoint/data/v1/action/findOne',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'n7FEsXAd5f1vccyEEFrGEBvDO9oqeRJmi4r5ljf2OIr7pIlr5qJBNR7biXSvsCR2'
      },
      data
    };

    const response = await axios(config);
    const student = response.data.document;

    if (student) {
      res.status(200).json({
        success: true,
        data: {
          name: student.name,
          studentId: student.studentid,
          degree: student.degree,
          gpa: student.gpa,
          sports: student.sports,
          faculty: student.faculty,
          Discipline: student.Discipline,
          class: student.class,
          extracurry: student.extracurry,
          Finalproject: student.Finalproject,
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Student not found.'
      });
    }
  } catch (error) {
    console.error('Error fetching student data:', error);

    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching student data.'
    });
  }
});

    app.post('/api/generate-letter', async (req, res) => {
        try {
          const studentData = req.body.studentData;
      
          const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{
              "role": "system",
              "content": "You are a helpful assistant that generates a letter of recommendation for a student based on the provided information."
            },
            {
              "role": "user",
              "content": `I want to write a letter of recommendation for a student named ${studentData.name} 
              with the student ID ${studentData.studentId}. The student has completed a ${studentData.degree} degree with a GPA of 
              ${studentData.gpa} and mention about class ${studentData.class}. They have also participated in ${studentData.sports} and
              ${studentData.extracurry} and are part of the ${studentData.faculty} faculty. And also mention discipline record ${studentData.Discipline}. 
              And reccomend for things with related ${studentData.Finalproject} and explain about project. Write like actual university 
              recommendation letter letter bellow metion your roll who is generated letter.
              Please generate the letter in the following format:
          
              Dear Sir/Madam,
          
              I am writing to recommend ${studentData.name} for any opportunity that requires a dedicated, hardworking, and 
              talented individual. I have had the pleasure of teaching ${studentData.name} in my ${studentData.degree} course, and 
              I can confidently say that they are one of the most exceptional students I have ever had.
              [Write the recommendation here with the student's name, student ID, faculty, degree, GPA, sports, and Discipline.
              Make sure to write at least 3-4 paragraphs about the student's achievements, skills, and character and also have bad
              things that should mention and explain like deciplene.
          
              Best regards,
              NSBM Green University, Faculty of ${studentData.faculty}
              `
            },
            {
              "role": "user",
              "content": "*This is Automatically generated letter based on the student recordes."
            }]
          });
      
          res.status(200).json({
            success: true,
            data: response.choices[0].message.content
          });
        } catch (error) {
          console.error('Error generating letter:', error);
      
          res.status(500).json({
            success: false,
            message: 'An error occurred while generating the letter.' + error.message,
            error: error
          });
        }
      });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// To get student ID in the terminal
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter student ID: ', async (studentId) => {
  rl.close();

  try {
    const response = await axios.post('http://localhost:3002/api/fetch-student', { studentId });
    const { success, data, message } = response.data;

    if (success) {
      console.log('Fetched student data:');
      console.log('Name:', data.name);
      console.log('Student ID:', data.studentId);
      console.log('Degree:', data.degree);
      console.log('GPA:', data.gpa);
      console.log('Sports:', data.sports);
      console.log('Faculty:', data.faculty);
      console.log('Discipline:', data.Discipline);


      // Generate the letter
      const letterResponse = await axios.post('http://localhost:3002/api/generate-letter', { studentData: data });
      const { success: letterSuccess, data: letterData, message: letterMessage } = letterResponse.data;

      if (letterSuccess) {
        console.log('Generated letter:');
        console.log(letterData);
      } else {
        console.error('Error generating letter:', letterMessage);
      }
    } else {
      console.error('Error fetching student data:', message);
    }
  } catch (error) {
    console.error('Error fetching student data or generating letter:', error);
  }
});