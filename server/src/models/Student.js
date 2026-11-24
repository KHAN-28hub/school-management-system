import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenantPlugin.js';

const studentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    admissionNo: { type: String, required: true, trim: true },
    rollNo: { type: String, trim: true, default: '' },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true, index: true },
    academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true, index: true },
    dateOfBirth: { type: Date, default: null },
    gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' },
    bloodGroup: { type: String, trim: true, default: '' },
    address: { type: String, trim: true, default: '' },
    guardianName: { type: String, trim: true, default: '' },
    guardianPhone: { type: String, trim: true, default: '' },
    parentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Parent' }],
    status: { type: String, enum: ['active', 'graduated', 'transferred', 'inactive'], default: 'active', index: true },
  },
  { timestamps: true }
);

studentSchema.plugin(tenantPlugin);
studentSchema.index({ schoolId: 1, admissionNo: 1 }, { unique: true });
studentSchema.index({ schoolId: 1, classId: 1, sectionId: 1, status: 1 });

export const Student = mongoose.model('Student', studentSchema);
