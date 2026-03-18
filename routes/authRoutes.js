import { Router } from 'express';
import authController from '../controllers/authController.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/verify', authController.verify_get);

router.get('/admin/uploads', authMiddleware, authController.admin_uploads_get);

export default router;