import { Router } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  changeCurrentPassword,
  verifyEmail,
  forgotPasswordRequest,
  resetForgottenPassword,
  resendEmailVerification,
  refreshAccessToken,
} from "../controllers/user.controllers.js";
import { registerUserValidator,loginUserValidator } from "../validators/user.validator.js";
import { validator } from "../middlewares/validator.js";
import {protect} from '../middlewares/auth.js'

const router = Router();

router
  .route("/users/register")
  .post(registerUserValidator(), validator, registerUser);

router
  .route("/users/login")
  .post(loginUserValidator(), validator, loginUser);

router.route("/users/me").get(protect, getCurrentUser);

router.route("/users/logout").post(protect, logoutUser);

router.route("/users/verify/:token").post(verifyEmail);

// Todo: check the password
router.route("/user/email/verify").post(resendEmailVerification);

// Todo: check the password input
router.route("/users/password").patch(protect, changeCurrentPassword);

// Todo: check the email request
router.route('/users/forgot').post(forgotPasswordRequest);

router.route("/user/refreshToken").get(refreshAccessToken);

// Todo: check the email request and token
router.route('/users/forgot/:token').patch(resetForgottenPassword);

export default router;
