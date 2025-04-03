import { ApiError } from "../utils/api-error.js";
import { validationResult } from "express-validator";

export const validator = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  let errorMessage = [];
  errors.array.map((err) =>
    errorMessage.push({
      [err.path]: err.msg,
    }),
  );
  res
    .status(400)
    .json(new ApiError(400, "user input data validated", errorMessage));
};
