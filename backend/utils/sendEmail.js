const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    // host: process.env.SMPT_HOST,
    // port: process.env.SMPT_PORT,
    // service: process.env.SMPT_SERVICE,
    // auth: {
    //   user: process.env.SMPT_MAIL,
    //   pass: process.env.SMPT_PASSWORD,
    // },
    //Mailtrap
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3949b6071a3505",
      pass: "4e3506e11acac6"
    }
  });
  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;