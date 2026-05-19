import Joi from 'joi';
import User, { roles } from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import { signToken } from '../utils/token.js';

export const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid(...roles).required(),
  branch: Joi.string().default('Main'),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const register = asyncHandler(async (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  const existing = await User.findOne().where('email').equals(email);
  if (existing) return res.status(409).json({ message: 'Email already registered' });
  const user = await User.create({ ...req.body, email });
  const token = signToken({ id: user._id, role: user.role });
  return res.status(201).json({ token, user });
});

export const login = asyncHandler(async (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  const user = await User.findOne().where('email').equals(email).select('+password');
  if (!user || !(await user.comparePassword(req.body.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = signToken({ id: user._id, role: user.role });
  user.password = undefined;
  return res.json({ token, user });
});

export const profile = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});
