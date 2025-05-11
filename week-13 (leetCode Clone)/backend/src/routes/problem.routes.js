import { Router } from "express";
import { createProblem,getAllProblem,getProblem,deleteProblem,updateProblem,solvedProblem } from "../controllers/problem.controller.js";
import { expressValidator } from "../middlewares/express-validator.js";
import { userRegisterValidator } from "../validators/user.validator.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

export default router;