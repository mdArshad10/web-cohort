import { User } from "../models/User.model.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { AsyncHandler } from "../middlewares/asyncHandler.js";
import crypto from "crypto";
import { mailSender } from "../utils/sendMail.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const cookieOption = {
  httpOnly: true,
  sameSite: true,
  secure: true,
  expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
};

// @DESC: Register the user
// @METHOD: [POST]  /api/v1/register
// @ACCESS: public
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

// @DESC: login the user
// @METHOD: [POST]  /api/v1/login
// @ACCESS: public
const login = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "all field is required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const isComparePassword = await bcrypt.compare(password, user.password);

  if (!isComparePassword) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15d",
    }
  );

  const { password: userPassword, ...existingUser } = user._doc;

  res.cookie("access_token", accessToken, cookieOption).status(200).json({
    message: "login Successfully",
    success: true,
    user: existingUser,
  });
});

// @DESC: verify the user
// @METHOD: [GET]  /api/v1/verify/:token
// @ACCESS: public
const verifyUser = AsyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const user = req.user;

  const compareVerificationToken =
    user.verificationToken.toString() === token.toString();
  console.log(compareVerificationToken);

  if (!compareVerificationToken) {
    return res.status(400).json({
      message: "invalid token send in mail",
    });
  }

  user.isVerified = true;
  user.verificationToken = null;
  await user.save();
  res.status(200).json({
    message: "user is verified",
  });
});

export { register, login, verifyUser };
