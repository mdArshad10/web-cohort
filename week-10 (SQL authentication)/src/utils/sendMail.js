import nodemailer from "nodemailer";
import {
  NODEMAILER_HOST,
  NODEMAILER_PORT,
  NODEMAILER_AUTH_USER,
  NODEMAILER_AUTH_PASSWORD,
  BASIC_URL,
} from "../content.js";

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
export async function sendMailForVerify(email, token) {
  try {
    const url = `${BASIC_URL}/api/v1/user/verify/${token}`;
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: email, // list of receivers
      subject: "Verify the user", // Subject line
      text: `To Verify the user link given below: ${url} `, // plain text body
      html: `<p>verify user <a href=${url}>link</a></p>`, // html body
    });

    if (!info) {
      return null;
    }
    return true;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
