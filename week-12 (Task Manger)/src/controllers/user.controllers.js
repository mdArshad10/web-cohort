import { BACKEND_URL } from "../const/envConstant.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import { emailVerification, sendMail } from "../utils/nodemailer.js";

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
  const { unHashToken, hashToken, expireToken } =
    await newUser.generateEmailVerification();

  newUser.refreshToken = refreshToken;
  newUser.emailVerificationToken = hashToken;
  newUser.emailVerificationExpiry = expireToken;

  await newUser.save();

  const verificationUrl = `${BACKEND_URL}/api/v1/verify/${hashToken}`;

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

  const { unHashToken, hashToken, expireToken } =
    await existingUser.generateEmailVerification();
    const accessToken = await existingUser.generateAccessToken();
    const refreshToken = await existingUser.generateRefreshToken();
    
    // BUG: Email is not working 
    if (!existingUser.isEmailVerified) {
      const verificationUrl = `${BACKEND_URL}/api/v1/verify/${hashToken}`;
      
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
  res.status(200).cookie("accessToken", "",{
    expireIn:new Date(0)
  }).json(
    new ApiResponse(200, {}, "logout the successfully")
  )
});

const verifyEmail = AsyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const resendEmailVerification = AsyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const resetForgottenPassword = AsyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const refreshAccessToken = AsyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const forgotPasswordRequest = AsyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});


// @Desc: change the password
// @Method: [PATCH]      /api/v1/user/password
// @Access: private
const changeCurrentPassword = AsyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  
  const existingUser = await User.findById(req.user._id);

  const comparePassword = await existingUser.isComparePassword(oldPassword);
  if(!comparePassword){
    return next(new ApiError(400,"your are entered wrong password"))
  }

  existingUser.password = newPassword;

  await existingUser.save();

  res.status(200).json(
    new ApiResponse(200,{},"password is changed")
  )
});

// @Desc: Get user detail
// @Method: [GET]      /api/v1/user/me
// @Access: private
const getCurrentUser = AsyncHandler(async (req, res) => {
  const user = req.user;
  res.status(200).json(
    new ApiResponse(200, {user}, "get user detail")
  )
});

export { registerUser, loginUser, logoutUser, getCurrentUser, changeCurrentPassword };
