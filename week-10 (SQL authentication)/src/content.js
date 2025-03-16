import { config } from "dotenv";

config({
  path: "src/.env",
});

const PORT = process.env.PORT || 5000;
const SECRET_TOKEN = process.env.SECRET_TOKEN;
const BASIC_URL = process.env.BASIC_URL;

const NODEMAILER_HOST = process.env.NODEMAILER_HOST;
const NODEMAILER_PORT = process.env.NODEMAILER_PORT;
const NODEMAILER_AUTH_USER = process.env.NODEMAILER_AUTH_USER;
const NODEMAILER_AUTH_PASSWORD = process.env.NODEMAILER_AUTH_PASSWORD;

export {
  PORT,
  SECRET_TOKEN,
  BASIC_URL,
  NODEMAILER_HOST,
  NODEMAILER_PORT,
  NODEMAILER_AUTH_USER,
  NODEMAILER_AUTH_PASSWORD,
};
