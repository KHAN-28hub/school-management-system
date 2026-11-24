import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenantPlugin.js';

const examSchema = new mongoose.Schema(
  {
    academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true, index: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    name: { type: String, required: true, trim: true },
    term: { type: String, enum: ['Term 1', 'Term 2', 'Mid-Term', 'Final', 'Monthly'], default: 'Term 1' },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

examSchema.plugin(tenantPlugin);

export const Exam = mongoose.model('Exam', examSchema);
