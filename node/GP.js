const express =  require('express');
const OpenAI = require('openai');

const app = express();
app.use(express.json());

const openai = new OpenAI(
    ({
        apiKey: "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"
    })
);

app.get('/getresponse', async (req, res) => {
    try {
        const userPrompt = req.body.userPrompt;
        const studentname = req.body.studentname;
        const studentnumber = req.body.studentnumber;
        const studentdegree = req.body.studentdegree;
        const studentgpa = req.body.studentgpa;
        const studentsports = req.body.studentsports;
        console.log(userPrompt);
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{
                "role": "user",
                "content": " i want write a essay about "+userPrompt
               
            }]
        });
        console.log(response.choices[0].message.content);
        res.send(response.choices[0].message.content);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});