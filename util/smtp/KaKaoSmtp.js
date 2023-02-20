const nodemailer = require('nodemailer');
const mailAddress = process.env.SMTP_ID;
const mailPassword = process.env.SMTP_PASSWORD;
const host = process.env.SMTP_HOST;

const smtp = {
    sendMailText : async function (email, subject, text) {
        let transporter = await nodemailer.createTransport({host, port:465 ,secure : true, auth : {user: mailAddress, pass: mailPassword}});
        await transporter.sendMail({from : `netalgans@kakao.com`, to: email, subject, text});
    },
    sendMailHtml : async function (email, subject, html, attachment) {
        let transporter = await nodemailer.createTransport({host, port:465 ,secure : true, auth : {user: mailAddress, pass: mailPassword}});
        await transporter.sendMail({
            from : `netalgans@kakao.com`,
            to: email,
            subject,
            html,
            attachment:attachment
        });
    }
}


module.exports = smtp;