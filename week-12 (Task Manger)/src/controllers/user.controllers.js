import { BASIC_URL } from "../const/envConstant.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import {
  emailVerification,
  forgotEmailVerification,
  sendMail,
} from "../utils/nodemailer.js";
import crypto from "crypto";
import jwt from 'jsonwebtoken'

// cookieOptions
const cookieOptions = {
  httpOnly: true,
  secure: true,
  expireIn: new Date(Date.now + 1000 * 60 * 60 * 24 * 15),
};

// @Desc: register the user
// @Method: [POST]      /api/v1/user/register
// @Access: public
const registerUser = AsyncHandler(async (req, res, next) => {
  const { email, username, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ApiError(400, "user already present"));
  }
  const newUser = await User.create({
    username,
    email,
    password,
  });

  const accessToken = await newUser.generateAccessToken();
  const refreshToken = await newUser.generateRefreshToken();
  const { hashToken, expireToken } = await newUser.generateEmailVerification();

  newUser.refreshToken = refreshToken;
  newUser.emailVerificationToken = hashToken;
  newUser.emailVerificationExpiry = expireToken;

  await newUser.save();

  const verificationUrl = `${BASIC_URL}/api/v1/verify/${hashToken}`;

  await sendMail({
    email,
    subject: "Verify the user",
    mailGenContent: emailVerification(username, verificationUrl),
  });

  const {
    password: hashPassword,
    emailVerificationToken,
    emailVerificationExpiry,
    ...rest
  } = newUser._doc;

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(new ApiResponse(200, { rest }, "register the user"));
});

// @Desc: login the user
// @Method: [POST]      /api/v1/user/login
// @Access: public
const loginUser = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return next(new ApiError(400, "invalid email or password"));
  }

  const comparePassword = await existingUser.isComparePassword(password);
  if (!comparePassword) {
    return next(new ApiError(400, "invalid email or password"));
  }

  const { hashToken, expireToken } =
    await existingUser.generateEmailVerification();
  const accessToken = await existingUser.generateAccessToken();
  const refreshToken = await existingUser.generateRefreshToken();

  if (!existingUser.isEmailVerified) {
    const verificationUrl = `${BASIC_URL}/api/v1/verify/${hashToken}`;

    await sendMail({
      email,
      subject: "Verify the user",
      mailGenContent: emailVerification(existingUser.username, verificationUrl),
    });
    existingUser.emailVerificationToken = hashToken;
    existingUser.emailVerificationExpiry = expireToken;
  }

  existingUser.refreshToken = refreshToken;
  await existingUser.save();

  const {
    password: hashPassword,
    emailVerificationToken,
    emailVerificationExpiry,
    ...rest
  } = existingUser._doc;

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(new ApiResponse(200, { rest }, "register the user"));
});

// @Desc: logout the user
// @Method: [POST]      /api/v1/user/logout
// @Access: private
const logoutUser = AsyncHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("accessToken", "", {
      expireIn: new Date(0),
    })
    .json(new ApiResponse(200, {}, "logout the successfully"));
});

// @Desc: verify Email
// @Method: [POST]      /api/v1/user/verify/:token
// @Access: private
const verifyEmail = AsyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const existingUser = await User.findOne({
    emailVerificationToken: token,
    emailVerificationExpiry: {
      $gt: new Date(Date.now()),
    },
  });
  if (!existingUser) {
    return next(new ApiError(400, "invalid token or expire the token"));
  }

  const hashToken = await crypto
    .createHash("sha256", existingUser.emailVerificationToken)
    .digest("hex");
  if (!hashToken) {
    return next(new ApiError(400, "invalid token"));
  }

  existingUser.isEmailVerified = true;
  existingUser.emailVerificationExpiry = undefined;
  existingUser.emailVerificationToken = undefined;
  await existingUser.save();

  res.status(200).json(new ApiResponse(200, {}, "Email verify successfully"));
});

