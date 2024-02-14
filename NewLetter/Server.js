const express = require("express");
//const OpenAI = require("openai");
const app = express();
app.use(express.json());

const dotenv = require('dotenv');

dotenv.config();


// mongdo db data api 


//var axios = require('axios');

//to prompt the student id from the user

const axios = require('axios');

app.listen(3000,()=>{
    //commented this console log
   console.log("Server is running on port 3000")
})

/*
//meka tynne student number eka prompt karanna
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt for student ID
readline.question('Enter student ID: ', (studentid) => {
  readline.close();

  //prompt krna eka methanin iwri

  //me tynne methana wenne adala database eka collection eka document eka balala data ganna eka api eken meka wenas krnna dyk na

  const data = JSON.stringify({
    "collection": "students",
    "database": "studentrecords",
    "dataSource": "Cluster0",
    "filter": {
      "studentid": studentid // Use the user-provided studentid
    }
  });

  const config = {
    method: 'post',
    url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-zwwqd/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      // Replace with your own API key (omitted for security reasons)
      'api-key': 'n7FEsXAd5f1vccyEEFrGEBvDO9oqeRJmi4r5ljf2OIr7pIlr5qJBNR7biXSvsCR2',
      'Accept': 'application/ejson'
    },
    data
  };
//me tynne methanin tham variables wlt cll krnne meke danat tynne name studnt id degree wtrine oyt one ewa mulinma mongo
//db eke hjdala methanin ekat galapenna danna plwn mn comment krl danm ewa oy hdganna
  axios(config)
    .then(function (response) {
      if (response.data.document) {
        const student = response.data.document;
        const name = student.name;
        const studentid = student.studentid;
        const degree = student.degree;
        //const gpa = student.gpa;
        //const sports = student.sports;
        //const societies = student.societies;
        //mewage oyt one ewa me wdiyt add krganna plwn
        //me yat tyna console ek damme data hryat enwd balnna meka mn comment krnw eka aye uncomment krl oy balanna aluthin add krpu ewa enwd kyl

        console.log(name, studentid, degree);

        // ... rest of your code using the student information
      } else {
        console.log('No student found with the given studentid');
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});
//prompting end
*/

//dn me tyna eke student number eka ghuwama data enw
//dn aye mekat letter generate wena mn function ekk widyt add krnw api ekk neme function ekk dammaam
//postman one na eka kelinma terminal eke run wenw sirt mehema pennanna plwnne api ekath tynw ekath hdala denm daant functuion ekk widiyt hdmu


///letter generation
// Import required libraries
const openai = require('openai');

// Initialize OpenAI with your API key (stored securely outside the code)

const apiKey = process.env.API_KEY;
const openaiClient = new openai(apiKey);

// Function to generate letter recommendation
async function generateLetterRecommendation(studentData) {
  const { studentname, studentnumber, studentdegree, studentgpa, studentsports, studetfaculty } = studentData;

  try {
    // Construct the user prompt based on provided information
    const upromt = `Write a letter about a student named ${studentname} with student number ${studentnumber} who studied ${studentdegree} with a GPA of ${studentgpa} and participated in ${studentsports} at our university. The letter should be written from the perspective of the Dean of the ${studetfaculty} faculty as a recommendation for a master's degree. Address the letter to "Dear Sir/Madam" and avoid including the recipient's designation or sender's designation.`;

    // Send the prompt to OpenAI and extract the generated content
    const response = await openaiClient.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{
        "role": "user",
        "content": upromt
      }]
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating letter:", error);
    throw error; // Re-throw for handling in calling code
  }
}

// Example usage:
const studentData = {
  studentname: "John Doe",
  studentnumber: "123456",
  studentdegree: "Software Engineering",
  studentgpa: 3.8,
  studentsports: "Basketball",
  studetfaculty: "Engineering"
};

generateLetterRecommendation(studentData)
  .then(letterContent => {
    console.log("Generated letter recommendation:\n", letterContent);
  })
  .catch(error => {
    console.error("Error generating letter:", error);
  });


///letter generation end
