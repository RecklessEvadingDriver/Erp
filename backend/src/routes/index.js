import express from 'express';
import authRoutes from './authRoutes.js';
import studentRoutes from './studentRoutes.js';
import teacherRoutes from './teacherRoutes.js';
import attendanceRoutes from './attendanceRoutes.js';
import feeRoutes from './feeRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';
import notificationRoutes from './notificationRoutes.js';
import uploadRoutes from './uploadRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/students', studentRoutes);
router.use('/teachers', teacherRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/fees', feeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/notifications', notificationRoutes);
router.use('/uploads', uploadRoutes);
router.get('/docs', (req, res) => {
  res.json({
    name: 'ERP API',
    version: '1.0.0',
    endpoints: [
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/auth/profile',
      'GET/POST /api/students',
      'GET/POST /api/teachers',
      'GET/POST /api/attendance',
      'GET/POST /api/fees',
      'POST /api/fees/pay',
      'GET /api/dashboard',
      'GET/POST /api/notifications',
      'POST /api/uploads/material',
    ],
  });
});

export default router;