// @Desc: Send Email for Verification
// @Method: [POST]      /api/v1/user/email/verify
// @Access: public
const resendEmailVerification = AsyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({
    email,
    isEmailVerified: false,
  });

  if (!user) {
    return next(new ApiError(400, "email is not found"));
  }
  const { unHashToken, expireToken } = await user.generateEmailVerification();

  user.emailVerificationToken = unHashToken;
  user.emailVerificationExpiry = expireToken;

  const verifyEmailUrl = `${BASIC_URL}/users/verify/${unHashToken}`;

  await sendMail({
    email,
    subject: "Email Verification",
    mailGenContent: emailVerification(user.username, verifyEmailUrl),
  });

  await user.save();

  res.status(200).json(new ApiResponse(200, {}, "Email is sended"));
});

// @Desc: Reset forgot password
// @Method: [POST]      /api/v1/user/forgot/:token
// @Access: public
const resetForgottenPassword = AsyncHandler(async (req, res, next) => {
  const { newPassword, confirmPassword } = req.body;
  const { token } = req.params;

  if (newPassword !== confirmPassword) {
    return next(
      new ApiError(400, "new password and confirm password is not matching"),
    );
  }

  const user = await User.findOne({
    forgotPasswordToken: token,
    forgotPasswordExpiry: {
      $gt: new Date(Date.now()),
    },
  });

  if (!user) {
    return next(new ApiError(400, "invalid token or token expire"));
  }

  user.password = confirmPassword;
  user.forgotPasswordExpiry = undefined;
  user.forgotPasswordToken = undefined;

  await user.save();

  res.status(200).json(new ApiResponse(200, {}, "password is reset"));
});

// @Desc: Reset forgot password
// @Method: [POST]      /api/v1/user/forgot/:token
// @Access: public
const refreshAccessToken = AsyncHandler(async (req, res,next) => {
  const { refreshToken } = req.body;
  const user = await User.findOne({
    refreshToken
  });

  if(!user){
    return next(new ApiError(400,"Token is invalid"))
  }

  const decode = await jwt.verify(refreshToken, ACCESS_TOKEN);

  if(!decode){
    return next(new ApiError(400, "refresh token is invalid"))
  }

  const accessTokenGenerate = await existingUser.generateAccessToken();
  const refreshTokenGenerate = await existingUser.generateRefreshToken();

  user.refreshToken = refreshTokenGenerate;

   const {
     password: hashPassword,
     emailVerificationToken,
     emailVerificationExpiry,
     ...rest
   } = user._doc;

  await user.save()
  res.status(200)
   .cookie('accessToken', accessTokenGenerate, cookieOptions)
  .json(
    new ApiResponse(200,{rest},"Refresh Token is updated")
  )

});

// @Desc: forgot password Request
// @Method: [POST]      /api/v1/user/forgot
// @Access: public
const forgotPasswordRequest = AsyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ApiError(400, "user is not found"));
  }
  const { unHashToken, expireToken } = await user.generateEmailVerification();

  user.forgotPasswordToken = unHashToken;
  user.forgotPasswordExpiry = expireToken;

  const forgotPasswordUrl = `${BASIC_URL}/users/forgot/${unHashToken}`;

  await sendMail({
    email,
    subject: "Forgot password",
    mailGenContent: forgotEmailVerification(user.username, forgotPasswordUrl),
  });

  await user.save();

  res.status(200).json(new ApiResponse(200, {}, "Email is sended"));
});

// @Desc: change the password
// @Method: [PATCH]      /api/v1/user/password
// @Access: private
const changeCurrentPassword = AsyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  const existingUser = await User.findById(req.user._id);

  const comparePassword = await existingUser.isComparePassword(oldPassword);
  if (!comparePassword) {
    return next(new ApiError(400, "your are entered wrong password"));
  }

  existingUser.password = newPassword;

  await existingUser.save();

  res.status(200).json(new ApiResponse(200, {}, "password is changed"));
});

// @Desc: Get user detail
// @Method: [GET]      /api/v1/user/me
// @Access: private
const getCurrentUser = AsyncHandler(async (req, res, next) => {
  const user = req.user;
  res.status(200).json(new ApiResponse(200, { user }, "get user detail"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  changeCurrentPassword,
  verifyEmail,
  forgotPasswordRequest,
  resetForgottenPassword,
  resendEmailVerification,
  refreshAccessToken,
};
