import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenantPlugin.js';

const gradeBandSchema = new mongoose.Schema(
  {
    grade: { type: String, required: true, trim: true },
    minPercentage: { type: Number, required: true, min: 0, max: 100 },
    maxPercentage: { type: Number, required: true, min: 0, max: 100 },
    gpa: { type: Number, required: true, min: 0, max: 10 },
    remark: { type: String, default: '' },
  },
  { _id: false }
);

const schoolSettingsSchema = new mongoose.Schema(
  {
    schoolName: { type: String, required: true, default: 'Greenfield International School' },
    tagline: { type: String, default: 'Excellence in Learning & Character' },
    address: { type: String, default: '123 Academic Way, Knowledge City' },
    phone: { type: String, default: '+1-555-0100' },
    email: { type: String, default: 'office@greenfield.edu' },
    logoUrl: { type: String, default: '' },
    currentAcademicYearId: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', default: null },
    attendanceThreshold: { type: Number, default: 75, min: 1, max: 100 },
    attendanceEditWindowHours: { type: Number, default: 24, min: 1, max: 168 },
    workingDays: {
      type: [String],
      default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    },
    gradingScale: {
      type: [gradeBandSchema],
      default: [
        { grade: 'A+', minPercentage: 90, maxPercentage: 100, gpa: 4.0, remark: 'Outstanding' },
        { grade: 'A', minPercentage: 80, maxPercentage: 89.99, gpa: 3.7, remark: 'Excellent' },
        { grade: 'B+', minPercentage: 70, maxPercentage: 79.99, gpa: 3.3, remark: 'Very Good' },
        { grade: 'B', minPercentage: 60, maxPercentage: 69.99, gpa: 3.0, remark: 'Good' },
        { grade: 'C', minPercentage: 50, maxPercentage: 59.99, gpa: 2.3, remark: 'Satisfactory' },
        { grade: 'D', minPercentage: 40, maxPercentage: 49.99, gpa: 1.5, remark: 'Pass' },
        { grade: 'F', minPercentage: 0, maxPercentage: 39.99, gpa: 0.0, remark: 'Needs Improvement' },
      ],
    },
  },
  { timestamps: true }
);

schoolSettingsSchema.plugin(tenantPlugin);

export const SchoolSettings = mongoose.model('SchoolSettings', schoolSettingsSchema);
