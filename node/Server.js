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
        console.log(userPrompt);
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{
                "role": "user",
                "content": "essay on global warming",
                max_tokens: 100
            }]
        });
        console.log(response.choices[0].message);
        res.json(response.choices[0].message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});