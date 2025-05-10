import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export const expressValidator = (req, res, next) => {
  const error = validationResult(req.body);
  if (error.isEmpty()) return next();

  const extractedErrors = [];

  error.array().map((err) => extractedErrors.push(err.msg));
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: "invalid data is incoming",
    err: extractedErrors,
  });
};
