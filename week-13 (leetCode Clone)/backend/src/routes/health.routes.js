import { Router } from "express";
import { apiHealthCheckup } from "../controllers/health.controller.js";
const router = Router();

router.route("/health").get(apiHealthCheckup);

export default router;
