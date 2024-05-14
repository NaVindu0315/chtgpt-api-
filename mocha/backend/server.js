/*

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('express-cors');
const app = express();
const port =  3002; // Use environment variable for dynamic port
app.use(cors());

// Configure Nodemailer with secure password handling (avoid storing password in plain text)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nmails6969@gmail.com', // Replace with your actual Gmail address
    pass: 'wqij frps qaxq mzln', // Use environment variable for password
  },
});

// Route to handle email sending requests
app.post('/send-email', async (req, res) => {
    try {
      // Hardcoded details
      const recipient = 'navindulakshan99@gmail.com';
      const subject = "hutti";
      const message = "paka";
  
      const mailOptions = {
        from: 'nmails6969@gmail.com', // Replace with your sender name and address
        to: recipient,
        subject: subject,
        text: message,
      };
  
      const info = await transporter.sendMail(mailOptions);
  
      res.json({ message: 'Email sent successfully!', info });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending email!' });
    }
  });
  

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
*/
/*
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('express-cors');
const app = express();
const port =  3002;
const gmailAddress = 'nmails6969@gmail.com';
const gmailPassword = 'wqij frps qaxq mzln';

app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailAddress,
    pass: gmailPassword,
  },
});

app.post('/send-email', async (req, res) => {
  try {
    const recipient = 'navindulakshan99@gmail.com';
    const subject = 'hutti';
    const message = 'paka';

    const mailOptions = {
      from: gmailAddress,
      to: recipient,
      subject: subject,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);

    // Add the Access-Control-Allow-Origin header to the response
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ message: 'Email sent successfully!', info });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending email!' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

*/
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Add this line
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors()); // Add this line

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  // ... (rest of your code)
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server Running at ${PORT}`));