import { Router } from "express";

const router = Router();

router.route("/health").get()

export default router;