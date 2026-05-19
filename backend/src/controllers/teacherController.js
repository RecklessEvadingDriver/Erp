import Joi from 'joi';
import Teacher from '../models/Teacher.js';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';

export const teacherSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).default('teacher123'),
  employeeId: Joi.string().required(),
  subjects: Joi.array().items(Joi.string()).default([]),
  qualification: Joi.string().allow('', null),
  salary: Joi.number().min(0).default(0),
  branch: Joi.string().default('Main'),
});

export const listTeachers = asyncHandler(async (req, res) => {
  const data = await Teacher.find().populate('user', 'name email role branch');
  res.json(data);
});

export const createTeacher = asyncHandler(async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: 'teacher',
    branch: req.body.branch,
  });

  const teacher = await Teacher.create({ ...req.body, user: user._id });
  res.status(201).json(await teacher.populate('user', 'name email role branch'));
});
