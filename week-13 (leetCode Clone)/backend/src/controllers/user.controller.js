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
    return next(new ApiError(StatusCodes.BAD_REQUEST, `user already exist`));
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await db.user.create({
    data: {
      username,
      email,
      password: hashPassword,
      image:
        "https://i.pinimg.com/736x/97/3c/fc/973cfcca079333c9657855db38bdc79f.jpg",
    },
    omit: {
      password: false,
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
      return next(
        new ApiError(StatusCodes.BAD_REQUEST, `email or password is invalid`)
      );
  }
  const isComparePassword = await bcrypt.compare(password, existUser.password);
  if (!isComparePassword) {
    return next(
      new ApiError(StatusCodes.BAD_REQUEST, `email or password is invalid`)
    );
  }
  const token = jwt.sign({ id: existUser.id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });

  const user = await db.user.findUnique({
    where: { email },
    select: {
      id: true,
      username: true,
      email: true,
      image: true,
      role: true,
      createAt: true,
      updatedAt: true,
    },
  });

  res
    .status(StatusCodes.OK)
    .cookie("token", token, {
      secure: NODE_ENV == "development" ? false : true,
      httpOnly: true,
      sameSite: "strict",
      maxAge: new Date(Date.now() + 1000 * 60 * 60 * 15),
    })
    .json(new ApiResponse(StatusCodes.ACCEPTED, user, "login the user"));
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

// @Description: logout the user
// @Method: GET    api/v1/users/logout
// @Access: private
const logoutUser = AsyncHandler(async (req, res, next) => {
  res
    .status(StatusCodes.OK)
    .cookie("token", "", {
      expiresIn: new Date(0),
    })
    .json(new ApiResponse(StatusCodes.OK, {}, "user logout successfully"));
});

export { register, login, getProfile, logoutUser };
