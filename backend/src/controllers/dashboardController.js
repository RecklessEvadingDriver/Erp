import asyncHandler from '../utils/asyncHandler.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import Fee from '../models/Fee.js';
import Attendance from '../models/Attendance.js';

export const getDashboard = asyncHandler(async (req, res) => {
  const [students, teachers, fees, attendanceToday] = await Promise.all([
    Student.countDocuments(),
    Teacher.countDocuments(),
    Fee.aggregate([{ $group: { _id: null, total: { $sum: '$total' }, paid: { $sum: '$paid' } } }]),
    Attendance.countDocuments({ date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } }),
  ]);

  res.json({
    students,
    teachers,
    attendanceToday,
    fees: fees[0] || { total: 0, paid: 0 },
    branches: ['Main', 'North', 'South'],
    chartData: [
      { month: 'Jan', revenue: 12000, expense: 4200 },
      { month: 'Feb', revenue: 18000, expense: 6900 },
      { month: 'Mar', revenue: 24000, expense: 8300 },
      { month: 'Apr', revenue: 21000, expense: 7200 },
      { month: 'May', revenue: 27000, expense: 8100 },
    ],
  });
});
