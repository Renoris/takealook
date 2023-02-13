const nodemailer = require('nodemailer');
require('dotenv').config({path:"../../.env"});

const mailAddress = process.env.SMTP_ID;
const mailPassword = process.env.SMTP_PASSWORD;
const host = process.env.SMTP_HOST;

async function sendMail(email, subject, text) {
    try {
        let transporter = nodemailer.createTransport({host, port:465 ,secure : true, auth : {user: mailAddress, pass: mailPassword}});
        await transporter.sendMail({from : `netalgans@kakao.com`, to: email, subject, text});
    } catch (error) {
        console.log('메일보내기에 실패하셨습니다.')
    }

}

module.exports = sendMail;