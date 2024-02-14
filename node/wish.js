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



app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})