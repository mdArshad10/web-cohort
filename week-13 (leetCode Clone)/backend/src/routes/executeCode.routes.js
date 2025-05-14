import { Router } from "express";
import { executeCode } from "../controllers/executeCode.controller.js";
import { auth, isAdmin } from "../middlewares/auth.js";

const router = Router();

router.route("/").post(executeCode);

export default router;
