import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    employeeId: { type: String, required: true, unique: true },
    subjects: [String],
    qualification: String,
    salary: Number,
  },
  { timestamps: true },
);

export default mongoose.model('Teacher', teacherSchema);
