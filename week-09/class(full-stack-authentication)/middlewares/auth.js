import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const token =
    req.cookies?.access_token || req.headers?.authorization?.split(" ")[1];

  try {
    if (!token) {
      return res.status(400).json({
        message: "token is missing",
      });
    }
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decode) {
      return res.status(400).json({
        message: "invalid token",
      });
    }    

    const user = await User.findById(decode.id).select("-password");
    
    if (!user) {
      return res.status(400).json({
        message: "user is not found for this token",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({
      message: error.message || "something wrong in token",
    });
  }
};
