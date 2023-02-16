const nodemailer = require('nodemailer');
const mailAddress = process.env.SMTP_ID;
const mailPassword = process.env.SMTP_PASSWORD;
const host = process.env.SMTP_HOST;
async function sendMail(email, subject, text) {
    let transporter = await nodemailer.createTransport({host, port:465 ,secure : true, auth : {user: mailAddress, pass: mailPassword}});
    await transporter.sendMail({from : `netalgans@kakao.com`, to: email, subject, text});
}

module.exports = sendMail;