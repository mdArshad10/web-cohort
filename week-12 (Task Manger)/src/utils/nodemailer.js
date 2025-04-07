import nodemailer from "nodemailer";
import {NODEMAILER_HOST, NODEMAILER_PORT,NODEMAILER_AUTH_PASSWORD,NODEMAILER_AUTH_USER} from '../const/envConstant.js'

const transporter = nodemailer.createTransport({
  host: NODEMAILER_HOST,
  port: NODEMAILER_PORT,
  secure: NODEMAILER_PORT == 465 ? true :  false, // true for port 465, false for other ports
  auth: {
    user: NODEMAILER_AUTH_USER,
    pass: NODEMAILER_AUTH_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendMail() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  
}


