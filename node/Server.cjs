const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
app.post('/generate', async (req, res) => {
  const prompt = req.body.prompt;
  const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: prompt,
      max_tokens: 100
  }, {
      headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
  });

  res.json({ generated_text: response.data.choices[0].text });
});
