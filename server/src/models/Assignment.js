import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenantPlugin.js';

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true, index: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true, index: true },
    facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true, index: true },
    dueDate: { type: Date, required: true },
    attachmentUrl: { type: String, default: '' },
    maxPoints: { type: Number, default: 100, min: 1 },
  },
  { timestamps: true }
);

assignmentSchema.plugin(tenantPlugin);

export const Assignment = mongoose.model('Assignment', assignmentSchema);
