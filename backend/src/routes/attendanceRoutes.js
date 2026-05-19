import express from 'express';
import { listAttendance, markAttendance, attendanceSchema } from '../controllers/attendanceController.js';
import { authorize, protect } from '../middleware/auth.js';
import validate from '../middleware/validate.js';

const router = express.Router();

router.get('/', protect, authorize('super-admin', 'admin', 'teacher', 'parent'), listAttendance);
router.post('/', protect, authorize('super-admin', 'admin', 'teacher'), validate(attendanceSchema), markAttendance);

export default router;
