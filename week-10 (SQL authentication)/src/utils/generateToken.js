import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../content.js";
import crypto from "crypto";

const generateToken = (userId, email) => {
  return jwt.sign({ id: userId, email }, SECRET_TOKEN, {
    expiresIn: "15d",
  });
};

const decodeToken = (token) => {
  return jwt.decode(token, SECRET_TOKEN);
};

const generateRefreshToken = async () => {
  return await crypto.randomBytes(16).toString("hex");
};

export { generateToken, decodeToken, generateRefreshToken };
