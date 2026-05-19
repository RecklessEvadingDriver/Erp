import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
    date: { type: Date, required: true },
    status: { type: String, enum: ['present', 'absent', 'late'], default: 'present' },
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    qrSource: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model('Attendance', attendanceSchema);
