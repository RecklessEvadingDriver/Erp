import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    admissionNo: { type: String, required: true, unique: true },
    guardianName: String,
    phone: String,
    course: String,
    batch: String,
    qrCode: String,
  },
  { timestamps: true },
);

export default mongoose.model('Student', studentSchema);
