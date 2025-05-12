import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/api-error.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../lib/constants.js";
import { db } from "../lib/db.js";

export const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers?.["authorization"].split(" ")[1];
    if (!token) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "token is invalid");
    }
    const decode = await jwt.verify(token, JWT_SECRET);
    if (!decode) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "token is unauthorized");
    }
    console.log(decode);

    const user = await db.user.findUnique({
      where: {
        id: decode.id,
      },
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
    if (!user) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "token is unauthorized");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);

    res
      .status(error.statusCodes)
      .json(new ApiError(error.statusCodes, error.message, error));
  }
};

export const isAdmin = (role) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      if (role.include(user.role)) {
        return next();
      }
    } catch (error) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json(
          new ApiError(
            StatusCodes.UNAUTHORIZED,
            "your are not allowed for this route"
          )
        );
    }
  };
};
