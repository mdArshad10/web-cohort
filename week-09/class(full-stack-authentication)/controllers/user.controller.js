import { User } from "../models/User.model.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { AsyncHandler } from "../middlewares/asyncHandler.js";
import crypto from "crypto";
import { mailSender } from "../utils/sendMail.js";
import jwt from "jsonwebtoken";

const register = AsyncHandler(async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    //  TODO: response is send in json formate
    return next(new ErrorHandler("all filed is not present", 404));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "user already exist",
    });
  }

  const newUser = await User.create({
    email,
    username,
    password,
  });

  // create a token
  const token = crypto.randomBytes(36).toString("hex");

  // send a mail
  const messageId = await mailSender(email, token);

  if (!messageId) {
    return res.status(400).json({
      message: "Something wrong with message sender",
    });
  }

  newUser.verificationToken = token;

  await newUser.save();

  const { password: userPassword, ...user } = newUser._doc;

  res.status(200).json({
    message: "user is created",
    success: true,
    user,
  });
});

export { register };
