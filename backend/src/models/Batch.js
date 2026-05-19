import mongoose from 'mongoose';

const batchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    startDate: Date,
    endDate: Date,
    branch: String,
  },
  { timestamps: true },
);

export default mongoose.model('Batch', batchSchema);
