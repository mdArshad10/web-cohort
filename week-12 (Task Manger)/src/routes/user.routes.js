import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { registerUserValidator } from "../validators/user.validator.js";
import { validator } from "../middlewares/validator.js";

const router = Router();

router
  .route("/user/register")
  .post(registerUserValidator(), validator, registerUser);

export default router;
