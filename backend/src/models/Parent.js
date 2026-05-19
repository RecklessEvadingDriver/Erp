import mongoose from 'mongoose';

const parentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    relationship: String,
  },
  { timestamps: true },
);

export default mongoose.model('Parent', parentSchema);
