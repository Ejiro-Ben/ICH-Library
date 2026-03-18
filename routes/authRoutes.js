import { Router } from 'express';
import authController from '../controllers/authController.js';

const router = Router();

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
import authMiddleware from '../middleware/auth.js';

router.get('/admin/uploads', authMiddleware, authController.admin_uploads_get);

export default router;