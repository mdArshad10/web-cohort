import express from "express";
import { login, register, verifyUser } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/verify/:token", authUser, verifyUser);

export default router;
