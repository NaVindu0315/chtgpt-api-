const express =  require('express');
const OpenAI = require('openai');

const app = express();
app.use(express.json());

const openai = new OpenAI(
    ({
        apiKey: "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"
    })
);