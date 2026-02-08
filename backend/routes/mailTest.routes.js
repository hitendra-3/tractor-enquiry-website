const { addRoute } = require("../utils/router");
const sendMail = require("../config/mail");

addRoute("POST", "/mail/test", async (req, res) => {
  try {
    await sendMail({
      to: process.env.MAIL_USER,
      subject: "Mail Test Successful 🚜",
      html: "<h2>Your email system is working!</h2>"
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Email sent successfully" }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
});
