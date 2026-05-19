import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    durationMonths: Number,
    fees: Number,
    branch: String,
  },
  { timestamps: true },
);

export default mongoose.model('Course', courseSchema);
