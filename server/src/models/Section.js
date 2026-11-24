import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenantPlugin.js';

const sectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    classTeacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', default: null },
    capacity: { type: Number, default: 40, min: 1 },
  },
  { timestamps: true }
);

sectionSchema.plugin(tenantPlugin);
sectionSchema.index({ schoolId: 1, classId: 1, name: 1 }, { unique: true });

export const Section = mongoose.model('Section', sectionSchema);
