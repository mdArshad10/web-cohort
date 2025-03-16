import { AsyncHandler } from "../middlewares/AsyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { PrismaClient } from "@prisma/client";
import {
  hashPassword,
  comparePassword,
} from "../utils/hashOrComparePassword.js";
import { generateToken } from "../utils/generateToken.js";

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

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });
  console.log(user);

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

  const token = generateToken(existingUser.id);
  res
    .cookie("token", token, cookieOption)
    .json(new ApiResponse(200, existingUser, "user login successfully"));
});

// @DESC: logout the user
// @METHOD: [GET]      /api/v1/users/logout
// @ACCESS: private
const logout = AsyncHandler(async(req,res,next)=>{

})

// @DESC: get user detail
// @METHOD: [GET]      /api/v1/users/me
// @ACCESS: private
const getProfile = AsyncHandler(async(req,res,next)=>{

})

export { register, login, logout, getProfile };
