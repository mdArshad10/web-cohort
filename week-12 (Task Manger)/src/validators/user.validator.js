import {body} from 'express-validator'

export const registerUserValidator = ()=>{
    return [
      body("username")
        .notEmpty()
        .withMessage("username is required")
        .trim()
        .isLength({ min: 5, max: 15 })
        .withMessage("username is must be in range of 5 to 15 characters")
        .escape(),
      body("email")
        .notEmpty()
        .withMessage("email is required")
        .trim()
        .isEmail()
        .withMessage("email is invalid")
        .normalizeEmail(),
      body("password")
        .notEmpty()
        .withMessage("password is required")
        .trim()
        .isStrongPassword()
        .withMessage(
          "password is must be either minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1",
        ),
    ];
}


