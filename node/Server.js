const express = require('express');
import OpenAI from "openai";

const openai = new OpenAI();
const app = express();
app.use(express.json());


const port = 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));