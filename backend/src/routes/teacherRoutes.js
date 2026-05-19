import express from 'express';
import { createTeacher, listTeachers, teacherSchema } from '../controllers/teacherController.js';
import { authorize, protect } from '../middleware/auth.js';
import validate from '../middleware/validate.js';

const router = express.Router();

router.get('/', protect, authorize('super-admin', 'admin'), listTeachers);
router.post('/', protect, authorize('super-admin', 'admin'), validate(teacherSchema), createTeacher);

export default router;
