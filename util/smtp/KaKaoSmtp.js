const nodemailer = require('nodemailer');
const mailId = process.env.SMTP_ID;
const mailAddress = process.env.SMTP_ADDRESS
const mailPassword = process.env.SMTP_PASSWORD;
const host = process.env.SMTP_HOST;
const port = process.env.SMTP_PORT;


const smtp = {
    sendMailText : async function (email, subject, text) {
        let transporter = await nodemailer.createTransport({host, port ,secure : true, auth : {user: mailId, pass: mailPassword}});
        await transporter.sendMail({from : mailAddress, to: email, subject, text});
    },
    sendMailHtml : async function (email, subject, html, attachment) {
        let transporter = await nodemailer.createTransport({host, port ,secure : true, auth : {user: mailId, pass: mailPassword}});
        await transporter.sendMail({
            from : mailAddress,
            to: email,
            subject,
            html,
            attachment:attachment
        });
    }
}


module.exports = smtp;