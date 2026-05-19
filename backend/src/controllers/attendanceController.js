import Joi from 'joi';
import Attendance from '../models/Attendance.js';
import asyncHandler from '../utils/asyncHandler.js';

export const attendanceSchema = Joi.object({
  student: Joi.string().required(),
  batch: Joi.string().allow('', null),
  date: Joi.date().required(),
  status: Joi.string().valid('present', 'absent', 'late').default('present'),
  qrSource: Joi.boolean().default(false),
});

export const listAttendance = asyncHandler(async (req, res) => {
  const data = await Attendance.find().sort({ date: -1 }).limit(200).populate('student');
  res.json(data);
});

export const markAttendance = asyncHandler(async (req, res) => {
  const data = await Attendance.create({ ...req.body, markedBy: req.user._id });
  if (req.io) req.io.emit('attendance:marked', data);
  res.status(201).json(data);
});
