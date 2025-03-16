import express from "express";
import {
  register,
  login,
  getProfile,
  logout,
} from "../controller/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(protect, logout);
router.route("/me").get(protect, getProfile);

export default router;
