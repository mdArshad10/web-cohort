import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: process.env.NODEMAILER_HOST == 465 ? true : false, // true for port 465, false for other ports
  auth: {
    user: process.env.NODEMAILER_AUTH_USER,
    pass: process.env.NODEMAILER_AUTH_PASSWORD,
  },
});

// TODO: create a function for both type of mail
async function mailSender(to, token) {
  const verificationURL = `${process.env.BASIC_URL}/api/v1/users/verify/${token}`;
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to, // list of receivers
    subject: "Verification Mail", // Subject line
    text: `This is the verification mail. link :${verificationURL} `, // plain text body
    html: `<p>This is the verification mail <a href =${verificationURL} > verify </a></p>`, // html body
  });
  return info.messageId;
}

async function forgetPasswordSender(to, token) {
  const verificationURL = `${process.env.BASIC_URL}/api/v1/users/password/${token}`;
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to, // list of receivers
    subject: "Reset Password Mail", // Subject line
    text: `This is the mail for test the password. link :${verificationURL} `, // plain text body
    html: `<p>This is the forget's password mail <a href =${verificationURL} > Forget Password </a></p>`, // html body
  });
  return info.messageId;
}

export { mailSender, forgetPasswordSender };
