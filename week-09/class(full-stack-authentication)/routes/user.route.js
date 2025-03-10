import express from "express";
import {
  forgetPassword,
  login,
  register,
  resetPassword,
  updatePassword,
  verifyUser,
} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/verify/:token", authUser, verifyUser);
router.put("/password", authUser, updatePassword);
router.put("/password/:token", resetPassword);
router.put("/forgetPassword", forgetPassword);

export default router;
