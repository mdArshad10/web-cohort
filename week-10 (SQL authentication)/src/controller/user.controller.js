import { AsyncHandler } from "../middlewares/AsyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { PrismaClient } from "@prisma/client";
import {
  hashPassword,
  comparePassword,
} from "../utils/hashOrComparePassword.js";
import { generateToken, generateRefreshToken } from "../utils/generateToken.js";
import { sendMailForVerify, sendMailForForget } from "../utils/sendMail.js";

const prisma = new PrismaClient();

// cookie options
const cookieOption = {
  httpOnly: true,
  secure: true,
  maxAge: new Date(Date.now() + 1000 * 60 * 60 * 15),
};

// @DESC: register the user
// @METHOD: [POST]      /api/v1/users/register
// @ACCESS: public
// TODO: not send the hashPassword
const register = AsyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new ApiError(400, "fill the all field");
  }
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new ApiError(400, "user already exist");
  }
  const hashedPassword = await hashPassword(password);
  const verifyToken = await generateRefreshToken();

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
      verifyToken,
    },
  });
  const messageId = await sendMailForVerify(email, verifyToken);
  if (!messageId) {
    throw new ApiError(400, "something wrong in sending mail");
  }

  res.status(200).json(new ApiResponse(201, user, "user created successfully"));
});

// @DESC: login the user
// @METHOD: [POST]      /api/v1/users/login
// @ACCESS: public
const login = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "fill the all field");
  }
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    throw new ApiError(400, "invalid email or password");
  }

  const isComparePassword = await comparePassword(
    password,
    existingUser.password
  );
  if (!isComparePassword) {
    throw new ApiError(400, "invalid email or password");
  }

  const token = generateToken(existingUser.id, existingUser.email);
  res
    .cookie("token", token, cookieOption)
    .json(new ApiResponse(200, existingUser, "user login successfully"));
});

// @DESC: logout the user
// @METHOD: [GET]      /api/v1/users/logout
// @ACCESS: private
const logout = AsyncHandler(async (req, res, next) => {
  res
    .cookie("token", "", {
      maxAge: new Date(0),
    })
    .status(200)
    .json(new ApiResponse(200, {}, "your are logout Successfully"));
});

// @DESC: get user detail
// @METHOD: [GET]      /api/v1/users/me
// @ACCESS: private
const getProfile = AsyncHandler(async (req, res, next) => {
  const { id } = req.user;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  res.status(200).json(new ApiResponse(200, user, "get user"));
});

// @DESC: Verify the user
// @METHOD: [GET]      /api/v1/users/verify/:token
// @ACCESS: public
const VerifyUser = AsyncHandler(async (req, res, next) => {
  const { token } = req.params;

  if (!token) {
    throw new ApiError(400, "fill the field first");
  }
  const user = await prisma.user.update({
    where: {
      verifyToken: token,
    },
    data: {
      isVerify: true,
      verifyToken: null,
    },
  });

  if (!user) {
    throw new ApiError(400, "user is not update");
  }
  res.status(200).json(new ApiResponse(200, user, "user verify the user"));
});

// @DESC: Reset password
// @METHOD: [PUT]      /api/v1/users/reset/:token
// @ACCESS: public
const resetPassword = AsyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  if (!newPassword) {
    throw new ApiError(400, "fill the field");
  }
  const hashedPassword = await hashPassword(newPassword);
  const user = await prisma.user.update({
    where: {
      restPasswordToken: token,
      restPasswordTokenExpire: {
        gte: new Date(Date.now()),
      },
    },
    data: {
      password: hashedPassword,
      restPasswordToken: null,
      restPasswordTokenExpire: null,
    },
  });
  if (!user) {
    throw new ApiError(400, "user is not updated");
  }
  res.status(200).json(new ApiResponse(200, user, "password is reset"));
});

// @DESC: forgot password
// @METHOD: [PUT]      /api/v1/users/forget-password
// @ACCESS: public
const forgotPassword = AsyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "fill the field");
  }
  const token = await generateRefreshToken();
  const timer = new Date(Date.now() + 1 * 1000 * 60 * 15);
  const messageId = await sendMailForForget(email, token);
  if (!messageId) {
    throw new ApiError(400, "something sending the mail");
  }
  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      restPasswordToken: token,
      restPasswordTokenExpire: timer,
    },
  });

  if (!user) {
    throw new ApiError(400, "user is not found");
  }

  res.status(200).json(new ApiResponse(200, user, "Email is sended"));
});

export {
  register,
  login,
  logout,
  getProfile,
  resetPassword,
  forgotPassword,
  VerifyUser,
};
