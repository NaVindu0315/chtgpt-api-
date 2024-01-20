const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // Change this to the desired port number

app.use(express.json());


// Define a route to handle file uploads
app.post('/upload', async (req, res) => {
  res.json({ message: 'Hellow World'});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



///run this before 

/// setx OPENAI_API_KEY "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"