import express from "express";
import { login, register, updatePassword, verifyUser } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/verify/:token", authUser, verifyUser);
router.put("/password", authUser, updatePassword);

export default router;
