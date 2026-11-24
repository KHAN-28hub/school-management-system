import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenantPlugin.js';

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    numericLevel: { type: Number, required: true, min: 1, max: 12 },
    academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true, index: true },
  },
  { timestamps: true }
);

classSchema.plugin(tenantPlugin);
classSchema.index({ schoolId: 1, name: 1, academicYearId: 1 }, { unique: true });

export const Class = mongoose.model('Class', classSchema);
