import nodemailer from "nodemailer";
import {
  NODEMAILER_HOST,
  NODEMAILER_PORT,
  NODEMAILER_AUTH_PASSWORD,
  NODEMAILER_AUTH_USER,
} from "../const/envConstant.js";
import Mailgen from "mailgen";

const transporter = nodemailer.createTransport({
  host: NODEMAILER_HOST,
  port: NODEMAILER_PORT,
  secure: NODEMAILER_PORT == 465 ? true : false, // true for port 465, false for other ports
  auth: {
    user: NODEMAILER_AUTH_USER,
    pass: NODEMAILER_AUTH_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendMail(options) {
  try {
    const mailGenerator = new Mailgen({
      theme: "salted",
      product: {
        name: "Task Manager",
        link: "https://taskmanager.app",
      },
    });

    const emailHtml = mailGenerator.generate(options.mailGenContent);

    const emailText = mailGenerator.generatePlaintext(options.mailGenContent);
    

    const info = await transporter.sendMail({
      from: "mail.taskmanager@example.com", // sender address
      to: options.email, // list of receivers
      subject: options.subject, // Subject line
      text: emailText, // plain text body
      html: emailHtml, // html body
    });

    console.log("Message sent: %s", info.messageId);
    return info.messageId;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const emailVerification = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our app! We're very excited to have you on board.",
      action: {
        instructions:
          "To verify your email please click on the following button:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export const forgotEmailVerification = (username,passwordResetUrl) =>{
  return {
    body: {
      name: username,
      intro: "We got a request to reset the password of our account",
      action: {
        instructions:
          "To reset your password click on the following button or link:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Reset password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
}

