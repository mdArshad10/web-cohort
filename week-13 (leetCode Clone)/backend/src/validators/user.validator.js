import { body } from "express-validator";

export const userRegisterValidator = () => {
  return [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("username is required")
      .isLength({ min: 5, max: 15 })
      .withMessage("username is must be in range of 5 to 15 characters")
      .escape(),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email is invalid")
      .normalizeEmail(),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("password is required")
      .isStrongPassword()
      .withMessage(
        "password is must be either minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
      ),
  ];
};
