/*const nodemailer = require ('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
    user: 'nmails6969@gmail.com',
    pass: 'thusncqpaawegxai'
    }
});

const mailOptions = {
    from : 'nmails6969@gmail.com',
    to : 'navindulakshan99@gmail.com',
    subject : 'Hi',
    text : 'huttto',

}

transporter.sendMail(mailOptions);
*/

const nodemailer = require('nodemailer');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter recipient email: ', (to) => {
  rl.question('Enter subject: ', (subject) => {
    rl.question('Enter text: ', (text) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'nmails6969@gmail.com',
          pass: 'thusncqpaawegxai'
        }
      });

      const mailOptions = {
        from: 'nmails6969@gmail.com',
        to: to,
        subject: subject,
        text: text,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      rl.close();
    });
  });
});