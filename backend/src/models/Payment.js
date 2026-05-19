import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    fee: { type: mongoose.Schema.Types.ObjectId, ref: 'Fee' },
    amount: { type: Number, required: true },
    mode: { type: String, enum: ['online', 'cash', 'upi', 'card'], default: 'online' },
    transactionId: String,
    status: { type: String, enum: ['success', 'failed', 'pending'], default: 'pending' },
  },
  { timestamps: true },
);

export default mongoose.model('Payment', paymentSchema);
