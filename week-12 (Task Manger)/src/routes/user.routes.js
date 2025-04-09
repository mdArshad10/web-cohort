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
  .route("/register")
  .post(registerUserValidator(), validator, registerUser);

router
  .route("/login")
  .post(loginUserValidator(), validator, loginUser);

router.route("/me").get(protect, getCurrentUser);

router.route("/logout").post(protect, logoutUser);

router.route("/verify/:token").post(verifyEmail);

// Todo: check the password
router.route("/email/verify").post(resendEmailVerification);

// Todo: check the password input
router.route("/password").patch(protect, changeCurrentPassword);

// Todo: check the email request
router.route('/forgot').post(forgotPasswordRequest);

router.route("/refreshToken").get(refreshAccessToken);

// Todo: check the email request and token
router.route('/forgot/:token').patch(resetForgottenPassword);

export default router;
