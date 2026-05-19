import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema(
  {
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
    day: { type: String, required: true },
    startTime: String,
    endTime: String,
    subject: String,
    room: String,
  },
  { timestamps: true },
);

export default mongoose.model('Timetable', timetableSchema);
