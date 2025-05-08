import { Router } from "express";
import { register } from "../controllers/user.controller.js";
import { expressValidator } from "../middlewares/express-validator.js";
import { userRegisterValidator } from "../validators/user.validator.js";

const router = Router();

router
  .route("/register")
  .post(userRegisterValidator(), expressValidator, register);

export default router;
