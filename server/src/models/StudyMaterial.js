import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenantPlugin.js';

const studyMaterialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true, index: true },
    facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true, index: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, default: 'document' },
  },
  { timestamps: true }
);

studyMaterialSchema.plugin(tenantPlugin);

export const StudyMaterial = mongoose.model('StudyMaterial', studyMaterialSchema);
