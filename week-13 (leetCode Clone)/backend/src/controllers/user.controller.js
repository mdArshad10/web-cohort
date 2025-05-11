import { AsyncHandler } from "../middlewares/asyncHandler.js";
import { ApiError } from "../utils/api-error.js";
import { db } from "../lib/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/api-response.js";
import { StatusCodes } from "http-status-codes";
import { JWT_EXPIRE, JWT_SECRET, NODE_ENV } from "../lib/constants.js";

// @Description: register the user
// @Method: POST    api/v1/users/register
// @Access: public
const register = AsyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const existUser = await db.User.findUnique({
    where: {
      email,
    },
  });
  if (existUser) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(new ApiError(StatusCodes.BAD_REQUEST, "user already exist"));
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await db.user.create({
    data: {
      username,
      email,
      password: hashPassword,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVtYWxlJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
  });
  res
    .status(StatusCodes.CREATED)
    .json(new ApiResponse(StatusCodes.CREATED, newUser, "user is register"));
});

// @Description: login the user
// @Method: POST    api/v1/users/login
// @Access: public
const login = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const existUser = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!existUser) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        new ApiError(StatusCodes.BAD_REQUEST, "email or password is invalid")
      );
  }
  const isComparePassword = await bcrypt.compare(password, existUser.password);
  if (!isComparePassword) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        new ApiError(StatusCodes.BAD_REQUEST, "email or password is invalid")
      );
  }
  const token = jwt.sign({ id: existUser._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
  res
    .status(StatusCodes.OK)
    .cookie("token", token, {
      secure: NODE_ENV == "development" ? false : true,
      httpOnly: true,
      sameSite:"strict",
      maxAge: new Date(Date.now() + 1000 * 60 * 60 * 15),
    })
    .json(new ApiResponse(StatusCodes.ACCEPTED, existUser, "login the user"));
});

// @Description: get the user detail
// @Method: GET    api/v1/users
// @Access: private
const getProfile = AsyncHandler(async (req, res, next) => {
  const user = req.user;
  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, user, "get user profile"));
});

export { register, login, getProfile };
