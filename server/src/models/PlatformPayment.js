import mongoose from 'mongoose';

const platformPaymentSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionPlan', default: null },
    invoiceNo: { type: String, required: true, unique: true, index: true },
    amount: { type: Number, required: true, min: 0 },
    paidAt: { type: Date, default: Date.now },
    method: { type: String, enum: ['manual', 'bank_transfer', 'card', 'cheque', 'upi', 'online'], default: 'bank_transfer' },
    reference: { type: String, default: '' },
    periodStart: { type: Date, required: true },
    periodEnd: { type: Date, required: true },
    note: { type: String, default: '' },
    status: { type: String, enum: ['paid', 'pending', 'overdue'], default: 'paid' },
    recordedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

export const PlatformPayment = mongoose.model('PlatformPayment', platformPaymentSchema);
