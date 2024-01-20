const express = require('express');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);// Securely access API key from environment variable
const app = express();
app.use(express.json());

app.post('/generate-poem', async (req, res) => {
  try {
    const prompt = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a poetic assistant, skilled in explaining complex programming concepts with creative flair.'
        },
        {
          role: 'user',
          content: req.body.prompt // Get prompt from user request
        }
      ]
    };

    const response = await openai.createCompletion(prompt);
    //openai.createCompletion
    const poem = response.data.choices[0].text;

    res.json({ poem }); // Send the generated poem as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate poem' }); // Handle errors gracefully
  }
});

const port = 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));


///run this before 

/// setx OPENAI_API_KEY "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"