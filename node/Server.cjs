const express = require('express');
const axios = require('axios');
import dotenv from 'dotenv';
const app = express();
app.use(express.json());

// Securely access API key from environment variable
const openaiKey = process.env.OPENAI_KEY;

app.post('/generate-paragraph', async (req, res) => {
  try {
    const { details } = req.body;

    const headers = {
      'Authorization': `Bearer ${openaiKey}`,
      'Content-Type': 'application/json',
    };

    const data = {
      model: "gpt-3.5-turbo",
      prompt: `Write a paragraph about the following details: ${details}`,
      max_tokens: 150, // Adjust as needed
    };

    const url = 'https://api.openai.com/v1/completions';

    const response = await axios.post(url, data, { headers });
    const paragraph = response.data.choices[0].text;

    res.json({ paragraph });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate paragraph' });
  }
});

const port = 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));