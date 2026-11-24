import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenantPlugin.js';

const attendanceSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true, index: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', default: null, index: true },
    date: { type: Date, required: true, index: true },
    status: { type: String, enum: ['present', 'absent', 'late', 'excused'], required: true, default: 'present' },
    markedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    remarks: { type: String, default: '' },
  },
  { timestamps: true }
);

attendanceSchema.plugin(tenantPlugin);
attendanceSchema.index({ schoolId: 1, studentId: 1, date: 1, subjectId: 1 }, { unique: true });
attendanceSchema.index({ schoolId: 1, classId: 1, sectionId: 1, date: 1 });

export const Attendance = mongoose.model('Attendance', attendanceSchema);
