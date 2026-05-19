import Joi from 'joi';
import mongoose from 'mongoose';
import Fee from '../models/Fee.js';
import Payment from '../models/Payment.js';
import asyncHandler from '../utils/asyncHandler.js';

export const feeSchema = Joi.object({
  student: Joi.string().required(),
  total: Joi.number().min(0).required(),
  paid: Joi.number().min(0).default(0),
  dueDate: Joi.date().optional(),
});

export const listFees = asyncHandler(async (req, res) => {
  const data = await Fee.find().sort({ createdAt: -1 }).populate('student');
  res.json(data);
});

export const createFee = asyncHandler(async (req, res) => {
  const status = req.body.paid >= req.body.total ? 'paid' : req.body.paid > 0 ? 'partial' : 'due';
  const fee = await Fee.create({ ...req.body, status });
  res.status(201).json(fee);
});

export const payOnline = asyncHandler(async (req, res) => {
  const { feeId, amount, transactionId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(feeId)) {
    return res.status(400).json({ message: 'Invalid fee id' });
  }
  const safeFeeId = new mongoose.Types.ObjectId(feeId);
  const payment = await Payment.create({ fee: safeFeeId, amount, transactionId, mode: 'online', status: 'success' });
  await Fee.findByIdAndUpdate(safeFeeId, { $inc: { paid: amount } });
  if (req.io) req.io.emit('payment:success', payment);
  res.status(201).json(payment);
});
