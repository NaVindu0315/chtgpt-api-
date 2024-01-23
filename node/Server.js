const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

import { ChatGPTAPI } from 'chatgpt'

async function example() {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const res = await api.sendMessage('Hello World!')
  console.log(res.text)
}
example();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));