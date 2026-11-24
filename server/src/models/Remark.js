import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenantPlugin.js';

const remarkSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true, index: true },
    category: { type: String, enum: ['academic', 'behavioral', 'general', 'achievement'], default: 'general' },
    comment: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

remarkSchema.plugin(tenantPlugin);

export const Remark = mongoose.model('Remark', remarkSchema);
