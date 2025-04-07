import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controllers.js";
import { registerUserValidator,loginUserValidator } from "../validators/user.validator.js";
import { validator } from "../middlewares/validator.js";

const router = Router();

router
  .route("/users/register")
  .post(registerUserValidator(), validator, registerUser);

router
  .route("/users/login")
  .post(loginUserValidator(), validator, loginUser);

export default router;
