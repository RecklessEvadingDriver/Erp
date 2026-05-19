import express from 'express';
import { createNotification, listNotifications, notificationSchema } from '../controllers/notificationController.js';
import { authorize, protect } from '../middleware/auth.js';
import validate from '../middleware/validate.js';

const router = express.Router();

router.get('/', protect, listNotifications);
router.post('/', protect, authorize('super-admin', 'admin', 'teacher'), validate(notificationSchema), createNotification);

export default router;
