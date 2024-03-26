const nodemailer = require ('nodemailer');
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
