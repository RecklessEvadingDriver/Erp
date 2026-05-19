import Joi from 'joi';
import Student from '../models/Student.js';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';

export const studentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).default('student123'),
  admissionNo: Joi.string().required(),
  guardianName: Joi.string().allow('', null),
  phone: Joi.string().allow('', null),
  course: Joi.string().allow('', null),
  batch: Joi.string().allow('', null),
  qrCode: Joi.string().allow('', null),
  branch: Joi.string().default('Main'),
});

export const listStudents = asyncHandler(async (req, res) => {
  const q = req.query.search?.trim();
  const safePattern = q?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const filter = safePattern ? { admissionNo: new RegExp(safePattern, 'i') } : {};
  const data = await Student.find(filter).populate('user', 'name email role branch');
  res.json(data);
});

export const createStudent = asyncHandler(async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: 'student',
    branch: req.body.branch,
  });

  const student = await Student.create({ ...req.body, user: user._id });
  res.status(201).json(await student.populate('user', 'name email role branch'));
});
