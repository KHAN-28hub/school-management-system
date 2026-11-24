import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { tenantPlugin } from './plugins/tenantPlugin.js';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['super_admin', 'school_admin', 'faculty', 'student', 'parent'], required: true, index: true },
    phone: { type: String, trim: true, default: '' },
    avatarUrl: { type: String, default: '' },
    isActive: { type: Boolean, default: true, index: true },
    refreshTokenHash: { type: String, select: false, default: null },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function comparePassword(plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

userSchema.statics.hashPassword = function hashPassword(plain) {
  return bcrypt.hash(plain, 10);
};

userSchema.plugin(tenantPlugin);

export const User = mongoose.model('User', userSchema);
