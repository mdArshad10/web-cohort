import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../content.js";
import crypto from "crypto";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, SECRET_TOKEN, {
    expiresIn: "15d",
  });
};

const decodeToken = (token) => {
  return jwt.decode(token, SECRET_TOKEN);
};

const generateRefreshToken = () => {
  return crypto.randomBytes(16).toString("hex");
};

export { generateToken, decodeToken, generateRefreshToken };
