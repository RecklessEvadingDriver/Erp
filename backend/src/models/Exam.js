import mongoose from 'mongoose';

const examSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    examDate: Date,
    maxMarks: Number,
  },
  { timestamps: true },
);

export default mongoose.model('Exam', examSchema);
