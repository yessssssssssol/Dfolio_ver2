import { nodemailer } from "nodemailer";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASSWORD, // 앱 비밀번호
  },
});

module.exports = (to, subject, text) =>
  new Promise((resolve, reject) => {
    const message = {
      to,
      subject,
      text,
    };

    transport.sendMail(message, (err, info) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(info);
    });
  });
