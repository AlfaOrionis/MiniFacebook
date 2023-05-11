process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (userEmail, user, token, emailType) => {
  let mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "MiniFacebook",
      link: `${"www.MiniFacebook.com"}`,
    },
  });
  const name = user.firstname;
  const TheRegisterEmail = {
    body: {
      name: name,
      intro:
        "Welcome to MiniFacebook! We're very excited to have you on board.",
      action: {
        instructions: "Please click this link to verify your account ",
        button: {
          color: "rgb(255, 155, 0)",
          text: "Confirm your account",
          link: `${process.env.VERIFY_SITE}/verification?t=${token}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  const TheResetPasswordEmail = {
    body: {
      name: name,
      intro:
        "You have received this email because a password reset request for your account was received.",
      action: {
        instructions: "Please click this link to verify your password ",
        button: {
          color: "rgb(200, 0, 0)",
          text: "Reset password",
          link: `${process.env.VERIFY_SITE}/reset-password?t=${token}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
  const emailToSend =
    (emailType === "Register" && TheRegisterEmail) ||
    (emailType === "ResetPassword" && TheResetPasswordEmail);

  const emailBody = mailGenerator.generate(emailToSend);

  let message = {
    from: '"MiniFacebook 🏍️" <minifacebook@gmail.com>',
    to: userEmail,
    subject: "Welcome to Minifacebook",
    html: emailBody,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log("Error occurred");
      console.log(error.message);
    }

    console.log("Message sent successfully!");
  });
};

module.exports = sendEmail;
