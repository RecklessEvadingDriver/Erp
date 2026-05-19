import Joi from 'joi';
import Notification from '../models/Notification.js';
import asyncHandler from '../utils/asyncHandler.js';

export const notificationSchema = Joi.object({
  title: Joi.string().required(),
  message: Joi.string().required(),
  targetRoles: Joi.array().items(Joi.string()).default([]),
});

export const listNotifications = asyncHandler(async (req, res) => {
  const data = await Notification.find().sort({ createdAt: -1 }).limit(20);
  res.json(data);
});

export const createNotification = asyncHandler(async (req, res) => {
  const data = await Notification.create(req.body);
  if (req.io) req.io.emit('notification:new', data);
  res.status(201).json(data);
});
