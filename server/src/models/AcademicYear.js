import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenantPlugin.js';

const academicYearSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isCurrent: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

academicYearSchema.plugin(tenantPlugin);
academicYearSchema.index({ schoolId: 1, name: 1 }, { unique: true });

export const AcademicYear = mongoose.model('AcademicYear', academicYearSchema);
