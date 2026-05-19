import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export const roles = ['super-admin', 'admin', 'teacher', 'student', 'parent', 'accountant'];

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: roles, default: 'student' },
    branch: { type: String, default: 'Main' },
    isActive: { type: Boolean, default: true },
    avatarUrl: String,
  },
  { timestamps: true },
);

userSchema.pre('save', async function preSave(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);
