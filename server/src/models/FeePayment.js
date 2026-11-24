import mongoose from 'mongoose';
import { tenantPlugin } from './plugins/tenantPlugin.js';

const feePaymentSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    feeStructureId: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeStructure', required: true, index: true },
    receiptNo: { type: String, required: true, index: true },
    amountPaid: { type: Number, required: true, min: 0 },
    paymentMethod: { type: String, enum: ['online', 'cash', 'card', 'cheque', 'bank_transfer'], default: 'online' },
    status: { type: String, enum: ['paid', 'partial', 'pending', 'failed'], default: 'paid', index: true },
    transactionId: { type: String, default: '' },
    paidAt: { type: Date, default: Date.now },
    remarks: { type: String, default: '' },
  },
  { timestamps: true }
);

feePaymentSchema.plugin(tenantPlugin);
feePaymentSchema.index({ schoolId: 1, receiptNo: 1 }, { unique: true });

export const FeePayment = mongoose.model('FeePayment', feePaymentSchema);
