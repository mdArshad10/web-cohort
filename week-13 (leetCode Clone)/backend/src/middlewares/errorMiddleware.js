import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/api-error.js ";

export const errorMiddleware = (err, req, res, next) => {
  const message = err.message ?? "something want wrong";
  const statusCode = err.statusCode ?? StatusCodes.BAD_REQUEST;

  res
    .status(statusCode)
    .json(new ApiError(statusCode, message, err, err.stack));
};
