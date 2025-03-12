import { User } from "../models/User.model.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { AsyncHandler } from "../middlewares/asyncHandler.js";
import crypto from "crypto";
import { mailSender, forgetPasswordSender } from "../utils/sendMail.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// cookie option
const cookieOption = {
  httpOnly: true,
  sameSite: true,
  secure: true,
  expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
};

// generate the token
function generateToken() {
  return crypto.randomBytes(36).toString("hex");
}

// @DESC: Register the user
// @METHOD: [POST]  /api/v1/register
// @ACCESS: public
const register = AsyncHandler(async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
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
  const token = generateToken();

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
// @ACCESS: private
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

// @DESC: update the password
// @METHOD: [PUT]  /api/v1/password
// @ACCESS: private
const updatePassword = AsyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = req.user;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      message: "fill all the field",
    });
  }

  const existingUser = await User.findById(user._id);

  const isComparePassword = await bcrypt.compare(
    oldPassword,
    existingUser.password
  );
  if (!isComparePassword) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  existingUser.password = newPassword;
  await existingUser.save();

  res.status(200).json({
    message: "Password updated Successfully",
    success: true,
  });
});

// @DESC: forget password
// @METHOD: [PUT]  /api/v1/forgetPassword
// @ACCESS: public
const forgetPassword = AsyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "fill the email",
    });
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({
      message: "invalid email",
    });
  }

  const token = generateToken();
  existingUser.resetPasswordToken = token;
  existingUser.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 15);
  await forgetPasswordSender(existingUser.email, token);

  await existingUser.save();

  res.status(200).json({
    message: "Mail is sended into the email",
    success: true,
  });
});

// @DESC: rest password
// @METHOD: [PUT]  /api/v1/password/:token
// @ACCESS: public
const resetPassword = AsyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({
      message: "fill the password",
    });
  }

  const existingUser = await User.findOne({
    resetPasswordToken: token,
  });
  if (existingUser) {
    return res.status(400).json({
      message: "user not exist",
    });
  }
  const compareTime = existingUser.resetPasswordExpires >= Date.now();

  if (!compareTime) {
    existingUser.resetPasswordToken = null;
    res.status(400).json({
      message: "time out for rest password",
    });
  }

  existingUser.password = newPassword;
  existingUser.resetPasswordToken = null;
  existingUser.resetPasswordExpires = null;

  await existingUser.save();
  res.status(200).json({
    message: "password reset success",
    success: true,
  });
});

export {
  register,
  login,
  verifyUser,
  updatePassword,
  forgetPassword,
  resetPassword,
};
