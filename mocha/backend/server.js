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
