import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenantPlugin.js';

const markSchema = new mongoose.Schema(
  {
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true, index: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true, index: true },
    marksObtained: { type: Number, required: true, min: 0 },
    maxMarks: { type: Number, required: true, min: 1, default: 100 },
    grade: { type: String, default: '' },
    remarks: { type: String, default: '' },
    enteredById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

markSchema.plugin(tenantPlugin);
markSchema.index({ schoolId: 1, examId: 1, studentId: 1, subjectId: 1 }, { unique: true });

export const Mark = mongoose.model('Mark', markSchema);
