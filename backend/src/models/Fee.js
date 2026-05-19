import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    total: { type: Number, required: true },
    paid: { type: Number, default: 0 },
    dueDate: Date,
    status: { type: String, enum: ['paid', 'partial', 'due'], default: 'due' },
  },
  { timestamps: true },
);

export default mongoose.model('Fee', feeSchema);
