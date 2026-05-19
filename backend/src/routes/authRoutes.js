import express from 'express';
import { login, loginSchema, profile, register, registerSchema } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import activityLogger from '../middleware/activityLogger.js';

const router = express.Router();

router.post('/register', validate(registerSchema), activityLogger(() => 'auth.register'), register);
router.post('/login', validate(loginSchema), activityLogger(() => 'auth.login'), login);
router.get('/profile', protect, profile);

export default router;
