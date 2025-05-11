import { config } from "dotenv";

config({
  path: "./.env",
});

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV;
export const DATABASE_URL = process.env.DATABASE_URL;
export const ORIGIN = process.env.ORIGIN;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRE = process.env.JWT_EXPIRE;
export const JUDGE0_API = process.env.JUDGE0_API;
