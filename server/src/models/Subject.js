import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenantPlugin.js';

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true, uppercase: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', default: null },
    facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', default: null, index: true },
    maxMarks: { type: Number, default: 100, min: 1 },
    passMarks: { type: Number, default: 40, min: 0 },
    credits: { type: Number, default: 1, min: 0.5 },
  },
  { timestamps: true }
);

subjectSchema.plugin(tenantPlugin);
subjectSchema.index({ schoolId: 1, code: 1, classId: 1 }, { unique: true });

export const Subject = mongoose.model('Subject', subjectSchema);
