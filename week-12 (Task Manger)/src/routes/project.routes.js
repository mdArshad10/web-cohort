import {Router} from 'express'
import {validator} from '../middlewares/validator.js'
import {protect} from '../middlewares/auth.js'
import {createProject} from '../controllers/project.controllers.js'


const router = Router();

router.route('/').post(protect, createProject);


export default router;