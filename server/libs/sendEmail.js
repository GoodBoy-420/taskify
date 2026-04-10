import nodemailer from "nodemailer";

import config from "../configs/config.js";

export const sendEmail = async (emailTO, emailSubj, emailText) => {
  let transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: false,
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
    tls: { rejectUnauthorized: false },
  });

  let mailOptions = {
    from: '"OTP Code 👻" <info@demomailtrap.com>',
    to: emailTO,
    subject: emailSubj,
    text: emailText,
  };

  return await transporter.sendMail(mailOptions);
};
