const express = require("express");
const OpenAI = require("openai");
const app = express();
app.use(express.json());

// mongdo db data api 


//var axios = require('axios');

//to prompt the student id from the user

const axios = require('axios');

app.listen(3000,()=>{
    //commented this console log
   // console.log("Server is running on port 3000")
})
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





