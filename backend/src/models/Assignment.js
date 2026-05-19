import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    dueDate: Date,
    attachments: [String],
  },
  { timestamps: true },
);

export default mongoose.model('Assignment', assignmentSchema);
