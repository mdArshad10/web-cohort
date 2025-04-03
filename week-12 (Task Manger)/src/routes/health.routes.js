import {Router} from 'express'
import {apiHealthCheckup} from '../controllers/health.controllers.js'

const router = Router();

router.route("/health").get(apiHealthCheckup)

export default router;