import express from 'express';
import { authorize, protect } from '../middleware/auth.js';
import { upload, uploadStudyMaterial } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/material', protect, authorize('super-admin', 'admin', 'teacher'), upload.single('file'), uploadStudyMaterial);

export default router;
