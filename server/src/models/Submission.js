import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenantPlugin.js';

const submissionSchema = new mongoose.Schema(
  {
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true, index: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    fileUrl: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
    points: { type: Number, default: null },
    feedback: { type: String, default: '' },
    status: { type: String, enum: ['submitted', 'graded', 'late'], default: 'submitted' },
    gradedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

submissionSchema.plugin(tenantPlugin);
submissionSchema.index({ schoolId: 1, assignmentId: 1, studentId: 1 }, { unique: true });

export const Submission = mongoose.model('Submission', submissionSchema);
