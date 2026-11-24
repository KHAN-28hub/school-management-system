import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenantPlugin.js';

const feeComponentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Tuition, Lab, Sports, Library
    amount: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const feeStructureSchema = new mongoose.Schema(
  {
    academicYearId: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear', required: true, index: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    name: { type: String, required: true, trim: true }, // e.g., Term 1 Tuition
    components: [feeComponentSchema],
    totalAmount: { type: Number, required: true, min: 0 },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

feeStructureSchema.plugin(tenantPlugin);

export const FeeStructure = mongoose.model('FeeStructure', feeStructureSchema);
