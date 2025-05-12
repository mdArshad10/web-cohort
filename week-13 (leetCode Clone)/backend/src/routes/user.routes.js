import { Router } from "express";
import {
  getProfile,
  login,
  register,
  logoutUser,
} from "../controllers/user.controller.js";
import { expressValidator } from "../middlewares/express-validator.js";
import { userRegisterValidator } from "../validators/user.validator.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router
  .route("/register")
  .post(userRegisterValidator(), expressValidator, register);

router.route("/login").post(login);
router.route("/logout").get(auth, logoutUser);
router.route("/").get(auth, getProfile);

export default router;
