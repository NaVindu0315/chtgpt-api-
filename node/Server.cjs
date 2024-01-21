const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000; // You can choose any port you prefer

app.use(bodyParser.json());

// Define a route for handling API requests
app.post('/generate-paragraph', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Make a request to OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt,
        max_tokens: 200, // You can adjust this based on your preference
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`,
        },
      }
    );

    // Send the generated paragraph in the response
    res.json({ paragraph: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
