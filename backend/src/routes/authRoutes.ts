import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/registrar', authController.registrar);
router.post('/login', authController.login);
router.get('/me', authMiddleware, authController.me);

export default router;