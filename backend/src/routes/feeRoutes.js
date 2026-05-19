import express from 'express';
import Joi from 'joi';
import { createFee, feeSchema, listFees, payOnline } from '../controllers/feeController.js';
import { authorize, protect } from '../middleware/auth.js';
import validate from '../middleware/validate.js';

const router = express.Router();
const paymentSchema = Joi.object({ feeId: Joi.string().required(), amount: Joi.number().min(0).required(), transactionId: Joi.string().required() });

router.get('/', protect, authorize('super-admin', 'admin', 'accountant'), listFees);
router.post('/', protect, authorize('super-admin', 'admin', 'accountant'), validate(feeSchema), createFee);
router.post('/pay', protect, authorize('super-admin', 'admin', 'accountant', 'parent', 'student'), validate(paymentSchema), payOnline);

export default router;
