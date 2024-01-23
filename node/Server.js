const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));