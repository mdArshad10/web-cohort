import { Router } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
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

export default router;
