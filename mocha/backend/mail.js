const mailer = require("nodemailer");
const config = require('./config/key');

const sendEmail = (to, name, msg) => {
    const smtpTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: config.USER,
            pass: config.PASS
        }
    });

    const htmlTemplate = `
        <!DOCTYPE html>
        <html style="margin: 0; padding: 0;>

        <head>
            <title>Hello ${name},</title>
        </head>

        <body style="margin: 0; padding: 0;>
            <br />
            <br />
            <div>${msg}</div>
            <br />
            <br />
            <div>Regards</div>
            <div>Manogna</div>
        </body>

        </html>`;

    const mail = {
        from: `${config.NAME} <${config.USER}>`,
        to: to,
        subject: "Mail from NodeMailer",
        html: htmlTemplate
    }

    smtpTransport.sendMail(mail, function(err, res){
        if(err) console.log(err);
        else console.log("Email sent successfully");
    });
    smtpTransport.close();
};

module.exports = { sendEmail }
