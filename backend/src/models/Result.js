import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema(
  {
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    marks: Number,
    grade: String,
  },
  { timestamps: true },
);

export default mongoose.model('Result', resultSchema);
