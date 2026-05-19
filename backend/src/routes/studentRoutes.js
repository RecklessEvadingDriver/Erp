import express from 'express';
import { createStudent, listStudents, studentSchema } from '../controllers/studentController.js';
import { authorize, protect } from '../middleware/auth.js';
import validate from '../middleware/validate.js';

const router = express.Router();

router.get('/', protect, authorize('super-admin', 'admin', 'teacher'), listStudents);
router.post('/', protect, authorize('super-admin', 'admin'), validate(studentSchema), createStudent);

export default router;
