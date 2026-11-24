import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenantPlugin.js';

const riskAlertSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true, index: true },
    level: { type: String, enum: ['low', 'medium', 'high'], required: true, index: true },
    score: { type: Number, required: true, min: 0, max: 100 },
    reasons: [{ type: String }],
    metrics: {
      attendancePct: { type: Number, default: 100 },
      failedSubjectsCount: { type: Number, default: 0 },
      averageMarksPct: { type: Number, default: 0 },
      missedAssignmentsCount: { type: Number, default: 0 },
    },
    resolved: { type: Boolean, default: false, index: true },
    resolvedAt: { type: Date, default: null },
    resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

riskAlertSchema.plugin(tenantPlugin);

export const RiskAlert = mongoose.model('RiskAlert', riskAlertSchema);
