const nodemailer = require('nodemailer');

const sendEmailUtility = async (email, emailText, emailSubject) => {
  const transporter = nodemailer.createTransport({
    // service: "gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
    tls: { rejectUnauthorized: false },
  });

  const mailOptions = {
    from: `Inventory <${process.env.EMAIL}>`,
    to: email,
    subject: emailSubject,
    text: emailText.toString(),
  };
  return transporter.sendMail(mailOptions);
};

module.exports = sendEmailUtility;
