const nodemailer = require("nodemailer");
require("dotenv").config();

const user_mail = process.env.MAIL_USER;
const mail_pass_key = process.env.MAIL_PASS_KEY;

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: user_mail,
    pass: mail_pass_key,
  },
});
const mail = async (userEmail, otp, type = "send") => {
  const subject =
    type === "resend" ? "Your New OTP Verification Code" : "OTP Verification";
  const text =
    type === "resend"
      ? `Here is your new OTP: ${otp}. It will expire in 5 minutes.`
      : `To verify, enter the below OTP:${otp}`;
  const mailOptions = {
    from: user_mail,
    to: userEmail,
    subject,
    text,
  };
  try {
    const info = await transport.sendMail(mailOptions);
    console.log("Email send", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw err;
  }
};

module.exports = mail;
