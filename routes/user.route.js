

import { getAllUsers, registerUser, loginUser } from '../controllers/user.controller.js'
import { userDt } from '../schemas_/user.schema.js';
import { validateBody } from '../middlewares/validate.middleware.js'
import { Router } from "express";

const router = Router();

router.get('/', getAllUsers);
router.post('/register',validateBody(userDt),  registerUser);
router.post('/login',  loginUser);

export default router;

