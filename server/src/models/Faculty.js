import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenantPlugin.js';

const facultySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    employeeId: { type: String, required: true, trim: true },
    department: { type: String, trim: true, default: 'General' },
    qualification: { type: String, trim: true, default: '' },
    designation: { type: String, trim: true, default: 'Teacher' },
    joiningDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'inactive'], default: 'active', index: true },
  },
  { timestamps: true }
);

facultySchema.plugin(tenantPlugin);
facultySchema.index({ schoolId: 1, employeeId: 1 }, { unique: true });

export const Faculty = mongoose.model('Faculty', facultySchema);
