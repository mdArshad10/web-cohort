import {config} from 'dotenv'
config({
    path:"./.env"
})

export const PORT = process.env.PORT || 3000;
export const MONGO_URL = process.env.MONGO_URL;
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
export const ACCESS_TOKEN_EXPIRE = process.env.ACCESS_TOKEN_EXPIRE;
export const REFRESH_TOKEN= process.env.REFRESH_TOKEN;
export const REFRESH_TOKEN_EXPIRE = process.env.REFRESH_TOKEN_EXPIRE;

export const NODEMAILER_HOST = process.env.NODEMAILER_HOST;
export const NODEMAILER_PORT = process.env.NODEMAILER_PORT;
export const NODEMAILER_AUTH_USER = process.env.NODEMAILER_AUTH_USER;
export const NODEMAILER_AUTH_PASSWORD = process.env.NODEMAILER_AUTH_PASSWORD;
