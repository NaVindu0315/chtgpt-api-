const express = require("express");
const OpenAI = require("openai");
const app = express();
app.use(express.json());

// mongdo db data api 


//var axios = require('axios');

//to prompt the student id from the user

const axios = require('axios');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt for student ID
readline.question('Enter student ID: ', (studentid) => {
  readline.close();

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

  axios(config)
    .then(function (response) {
      if (response.data.document) {
        const student = response.data.document;
        const name = student.name;
        const studentid = student.studentid;
        const degree = student.degree;
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


//this is the working hardcoded code
/*
var data = JSON.stringify({
    "collection": "students",
    "database": "studentrecords",
    "dataSource": "Cluster0",
    "filter": {
        "studentid": "23209" // Filter documents where studentid matches
    }
});
            
var config = {
    method: 'post',
    url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-zwwqd/endpoint/data/v1/action/findOne',
          
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'n7FEsXAd5f1vccyEEFrGEBvDO9oqeRJmi4r5ljf2OIr7pIlr5qJBNR7biXSvsCR2',
      'Accept': 'application/ejson'
    },
   data
};
            
axios(config)
    .then(function (response) {
        //console.log(JSON.stringify(response.data));
        const student = response.data.document;
        if (student) {
        const name = student.name;
        const studentid = student.studentid;
        const degree = student.degree;
        console.log(name,studentid,degree);

      //  console.log("i want to write a letter about the a student nameed ${name} with the student number ${studentid} who studied ${degree} with a gpa of "+studentgpa+" and did  "+studentsports+" in our university  as a dean of the faculty as a recomdation for a masters degree and add recipent as Dear Sir/Madam sender is Dean Faculty of"+studetfaculty+"please dont add recipeints senders desgisnation would be engough please dont use [] in the spaces");
    } else {
      console.log('No student found with the given studentid');
      }
    })
    .catch(function (error) {
        console.log(error);
    });
*/
///hard coded code end
///mongodb data api end


//chatgpt letter generation
/*
const openai=new OpenAI({
    apiKey:"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"
})

app.get('/getResponse',async(req,res)=>{
    try {
        //const userPrompt = req.body.userPrompt;
        const studentname = req.body.studentname;
        const studentnumber = req.body.studentnumber;
        const studentdegree = req.body.studentdegree;
        const studentgpa = req.body.studentgpa;
        const studentsports = req.body.studentsports;
        const studetfaculty = req.body.studetfaculty;
        
        console.log(studentname,studentnumber,studentdegree,studentgpa,studentsports);
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{
                "role": "user",
                "content": "i want to write a letter about the a student nameed"+name+" with the student number "+studentnumber+" who studied "+studentdegree+" with a gpa of "+studentgpa+" and did  "+studentsports+" in our university  as a dean of the faculty as a recomdation for a masters degree and add recipent as Dear Sir/Madam sender is Dean Faculty of"+studetfaculty+"please dont add recipeints senders desgisnation would be engough please dont use [] in the spaces"
               
            }]
        });

    console.log(response.choices[0].message.content);
    res.send(response.choices[0].message.content);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
}
});*/


//chatgpt letter generation end

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})