
const express = require('express');
const axios = require('axios');
require('dotenv').config();


const app = express();
const port = 3000; // Change this to the desired port number

app.use(express.json());

const openaiKey = process.env.OPENAI_KEY;

app.post('/summarize', async (req, res) => {
  try {
    const { transcription } = req.body;

    const headers = {
      'Authorization': `Bearer ${openaiKey}`,
      'Content-Type': 'application/json',
    };

    const data = {
      prompt: `Chatgpt, I need you to summarize this text: ${transcription}`,
      max_tokens: 400,
      model: "gpt-3.5-turbo-instruct",
    };

    const url = 'https://api.openai.com/v1/completions';

    const response = await axios.post(url, data, { headers });
    const summary = response.data.choices[0].text;

    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to summarize' });
  }
});
   
   app.listen(port, () => {
     console.log(`Server is running on port ${port}`);
   });


///run this before 

/// setx OPENAI_API_KEY "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"