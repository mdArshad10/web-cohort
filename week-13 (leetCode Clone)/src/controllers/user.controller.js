import { AsyncHandler } from "../middlewares/asyncHandler.js";
import { ApiError } from "../utils/error.js";
import { db } from "../lib/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/api-response.js";
import { StatusCodes } from "http-status-codes";

// @Description: register the user
// @Method: POST    api/v1/users/register
// @Access: public
const register = AsyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const existUser = await db.user.findUnique({
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
  const token = jwt.sign({ id: existUser._id }, "abakdfadkfadfasdfadfasdf", {
    expiresIn: 1000 * 60 * 60 * 24 * 15,
  });
  res
    .status(StatusCodes.OK)
    .cookie("token", token, {
      secure: true,
      httpOnly: true,
    })
    .json(new ApiResponse(StatusCodes.ACCEPTED, existUser, "login the user"));
});

export { register };
