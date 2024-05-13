const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port =  3002; // Use environment variable for dynamic port

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
    const { recipient, message, title } = req.body; // Destructure request body

    const mailOptions = {
      from: 'nmails6969@gmail.com', // Replace with your sender name and address
      to: recipient,
      subject: title,
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