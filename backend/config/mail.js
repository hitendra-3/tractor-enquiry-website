const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_APP_PASSWORD
  }
});

const sendMail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"Tractor Enquiry System" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html
  });
};

module.exports = sendMail;
