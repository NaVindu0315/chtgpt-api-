/*const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nmails6969@gmail.com',
    pass: 'wqij frps qaxq mzln',
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'pakaya', // sender address
    to: "navindulakshan99@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
   // html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);

*/

const express = require("express");
const cookieParser = require("cookie-parser");
const { sendEmail } = require("./mail");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname+'/client/build')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.post("/api/sendMail", (req, res) => {
    //console.log(req.body);
    sendEmail(req.body.email, req.body.name, req.body.msg);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
console.log(__dirname);

app.listen(PORT, () => {
    console.log(`Server Running at ${PORT}`);
});